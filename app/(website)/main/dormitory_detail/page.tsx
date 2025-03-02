"use client";

import BookingButton from "@/components/BookingButton";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function DormitoryDetailPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id") ?? "1"; // 👉 หากไม่มี id จะใช้ค่า "1"

  const [dormitory, setDormitory] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDormitoryData = async () => {
      try {
        const response = await fetch(`/api/fromsell`, {
          method: "GET",
          credentials: "include",
        });
        if (!response.ok) throw new Error("ไม่สามารถดึงข้อมูลหอพักได้");

        const data = await response.json();

        if (data.success && data.dormitory) {
          setDormitory(data.dormitory);
        } else {
          setError("❌ ไม่พบข้อมูลหอพัก");
        }
      } catch (error) {
        setError("❌ เกิดข้อผิดพลาดในการดึงข้อมูล");
      } finally {
        setLoading(false);
      }
    };

    fetchDormitoryData();
  }, [id]);

  if (loading) {
    return <p className="text-center text-blue-500 text-xl mt-10">🔄 กำลังโหลดข้อมูล...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500 text-xl mt-10">{error}</p>;
  }

  return (
    <div className="container mx-auto p-6 max-w-4xl bg-white shadow-xl rounded-2xl">
      <h1 className="text-3xl font-extrabold text-gray-800 text-center mb-4">
        🏡 {dormitory.nameDormitory}
      </h1>
      <img
        src={dormitory.photoDormitory}
        alt={dormitory.nameDormitory}
        className="w-full h-80 object-cover rounded-xl shadow-lg"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div className="space-y-4">
          <p className="text-lg">📍 <strong>ที่อยู่:</strong> {dormitory.addressDormitory}</p>
          <p>💸 <strong>ค่าเช่ารายเดือน:</strong> {dormitory.priceMonth} บาท</p>
          <p>🚿 <strong>ค่าน้ำ:</strong> {dormitory.priceWater}</p>
          <p>⚡ <strong>ค่าไฟ:</strong> {dormitory.priceElectricity}</p>
          <p>💰 <strong>เงินมัดจำ:</strong> {dormitory.roomDeposit}</p>
          <p>📝 <strong>รายละเอียด:</strong> {dormitory.dormitoryDetails}</p>
        </div>
      </div>
      <div className="flex justify-between items-center mt-8">
        <BookingButton dormitoryName={dormitory.nameDormitory} />
        <a
          href="/main/home"
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-8 py-3 rounded-2xl shadow text-lg transition-transform transform hover:scale-105"
        >
          🔙 กลับหน้าหลัก
        </a>
      </div>
    </div>
  );
}
