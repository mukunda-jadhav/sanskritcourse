import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import dbConnect from '@/lib/mongodb';
import PaymentModel from '@/models/Payment';
import MembershipModel from '@/models/Membership';
import { PLAN_PRICES } from '@/lib/utils';

export async function GET(req: NextRequest) {
  try {
    const session = await auth();
    if (!session) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

    await dbConnect();
    const { searchParams } = new URL(req.url);
    const isAdmin = (session.user as any)?.role === 'admin';

    const query = isAdmin ? {} : { userId: (session.user as any)?.id };
    const payments = await PaymentModel.find(query).sort({ createdAt: -1 }).lean();

    return NextResponse.json(payments);
  } catch {
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

    await dbConnect();
    const { plan, transactionId, phone, screenshot } = await req.json();

    if (!plan || !transactionId || !phone) {
      return NextResponse.json({ message: 'All fields required' }, { status: 400 });
    }

    const amount = PLAN_PRICES[plan as keyof typeof PLAN_PRICES];
    if (!amount) return NextResponse.json({ message: 'Invalid plan' }, { status: 400 });

    const payment = await PaymentModel.create({
      userId: (session.user as any)?.id,
      userName: session.user?.name,
      userEmail: session.user?.email,
      phone,
      plan,
      amount,
      transactionId,
      screenshot,
      status: 'pending',
    });

    // Create pending membership
    await MembershipModel.findOneAndUpdate(
      { userId: (session.user as any)?.id },
      { userId: (session.user as any)?.id, plan, status: 'pending', paymentId: payment._id },
      { upsert: true, new: true }
    );

    return NextResponse.json({ message: 'Payment submitted. Pending verification.', payment }, { status: 201 });
  } catch {
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
