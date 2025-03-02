import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || "default_secret"; // ใช้ env variable

// Login function
export async function POST(req) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: "กรุณากรอกอีเมลและรหัสผ่าน" },
        { status: 400 }
      );
    }

    const user = await prisma.userSell.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "ไม่พบบัญชีนี้ในระบบ" },
        { status: 404 }
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { success: false, message: "รหัสผ่านไม่ถูกต้อง" },
        { status: 401 }
      );
    }

    const token = jwt.sign(
      { id: user.id, username: user.username, email: user.email },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    const response = NextResponse.json(
      { success: true, message: "เข้าสู่ระบบสำเร็จ!" },
      { status: 200 }
    );

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 3600, // 1 ชั่วโมง
      path: "/", // ให้ Cookie ใช้ได้ทั้งระบบ
    });

    return response;
  } catch (error) {
    console.error("Error in /api/loginsell:", error);
    return NextResponse.json(
      { success: false, message: "เกิดข้อผิดพลาดในเซิร์ฟเวอร์" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// Logout function
export async function DELETE() {
  try {
    const response = NextResponse.json(
      { success: true, message: "ออกจากระบบสำเร็จ!" },
      { status: 200 }
    );

    response.cookies.set("token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 0, // ลบ Cookie ทันที
      path: "/", // ให้แน่ใจว่า Cookie ถูกลบจากทุกที่
    });

    return response;
  } catch (error) {
    console.error("Error in /api/logoutsell:", error);
    return NextResponse.json(
      { success: false, message: "เกิดข้อผิดพลาดในเซิร์ฟเวอร์" },
      { status: 500 }
    );
  }
}
