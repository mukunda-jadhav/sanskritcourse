import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import dbConnect from '@/lib/mongodb';
import CourseModel from '@/models/Course';
import { slugify } from '@/lib/utils';

export async function GET(req: NextRequest) {
  try {
    const session = await auth();
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '12');
    const isAdmin = (session?.user as any)?.role === 'admin';
    const query: any = isAdmin ? {} : { isPublished: true };
    const total = await CourseModel.countDocuments(query);
    const courses = await CourseModel.find(query).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit).lean();
    return NextResponse.json({ courses, total, page, pages: Math.ceil(total / limit) });
  } catch {
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if ((session?.user as any)?.role !== 'admin')
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    await dbConnect();
    const data = await req.json();
    const course = await CourseModel.create({ ...data, slug: slugify(data.title) });
    return NextResponse.json(course, { status: 201 });
  } catch {
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}