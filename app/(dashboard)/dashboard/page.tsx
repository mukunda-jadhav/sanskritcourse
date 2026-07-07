import { auth } from '@/lib/auth';
import dbConnect from '@/lib/mongodb';
import MembershipModel from '@/models/Membership';
import PaymentModel from '@/models/Payment';
import ProgressModel from '@/models/Progress';
import { formatDate } from '@/lib/utils';
import Link from 'next/link';
import { BookOpen, Award, Crown, FileText, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

const statusIcon = { active: CheckCircle, pending: AlertCircle, expired: XCircle };
const statusColor = { active: 'text-green-500', pending: 'text-amber-500', expired: 'text-red-500' };
const statusBg = { active: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800', pending: 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800', expired: 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800' };

export default async function DashboardPage() {
  const session = await auth();
  await dbConnect();

  const userId = (session?.user as any)?.id;
  const [membership, payment, progressList] = await Promise.all([
    MembershipModel.findOne({ userId }).lean() as any,
    PaymentModel.findOne({ userId }).sort({ createdAt: -1 }).lean() as any,
    ProgressModel.find({ userId }).lean() as unknown as any[],
  ]);

  const membershipStatus = (membership?.status as 'active' | 'pending' | 'expired') || 'expired';
  const StatusIcon = statusIcon[membershipStatus] || AlertCircle;

  const stats = [
    { label: 'Courses Started', value: progressList.length, icon: BookOpen, color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-900/20' },
    { label: 'Courses Completed', value: progressList.filter(p => p.percentage === 100).length, icon: CheckCircle, color: 'text-green-500', bg: 'bg-green-50 dark:bg-green-900/20' },
    { label: 'Certificates', value: 0, icon: Award, color: 'text-amber-500', bg: 'bg-amber-50 dark:bg-amber-900/20' },
    { label: 'Notes Downloaded', value: 0, icon: FileText, color: 'text-purple-500', bg: 'bg-purple-50 dark:bg-purple-900/20' },
  ];

  return (
    <div className="p-6 md:p-8 max-w-5xl">
      <div className="mb-8">
        <h1 className="font-playfair text-2xl font-bold text-gray-900 dark:text-white">
          Welcome back, {session?.user?.name?.split(' ')[0]}! 🙏
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Continue your Sanskrit journey</p>
      </div>

      {/* Membership Status */}
      <div className={`rounded-2xl border p-5 mb-6 flex items-center justify-between ${statusBg[membershipStatus]}`}>
        <div className="flex items-center gap-3">
          <StatusIcon className={`h-6 w-6 ${statusColor[membershipStatus]}`} />
          <div>
            <p className="font-semibold text-gray-900 dark:text-white capitalize">
              {membership ? `${membership.plan} Membership` : 'No Membership'} — {membershipStatus}
            </p>
            {membership?.status === 'active' && membership.endDate && (
              <p className="text-xs text-gray-500 mt-0.5">Valid until {formatDate(membership.endDate)}</p>
            )}
            {membership?.status === 'active' && !membership.endDate && (
              <p className="text-xs text-gray-500 mt-0.5">Lifetime access</p>
            )}
            {membership?.status === 'pending' && (
              <p className="text-xs text-gray-500 mt-0.5">Payment under review — usually within 24 hours</p>
            )}
            {!membership && (
              <p className="text-xs text-gray-500 mt-0.5">Upgrade to access all courses and notes</p>
            )}
          </div>
        </div>
        {membershipStatus !== 'active' && (
          <Link href="/membership" className="shrink-0">
            <div className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-sm font-semibold rounded-xl hover:from-orange-600 hover:to-amber-600 transition-all">
              <Crown className="h-4 w-4" /> Upgrade
            </div>
          </Link>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((s) => (
          <div key={s.label} className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-4">
            <div className={`h-10 w-10 rounded-xl ${s.bg} flex items-center justify-center mb-3`}>
              <s.icon className={`h-5 w-5 ${s.color}`} />
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">{s.value}</div>
            <div className="text-xs text-gray-500 mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Quick Links */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6">
        <h2 className="font-semibold text-gray-900 dark:text-white mb-4">Quick Access</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { href: '/courses', label: 'Browse Courses', emoji: '📚' },
            { href: '/notes', label: 'Premium Notes', emoji: '📝' },
            { href: '/dashboard/certificates', label: 'My Certificates', emoji: '🎓' },
            { href: '/membership', label: 'Membership', emoji: '👑' },
          ].map((q) => (
            <Link key={q.href} href={q.href}
              className="flex flex-col items-center gap-2 p-4 rounded-xl bg-amber-50 dark:bg-amber-950/20 hover:bg-orange-100 dark:hover:bg-orange-950/30 transition-colors text-center border border-orange-100 dark:border-orange-900/30">
              <span className="text-2xl">{q.emoji}</span>
              <span className="text-xs font-medium text-gray-700 dark:text-gray-300">{q.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
