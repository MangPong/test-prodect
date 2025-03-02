import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient(); // ⭐ สร้าง Prisma Client เพียงครั้งเดียว

// 🏡 GET ทั้งหมด หรือแบบเฉพาะ ID (/api/dormitories?id=xxx)
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id'); // 🔍 รับค่า ID จาก Query Params

    if (id) {
      // 🟩 กรณีดึงข้อมูลหอพักแบบเจาะจงด้วย ID
      const dormitory = await prisma.formSell.findUnique({
        where: { id: Number(id) }, // ✅ แก้ไขให้ดึงจาก formSell
        select: {
          id: true,
          nameDormitory: true,
          typeDormitory: true,
          addressDormitory: true,
          dormitoryDetails: true,
          facilities: true,
          roomNumber: true,
          distanceDormitory: true,
          roomDeposit: true,
          priceMonth: true,
          priceElectricity: true,
          priceWater: true,
          priceWifi: true,
          priceOther: true,
          photoDormitory: true,
        },
      });

      if (!dormitory) {
        return NextResponse.json(
          { success: false, message: '❌ ไม่พบหอพักที่ระบุ' },
          { status: 404 }
        );
      }

      return NextResponse.json({ success: true, dormitory }, { status: 200 });
    } else {
      // 🟦 กรณีดึงข้อมูลหอพักทั้งหมด
      const dormitories = await prisma.formSell.findMany({
        select: {
          id: true,
          nameDormitory: true,
          typeDormitory: true,
          addressDormitory: true,
          dormitoryDetails: true,
          facilities: true,
          roomNumber: true,
          distanceDormitory: true,
          roomDeposit: true,
          priceMonth: true,
          priceElectricity: true,
          priceWater: true,
          priceWifi: true,
          priceOther: true,
          photoDormitory: true,
        },
      });

      if (!dormitories || dormitories.length === 0) {
        return NextResponse.json(
          { success: false, message: '❌ ไม่พบข้อมูลหอพัก' },
          { status: 404 }
        );
      }

      return NextResponse.json({ success: true, dormitories }, { status: 200 });
    }
  } catch (error) {
    console.error('⚠️ เกิดข้อผิดพลาดในการดึงข้อมูล:', error);
    return NextResponse.json(
      { success: false, message: '🚨 ข้อผิดพลาดในเซิร์ฟเวอร์' },
      { status: 500 }
    );
  }
}
