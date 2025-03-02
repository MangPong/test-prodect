"use client";

import { useState } from "react";
import NavReg from "@/components/NavReg";
import Link from "next/link";

export default function Register() {
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    accept: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.userName.trim()) newErrors.userName = "กรุณากรอกชื่อผู้ใช้";
    if (!formData.email.trim()) newErrors.email = "กรุณากรอกอีเมล";
    else if (!/^\S+@\S+\.\S+$/.test(formData.email))
      newErrors.email = "รูปแบบอีเมลไม่ถูกต้อง";
    if (!formData.phone.trim()) newErrors.phone = "กรุณากรอกเบอร์โทรศัพท์";
    else if (!/^\d{10}$/.test(formData.phone))
      newErrors.phone = "เบอร์โทรศัพท์ต้องมี 10 หลัก";
    if (!formData.password.trim()) newErrors.password = "กรุณากรอกรหัสผ่าน";
    else if (formData.password.length < 6)
      newErrors.password = "รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "รหัสผ่านไม่ตรงกัน";
    if (!formData.accept) newErrors.accept = "กรุณายอมรับเงื่อนไข";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName: formData.userName,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert(errorData.message || "เกิดข้อผิดพลาดจากเซิร์ฟเวอร์");
        return;
      }

      const data = await response.json();
      alert(data.message);

      setFormData({
        userName: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
        accept: false,
      });
      setErrors({});
    } catch (error) {
      console.error("Error during submission:", error);
      alert("เกิดข้อผิดพลาดในการส่งคำขอ");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <NavReg />
      <div className="flex items-center justify-center min-h-screen bg-green-200">
        <form
          className="bg-white p-8 rounded-lg shadow-md w-96"
          onSubmit={handleSubmit}
        >
          <h2 className="text-2xl font-bold text-center text-black mb-6">
            ลงทะเบียน
          </h2>

          <div className="mb-4">
            <input
              type="text"
              name="userName"
              placeholder="ชื่อผู้ใช้"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              value={formData.userName}
              onChange={handleInputChange}
            />
            {errors.userName && (
              <p className="text-red-500 text-sm">{errors.userName}</p>
            )}
          </div>

          <div className="mb-4">
            <input
              type="email"
              name="email"
              placeholder="อีเมล"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              value={formData.email}
              onChange={handleInputChange}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>

          <div className="mb-4">
            <input
              type="tel"
              name="phone"
              placeholder="เบอร์โทรศัพท์"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              value={formData.phone}
              onChange={handleInputChange}
            />
            {errors.phone && (
              <p className="text-red-500 text-sm">{errors.phone}</p>
            )}
          </div>

          <div className="mb-4">
            <input
              type="password"
              name="password"
              placeholder="รหัสผ่าน"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              value={formData.password}
              onChange={handleInputChange}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}
          </div>

          <div className="mb-4">
            <input
              type="password"
              name="confirmPassword"
              placeholder="ยืนยันรหัสผ่าน"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              value={formData.confirmPassword}
              onChange={handleInputChange}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
            )}
          </div>

          <div className="flex items-center mb-6">
            <input
              type="checkbox"
              name="accept"
              id="accept"
              className="mr-2"
              checked={formData.accept}
              onChange={handleInputChange}
            />
            <label htmlFor="accept" className="text-gray-700">
              ยอมรับเงื่อนไข
            </label>
            {errors.accept && (
              <p className="text-red-500 text-sm ml-2">{errors.accept}</p>
            )}
          </div>

          
          <div>
            <button
              type="submit"
              className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300"
              disabled={loading}
            >
              {loading ? "กำลังดำเนินการ..." : "ลงทะเบียน"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
