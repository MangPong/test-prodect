import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userName, email, phone, password } = body;

    if (!userName || !email || !phone || !password) {
      return NextResponse.json(
        { success: false, message: "กรุณากรอกข้อมูลให้ครบถ้วน" },
        { status: 400 }
      );
    }

    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: "รูปแบบอีเมลไม่ถูกต้อง" },
        { status: 400 }
      );
    }

    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phone)) {
      return NextResponse.json(
        { success: false, message: "เบอร์โทรศัพท์ต้องมี 10 หลัก" },
        { status: 400 }
      );
    }

    // ตรวจสอบว่าผู้ใช้มีอยู่แล้วหรือไม่
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { username: userName },
          { email: email },
          { phone: phone },
        ],
      },
    });

    if (existingUser) {
      let message = "ข้อมูลซ้ำ: ";
      if (existingUser.username === userName) {
        message += "ชื่อผู้ใช้ ";
      }
      if (existingUser.email === email) {
        message += "อีเมล ";
      }
      if (existingUser.phone === phone) {
        message += "เบอร์โทรศัพท์";
      }

      return NextResponse.json(
        { success: false, message: message.trim() },
        { status: 400 }
      );
    }

    // เข้ารหัสรหัสผ่าน
    const hashedPassword = await bcrypt.hash(password, 10);

    // บันทึกข้อมูลลงฐานข้อมูล
    const newUser = await prisma.user.create({
      data: {
        username: userName,
        email,
        phone,
        password: hashedPassword,
      },
    });

    console.log("User saved successfully:", newUser);

    return NextResponse.json(
      { success: true, message: "ลงทะเบียนสำเร็จ!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in API:", error);
    return NextResponse.json(
      { success: false, message: "เกิดข้อผิดพลาดในเซิร์ฟเวอร์" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
