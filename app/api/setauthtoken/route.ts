import { NextApiRequest, NextApiResponse } from 'next';
import { serialize } from 'cookie';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { token } = req.body;
  if (!token) {
    return res.status(400).json({ error: 'Missing Token' });
  }

  res.setHeader(
    'Set-Cookie',
    serialize('authToken', token, {
      path: '/',
      httpOnly: false, // ✅ ให้ Client อ่านได้
      secure: process.env.NODE_ENV === 'production', // ✅ ใช้ secure mode บน Production
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7, // 7 วัน
    })
  );

  res.status(200).json({ message: 'Token Set' });
}
