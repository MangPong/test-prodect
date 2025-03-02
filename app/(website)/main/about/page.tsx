'use client';
import Link from 'next/link';
import Image from 'next/image';
import Navabout from "@/components/Navabout";

export default function Footer() {
  return (
    <>
      <Navabout />

      <div className="bg-green-100 py-12"> {/* เปลี่ยนพื้นหลังเป็นสีเขียว */}
        <div className="container mx-auto px-6">
          {/* Header */}
          <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-8">เกี่ยวกับเรา</h1>
          
          {/* Content Section */}
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-8 md:space-y-0 md:space-x-12">
            {/* Image Section */}
            <div className="w-full md:w-1/2">
              <Image
                src="/five-stars.png"
                alt="เกี่ยวกับเรา"
                width={300}
                height={300}
                className="rounded-lg shadow-lg"
              />
            </div>

            {/* Text Section */}
            <div className="bg-white w-full p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
              <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                เราคือเว็บไซต์ที่ให้บริการหอพักสำหรับนักศึกษาและบุคคลทั่วไป โดยมีเป้าหมายในการช่วยเหลือในการค้นหาหอพักที่เหมาะสมในทำเลที่ต้องการ
                เราได้คัดสรรหอพักที่มีคุณภาพและราคาย่อมเยาเพื่อให้การอยู่อาศัยสะดวกสบายมากที่สุด
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                เรามีการแสดงข้อมูลอย่างครบถ้วนเกี่ยวกับหอพัก ทั้งราคาห้องพัก ความสะดวกสบาย รวมถึงบริการต่าง ๆ ที่เกี่ยวข้อง
                เรามุ่งมั่นที่จะให้บริการที่ดีที่สุดสำหรับลูกค้าของเรา
              </p>
            </div>
          </div>

          {/* Social Links Section */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Social Links</h2>
            <div className="flex flex-col items-center space-y-4 bg-orange-950 text-orange-400 border border-orange-400 border-b-4 font-medium overflow-hidden relative px-4 py-2 rounded-md hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group">
              {/* Facebook Link */}
              <a
                href="https://www.facebook.com/groups/2570611999755863"
                className="flex items-center gap-3 w-full max-w-xs py-3 px-5 border border-gray-300 rounded-lg shadow-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <img src="/Facebook.png" alt="Facebook Icon" className="w-6 h-6" />
                Facebook
              </a>
              
              {/* Instagram Link */}
              <a
                href="https://www.instagram.com/"
                className="flex items-center gap-3 w-full max-w-xs py-3 px-5 border border-gray-300 rounded-lg shadow-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <img src="/instargram.jpeg" alt="Instagram Icon" className="w-8 h-8" />
                Instagram
              </a>
              
              {/* Github Link */}
              <a
                href="https://github.com/fChirawat/Project_nextjs_bookdormitory/tree/Arm"
                className="flex items-center gap-3 w-full max-w-xs py-3 px-5 border border-gray-300 rounded-lg shadow-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <img src="/github.jpeg" alt="Github Icon" className="w-6 h-6" />
                Github
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
