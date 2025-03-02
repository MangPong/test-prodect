'use client'
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NavReg() {
  const router = useRouter(); // ✅ เรียกใช้ useRouter() ในคอมโพเนนต์
  return (
    <nav className="bg-pink-200 border-gray-200">
      <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
        {/* รูปภาพอยู่ด้านซ้าย */}
        <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img
            src="/five-stars.png"
            alt="Five Stars"
            className="w-10 h-12 object-contain"
          />
        </Link>

        {/* ข้อความ Register อยู่ตรงกลาง */}
        <div className="flex-grow flex justify-center">
          <Link href="/" className="self-center text-2xl font-semibold whitespace-nowrap dark:text-black">
          Confirmprofilesell
          </Link>
        </div>

          {/* ปุ่มย้อนกลับอยู่ด้านขวา */}
          <button
          onClick={() => router.push("/main/homesell")}
          className="bg-gradient-to-r from-gray-600 to-gray-800 text-white px-6 py-2 rounded-xl shadow-lg hover:from-gray-500 hover:to-gray-700 hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95"
        >
          Go Back
        </button>
      </div>
    </nav>
  );
}
