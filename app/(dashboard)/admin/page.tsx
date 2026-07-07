import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import dbConnect from '@/lib/mongodb';
import UserModel from '@/models/User';
import CourseModel from '@/models/Course';
import PaymentModel from '@/models/Payment';
import MembershipModel from '@/models/Membership';
import { Users, BookOpen, CreditCard, Crown } from 'lucide-react';

export default async function AdminPage() {
  const session = await auth();
  if ((session?.user as any)?.role !== 'admin') redirect('/dashboard');

  await dbConnect();
  const [totalUsers, totalCourses, pendingPayments, activeMembers, totalRevenue] = await Promise.all([
    UserModel.countDocuments(),
    CourseModel.countDocuments(),
    PaymentModel.countDocuments({ status: 'pending' }),
    MembershipModel.countDocuments({ status: 'active' }),
    PaymentModel.aggregate([{ $match: { status: 'approved' } }, { $group: { _id: null, total: { $sum: '$amount' } } }]),
  ]);

  const revenue = totalRevenue[0]?.total || 0;

  const stats = [
    { label: 'Total Students', value: totalUsers, icon: Users, color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-900/20', change: '+12% this month' },
    { label: 'Total Courses', value: totalCourses, icon: BookOpen, color: 'text-amber-500', bg: 'bg-amber-50 dark:bg-amber-900/20', change: 'Published & drafts' },
    { label: 'Pending Payments', value: pendingPayments, icon: CreditCard, color: 'text-orange-500', bg: 'bg-orange-50 dark:bg-orange-900/20', change: 'Needs review' },
    { label: 'Active Members', value: activeMembers, icon: Crown, color: 'text-yellow-500', bg: 'bg-yellow-50 dark:bg-yellow-900/20', change: 'Premium access' },
  ];

  const recentPayments = await PaymentModel.find({ status: 'pending' }).sort({ createdAt: -1 }).limit(5).lean();

  return (
    <div className="p-6 md:p-8">
      <div className="mb-8">
        <h1 className="font-playfair text-2xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">Sanskrit Gurukul overview</p>
      </div>

      {/* Revenue Banner */}
      <div className="bg-gradient-to-r from-amber-900 to-orange-900 rounded-2xl p-6 mb-6 text-white">
        <p className="text-amber-200 text-sm">Total Revenue</p>
        <p className="font-playfair text-4xl font-bold mt-1">₹{revenue.toLocaleString()}</p>
        <p className="text-amber-300 text-xs mt-1">From all approved payments</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((s) => (
          <div key={s.label} className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-5">
            <div className={`h-10 w-10 rounded-xl ${s.bg} flex items-center justify-center mb-3`}>
              <s.icon className={`h-5 w-5 ${s.color}`} />
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">{s.value}</div>
            <div className="text-sm font-medium text-gray-700 dark:text-gray-300">{s.label}</div>
            <div className="text-xs text-gray-400 mt-0.5">{s.change}</div>
          </div>
        ))}
      </div>

      {/* Pending Payments */}
      {recentPayments.length > 0 && (
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-900 dark:text-white">Pending Payment Requests</h2>
            <a href="/admin/payments" className="text-sm text-orange-500 hover:text-orange-600 font-medium">View all →</a>
          </div>
          <div className="space-y-3">
            {recentPayments.map((p: any) => (
              <div key={p._id.toString()} className="flex items-center justify-between py-3 border-b border-gray-50 dark:border-gray-800 last:border-0">
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{p.userName}</p>
                  <p className="text-xs text-gray-500">{p.userEmail} • {p.plan} plan</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-orange-600">₹{p.amount}</p>
                  <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">Pending</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
