import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import UserModel from '@/models/User';
import bcrypt from 'bcryptjs';

export async function POST(req: NextRequest) {
  await dbConnect();
  const { token, password } = await req.json();
  const user = await UserModel.findOne({ resetToken: token, resetTokenExpiry: { $gt: new Date() } });
  if (!user) return NextResponse.json({ message: 'Invalid or expired token' }, { status: 400 });
  const hashed = await bcrypt.hash(password, 12);
  await UserModel.findByIdAndUpdate(user._id, { password: hashed, resetToken: null, resetTokenExpiry: null });
  return NextResponse.json({ message: 'Password reset' });
}