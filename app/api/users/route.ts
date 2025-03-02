import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || "default_secret";

export async function GET(req: Request) {
  try {
    // ดึง cookie และ token
    const cookies = req.headers.get("cookie");
    const token = cookies
      ?.split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];

    // ตรวจสอบว่ามี token หรือไม่
    if (!token) {
      return NextResponse.json(
        { success: false, message: "ไม่พบ Token" },
        { status: 401 }
      );
    }

    // ตรวจสอบการถอดรหัส token
    let decoded;
    try {
      decoded = jwt.verify(token, JWT_SECRET) as { id: number };
    } catch (err) {
      return NextResponse.json(
        { success: false, message: "Token ไม่ถูกต้องหรือหมดอายุ" },
        { status: 401 }
      );
    }

    // ดึงข้อมูลผู้ใช้จากฐานข้อมูล
    const user = await prisma.userSell.findUnique({
      where: { id: decoded.id },
      select: {
        id: true,
        username: true,
        email: true,
        phone: true,
      },
    });

    // ตรวจสอบว่าพบผู้ใช้หรือไม่
    if (!user) {
      return NextResponse.json(
        { success: false, message: "ไม่พบผู้ใช้ในระบบ" },
        { status: 404 }
      );
    }

    // ส่งข้อมูลผู้ใช้กลับ
    return NextResponse.json({ success: true, user }, { status: 200 });
  } catch (error) {
    console.error("Error fetching user data:", error);
    return NextResponse.json(
      { success: false, message: "เกิดข้อผิดพลาดในเซิร์ฟเวอร์" },
      { status: 500 }
    );
  }
}