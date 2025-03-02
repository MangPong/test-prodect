import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import cloudinary from "@/lib/cloudinary"; // Cloudinary setup
import jwt from "jsonwebtoken";

// Initialize Prisma Client
const prisma = new PrismaClient();

// JWT Secret from environment variables
const JWT_SECRET = process.env.JWT_SECRET || "default_secret";

// ✅ GET method: ดึงข้อมูลผู้ใช้
export async function GET(req: Request) {
  try {
    const cookies = req.headers.get("cookie");
    const token = cookies
      ?.split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];

    if (!token) {
      return NextResponse.json(
        { success: false, message: "ไม่พบ Token" },
        { status: 401 }
      );
    }

    let decoded;
    try {
      decoded = jwt.verify(token, JWT_SECRET) as { id: number };
    } catch (err) {
      return NextResponse.json(
        { success: false, message: "Token ไม่ถูกต้องหรือหมดอายุ" },
        { status: 401 }
      );
    }

    const user = await prisma.profileSell.findUnique({
      where: { userId: decoded.id },
      select: {
        userId: true,
        title: true,
        firstName: true,
        lastName: true,
        phoneNumber: true,
        email: true,
        bank: true,
        accountNumber: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "ไม่พบผู้ใช้ในระบบ" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, user }, { status: 200 });
  } catch (error) {
    console.error("Error fetching user data:", error);
    return NextResponse.json(
      { success: false, message: "เกิดข้อผิดพลาดในเซิร์ฟเวอร์" },
      { status: 500 }
    );
  }
}

// ✅ POST method: สร้างโปรไฟล์หอพัก
export async function POST(req: Request) {
  try {
    if (!req.headers.get("content-type")?.includes("multipart/form-data")) {
      return NextResponse.json(
        { error: "Invalid Content-Type, must be multipart/form-data" },
        { status: 400 }
      );
    }

    const formData = await req.formData();
    console.log("✅ FormData Received:", Array.from(formData.entries()));

    const requiredFields = [
      "title",
      "firstName",
      "lastName",
      "phoneNumber",
      "email",
      "rooms[0][typeDormitory]",
      "rooms[0][dormitoryDetails]",
      "rooms[0][facilitiesDormitory]",
      "rooms[0][roomNumber]",
      "rooms[0][roomDeposit]",
      "rooms[0][priceElectricity]",
      "rooms[0][priceWater]",
      "rooms[0][priceWifi]",
      "rooms[0][priceOther]",
      "rooms[0][images][0]",
    ];

    for (const field of requiredFields) {
      const value = formData.get(field);
      if (!value || (typeof value === "string" && value.trim() === "")) {
        console.error(`⚠️ Missing field: ${field} - Value: ${value}`);
        return NextResponse.json(
          { error: `Missing or empty required field: ${field}` },
          { status: 400 }
        );
      }
    }

    const uploadImage = async (file: File, folder: string) => {
      const buffer = Buffer.from(await file.arrayBuffer());
      return new Promise<string>((resolve, reject) => {
        cloudinary.uploader
          .upload_stream({ folder }, (error, result) => {
            if (error) {
              console.error(`Failed to upload image to ${folder}:`, error);
              reject("Image upload failed");
            } else {
              resolve(result?.secure_url || "");
            }
          })
          .end(buffer);
      });
    };

    // ✅ รองรับไฟล์รูปภาพหลายไฟล์
    const photoDormitoryFiles: File[] = [];
    for (const [key, value] of formData.entries()) {
      if (key.startsWith("rooms[0][images]") && value instanceof File) {
        photoDormitoryFiles.push(value);
      }
    }

    let photoUrls: string[] = [];
    if (photoDormitoryFiles.length > 0) {
      try {
        photoUrls = await Promise.all(
          photoDormitoryFiles.map((file) => uploadImage(file, "dormitory_photos"))
        );
      } catch (uploadError) {
        console.error("❌ Error uploading images:", uploadError);
        return NextResponse.json(
          { error: "Failed to upload dormitory photos" },
          { status: 500 }
        );
      }
    } else {
      return NextResponse.json(
        { error: "Dormitory photo is required" },
        { status: 400 }
      );
    }

    // ✅ ตรวจสอบ Prisma Model
    if (!prisma.dormitory) {
      console.error("❌ Prisma model 'dormitory' not found. Check your Prisma schema.");
      return NextResponse.json(
        {
          error:
            "Prisma model 'dormitory' not found. Run 'npx prisma generate' after schema updates.",
        },
        { status: 500 }
      );
    }

    // ✅ สร้างข้อมูลในฐานข้อมูล
    const newDormitory = await prisma.dormitory.create({
      data: {
        title: formData.get("title") as string,
        firstName: formData.get("firstName") as string,
        lastName: formData.get("lastName") as string,
        phoneNumber: formData.get("phoneNumber") as string,
        email: formData.get("email") as string,
        priceOther: formData.get("rooms[0][priceOther]") as string,
        priceWifi: formData.get("rooms[0][priceWifi]") as string,
        priceWater: formData.get("rooms[0][priceWater]") as string,
        priceElectricity: formData.get("rooms[0][priceElectricity]") as string,
        roomDeposit:
          parseInt(formData.get("rooms[0][roomDeposit]") as string) || 0,
        roomNumber:
          parseInt(formData.get("rooms[0][roomNumber]") as string) || 0,
        facilitiesDormitory: formData.get("rooms[0][facilitiesDormitory]") as string,
        dormitoryDetails: formData.get("rooms[0][dormitoryDetails]") as string,
        addressDormitory: formData.get("rooms[0][addressDormitory]") as string,
        typeDormitory: formData.get("rooms[0][typeDormitory]") as string,
        nameDormitory:
          (formData.get("rooms[0][nameDormitory]") as string)?.trim() || "ไม่ระบุชื่อหอพัก",
        photoDormitory: JSON.stringify(photoUrls),
      },
    });

    console.log("🏡 Dormitory profile created successfully");
    return NextResponse.json({ success: true, data: newDormitory }, { status: 201 });
  } catch (error: any) {
    console.error("❌ Unexpected API Error:", error);
    return NextResponse.json(
      {
        error: "Failed to create dormitory profile",
        details: error?.message || "Unknown error",
      },
      { status: 500 }
    );
  }
}
