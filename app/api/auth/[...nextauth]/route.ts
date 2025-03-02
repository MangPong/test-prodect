import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs"; // ใช้ bcrypt สำหรับการตรวจสอบรหัสผ่าน

const prisma = new PrismaClient();

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // ตรวจสอบว่า credentials ถูกต้องหรือไม่
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // ตรวจสอบในฐานข้อมูลว่าอีเมลมีหรือไม่
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user) {
          return null; // ไม่มีผู้ใช้
        }

        // ตรวจสอบรหัสผ่านด้วย bcrypt
        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password // ค่ารหัสผ่านที่เก็บในฐานข้อมูล
        );

        if (!isPasswordValid) {
          return null; // รหัสผ่านไม่ถูกต้อง
        }

        // ถ้าผ่านการตรวจสอบทั้งหมด ให้คืนข้อมูลผู้ใช้
        return {
          id: user.id,
          email: user.email,
          name: user.name,
        };
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin", // หน้าเข้าสู่ระบบที่ต้องการ
  },
  session: {
    strategy: "jwt", // ใช้ JWT ในการจัดการ session
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
