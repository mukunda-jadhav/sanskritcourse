import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import dbConnect from '@/lib/mongodb';
import UserModel from '@/models/User';

export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json({ message: 'All fields required' }, { status: 400 });
    }

    await dbConnect();

    const existing = await UserModel.findOne({ email });
    if (existing) {
      return NextResponse.json({ message: 'Email already registered' }, { status: 409 });
    }

    const hashed = await bcrypt.hash(password, 10);
    const isAdmin = email === process.env.ADMIN_EMAIL;

    const user = await UserModel.create({
      name,
      email,
      password: hashed,
      provider: 'credentials',
      role: isAdmin ? 'admin' : 'student',
    });

    console.log('User created:', user._id);

    return NextResponse.json({ message: 'Account created successfully' }, { status: 201 });
  } catch (err) {
    console.error('Register error:', err);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}