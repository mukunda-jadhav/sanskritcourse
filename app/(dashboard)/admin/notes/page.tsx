'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { Plus, Trash2 } from 'lucide-react';
import { toast } from '@/components/ui/Toaster';

export default function AdminNotesPage() {
  const [notes, setNotes] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: '', description: '', category: 'Grammar', fileUrl: '', tier: 'premium' });

  const fetchNotes = () => axios.get('/api/notes').then(r => setNotes(r.data));
  useEffect(() => { fetchNotes(); }, []);

  const create = async () => {
    try {
      await axios.post('/api/notes', form);
      toast('Note created!', 'success');
      setShowForm(false);
      setForm({ title: '', description: '', category: 'Grammar', fileUrl: '', tier: 'premium' });
      fetchNotes();
    } catch { toast('Failed', 'error'); }
  };

  const remove = async (id: string) => {
    await axios.delete(`/api/notes/${id}`);
    toast('Deleted', 'success');
    fetchNotes();
  };

  return (
    <div className="p-8">
      <div className="flex justify-between mb-6">
        <h1 className="font-playfair text-2xl font-bold text-gray-900 dark:text-white">Notes</h1>
        <Button onClick={() => setShowForm(!showForm)}><Plus className="h-4 w-4" /> Add Note</Button>
      </div>

      {showForm && (
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-orange-100 dark:border-gray-800 p-6 mb-6 grid grid-cols-2 gap-4">
          <Input label="Title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
          <Input label="Category" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} />
          <Input label="File URL (Cloudinary/Drive)" value={form.fileUrl} onChange={e => setForm({ ...form, fileUrl: e.target.value })} />
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Access Tier</label>
            <select value={form.tier} onChange={e => setForm({ ...form, tier: e.target.value })}
              className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-2.5 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-400">
              <option value="free">🆓 Free — Everyone</option>
              <option value="premium">👑 Premium — Paid only</option>
            </select>
          </div>
          <div className="col-span-2">
            <Input label="Description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
          </div>
          <div className="col-span-2 flex gap-3">
            <Button onClick={create}>Save Note</Button>
            <Button variant="ghost" onClick={() => setShowForm(false)}>Cancel</Button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {notes.map(n => (
          <div key={n._id} className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${n.tier === 'free' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                {n.tier === 'free' ? '🆓 Free' : '👑 Premium'}
              </span>
              <span className="text-xs text-gray-400">{n.category}</span>
            </div>
            <p className="font-semibold text-gray-900 dark:text-white text-sm mb-1">{n.title}</p>
            <p className="text-xs text-gray-500 mb-3 line-clamp-2">{n.description}</p>
            <Button size="sm" variant="destructive" onClick={() => remove(n._id)}>
              <Trash2 className="h-3.5 w-3.5" /> Delete
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}