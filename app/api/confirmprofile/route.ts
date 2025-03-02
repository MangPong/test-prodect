import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import cloudinary from "@/lib/cloudinary";

const prisma = new PrismaClient();

export async function POST(req: Request) {
    try {
        // ✅ ตรวจสอบว่า Request มี `multipart/form-data` หรือไม่
        if (!req.headers.get("content-type")?.includes("multipart/form-data")) {
            return NextResponse.json({ error: "Invalid Content-Type, must be multipart/form-data" }, { status: 400 });
        }

        // ✅ อ่าน `FormData`
        const formData = await req.formData();

        console.log("FormData Received:", formData);

        // 🔹 ดึงข้อมูลจาก `FormData`
        const userId = Number(formData.get("userId"));
        const title = formData.get("title") as string;
        const firstName = formData.get("firstName") as string;
        const lastName = formData.get("lastName") as string;
        const username = formData.get("username") as string;
        const phoneNumber = formData.get("phoneNumber") as string;
        const email = formData.get("email") as string;
        const address = formData.get("address") as string;
        const bank = formData.get("bank") as string;
        const accountNumber = formData.get("accountNumber") as string;
        const status = formData.get("status") as string || "pending";

        if (!userId || !firstName || !lastName || !address) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        // 🔹 ตรวจสอบและอัปโหลดไฟล์ภาพ
        let profileImage = "";
        let photoIdCard = "";

        const uploadImage = async (file: File, folder: string) => {
            const buffer = Buffer.from(await file.arrayBuffer());
            return new Promise((resolve, reject) => {
                cloudinary.uploader.upload_stream(
                    { folder },
                    (error, result) => {
                        if (error) {
                            console.error(`Failed to upload ${folder}:`, error);
                            reject(error);
                        } else {
                            resolve(result?.secure_url);
                        }
                    }
                ).end(buffer);
            });
        };

        const profileImageFile = formData.get("profileImage") as File;
        const idCardImageFile = formData.get("photoIdCard") as File;

        if (profileImageFile && profileImageFile.size > 0) {
            profileImage = await uploadImage(profileImageFile, "profile_pictures") as string;
        }

        if (idCardImageFile && idCardImageFile.size > 0) {
            photoIdCard = await uploadImage(idCardImageFile, "id_cards") as string;
        } else {
            return NextResponse.json({ error: "ID Card image is required" }, { status: 400 });
        }

        // 🔹 บันทึกข้อมูลลงฐานข้อมูล
        const newProfile = await prisma.profileSell.create({
            data: {
                userId,
                title,
                firstName,
                lastName,
                username,
                phoneNumber,
                email,
                address,
                bank,
                accountNumber,
                profileImage,
                photoIdCard,
                status,
            },
        });

        console.log("Profile created successfully:", newProfile);
        return NextResponse.json(newProfile, { status: 201 });

    } catch (error) {
        console.error("Unexpected API Error:", error);
        return NextResponse.json({ error: "Failed to create profile", details: error.message }, { status: 500 });
    }

    const token = authHeader.split(' ')[1];

    // ✅ ตรวจสอบความถูกต้องของ Token
    const SECRET_KEY = process.env.JWT_SECRET_KEY || 'default-secret-key';

        if (!SECRET_KEY) {
           throw new Error('🚨 SECRET_KEY is missing. Please set JWT_SECRET_KEY in your environment variables.');
    }
    const decoded = jwt.verify(token, SECRET_KEY);
    console.log("🔐 Token decoded:", decoded);

    // ✅ ดึงข้อมูลจาก Request Body
    const body = await req.json();
    const { title, firstname, lastname, email, phoneNumber, contactInfo, address, profileImage } = body;

    // ✅ เช็คว่าได้รับค่าที่จำเป็นหรือไม่
    if (!firstname || !lastname || !email) {
      return NextResponse.json({ error: '❌ Missing required fields.' }, { status: 400 });
    }

    console.log("📦 Received Data:", body);

    // 🔗 ถ้ามีการบันทึกลงฐานข้อมูล MongoDB หรืออื่นๆ สามารถเพิ่มตรงนี้ได้
    // Example: await db.collection('profiles').insertOne({ title, firstname, lastname, email, phoneNumber, contactInfo, address, profileImage });

    return NextResponse.json({ message: '✅ Profile successfully saved!', data: body }, { status: 200 });

  } catch (error: any) {
    console.error("🔥 Error:", error);

    if (error.name === 'JsonWebTokenError') {
      return NextResponse.json({ error: '❌ Invalid token, please login again.' }, { status: 401 });
    }

    return NextResponse.json({ error: '❌ Internal Server Error' }, { status: 500 });
  }
}