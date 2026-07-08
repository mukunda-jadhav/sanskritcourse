import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import dbConnect from '@/lib/mongodb';
import LessonModel from '@/models/Lesson';
import CourseModel from '@/models/Course';

export async function GET(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await dbConnect();
  const lessons = await LessonModel.find({ courseId: id }).sort({ order: 1 }).lean();
  return NextResponse.json(lessons);
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if ((session?.user as any)?.role !== 'admin') return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  
  await dbConnect();
  const data = await req.json();
  const { id } = await params;
  const lesson = await LessonModel.create({ ...data, courseId: id });
  await CourseModel.findByIdAndUpdate(id, { $inc: { lessonsCount: 1 } });
  
  return NextResponse.json(lesson, { status: 201 });
}