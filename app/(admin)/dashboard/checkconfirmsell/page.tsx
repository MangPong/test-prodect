'use client';

import React from 'react';

export default function CheckConfirmSell() {

  const sellers = [
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "081-234-5678",
      product: "Smartphone X",
      status: "Pending",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      phone: "081-987-6543",
      product: "Laptop Pro",
      status: "Pending",
    },
  ];

  const handleApprove = (id: number) => {
    alert(`Approved seller with ID: ${id}`);
    // เพิ่มโค้ดสำหรับยืนยันการอนุมัติ
  };

  const handleReject = (id: number) => {
    alert(`Rejected seller with ID: ${id}`);
    // เพิ่มโค้ดสำหรับปฏิเสธการอนุมัติ
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <header className="flex justify-between items-center bg-white p-4 shadow-md rounded-lg">
        <h1 className="text-xl font-bold text-gray-800">CheckConfirmSell (ตรวจสอบผู้ขาย)</h1>
        <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">
          Logout
        </button>
      </header>

      {/* Main Content */}
      <main className="mt-6">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-bold text-gray-800 mb-4">ผู้ขายที่รอการตรวจสอบ</h2>
          <div className="overflow-x-auto">
            <table className="table-auto w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-200">
                  <th className="px-4 py-2 border">#</th>
                  <th className="px-4 py-2 border">ชื่อผู้ขาย</th>
                  <th className="px-4 py-2 border">อีเมล</th>
                  <th className="px-4 py-2 border">หมายเลขโทรศัพท์</th>
                  <th className="px-4 py-2 border">สินค้าที่ขาย</th>
                  <th className="px-4 py-2 border">สถานะ</th>
                  <th className="px-4 py-2 border">การดำเนินการ</th>
                </tr>
              </thead>
              <tbody>
                {sellers.map((seller, index) => (
                  <tr key={seller.id} className="hover:bg-gray-100">
                    <td className="px-4 py-2 border">{index + 1}</td>
                    <td className="px-4 py-2 border">{seller.name}</td>
                    <td className="px-4 py-2 border">{seller.email}</td>
                    <td className="px-4 py-2 border">{seller.phone}</td>
                    <td className="px-4 py-2 border">{seller.product}</td>
                    <td className="px-4 py-2 border">
                      <span className="bg-yellow-200 text-yellow-700 px-2 py-1 rounded-lg">
                        {seller.status}
                      </span>
                    </td>
                    <td className="px-4 py-2 border">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleApprove(seller.id)}
                          className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600"
                        >
                          อนุมัติ
                        </button>
                        <button
                          onClick={() => handleReject(seller.id)}
                          className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
                        >
                          ปฏิเสธ
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
