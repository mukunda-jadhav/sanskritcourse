import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import BlogModel from '@/models/Blog';

export async function GET(_: NextRequest, { params }: { params: { slug: string } }) {
  await dbConnect();
  const blog = await BlogModel.findOneAndUpdate({ slug: params.slug, isPublished: true }, { $inc: { views: 1 } }, { new: true }).lean();
  if (!blog) return NextResponse.json({ message: 'Not found' }, { status: 404 });
  return NextResponse.json(blog);
}