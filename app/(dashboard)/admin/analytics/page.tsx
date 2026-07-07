'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function AnalyticsPage() {
  const [data, setData] = useState<any>(null);

  useEffect(() => { axios.get('/api/admin/analytics').then(r => setData(r.data)); }, []);

  if (!data) return <div className="p-8"><div className="animate-spin h-6 w-6 rounded-full border-2 border-orange-500 border-t-transparent" /></div>;

  const cards = [
    { label: 'Total Students', value: data.students, emoji: '👥' },
    { label: 'Active Members', value: data.activeMembers, emoji: '👑' },
    { label: 'Total Courses', value: data.courses, emoji: '📚' },
    { label: 'Total Lessons', value: data.lessons, emoji: '🎥' },
    { label: 'Total Enrollments', value: data.enrollments, emoji: '📋' },
    { label: 'Total Revenue', value: `₹${data.revenue.toLocaleString()}`, emoji: '💰' },
    { label: 'Pending Payments', value: data.pendingPayments, emoji: '⏳' },
    { label: 'Total Notes', value: data.notes, emoji: '📄' },
  ];

  return (
    <div className="p-8">
      <h1 className="font-playfair text-2xl font-bold text-gray-900 dark:text-white mb-6">Analytics</h1>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {cards.map(c => (
          <div key={c.label} className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-5">
            <div className="text-3xl mb-2">{c.emoji}</div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">{c.value}</div>
            <div className="text-xs text-gray-500 mt-1">{c.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-5">
          <h2 className="font-semibold text-gray-900 dark:text-white mb-4">Recent Payments</h2>
          <div className="space-y-3">
            {data.recentPayments.map((p: any) => (
              <div key={p._id} className="flex items-center justify-between text-sm">
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">{p.userName}</p>
                  <p className="text-xs text-gray-400 capitalize">{p.plan} • {p.status}</p>
                </div>
                <span className="font-bold text-orange-600">₹{p.amount}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-5">
          <h2 className="font-semibold text-gray-900 dark:text-white mb-4">Recent Students</h2>
          <div className="space-y-3">
            {data.recentStudents.map((s: any) => (
              <div key={s._id} className="flex items-center gap-3 text-sm">
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-orange-400 to-amber-500 flex items-center justify-center text-white text-xs font-bold">
                  {s.name?.[0]?.toUpperCase()}
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">{s.name}</p>
                  <p className="text-xs text-gray-400">{s.email}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}