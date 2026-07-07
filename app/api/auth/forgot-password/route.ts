import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import UserModel from '@/models/User';
import crypto from 'crypto';

export async function POST(req: NextRequest) {
  await dbConnect();
  const { email } = await req.json();
  const user = await UserModel.findOne({ email });
  if (!user) return NextResponse.json({ message: 'Not found' }, { status: 404 });

  const token = crypto.randomBytes(32).toString('hex');
  const expiry = new Date(Date.now() + 3600000);
  await UserModel.findByIdAndUpdate(user._id, { resetToken: token, resetTokenExpiry: expiry });

  const resetUrl = `${process.env.NEXTAUTH_URL}/reset-password?token=${token}`;
  console.log('Reset URL:', resetUrl); // Replace with email sending

  return NextResponse.json({ message: 'Sent' });
}