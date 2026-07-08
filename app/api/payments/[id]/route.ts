import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import dbConnect from '@/lib/mongodb';
import PaymentModel from '@/models/Payment';
import MembershipModel from '@/models/Membership';
import { addDays } from 'date-fns';

const PLAN_DAYS: Record<string, number> = { monthly: 30, yearly: 365, lifetime: -1 };

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await auth();
    if (!session || (session.user as any)?.role !== 'admin') {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    const { action, rejectionReason } = await req.json();
    const { id } = await params;

    const payment = await PaymentModel.findById(id);
    if (!payment) return NextResponse.json({ message: 'Payment not found' }, { status: 404 });

    if (action === 'approve') {
      payment.status = 'approved';
      await payment.save();

      const days = PLAN_DAYS[payment.plan];
      const startDate = new Date();
      const endDate = days === -1 ? undefined : addDays(startDate, days);

      await MembershipModel.findOneAndUpdate(
        { userId: payment.userId },
        { status: 'active', startDate, endDate, plan: payment.plan, paymentId: payment._id },
        { upsert: true }
      );
    } else if (action === 'reject') {
      payment.status = 'rejected';
      payment.rejectionReason = rejectionReason || 'Payment could not be verified.';
      await payment.save();

      await MembershipModel.findOneAndUpdate(
        { userId: payment.userId },
        { status: 'expired' }
      );
    }

    return NextResponse.json({ message: `Payment ${action}d successfully` });
  } catch {
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}