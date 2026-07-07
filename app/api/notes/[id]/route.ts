import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import dbConnect from '@/lib/mongodb';
import NoteModel from '@/models/Note';

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  const session = await auth();
  if ((session?.user as any)?.role !== 'admin') return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  await dbConnect();
  await NoteModel.findByIdAndDelete(params.id);
  return NextResponse.json({ message: 'Deleted' });
}