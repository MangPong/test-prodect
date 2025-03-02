import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import cloudinary from "@/lib/cloudinary";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    // ✅ ตรวจสอบ Content-Type
    if (!req.headers.get("content-type")?.includes("multipart/form-data")) {
      return NextResponse.json(
        { error: "Invalid Content-Type, ต้องเป็น multipart/form-data" },
        { status: 400 }
      );
    }

    const formData = await req.formData();

    // ✅ ดึงข้อมูลจาก FormData
    const userId = Number(formData.get("userId"));
    const title = formData.get("title")?.toString() ?? "";
    const firstName = formData.get("firstName")?.toString() ?? "";
    const lastName = formData.get("lastName")?.toString() ?? "";
    const username = formData.get("username")?.toString() ?? "";
    const phoneNumber = formData.get("phoneNumber")?.toString() ?? "";
    const email = formData.get("email")?.toString() ?? "";
    const address = formData.get("address")?.toString() ?? "";
    const accountNumber = formData.get("accountNumber")?.toString() ?? "";
    const status = formData.get("status")?.toString() || "pending";

    // ⚡ ตรวจสอบข้อมูลที่จำเป็น
    if (!userId || !firstName || !lastName || !address || !accountNumber) {
      return NextResponse.json(
        { error: "กรุณากรอกข้อมูลที่จำเป็นให้ครบถ้วน" },
        { status: 400 }
      );
    }

    // ✅ ฟังก์ชันอัปโหลดรูปภาพไป Cloudinary
    const uploadImage = async (file: File, folder: string) => {
      const buffer = Buffer.from(await file.arrayBuffer());
      return new Promise<string>((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder, resource_type: "auto" },
          (error, result) => {
            if (error) {
              console.error(`❌ Upload ${folder} failed:`, error);
              reject(error);
            } else {
              resolve(result?.secure_url ?? "");
            }
          }
        );
        uploadStream.end(buffer);
      });
    };

    // ✅ อัปโหลดรูปภาพ
    let profileImage = "";
    let photoIdCard = "";

    const profileImageFile = formData.get("profileImage") as File;
    const idCardImageFile = formData.get("photoIdCard") as File;

    if (profileImageFile?.size) {
      profileImage = await uploadImage(profileImageFile, "profile_pictures");
    } else {
      return NextResponse.json(
        { error: "กรุณาอัปโหลดรูปโปรไฟล์" },
        { status: 400 }
      );
    }

    if (idCardImageFile?.size) {
      photoIdCard = await uploadImage(idCardImageFile, "id_cards");
    } else {
      return NextResponse.json(
        { error: "กรุณาอัปโหลดรูปบัตรประชาชน" },
        { status: 400 }
      );
    }

    // ✅ บันทึกข้อมูลลงฐานข้อมูล
    const newProfile = await prisma.profile.create({
      data: {
        userId,
        title,
        firstName,
        lastName,
        username,
        phoneNumber,
        email,
        address,
        accountNumber,
        profileImage,
        photoIdCard,
        status,
      },
    });

    return NextResponse.json(newProfile, { status: 201 });
  } catch (error) {
    console.error("🔥 Unexpected API Error:", error);
    return NextResponse.json(
      { error: "❗ เกิดข้อผิดพลาดในการสร้างโปรไฟล์", details: (error as Error).message },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect(); // ✅ ปิดการเชื่อมต่อ Prisma ในทุกกรณี
  }
}
