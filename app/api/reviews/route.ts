import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import dbConnect from '@/lib/mongodb';
import ReviewModel from '@/models/Review';

export async function GET() {
  await dbConnect();
  const reviews = await ReviewModel.find({ isApproved: true }).sort({ createdAt: -1 }).lean();
  return NextResponse.json(reviews);
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ message: 'Login required' }, { status: 401 });
  await dbConnect();
  const { rating, text, userRole } = await req.json();
  await ReviewModel.create({ userId: (session.user as any).id, userName: session.user?.name, userRole, rating, text });
  return NextResponse.json({ message: 'Review submitted for approval' }, { status: 201 });
}