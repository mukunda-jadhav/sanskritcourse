import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import dbConnect from '@/lib/mongodb';
import BlogModel from '@/models/Blog';
import { slugify } from '@/lib/utils';

export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = 9;

    const query: any = { isPublished: true };
    if (category) query.category = category;
    if (search) query.title = { $regex: search, $options: 'i' };

    const total = await BlogModel.countDocuments(query);
    const blogs = await BlogModel.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .select('-content')
      .lean();

    return NextResponse.json({ blogs, total, pages: Math.ceil(total / limit) });
  } catch {
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session || (session.user as any)?.role !== 'admin') {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
    await dbConnect();
    const data = await req.json();
    const blog = await BlogModel.create({ ...data, slug: slugify(data.title) });
    return NextResponse.json(blog, { status: 201 });
  } catch {
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
