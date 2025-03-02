"use client"; 
import Link from "next/link";
import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalLoginUsers: 0,
    totalSellers: 0,
    users: [],
    userSells: [], // เพิ่ม userSells ให้แยกต่างหาก....
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/dashboard");
        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    }

    fetchData();
  }, []);

  // กรองข้อมูลตาม role
  const users = stats.users.filter(user => user.role !== "usersell");
  const sellers = stats.userSells; // ใช้ข้อมูลที่แยกมาแล้วจาก backend

  return (
    <div className="flex min-h-screen bg-gray-100">
      <main className="flex-1 p-6">
        <header className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-800">Welcome, Admin</h2>
          <Link href="/dashboard">
            <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">
              back
            </button>
          </Link>
        </header>

        <section className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white shadow-lg rounded-lg p-4">
            <h3 className="text-lg font-bold text-gray-800">Total Users</h3>
            <p className="text-2xl text-green-500 font-bold">{stats.totalUsers}</p>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-4">
            <h3 className="text-lg font-bold text-gray-800">User</h3>
            <p className="text-2xl text-blue-500 font-bold">{stats.totalLoginUsers}</p>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-4">
            <h3 className="text-lg font-bold text-gray-800">User Seller</h3>
            <p className="text-2xl text-yellow-500 font-bold">{stats.totalSellers}</p>
          </div>
        </section>

        {/* ตารางสำหรับ User */}
        <section className="mt-6 bg-white shadow-lg rounded-lg p-4">
          <h3 className="text-lg font-bold text-gray-800 mb-4">User List</h3>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-4 py-2 text-center">ID</th>
                <th className="border border-gray-300 px-4 py-2 text-center">Name</th>
                <th className="border border-gray-300 px-4 py-2 text-center">Email</th>
                <th className="border border-gray-300 px-4 py-2 text-center">Role</th>
                <th className="border border-gray-300 px-4 py-2 text-center">Status</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-100">
                    <td className="border border-gray-300 px-4 py-2 text-center">{user.id}</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">{user.username || user.name}</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">{user.email}</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">
                      {user.role === "usersell" ? "User Seller" : user.role || "User"}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-center">
                      {user.isVerified ? (
                        <span className="text-green-500">Active</span>
                      ) : (
                        <span className="text-red-500">Inactive</span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="border border-gray-300 px-4 py-2 text-center">No users found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </section>

        {/* ตารางสำหรับ User Seller */}
        <section className="mt-6 bg-white shadow-lg rounded-lg p-4">
          <h3 className="text-lg font-bold text-gray-800 mb-4">User Seller List</h3>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-4 py-2 text-center">ID</th>
                <th className="border border-gray-300 px-4 py-2 text-center">Name</th>
                <th className="border border-gray-300 px-4 py-2 text-center">Email</th>
                <th className="border border-gray-300 px-4 py-2 text-center">Role</th>
                <th className="border border-gray-300 px-4 py-2 text-center">Status</th>
              </tr>
            </thead>
            <tbody>
              {sellers.length > 0 ? (
                sellers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-100">
                    <td className="border border-gray-300 px-4 py-2 text-center">{user.id}</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">{user.username || user.name}</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">{user.email}</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">
                      {user.role === "usersell" ? "User Seller" : user.role || "User Sellers" }
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-center">
                      {user.isVerified ? (
                        <span className="text-green-500">Active</span>
                      ) : (
                        <span className="text-red-500">Inactive</span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="border border-gray-300 px-4 py-2 text-center">No user sellers found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
}
