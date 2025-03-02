"use client";

import Link from "next/link";
import { useState } from "react";

export default function Profile() {
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-green-100 flex items-center justify-center">
        <form className="bg-white shadow-lg rounded-xl w-full max-w-md p-6">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
            แก้ไขโปรไฟล์
          </h2>

          {/* Profile Image */}
          <div className="flex flex-col items-center mb-6">
            <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-green-500 relative">
              <input
                type="file"
                className="absolute inset-0 opacity-0 cursor-pointer"
                onChange={handleImageUpload}
              />
              {profileImage ? (
                <img
                  src={profileImage}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400">
                  อัปโหลดรูป
                </div>
              )}
            </div>
            <p className="text-sm text-gray-500 mt-2">เปลี่ยนรูปโปรไฟล์</p>
          </div>

          {/* User Details */}
          <div className="space-y-4">
            {/* Input: User Name */}
            <input
              type="text"
              placeholder="ชื่อผู้ใช้"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500"
            />

            {/* Input: First Name */}
            <input
              type="text"
              placeholder="ชื่อจริง"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500"
            />

            {/* Input: Last Name */}
            <input
              type="text"
              placeholder="นามสกุล"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500"
            />

            {/* Input: Address */}
            <textarea
              placeholder="ที่อยู่"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 resize-none"
              rows={3}
            ></textarea>

            {/* Input: Phone */}
            <input
              type="tel"
              placeholder="เบอร์โทร"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500"
            />

            {/* Input: Email */}
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500"
            />

            {/* Input: Photo ID Card */}
            <div>
              <label className="block text-gray-700 mb-1">รูปบัตรประชาชน</label>
              <input
                type="file"
                accept="image/*"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Input: Relationship */}
            <input
              type="text"
              placeholder="ผู้ปกครอง (เช่น พ่อ, แม่)"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500"
            />

            {/* Input: Phone Relationship */}
            <input
              type="tel"
              placeholder="เบอร์โทรผู้ปกครอง"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Submit Button */}
          <div className="mt-6">
            <Link href="/">
              <button
                type="button"
                className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 focus:ring-2 focus:ring-green-300"
              >
                บันทึกการเปลี่ยนแปลง
              </button>
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}
