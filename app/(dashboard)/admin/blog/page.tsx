'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { Plus } from 'lucide-react';
import { toast } from '@/components/ui/Toaster';
import { slugify } from '@/lib/utils';

export default function AdminBlogPage() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: '', excerpt: '', content: '', category: 'General', isPublished: false });

  const fetch = () => axios.get('/api/blog').then(r => setBlogs(r.data.blogs || []));
  useEffect(() => { fetch(); }, []);

  const create = async () => {
    try { await axios.post('/api/blog', form); toast('Blog created!', 'success'); setShowForm(false); fetch(); }
    catch { toast('Failed', 'error'); }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between mb-6">
        <h1 className="font-playfair text-2xl font-bold text-gray-900 dark:text-white">Blog Posts</h1>
        <Button onClick={() => setShowForm(!showForm)}><Plus className="h-4 w-4" /> New Post</Button>
      </div>
      {showForm && (
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-orange-100 p-6 mb-6 grid grid-cols-2 gap-4">
          <Input label="Title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
          <Input label="Category" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} />
          <div className="col-span-2"><Input label="Excerpt" value={form.excerpt} onChange={e => setForm({ ...form, excerpt: e.target.value })} /></div>
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Content</label>
            <textarea rows={6} value={form.content} onChange={e => setForm({ ...form, content: e.target.value })}
              className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-2.5 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-400 resize-none" />
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" checked={form.isPublished} onChange={e => setForm({ ...form, isPublished: e.target.checked })} />
            <span className="text-sm text-gray-700 dark:text-gray-300">Publish immediately</span>
          </div>
          <div className="col-span-2 flex gap-3"><Button onClick={create}>Publish</Button><Button variant="ghost" onClick={() => setShowForm(false)}>Cancel</Button></div>
        </div>
      )}
      <div className="space-y-3">
        {blogs.map(b => (
          <div key={b._id} className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-4 flex items-center justify-between">
            <div>
              <p className="font-semibold text-gray-900 dark:text-white">{b.title}</p>
              <p className="text-xs text-gray-500">{b.category} • {b.isPublished ? '✅ Published' : '📝 Draft'}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}