'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'next/navigation';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { Plus, Trash2 } from 'lucide-react';
import { toast } from '@/components/ui/Toaster';

export default function CourseContentPage() {
  const { id } = useParams();
  const [course, setCourse] = useState<any>(null);
  const [lessons, setLessons] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    title: '', videoUrl: '', duration: '',
    description: '', order: 1, tier: 'premium',
  });

  const fetchLessons = () => axios.get(`/api/courses/${id}/lessons`).then(r => setLessons(r.data));
  const fetchCourse = () => axios.get(`/api/courses/${id}`).then(r => setCourse(r.data));

  useEffect(() => { fetchCourse(); fetchLessons(); }, [id]);

  const addLesson = async () => {
    try {
      await axios.post(`/api/courses/${id}/lessons`, { ...form, isPremium: form.tier === 'premium' });
      toast('Lesson added!', 'success');
      setShowForm(false);
      setForm({ title: '', videoUrl: '', duration: '', description: '', order: lessons.length + 2, tier: 'premium' });
      fetchLessons();
    } catch { toast('Failed', 'error'); }
  };

  const deleteLesson = async (lessonId: string) => {
    await axios.delete(`/api/courses/${id}/lessons/${lessonId}`);
    fetchLessons();
  };

  return (
    <div className="p-8 max-w-4xl">
      <div className="mb-6">
        <h1 className="font-playfair text-2xl font-bold text-gray-900 dark:text-white">{course?.title || 'Course'}</h1>
        <p className="text-gray-500 text-sm">{lessons.length} lessons</p>
      </div>

      <Button onClick={() => setShowForm(!showForm)} className="mb-6">
        <Plus className="h-4 w-4" /> Add Lesson
      </Button>

      {showForm && (
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-orange-100 dark:border-gray-800 p-6 mb-6 grid grid-cols-2 gap-4">
          <Input label="Lesson Title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="e.g. Introduction to Devanagari" />
          <Input label="Video URL" value={form.videoUrl} onChange={e => setForm({ ...form, videoUrl: e.target.value })} placeholder="https://youtube.com/embed/..." />
          <Input label="Duration" value={form.duration} onChange={e => setForm({ ...form, duration: e.target.value })} placeholder="e.g. 12:30" />
          <Input label="Order" type="number" value={form.order} onChange={e => setForm({ ...form, order: parseInt(e.target.value) })} />
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Tier</label>
            <select value={form.tier} onChange={e => setForm({ ...form, tier: e.target.value })}
              className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-2.5 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-400">
              <option value="free">🆓 Free</option>
              <option value="premium">👑 Premium</option>
            </select>
          </div>
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Description</label>
            <textarea rows={3} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })}
              className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-2.5 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-400 resize-none" />
          </div>
          <div className="col-span-2 flex gap-3">
            <Button onClick={addLesson}>Save Lesson</Button>
            <Button variant="ghost" onClick={() => setShowForm(false)}>Cancel</Button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {lessons.sort((a, b) => a.order - b.order).map((l) => (
          <div key={l._id} className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="h-8 w-8 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-600 flex items-center justify-center text-sm font-bold">{l.order}</span>
              <div>
                <p className="font-medium text-gray-900 dark:text-white text-sm">{l.title}</p>
                <p className="text-xs text-gray-400">{l.duration} • {l.tier === 'free' ? '🆓 Free' : '👑 Premium'}</p>
              </div>
            </div>
            <Button size="sm" variant="destructive" onClick={() => deleteLesson(l._id)}>
              <Trash2 className="h-3.5 w-3.5" />
            </Button>
          </div>
        ))}
        {lessons.length === 0 && <p className="text-gray-400 text-sm text-center py-10">No lessons yet.</p>}
      </div>
    </div>
  );
}