'use client';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Download, Lock, FileText, Search } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Link from 'next/link';

const categories = ['All', 'Grammar', 'Scripture', 'Vocabulary', 'Shloka'];

export default function NotesPage() {
  const { data: session } = useSession();
  const [notes, setNotes] = useState<any[]>([]);
  const [membership, setMembership] = useState<any>(null);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');

  useEffect(() => {
    axios.get('/api/notes').then(r => setNotes(r.data));
    if (session) axios.get('/api/users/membership').then(r => setMembership(r.data.membership));
  }, [session]);

  const isPremium = membership?.status === 'active';

  const filtered = notes.filter(n =>
    (category === 'All' || n.category === category) &&
    n.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleDownload = (note: any) => {
    axios.post('/api/users/notes', { noteId: note._id });
    window.open(note.fileUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-amber-50/30 dark:bg-gray-950 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="text-center mb-10">
          <h1 className="font-playfair text-4xl font-bold text-gray-900 dark:text-white mb-2">Premium Notes</h1>
          <p className="text-gray-500 dark:text-gray-400">Beautifully crafted study material</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <Input placeholder="Search notes..." icon={<Search className="h-4 w-4" />} value={search} onChange={e => setSearch(e.target.value)} className="sm:max-w-xs" />
          <div className="flex gap-2 flex-wrap">
            {categories.map(c => (
              <button key={c} onClick={() => setCategory(c)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${category === c ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white' : 'bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-800'}`}>
                {c}
              </button>
            ))}
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <FileText className="h-12 w-12 mx-auto text-gray-300 mb-3" />
            <p className="text-gray-400">No notes available yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {filtered.map((n, i) => (
              <motion.div key={n._id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-5 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <div className="text-4xl mb-3">📄</div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant={n.tier === 'free' ? 'success' : 'gold'}>{n.tier === 'free' ? 'Free' : 'Premium'}</Badge>
                  <span className="text-xs text-gray-400">{n.category}</span>
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-1">{n.title}</h3>
                <p className="text-xs text-gray-500 mb-3 line-clamp-2">{n.description}</p>
                <div className="flex items-center gap-2 text-xs text-gray-400 mb-4">
                  <FileText className="h-3 w-3" />{n.downloads || 0} downloads
                </div>
                {n.tier === 'premium' && !isPremium ? (
                  <Link href="/membership">
                    <Button variant="outline" size="sm" className="w-full">
                      <Lock className="h-3.5 w-3.5" /> Unlock with Premium
                    </Button>
                  </Link>
                ) : (
                  <Button size="sm" className="w-full" onClick={() => handleDownload(n)}>
                    <Download className="h-3.5 w-3.5" /> Download PDF
                  </Button>
                )}
              </motion.div>
            ))}
          </div>
        )}

        {!isPremium && (
          <div className="mt-10 text-center bg-gradient-to-r from-amber-900 to-orange-900 rounded-3xl p-8 text-white">
            <div className="text-4xl mb-3">🔐</div>
            <h2 className="font-playfair text-2xl font-bold mb-2">Unlock All Premium Notes</h2>
            <p className="text-amber-200 mb-4">Get access to all notes with premium membership</p>
            <Link href="/membership"><Button className="bg-white text-orange-700 hover:bg-amber-50">Get Premium — ₹299/mo</Button></Link>
          </div>
        )}
      </div>
    </div>
  );
}