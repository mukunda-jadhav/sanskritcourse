import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import dbConnect from '@/lib/mongodb';
import mongoose, { Schema } from 'mongoose';

const DownloadSchema = new Schema({ userId: String, noteId: { type: Schema.Types.ObjectId, ref: 'Note' } }, { timestamps: true });
const Download = mongoose.models.Download || mongoose.model('Download', DownloadSchema);

export async function GET() {
  const session = await auth();
  if (!session) return NextResponse.json([]);
  await dbConnect();
  const downloads = await Download.find({ userId: (session.user as any).id }).populate('noteId').sort({ createdAt: -1 }).lean();
  return NextResponse.json(downloads);
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  await dbConnect();
  const { noteId } = await req.json();
  await Download.findOneAndUpdate({ userId: (session.user as any).id, noteId }, {}, { upsert: true });
  return NextResponse.json({ message: 'Saved' });
}