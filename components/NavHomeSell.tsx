'use client';

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NavHomeSell() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const router = useRouter();

  // Logout function
  const handleLogout = async () => {
    try {
      const response = await fetch("/api/loginsell", {
        method: "DELETE",
      });

      if (response.ok) {
        router.push("/"); // Redirect to homepage after logout
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <nav className="bg-pink-200 border-gray-200 ">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link href="/main/homesell" className="flex items-center space-x-3 rtl:space-x-reverse">
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
              <Link
                href="/main/about"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-red-500 md:p-0 dark:text-black md:dark:hover:text-red-500 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="/main/confirmprofilesell"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-red-500 md:p-0 dark:text-black md:dark:hover:text-red-500 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                Profile
              </Link>
            </li>
            <li>
              <Link
                href="/main/fromsell"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-red-500 md:p-0 dark:text-black md:dark:hover:text-red-500 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                formsell
              </Link>
            </li>

            {/* Logout Button */}
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
}
