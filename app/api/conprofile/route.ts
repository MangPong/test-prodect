import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from "@prisma/client";
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET_KEY;

if (!JWT_SECRET) {
  throw new Error("❌ Server misconfiguration: JWT_SECRET_KEY is missing.");
}

export async function GET(request: NextRequest) {
  try {
    const token = request.headers.get("cookie")?.split("token=")[1]?.split(";")[0];

    if (!token) {
      return NextResponse.json({ success: false, message: "Unauthorized: No token provided" }, { status: 401 });
    }

    let decodedToken: unknown;
    try {
      decodedToken = jwt.verify(token, JWT_SECRET);
    } catch (err) {
      return NextResponse.json({ success: false, message: "Unauthorized: Invalid token" }, { status: 401 });
    }

    // ตรวจสอบให้แน่ใจว่า decodedToken มี id และ id เป็น number
    if (typeof decodedToken === 'object' && decodedToken !== null && 'id' in decodedToken) {
      const { id } = decodedToken as { id: number };
      
      // ทำการ query ข้อมูล user จาก Prisma
      const user = await prisma.user.findUnique({
        where: { id },
        select: { username: true, email: true, phone: true },
      });

      if (!user) {
        return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
      }

      return NextResponse.json({ success: true, username: user.username, email: user.email, phone: user.phone });
    } else {
      return NextResponse.json({ success: false, message: "Invalid token: Missing 'id' property" }, { status: 400 });
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("📥 ข้อมูลที่รับมา:", body);

    // รับค่า userId จาก body หรือ header (อาจจะใช้ token หรือวิธีอื่นในการรับค่า)
    const { userId, title, firstName, lastName, email, phoneNumber, address, contactInfo, profileImage, idCardImage, relationship, phoneRelationship } = body;

    // ตรวจสอบข้อมูลที่ขาด
    if (!userId || !title || !firstName || !lastName || !email || !phoneNumber || !address) {
      return NextResponse.json({ error: "ข้อมูลไม่ครบถ้วน" }, { status: 400 });
    }

    // ใช้ userId เพื่อค้นหาหรืออัพเดตข้อมูล
    const updatedProfile = await prisma.profile.upsert({
      where: { userId }, // ใช้ userId เป็นหลักในการค้นหา
      update: { title, firstName, lastName, email, phoneNumber, address, contactInfo, profileImage, idCardImage, relationship, phoneRelationship },
      create: { userId, title, firstName, lastName, email, phoneNumber, address, contactInfo, profileImage, idCardImage, relationship, phoneRelationship },
    });

    console.log("✅ บันทึกข้อมูลสำเร็จ:", updatedProfile);
    return NextResponse.json({ success: true, profile: updatedProfile });

  } catch (error) {
    console.error("🚨 API error:", error);
    return NextResponse.json({ error: "เกิดข้อผิดพลาดในเซิร์ฟเวอร์" }, { status: 500 });
  }
}
