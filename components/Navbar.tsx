'use client';

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null); // ใช้เก็บเมนูที่เปิดอยู่

  const toggleMenu = (menu: string) => {
    setActiveMenu(activeMenu === menu ? null : menu); // สลับสถานะการเปิด/ปิดเมนู
  };

  return (
    <nav className="bg-pink-200 border-gray-200 ">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
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
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-pink-200 ">
            <li>
              <a
                href="/main/about"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-red-500 md:p-0 dark:text-black md:dark:hover:text-red-500  dark:hover:text-white md:dark:hover:bg-transparent"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-red-500 md:p-0 dark:text-black md:dark:hover:text-red-500  dark:hover:text-white md:dark:hover:bg-transparent"
              >
                Services
              </a>
            </li>

            {/* From Menu */}
            <li className="relative">
              <button
                onClick={() => toggleMenu("from")}
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-red-500 md:p-0 dark:text-black md:dark:hover:text-red-500 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                From
              </button>
              {activeMenu === "from" && (
                <ul className="absolute top-full left-0 bg-white border rounded shadow-lg w-48 mt-2 z-10">
                  <li>
                    <a
                      href="/main/fromsell"
                      className="block py-2 px-3 text-gray-800 hover:bg-gray-100"
                    >
                      From for sell
                    </a>
                  </li>
                </ul>
              )}
            </li>

            {/* Login Menu */}
            <li className="relative">
              <button
                onClick={() => toggleMenu("login")}
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-red-500 md:p-0 dark:text-black md:dark:hover:text-red-500 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                Login
              </button>
              {activeMenu === "login" && (
                <ul className="absolute top-full left-0 bg-white border rounded shadow-lg w-48 mt-2 z-10">
                  <li>
                    <a
                      href="/main/login"
                      className="block py-2 px-3 text-gray-800 hover:bg-gray-100"
                    >
                      Login
                    </a>
                  </li>
                  <li>
                    <a
                      href="/main/loginsell"
                      className="block py-2 px-3 text-gray-800 hover:bg-gray-100"
                    >
                      Login sell
                    </a>
                  </li>
                </ul>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
