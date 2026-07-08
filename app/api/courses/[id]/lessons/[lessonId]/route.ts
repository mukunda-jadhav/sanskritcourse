import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import dbConnect from '@/lib/mongodb';
import LessonModel from '@/models/Lesson';
import CourseModel from '@/models/Course';

export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string; lessonId: string }> }) {
  const session = await auth();
  if ((session?.user as any)?.role !== 'admin') return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  
  await dbConnect();
  const { id, lessonId } = await params;
  await LessonModel.findByIdAndDelete(lessonId);
  await CourseModel.findByIdAndUpdate(id, { $inc: { lessonsCount: -1 } });
  
  return NextResponse.json({ message: 'Deleted' });
}