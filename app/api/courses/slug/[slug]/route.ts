import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import CourseModel from '@/models/Course';

export async function GET(_: NextRequest, { params }: { params: { slug: string } }) {
  await dbConnect();
  const course = await CourseModel.findOne({ slug: params.slug }).lean();
  if (!course) return NextResponse.json({ message: 'Not found' }, { status: 404 });
  return NextResponse.json(course);
}