import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import dbConnect from '@/lib/mongodb';
import ReviewModel from '@/models/Review';

export async function GET() {
  const session = await auth();
  if ((session?.user as any)?.role !== 'admin') return NextResponse.json([], { status: 401 });
  await dbConnect();
  const reviews = await ReviewModel.find().sort({ createdAt: -1 }).lean();
  return NextResponse.json(reviews);
}

export async function PATCH(req: NextRequest) {
  const session = await auth();
  if ((session?.user as any)?.role !== 'admin') return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  await dbConnect();
  const { id, isApproved } = await req.json();
  await ReviewModel.findByIdAndUpdate(id, { isApproved });
  return NextResponse.json({ message: 'Updated' });
}