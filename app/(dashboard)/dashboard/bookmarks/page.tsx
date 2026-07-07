'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { Bookmark, Play } from 'lucide-react';

export default function BookmarksPage() {
  const [bookmarks, setBookmarks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/api/users/bookmarks').then(r => { setBookmarks(r.data); setLoading(false); });
  }, []);

  return (
    <div className="p-8">
      <h1 className="font-playfair text-2xl font-bold text-gray-900 dark:text-white mb-6">Bookmarks</h1>
      {loading ? <div className="animate-spin h-6 w-6 rounded-full border-2 border-orange-500 border-t-transparent" /> :
        bookmarks.length === 0 ? (
          <div className="text-center py-20">
            <Bookmark className="h-12 w-12 mx-auto text-gray-300 mb-3" />
            <p className="text-gray-400">No bookmarks yet.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {bookmarks.map((b) => (
              <div key={b._id} className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 p-4 flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900 dark:text-white text-sm">{b.lessonId?.title}</p>
                  <p className="text-xs text-gray-400">{b.courseId?.title}</p>
                </div>
                <Link href={`/courses/${b.courseId?.slug}`}>
                  <button className="flex items-center gap-1 text-xs text-orange-500 font-medium hover:underline">
                    <Play className="h-3 w-3" /> Watch
                  </button>
                </Link>
              </div>
            ))}
          </div>
        )}
    </div>
  );
}