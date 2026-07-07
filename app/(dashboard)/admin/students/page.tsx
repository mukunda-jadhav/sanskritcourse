'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { formatDate } from '@/lib/utils';

export default function StudentsPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/api/admin/students').then(r => { setUsers(r.data); setLoading(false); });
  }, []);

  return (
    <div className="p-8">
      <h1 className="font-playfair text-2xl font-bold text-gray-900 dark:text-white mb-6">Students ({users.length})</h1>
      {loading ? <p>Loading...</p> : (
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-amber-50 dark:bg-amber-950/20">
              <tr>
                <th className="text-left px-5 py-3 text-gray-600 dark:text-gray-400">Name</th>
                <th className="text-left px-5 py-3 text-gray-600 dark:text-gray-400">Email</th>
                <th className="text-left px-5 py-3 text-gray-600 dark:text-gray-400">Role</th>
                <th className="text-left px-5 py-3 text-gray-600 dark:text-gray-400">Joined</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u, i) => (
                <tr key={u._id} className={i % 2 === 0 ? 'bg-white dark:bg-gray-900' : 'bg-gray-50 dark:bg-gray-800/50'}>
                  <td className="px-5 py-3 font-medium text-gray-900 dark:text-white">{u.name}</td>
                  <td className="px-5 py-3 text-gray-500">{u.email}</td>
                  <td className="px-5 py-3"><span className={`px-2 py-0.5 rounded-full text-xs font-medium ${u.role === 'admin' ? 'bg-orange-100 text-orange-700' : 'bg-gray-100 text-gray-600'}`}>{u.role}</span></td>
                  <td className="px-5 py-3 text-gray-500">{formatDate(u.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}