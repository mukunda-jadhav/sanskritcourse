import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import dbConnect from '@/lib/mongodb';
import CourseModel from '@/models/Course';

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if ((session?.user as any)?.role !== 'admin') return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  
  await dbConnect();
  const { id } = await params;
  await CourseModel.findByIdAndDelete(id);
  
  return NextResponse.json({ message: 'Deleted' });
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if ((session?.user as any)?.role !== 'admin') return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  
  await dbConnect();
  const data = await req.json();
  const { id } = await params;
  const course = await CourseModel.findByIdAndUpdate(id, data, { new: true });
  
  return NextResponse.json(course);
}