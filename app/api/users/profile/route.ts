import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import dbConnect from '@/lib/mongodb';
import UserModel from '@/models/User';

export async function PATCH(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  await dbConnect();
  const { name } = await req.json();
  await UserModel.findByIdAndUpdate((session.user as any).id, { name });
  return NextResponse.json({ message: 'Updated' });
}