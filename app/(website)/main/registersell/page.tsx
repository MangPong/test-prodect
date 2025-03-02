'use client';

import NavRegsell from "@/components/Navragsell";
import Link from "next/link";
import { useState } from "react";

export default function RegisterSell() {
  const [formData, setFormData] = useState({
    userName: "", // เปลี่ยนจาก username เป็น userName
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
      const response = await fetch("/api/registersell", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "เกิดข้อผิดพลาดจากเซิร์ฟเวอร์");
        return;
      }

      alert("🎉 ลงทะเบียนสำเร็จ!");

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
    <>
      <NavRegsell />
      <div className="flex items-center justify-center min-h-screen bg-green-200">
        <form
          className="bg-white p-8 rounded-lg shadow-md w-96"
          onSubmit={handleSubmit}
        >
          <h2 className="text-2xl font-bold text-center text-black mb-6">
            Register as Seller
          </h2>

          {/* Input: User Name */}
          <div className="mb-4">
            <input
              type="text"
              name="userName" // เปลี่ยนจาก username เป็น userName
              placeholder="User Name"
              value={formData.userName}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            {errors.userName && (
              <p className="text-red-500 text-sm">{errors.userName}</p>
            )}
          </div>

          {/* Input: E-mail */}
          <div className="mb-4">
            <input
              type="email"
              name="email"
              placeholder="E-mail"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>

          {/* Input: Phone Number */}
          <div className="mb-4">
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm">{errors.phone}</p>
            )}
          </div>

          {/* Input: Password */}
          <div className="mb-4">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}
          </div>

          {/* Input: Confirm Password */}
          <div className="mb-4">
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
            )}
          </div>

          {/* Checkbox */}
          <div className="flex items-center mb-6">
            <input
              type="checkbox"
              name="accept"
              checked={formData.accept}
              onChange={handleInputChange}
              className="mr-2"
            />
            <label htmlFor="accept" className="text-gray-700">
              Accept Terms & Conditions
            </label>
            {errors.accept && (
              <p className="text-red-500 text-sm ml-2">{errors.accept}</p>
            )}
          </div>

          {/* Submit Button */}
          
          <div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-lg text-white ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-500 hover:bg-green-600 focus:ring-2 focus:ring-green-300"
              }`}
            >
              {loading ? "Loading..." : "Sign Up"}
            </button>
          </div>
          
        </form>
      </div>
    </>
  );
}