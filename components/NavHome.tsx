'use client';

import Link from "next/link";
import { useState } from "react";

export default function NavHome() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null); // ใช้เก็บเมนูที่เปิดอยู่

  const toggleMenu = (menu: string) => {
    setActiveMenu(activeMenu === menu ? null : menu); // สลับสถานะการเปิด/ปิดเมนู
  };

  const handleLogout = () => {
    // ลบข้อมูล token หรือข้อมูลที่เกี่ยวข้อง
    localStorage.removeItem("token");
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"; // เคลียร์ cookie
    window.location.href = "/"; // รีไดเรกต์ไปที่หน้าแรกหลังจากออกจากระบบ
  };
  
  return (
    <nav className="bg-pink-200 border-gray-200">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link href="/main/home" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img
            src="/five-stars.png"
            alt="Five Stars"
            className="w-10 h-12 object-contain"
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-black">
            OUR PROJECT
          </span>
        </Link>
  
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-pink-200">
            <li>
              <a
                href="/main/about"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-red-500 md:p-0 dark:text-black md:dark:hover:text-red-500 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="/main/confirmprofile"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-red-500 md:p-0 dark:text-black md:dark:hover:text-red-500 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                Confirm User
              </a>
            </li>
  
            <li className="relative">
              <button
                onClick={handleLogout}
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-red-500 md:p-0 dark:text-black md:dark:hover:text-red-500 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
  
