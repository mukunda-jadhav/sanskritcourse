import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import dbConnect from '@/lib/mongodb';
import LessonModel from '@/models/Lesson';
import CourseModel from '@/models/Course';

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  await dbConnect();
  const lessons = await LessonModel.find({ courseId: params.id }).sort({ order: 1 }).lean();
  return NextResponse.json(lessons);
}

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await auth();
  if ((session?.user as any)?.role !== 'admin') return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  await dbConnect();
  const data = await req.json();
  const lesson = await LessonModel.create({ ...data, courseId: params.id });
  await CourseModel.findByIdAndUpdate(params.id, { $inc: { lessonsCount: 1 } });
  return NextResponse.json(lesson, { status: 201 });
}