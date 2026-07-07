import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import dbConnect from '@/lib/mongodb';
import mongoose, { Schema } from 'mongoose';

const BookmarkSchema = new Schema({ userId: String, lessonId: { type: Schema.Types.ObjectId, ref: 'Lesson' }, courseId: { type: Schema.Types.ObjectId, ref: 'Course' } }, { timestamps: true });
const Bookmark = mongoose.models.Bookmark || mongoose.model('Bookmark', BookmarkSchema);

export async function GET() {
  const session = await auth();
  if (!session) return NextResponse.json([], { status: 401 });
  await dbConnect();
  const bookmarks = await Bookmark.find({ userId: (session.user as any).id }).populate('lessonId').populate('courseId').lean();
  return NextResponse.json(bookmarks);
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  await dbConnect();
  const { lessonId, courseId } = await req.json();
  const existing = await Bookmark.findOne({ userId: (session.user as any).id, lessonId });
  if (existing) { await Bookmark.findByIdAndDelete(existing._id); return NextResponse.json({ bookmarked: false }); }
  await Bookmark.create({ userId: (session.user as any).id, lessonId, courseId });
  return NextResponse.json({ bookmarked: true });
}