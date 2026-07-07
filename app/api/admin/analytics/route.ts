import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import dbConnect from '@/lib/mongodb';
import UserModel from '@/models/User';
import CourseModel from '@/models/Course';
import LessonModel from '@/models/Lesson';
import NoteModel from '@/models/Note';
import PaymentModel from '@/models/Payment';
import MembershipModel from '@/models/Membership';
import ProgressModel from '@/models/Progress';

export async function GET() {
  const session = await auth();
  if ((session?.user as any)?.role !== 'admin') return NextResponse.json({}, { status: 401 });
  await dbConnect();

  const [students, courses, lessons, notes, enrollments, activeMembers, pendingPayments, revenueData, recentPayments, recentStudents] = await Promise.all([
    UserModel.countDocuments({ role: 'student' }),
    CourseModel.countDocuments(),
    LessonModel.countDocuments(),
    NoteModel.countDocuments(),
    ProgressModel.countDocuments(),
    MembershipModel.countDocuments({ status: 'active' }),
    PaymentModel.countDocuments({ status: 'pending' }),
    PaymentModel.aggregate([{ $match: { status: 'approved' } }, { $group: { _id: null, total: { $sum: '$amount' } } }]),
    PaymentModel.find().sort({ createdAt: -1 }).limit(5).lean(),
    UserModel.find({ role: 'student' }).sort({ createdAt: -1 }).limit(5).lean(),
  ]);

  return NextResponse.json({
    students, courses, lessons, notes, enrollments,
    activeMembers, pendingPayments,
    revenue: revenueData[0]?.total || 0,
    recentPayments, recentStudents,
  });
}