import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import dbConnect from '@/lib/mongodb';
import CourseModel from '@/models/Course';

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  await dbConnect();
  const course = await CourseModel.findById(params.id).lean();
  return NextResponse.json(course);
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await auth();
  if ((session?.user as any)?.role !== 'admin') return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  await dbConnect();
  const data = await req.json();
  const course = await CourseModel.findByIdAndUpdate(params.id, data, { new: true });
  return NextResponse.json(course);
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  const session = await auth();
  if ((session?.user as any)?.role !== 'admin') return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  await dbConnect();
  await CourseModel.findByIdAndDelete(params.id);
  return NextResponse.json({ message: 'Deleted' });
}