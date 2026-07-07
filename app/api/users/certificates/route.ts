import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import dbConnect from '@/lib/mongodb';
import CertificateModel from '@/models/Certificate';

export async function GET() {
  const session = await auth();
  if (!session) return NextResponse.json([]);
  await dbConnect();
  const certs = await CertificateModel.find({ userId: (session.user as any).id }).populate('courseId').sort({ createdAt: -1 }).lean();
  return NextResponse.json(certs);
}