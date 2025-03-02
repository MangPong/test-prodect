"use client";

import { useState } from "react";
import Navlogin from "@/components/Navlogin";
import Link from "next/link";

export default function Login() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const newErrors: any = {};
    if (!formData.username) {
      newErrors.username = "กรุณากรอกชื่อผู้ใช้";
    }
    if (!formData.password) {
      newErrors.password = "กรุณากรอกรหัสผ่าน";
    } else if (formData.password.length < 6) {
      newErrors.password = "รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await fetch("/api/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: formData.username,
            password: formData.password,
          }),
        });
  
        const data = await response.json();
        if (data.success) {
          // ✅ เก็บ Token ลง LocalStorage
          localStorage.setItem("token", data.token);
  
          alert(data.message);
          window.location.href = "/main/home"; // Redirect
        } else {
          alert(data.message);
        }
      } catch (error) {
        alert("เกิดข้อผิดพลาดในการเข้าสู่ระบบ");
      }
    }
  };
  

  return (
    <>
      <Navlogin />

      {/* Login Form */}
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
            Login
          </h2>
          <form onSubmit={handleSubmit}>
            {/* Username Field */}
            <div className="mb-4">
              <label
                htmlFor="username"
                className="block text-gray-700 font-medium mb-2"
              >
                User
              </label>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Enter your Username"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                value={formData.username}
                onChange={handleInputChange}
              />
              {errors.username && (
                <p className="text-red-500 text-sm mt-1">{errors.username}</p>
              )}
            </div>

            {/* Password Field */}
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-gray-700 font-medium mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your Password"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                value={formData.password}
                onChange={handleInputChange}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            {/* Submit Button */}
            <div className="mb-4">
              <button
                type="submit"
                className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-300"
              >
                Login
              </button>
            </div>

            {/* Divider */}
            <div className="flex items-center my-3">
              <hr className="flex-grow border-gray-300" />
              <span className="mx-3 text-gray-500">Or</span>
              <hr className="flex-grow border-gray-300" />
            </div>

            {/* Button Google */}
            <div className="flex items-center justify-center mt-4">
              <button
                className="flex items-center gap-2 w-full max-w-xs py-2 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
              >
                <img src="/google.png" alt="Google Icon" className="w-5 h-5" />
                Continue with Google
              </button>
            </div>

            {/* Button Facebook */}
            <div className="flex items-center justify-center mt-4">
              <button
                className="flex items-center gap-2 w-full max-w-xs py-2 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
              >
                <img
                  src="/facebook.png"
                  alt="Facebook Icon"
                  className="w-5 h-5"
                />
                Continue with Facebook
              </button>
            </div>

            <div className="flex items-center justify-center mt-4">
              <a
                href="/main/loginsell"
                className="flex items-center gap-2 w-full max-w-xs py-2 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
              >
                <img
                  src="/five-stars.png"
                  alt="five-stars"
                  className="w-5 h-5"
                />
                Login Affiliate
              </a>
            </div>

            {/* Additional Links */}
            <div className="flex items-center justify-between mb-4 mt-4">
              <a
                href="/main/registersell"
                className="text-sm text-pink-500 hover:underline"
              >
                Apply Affiliate
              </a>
              <a
                href="/main/register"
                className="text-sm text-pink-500 hover:underline"
              >
                Create an Account
              </a>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
