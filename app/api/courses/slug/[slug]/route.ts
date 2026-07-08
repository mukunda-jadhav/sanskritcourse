import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import CourseModel from '@/models/Course';

export async function GET(_: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  await dbConnect();
  const course = await CourseModel.findOne({ slug }).lean();
  if (!course) return NextResponse.json({ message: 'Not found' }, { status: 404 });
  return NextResponse.json(course);
}