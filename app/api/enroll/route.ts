import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import dbConnect from '@/lib/mongodb';
import ProgressModel from '@/models/Progress';
import CourseModel from '@/models/Course';

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  await dbConnect();
  const { courseId } = await req.json();
  const existing = await ProgressModel.findOne({ userId: (session.user as any).id, courseId });
  if (!existing) {
    await ProgressModel.create({ userId: (session.user as any).id, courseId, completedLessons: [], percentage: 0 });
    await CourseModel.findByIdAndUpdate(courseId, { $inc: { studentsCount: 1 } });
  }
  return NextResponse.json({ message: 'Enrolled' });
}

export async function GET() {
  const session = await auth();
  if (!session) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  await dbConnect();
  const progress = await ProgressModel.find({ userId: (session.user as any).id }).populate('courseId').lean();
  return NextResponse.json(progress);
}