'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { BookOpen, Clock } from 'lucide-react';

export default function MyCoursesPage() {
  const [enrollments, setEnrollments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/api/users/enroll').then(r => { setEnrollments(r.data); setLoading(false); });
  }, []);

  return (
    <div className="p-8">
      <h1 className="font-playfair text-2xl font-bold text-gray-900 dark:text-white mb-6">My Courses</h1>
      {loading ? <div className="animate-spin h-6 w-6 rounded-full border-2 border-orange-500 border-t-transparent" /> :
        enrollments.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 mb-4">No courses enrolled yet.</p>
            <Link href="/courses" className="text-orange-500 font-medium hover:underline">Browse Courses →</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {enrollments.map((e) => {
              const c = e.courseId;
              if (!c) return null;
              return (
                <div key={e._id} className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden">
                  <div className="h-28 bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30 flex items-center justify-center text-4xl">📚</div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-1">{c.title}</h3>
                    <div className="flex items-center gap-2 text-xs text-gray-400 mb-3">
                      <BookOpen className="h-3 w-3" />{c.lessonsCount} lessons
                      <Clock className="h-3 w-3 ml-1" />{c.duration}
                    </div>
                    {/* Progress bar */}
                    <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-1.5 mb-3">
                      <div className="bg-orange-500 h-1.5 rounded-full" style={{ width: `${e.percentage || 0}%` }} />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-400">{e.percentage || 0}% complete</span>
                      <Link href={`/courses/${c.slug}`} className="text-xs text-orange-500 font-medium hover:underline">Continue →</Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )
      }
    </div>
  );
}