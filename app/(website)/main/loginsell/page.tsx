"use client";

import Navaiffiliate from "@/components/Navaiffiliate";
import { useState } from "react";

export default function LoginSell() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  // ฟังก์ชันสำหรับจัดการการเปลี่ยนแปลงในช่อง input
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // ฟังก์ชันตรวจสอบข้อมูลก่อน Login
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.email.trim()) newErrors.email = "กรุณากรอกอีเมล";
    else if (!/^\S+@\S+\.\S+$/.test(formData.email))
      newErrors.email = "รูปแบบอีเมลไม่ถูกต้อง";

    if (!formData.password.trim()) newErrors.password = "กรุณากรอกรหัสผ่าน";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ฟังก์ชันเมื่อกดปุ่ม Login
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const response = await fetch("/api/loginsell", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include", // ให้ browser ส่ง cookie ไปด้วย
      });

      const data = await response.json();

      if (!response.ok) {
        setErrors({ general: data.message || "เกิดข้อผิดพลาด" });
        return;
      }

      alert("🎉 เข้าสู่ระบบสำเร็จ!");
      window.location.href = "/main/homesell"; // เปลี่ยนเส้นทางไปยังหน้าหลักหลังล็อกอิน
    } catch (error) {
      console.error("Login error:", error);
      setErrors({ general: "เกิดข้อผิดพลาดในการเชื่อมต่อเซิร์ฟเวอร์" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navaiffiliate />

      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
            Login Affiliate
          </h2>
          {errors.general && (
            <p className="text-red-500 text-sm text-center mb-4">{errors.general}</p>
          )}
          <form onSubmit={handleSubmit}>
            {/* Email Input */}
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
                required
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}
            </div>

            {/* Password Input */}
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter your password"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
                required
              />
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password}</p>
              )}
            </div>

            {/* Links */}
            <div className="flex items-center justify-between mb-4">
              <a href="#" className="text-sm text-pink-500 hover:underline">
                Forgot Password?
              </a>
              <a href="registersell" className="text-sm text-pink-500 hover:underline">
                Create an Account
              </a>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 px-4 rounded-md text-white ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-500 hover:bg-pink-600 transition"
              }`}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
