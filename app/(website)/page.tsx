import Navbar from '@/components/Navbar';
import Link from 'next/link';
import React from 'react';

// Card Component
const Card = ({
  mainImage,
  secondaryImages,
  nameDormitory,
  typeDormitory,
  distanceDormitory,
  priceMonth,
  roomDeposit,
  priceElectricity,
}) => {
  return (
    
    <Link href="/main/login">
      <div className="border rounded-lg shadow-md p-4 flex w-full hover:bg-gray-100 transition duration-200 cursor-pointer mb-6">
        {/* Main and Secondary Images */}
        <div className="flex w-1/3">
          {/* Main Image */}
          <div className="flex flex-col items-center w-2/3 border border-gray-300 rounded-lg p-2">
            <img
              src={mainImage}
              alt="Main Dormitory"
              className="w-full h-48 object-cover rounded-lg"
            />
            <p className="text-center text-sm mt-2">ตำแหน่งที่ 1</p>
          </div>

          {/* Secondary Images */}
          <div className="flex flex-col w-1/3 space-y-2 pl-4">
            {secondaryImages.map((image, index) => (
              <div
                key={index}
                className="border border-gray-300 rounded-lg p-2 flex flex-col items-center"
              >
                <img
                  src={image}
                  alt={`Secondary ${index + 1}`}
                  className="w-full h-24 object-cover rounded-lg"
                />
                <p className="text-center text-sm mt-2">
                  ตำแหน่งที่ {index + 2}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Content Section */}
        <div className="flex-1 ml-6 flex flex-col justify-between">
          {/* Details */}
          <div>
            <h3 className="text-lg font-bold mb-2">
              ชื่อหอพัก: {nameDormitory}
            </h3>
            <p className="text-sm text-gray-600 mb-2">
              ประเภทหอพัก: {typeDormitory}
            </p>
            <p className="text-sm text-gray-600 mb-4">
              ห่างจากมหาวิทยาลัย: {distanceDormitory}
            </p>

            <div className="text-sm text-gray-700 space-y-2">
              <p>ค่าเช่าห้องต่อเดือน: {priceMonth}฿</p>
              <p>ค่ามัดจำล่วงหน้า: {roomDeposit}฿</p>
              <p>ค่าไฟฟ้าต่อหน่วย: {priceElectricity}฿</p>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col items-end space-y-2 mt-6">
            <button className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg shadow w-40">
              รายละเอียด
            </button>
            <button className="bg-gray-400 text-white px-6 py-3 rounded-lg shadow w-40">
              จองหอพัก
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

// Home Component
export default function Main() {
  return (
    <>
   <Navbar/>
      {/* Content */}
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">รายการหอพัก</h1>

        {/* Card Component Example */}
        <Card
          mainImage="/main-dormitory.jpg"
          secondaryImages={["/secondary1.jpg", "/secondary2.jpg"]}
          nameDormitory="หอพักตัวอย่าง"
          typeDormitory="คอนโด"
          distanceDormitory="800 เมตร"
          priceMonth={5500}
          roomDeposit={5000}
          priceElectricity={20}
        />

        <Card
          mainImage="/main-dormitory.jpg"
          secondaryImages={["/secondary1.jpg", "/secondary2.jpg"]}
          nameDormitory="หอพักที่ 2"
          typeDormitory="คอนโด"
          distanceDormitory="1800 เมตร"
          priceMonth={5500}
          roomDeposit={5000}
          priceElectricity={20}
        />
      </div>
    </>
  );
}
