import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    // ดึงข้อมูล users และ userSells
    const users = await prisma.user.findMany();
    const userSells = await prisma.userSell.findMany();

    // นับผู้ใช้ที่ล็อกอินแล้ว
    // สมมติว่าเรามีฟิลด์ isLoggedIn เพื่อบ่งชี้สถานะการล็อกอิน
    const totalLoginUsers = users.filter(user => user.isLoggedIn).length;

    // จำนวนทั้งหมด
    const totalUsers = users.length + userSells.length;
    const totalSellers = userSells.length;

    return NextResponse.json({
      totalUsers,
      totalLoginUsers,
      totalSellers,
      users, // ส่งข้อมูล users ที่แยกจาก userSells
      userSells, // ส่งข้อมูล userSells ที่แยกจาก users...
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
