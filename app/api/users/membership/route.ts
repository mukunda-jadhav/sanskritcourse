import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import dbConnect from '@/lib/mongodb';
import MembershipModel from '@/models/Membership';

export async function GET() {
  try {
    const session = await auth();
    if (!session) return NextResponse.json({ membership: null });

    await dbConnect();
    const membership = await MembershipModel.findOne({ userId: (session.user as any)?.id }).lean();
    return NextResponse.json({ membership });
  } catch {
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
