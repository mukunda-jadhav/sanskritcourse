'use client';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import { useParams } from 'next/navigation';
import { Lock, Play, Crown, Bookmark, BookmarkCheck } from 'lucide-react';
import Button from '@/components/ui/Button';
import Link from 'next/link';

export default function CoursePage() {
  const { slug } = useParams();
  const { data: session } = useSession();
  const [course, setCourse] = useState<any>(null);
  const [lessons, setLessons] = useState<any[]>([]);
  const [activeLesson, setActiveLesson] = useState<any>(null);
  const [membership, setMembership] = useState<any>(null);
  const [bookmarks, setBookmarks] = useState<string[]>([]);

  useEffect(() => {
    axios.get(`/api/courses/slug/${slug}`).then(r => {
      setCourse(r.data);
      if (session) axios.post('/api/users/enroll', { courseId: r.data._id }).catch(() => {});
      axios.get(`/api/courses/${r.data._id}/lessons`).then(l => {
        setLessons(l.data);
        setActiveLesson(l.data[0]);
      });
    });
    if (session) {
      axios.get('/api/users/membership').then(r => setMembership(r.data.membership));
      axios.get('/api/users/bookmarks').then(r => setBookmarks(r.data.map((b: any) => b.lessonId?._id)));
    }
  }, [slug, session]);

  const isPremiumUser = membership?.status === 'active';
  const canWatch = (lesson: any) => lesson?.tier === 'free' || isPremiumUser;

  const toggleBookmark = async (lesson: any) => {
    const res = await axios.post('/api/users/bookmarks', { lessonId: lesson._id, courseId: course._id });
    if (res.data.bookmarked) setBookmarks(p => [...p, lesson._id]);
    else setBookmarks(p => p.filter(id => id !== lesson._id));
  };

  if (!course) return <div className="pt-24 text-center text-gray-400">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-16">
      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-black rounded-2xl overflow-hidden aspect-video flex items-center justify-center mb-4">
            {activeLesson ? (
              canWatch(activeLesson) ? (
                <iframe src={activeLesson.videoUrl} className="w-full h-full" allowFullScreen title={activeLesson.title} />
              ) : (
                <div className="text-center text-white">
                  <Lock className="h-12 w-12 mx-auto mb-3 text-amber-400" />
                  <p className="font-semibold mb-3">Premium Lesson</p>
                  <Link href="/membership"><Button><Crown className="h-4 w-4" /> Upgrade to Premium</Button></Link>
                </div>
              )
            ) : (
              <p className="text-gray-400">No lessons yet</p>
            )}
          </div>
          {activeLesson && (
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-5 border border-gray-100 dark:border-gray-800 flex items-start justify-between">
              <div>
                <h1 className="font-playfair text-xl font-bold text-gray-900 dark:text-white mb-1">{activeLesson.title}</h1>
                <p className="text-sm text-gray-500">{activeLesson.description}</p>
              </div>
              {session && canWatch(activeLesson) && (
                <button onClick={() => toggleBookmark(activeLesson)} className="ml-4 text-orange-500 hover:text-orange-600">
                  {bookmarks.includes(activeLesson._id)
                    ? <BookmarkCheck className="h-6 w-6" />
                    : <Bookmark className="h-6 w-6" />}
                </button>
              )}
            </div>
          )}
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden h-fit">
          <div className="p-4 border-b border-gray-100 dark:border-gray-800">
            <h2 className="font-semibold text-gray-900 dark:text-white">{course.title}</h2>
            <p className="text-xs text-gray-400 mt-0.5">{lessons.length} lessons</p>
          </div>
          <div className="overflow-y-auto max-h-[500px]">
            {lessons.sort((a, b) => a.order - b.order).map((l) => {
              const locked = !canWatch(l);
              const isActive = activeLesson?._id === l._id;
              const isBookmarked = bookmarks.includes(l._id);
              return (
                <button key={l._id} onClick={() => setActiveLesson(l)}
                  className={`w-full flex items-center gap-3 p-3 text-left border-b border-gray-50 dark:border-gray-800 transition-colors ${isActive ? 'bg-orange-50 dark:bg-orange-950/30' : 'hover:bg-gray-50 dark:hover:bg-gray-800'}`}>
                  <div className={`h-7 w-7 rounded-full flex items-center justify-center shrink-0 ${isActive ? 'bg-orange-500 text-white' : 'bg-gray-100 dark:bg-gray-800'}`}>
                    {locked ? <Lock className="h-3 w-3 text-gray-400" /> : <Play className="h-3 w-3" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-xs font-medium truncate ${isActive ? 'text-orange-600' : 'text-gray-700 dark:text-gray-300'}`}>{l.title}</p>
                    <p className="text-xs text-gray-400">{l.duration} • {l.tier === 'free' ? '🆓' : '👑'}</p>
                  </div>
                  {isBookmarked && <Bookmark className="h-3 w-3 text-orange-400 shrink-0" />}
                </button>
              );
            })}
          </div>
          {!isPremiumUser && (
            <div className="p-4 bg-gradient-to-br from-orange-500 to-amber-500 text-white text-center">
              <p className="text-xs font-semibold mb-2">Unlock all lessons for ₹299/mo</p>
              <Link href="/membership"><Button className="bg-white text-orange-600 w-full text-xs py-2">Get Premium</Button></Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}