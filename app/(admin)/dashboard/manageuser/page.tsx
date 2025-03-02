"use client";  // เพิ่มบรรทัดนี้เพื่อให้ไฟล์นี้ทำงานใน Client-Side

import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";

export default function ManageUser() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true); // สถานะการโหลด
  const [error, setError] = useState(null); // สถานะข้อผิดพลาด

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null); // เคลียร์ข้อผิดพลาดก่อน
    try {
      const response = await axios.get("/api/dashboard");
      console.log(response.data); // ตรวจสอบข้อมูลที่ได้
      if (response.data && Array.isArray(response.data.users)) {
        setUsers(response.data.users);
      } else {
        console.error("Expected an array but got:", response.data);
        setUsers([]);
      }
    } catch (error) {
      console.error("Failed to fetch users:", error);
      setError("ไม่สามารถดึงข้อมูลผู้ใช้ได้");
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (userId) => {
    try {
      await axios.delete(`/api/users/${userId}`);
      alert("ลบผู้ใช้สำเร็จ");
      fetchUsers(); // รีเฟรชข้อมูล
    } catch (error) {
      console.error("Failed to delete user:", error);
    }
  };

  const deleteAllUsers = async () => {
    if (confirm("คุณแน่ใจหรือไม่ว่าต้องการลบผู้ใช้ทั้งหมด?")) {
      try {
        await axios.delete("/api/users");
        alert("ลบผู้ใช้ทั้งหมดสำเร็จ");
        fetchUsers(); // รีเฟรชข้อมูล
      } catch (error) {
        console.error("Failed to delete all users:", error);
      }
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
  
    // ตรวจสอบว่า date ที่ได้สามารถแปลงเป็นวันที่ที่ถูกต้องหรือไม่
    if (isNaN(date)) {
      return "ไม่ทราบวันที่"; // กรณีที่ไม่สามารถแปลงเป็นวันที่ได้
    }
  
    return new Intl.DateTimeFormat("th-TH").format(date); // ฟอร์แมตวันที่
  };
  

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-5">Manage Users</h1>
      <div className="flex justify-end mb-5">
        <button
          onClick={deleteAllUsers}
          className="bg-red-500 text-white px-4 py-2 rounded mr-3"
        >
          ลบผู้ใช้ทั้งหมด
        </button>
        <Link href="/dashboard">
          <button className="bg-green-500 text-white px-4 py-2 rounded mr-3">
            กลับ Dashbord
          </button>
        </Link>
        <button
          onClick={fetchUsers}
          className="bg-blue-500 text-white px-4 py-2 rounded "
        >
          รีเฟรช
        </button>
      </div>

      {loading ? (
        <div className="text-center py-4">กำลังโหลด...</div> // ข้อความโหลด
      ) : error ? (
        <div className="text-center text-red-500">{error}</div> // ข้อความข้อผิดพลาด
      ) : (
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2 text-center align-middle">ID</th>
              <th className="border border-gray-300 px-4 py-2 text-center align-middle">ชื่อผู้ใช้</th>
              <th className="border border-gray-300 px-4 py-2 text-center align-middle">อีเมล</th>
              <th className="border border-gray-300 px-4 py-2 text-center align-middle">วันที่สมัคร</th>
              <th className="border border-gray-300 px-4 py-2 text-center align-middle">การกระทำ</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(users) && users.length > 0 ? (
              users.map((user) => (
                <tr key={user.id}>
                  <td className="border border-gray-300 px-4 py-2 text-center align-middle">{user.id}</td>
                  <td className="border border-gray-300 px-4 py-2 text-center align-middle">{user.username}</td>
                  <td className="border border-gray-300 px-4 py-2 text-center align-middle">{user.email}</td>
                  <td className="border border-gray-300 px-4 py-2 text-center align-middle">{formatDate(user.createdAt)}</td> {/* แสดงวันที่ */}
                  <td className="border border-gray-300 px-4 py-2 text-center align-middle">
                    <div className="flex justify-center items-center">
                      <button
                        onClick={() => deleteUser(user.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded"
                      >
                        ลบ
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="border border-gray-300 px-4 py-2 text-center">
                  ไม่มีข้อมูลผู้ใช้
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}
