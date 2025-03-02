"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface Room {
  roomNumber: string;
  isAvailable: boolean;
}

export default function BookDormitory() {
  const [firstName, setFirstName] = useState<string>("ไม่มีข้อมูล");
  const [lastName, setLastName] = useState<string>("ไม่มีข้อมูล");
  const [phoneNumber, setPhoneNumber] = useState<string>("ไม่มีข้อมูล");
  const [email, setEmail] = useState<string>("ไม่มีข้อมูล");
  const [error, setError] = useState<string>("");
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [isRoomAvailable, setIsRoomAvailable] = useState<boolean | undefined>(undefined);
  const [isChecking, setIsChecking] = useState(false);

  const dormitory = {
    nameDormitory: "🌿 หอพักสวนสวย",
    photoDormitory: "https://via.placeholder.com/800x400?text=รูปหอพัก",
    addressDormitory: "123 ถนนสุขุมวิท, กรุงเทพฯ",
    priceOther:"ไม่มี",
    priceWater: "100บาทเหมาจ่าย",
    priceElectricity: "9บาทต่อหน่วย",
    roomDeposit: "5ล้านบาท",
    dormitoryDetails: "หึ",
    priceMonth: 5000,
  };

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phoneNumber: "",
    address: "",
    accountNumber: "",
    contactInfo: "",
    phoneRelationship: "",
    relationship: "",
    checkInDate: "",
    specialRequest: "",
  });

   useEffect(() => {
      const fetchUserData = async () => {
        try {
          const response = await fetch("/api/fromsell", {
            method: "GET",
            credentials: "include",
          });
  
          if (!response.ok) {
            throw new Error("Failed to fetch user data");
          }
  
          const data = await response.json();
  
          if (data.success) {
            const user = data.user;
            setUserId(user.userId || null);
            setTitle(user.title || "ไม่มีข้อมูล");
            setFirstName(user.firstName || "ไม่มีข้อมูล");
            setLastName(user.lastName || "ไม่มีข้อมูล");
            setPhoneNumber(user.phoneNumber || "ไม่มีข้อมูล");
            setEmail(user.email || "ไม่มีข้อมูล");
          } else {
            setError("Error fetching user: " + data.message);
          }
        } catch (error) {
          setError("Error fetching user data");
        }
      };
  
      fetchUserData();
    }, []);
  

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectRoom = (roomNumber: string) => {
    setSelectedRoom((prev) => (prev === roomNumber ? null : roomNumber));
  };

  const handleCheckAvailability = () => {
    setIsChecking(true);
    const mockRooms: Room[] = Array.from({ length: 8 }, (_, i) => ({
      roomNumber: `ห้อง ${i + 1}`,
      isAvailable: Math.random() > 0.5,
    }));

    setTimeout(() => {
      setRooms(mockRooms);
      const available = mockRooms.some((room) => room.isAvailable);
      setIsRoomAvailable(available);
      setIsChecking(false);
    }, 1000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isRoomAvailable) {
      alert("❌ ขอโทษค่ะ ไม่มีห้องว่าง กรุณาลองเลือกวันใหม่");
      return;
    }
    alert(`✅ การจองสำเร็จ! ขอบคุณ ${formData.firstname} ที่จองหอพักกับเรา!`);
  };

  return (
    <div className="container mx-auto p-6 max-w-3xl bg-white shadow-2xl rounded-3xl">
      <h1 className="text-4xl font-extrabold text-gray-800 text-center mb-6">
        จองหอพัก
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-lg font-semibold mb-2">👤 ชื่อ-นามสกุล</label>
          <input
            type="text"
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
            placeholder="กรอกชื่อ"
            required
            className="w-full px-4 py-3 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>

        <div>
          <label className="block text-lg font-semibold mb-2">👤 นามสกุล</label>
          <input
            type="text"
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
            placeholder="นามสกุล"
            required
            className="w-full px-4 py-3 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>

        <div>
          <label className="block text-lg font-semibold mb-2">👤 email </label>
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="email"
            required
            className="w-full px-4 py-3 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>

        <div>
          <label className="block text-lg font-semibold mb-2">📞 เบอร์โทรศัพท์</label>
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            placeholder="กรอกเบอร์โทรศัพท์"
            required
            className="w-full px-4 py-3 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>

        <div>
          <label className="block text-lg font-semibold mb-2">👤 ที่อยู่ </label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="ที่อยู่"
            required
            className="w-full px-4 py-3 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>

        <div>
          <label className="block text-lg font-semibold mb-2">หมายเลขบัญชี </label>
          <input
            type="text"
            name="accountNumber"
            value={formData.accountNumber}
            onChange={handleChange}
            placeholder="หมายเลขบัญชี"
            required
            className="w-full px-4 py-3 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>

        <div>
          <label className="block text-lg font-semibold mb-2"> Facebook / Line </label>
          <input
            type="text"
            name="contactInfo"
            value={formData.contactInfo}
            onChange={handleChange}
            placeholder="Facebook / Line"
            required
            className="w-full px-4 py-3 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>

        <div>
          <label className="block text-lg font-semibold mb-2"> เบอร์โทรผู้ติดต่อ </label>
          <input
            type="text"
            name="phoneRelationship"
            value={formData.phoneRelationship}
            onChange={handleChange}
            placeholder="เบอร์โทรผู้ติดต่อ"
            required
            className="w-full px-4 py-3 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>

        <div>
          <label className="block text-lg font-semibold mb-2"> ความสัมพันธ์ </label>
          <input
            type="text"
            name="relationship"
            value={formData.relationship}
            onChange={handleChange}
            placeholder="ความสัมพันธ์"
            required
            className="w-full px-4 py-3 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>

        <div>
          <label className="block text-lg font-semibold mb-2">📅 วันที่เข้าพัก</label>
          <div className="flex space-x-4 items-center">
            <input
              type="date"
              name="checkInDate"
              value={formData.checkInDate}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            <button
              type="button"
              onClick={handleCheckAvailability}
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-2xl shadow-lg transition-transform transform hover:scale-105"
              disabled={isChecking}
            >
              {isChecking ? "⏳ กำลังตรวจสอบ..." : "🔍 ตรวจสอบห้องว่าง"}
            </button>
          </div>

          {rooms.length > 0 && (
            <div className="mt-4">
              <h2 className="text-lg font-semibold mb-2">📋 เลือกห้องพัก (เลือกได้เพียง 1 ห้อง)</h2>
              {rooms.map((room) => (
                <div key={room.roomNumber} className="flex justify-between items-center p-3 bg-gray-100 rounded-2xl">
                  <p>{room.roomNumber}</p>
                  <p className={room.isAvailable ? "text-green-500" : "text-red-500"}>
                    {room.isAvailable ? "✅ ว่าง" : "❌ ไม่ว่าง"}
                  </p>
                  <button
                    disabled={!room.isAvailable || (selectedRoom && selectedRoom !== room.roomNumber)}
                    onClick={() => handleSelectRoom(room.roomNumber)}
                    className={`${
                      selectedRoom === room.roomNumber
                        ? "bg-green-600"
                        : "bg-blue-500 hover:bg-blue-600"
                    } text-white px-4 py-2 rounded-2xl`}
                  >
                    {selectedRoom === room.roomNumber ? "✅ เลือกแล้ว" : "เลือกห้องนี้"}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
        <h2 className="text-lg font-semibold mb-2">📋รายละเอียดหอพัก</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div className="space-y-4">
          <p className="text-lg">
            📍 <strong>ที่อยู่:</strong> {dormitory.addressDormitory}
          </p>
          <p>💸 <strong>ค่าเช่ารายเดือน:</strong> {dormitory.priceMonth} บาท</p>
          <p>🚿 <strong>ค่าน้ำ:</strong> {dormitory.priceWater} บาท</p>
          <p>⚡ <strong>ค่าไฟ:</strong> {dormitory.priceElectricity} บาท</p>
          <p>💰 <strong>เงินมัดจำ:</strong> {dormitory.roomDeposit} บาท</p>
          <p>📝 <strong>รายละเอียด:</strong> {dormitory.dormitoryDetails}</p>
        </div>
      </div>
      </div>

        <div className="flex justify-between items-center mt-8">
          <button
            type="submit"
            disabled={isRoomAvailable === false}
            className={`$${
              isRoomAvailable === false
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-500 hover:bg-green-600"
            } text-white px-10 py-4 rounded-2xl shadow-xl text-lg transition-transform transform hover:scale-105`}
          >
            🚀 ยืนยันการจอง
          </button>
          <Link href="/main/home">
            <button
              type="button"
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-10 py-4 rounded-2xl shadow-lg text-lg transition-transform transform hover:scale-105"
            >
              🔙 กลับหน้าหลัก
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
}
