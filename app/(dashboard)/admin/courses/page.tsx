'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Button from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import Input from '@/components/ui/Input';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { toast } from '@/components/ui/Toaster';

export default function AdminCoursesPage() {
  const router = useRouter();
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    title: '', description: '', category: '',
    difficulty: 'beginner', thumbnail: '',
    instructor: 'Sanskrit Gurukul',
    tier: 'premium', isPublished: true,
  });

  const fetchCourses = async () => {
    setLoading(true);
    const { data } = await axios.get('/api/courses?limit=50');
    setCourses(data.courses || []);
    setLoading(false);
  };

  useEffect(() => { fetchCourses(); }, []);

  const handleCreate = async () => {
    try {
      await axios.post('/api/courses', { ...form, isPremium: form.tier === 'premium' });
      toast('Course created!', 'success');
      setShowForm(false);
      setForm({ title: '', description: '', category: '', difficulty: 'beginner', thumbnail: '', instructor: 'Sanskrit Gurukul', tier: 'premium', isPublished: true });
      fetchCourses();
    } catch { toast('Failed to create course', 'error'); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this course?')) return;
    try {
      await axios.delete(`/api/courses/${id}`);
      toast('Course deleted', 'success');
      fetchCourses();
    } catch { toast('Delete failed', 'error'); }
  };

  return (
    <div className="p-6 md:p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-playfair text-2xl font-bold text-gray-900 dark:text-white">Courses</h1>
          <p className="text-gray-500 text-sm mt-1">{courses.length} total</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)}><Plus className="h-4 w-4" /> Add Course</Button>
      </div>

      {showForm && (
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-orange-100 dark:border-gray-800 p-6 mb-6">
          <h2 className="font-semibold text-gray-900 dark:text-white mb-4">New Course</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input label="Title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="e.g. Sanskrit for Beginners" />
            <Input label="Category" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} placeholder="e.g. Grammar, Scripture" />
            <Input label="Thumbnail URL" value={form.thumbnail} onChange={e => setForm({ ...form, thumbnail: e.target.value })} placeholder="Cloudinary URL" />
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Difficulty</label>
              <select value={form.difficulty} onChange={e => setForm({ ...form, difficulty: e.target.value })}
                className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-2.5 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-400">
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Tier</label>
              <select value={form.tier} onChange={e => setForm({ ...form, tier: e.target.value })}
                className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-2.5 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-400">
                <option value="free">🆓 Free</option>
                <option value="premium">👑 Premium</option>
              </select>
            </div>
            <div className="flex items-center gap-2 pt-6">
              <input type="checkbox" id="published" checked={form.isPublished} onChange={e => setForm({ ...form, isPublished: e.target.checked })} />
              <label htmlFor="published" className="text-sm text-gray-700 dark:text-gray-300">Publish immediately</label>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Description</label>
              <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })}
                rows={3} placeholder="Course description..."
                className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-2.5 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-400 resize-none" />
            </div>
          </div>
          <div className="flex gap-3 mt-4">
            <Button onClick={handleCreate}>Create Course</Button>
            <Button variant="ghost" onClick={() => setShowForm(false)}>Cancel</Button>
          </div>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center py-20"><div className="animate-spin h-8 w-8 rounded-full border-2 border-orange-500 border-t-transparent" /></div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {courses.map((c) => (
            <div key={c._id} className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden">
              <div className="h-32 bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30 flex items-center justify-center text-4xl">
                📚
              </div>
              <div className="p-4">
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <Badge variant={c.isPublished ? 'success' : 'warning'}>{c.isPublished ? 'Published' : 'Draft'}</Badge>
                  <Badge variant={c.tier === 'free' ? 'success' : 'gold'}>{c.tier === 'free' ? '🆓 Free' : '👑 Premium'}</Badge>
                  <Badge variant="default">{c.difficulty}</Badge>
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-1">{c.title}</h3>
                <p className="text-xs text-gray-500 mb-3 line-clamp-2">{c.description}</p>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="flex-1" onClick={() => router.push(`/admin/courses/${c._id}`)}>
                    <Pencil className="h-3.5 w-3.5" /> Manage
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => handleDelete(c._id)}>
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}