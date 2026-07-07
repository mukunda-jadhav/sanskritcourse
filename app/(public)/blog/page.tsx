'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Clock, Eye } from 'lucide-react';
import Input from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import Link from 'next/link';

const BLOGS = [
  { slug: 'introduction-to-devanagari', title: 'Introduction to Devanagari Script', excerpt: 'Learn the 46 alphabets of Sanskrit script with pronunciation guide and writing tips.', category: 'Beginner', readTime: '8 min', views: 12400, emoji: '🔤', date: '2024-01-15' },
  { slug: 'sandhi-rules-explained', title: 'Sandhi Rules Made Simple', excerpt: 'A comprehensive guide to all Sanskrit sandhi rules with examples and practice exercises.', category: 'Grammar', readTime: '15 min', views: 8900, emoji: '🔗', date: '2024-01-20' },
  { slug: 'bhagavad-gita-chapter-1', title: 'Understanding Bhagavad Gita Chapter 1', excerpt: 'Deep dive into the first chapter — Arjuna Vishada Yoga — with Sanskrit word analysis.', category: 'Scripture', readTime: '20 min', views: 15600, emoji: '📿', date: '2024-02-01' },
  { slug: 'spoken-sanskrit-basics', title: 'Daily Spoken Sanskrit — 50 Phrases', excerpt: 'Start speaking Sanskrit today with these 50 essential conversational phrases.', category: 'Speaking', readTime: '10 min', views: 6700, emoji: '🗣️', date: '2024-02-10' },
  { slug: 'importance-of-sanskrit', title: 'Why Learn Sanskrit in 2024?', excerpt: 'The relevance of Sanskrit in modern times — linguistics, AI, and spiritual growth.', category: 'General', readTime: '6 min', views: 20000, emoji: '💡', date: '2024-02-15' },
  { slug: 'verb-conjugation-guide', title: 'Sanskrit Verb Conjugation — Complete Guide', excerpt: 'Master all 10 ganas and lakar forms with this step-by-step conjugation guide.', category: 'Grammar', readTime: '18 min', views: 7300, emoji: '📐', date: '2024-03-01' },
];

const categories = ['All', 'Beginner', 'Grammar', 'Scripture', 'Speaking', 'General'];

export default function BlogPage() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');

  const filtered = BLOGS.filter(b =>
    (category === 'All' || b.category === category) &&
    b.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-amber-50/30 dark:bg-gray-950 pt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="text-center mb-10">
          <h1 className="font-playfair text-4xl font-bold text-gray-900 dark:text-white mb-2">Sanskrit Blog</h1>
          <p className="text-gray-500 dark:text-gray-400">Articles, guides and insights on Sanskrit learning</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <Input placeholder="Search articles..." icon={<Search className="h-4 w-4" />} value={search} onChange={e => setSearch(e.target.value)} className="sm:max-w-xs" />
          <div className="flex gap-2 flex-wrap">
            {categories.map(c => (
              <button key={c} onClick={() => setCategory(c)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${category === c ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white' : 'bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400'}`}>
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((b, i) => (
            <motion.div key={b.slug} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <Link href={`/blog/${b.slug}`}
                className="block bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="h-36 bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30 flex items-center justify-center text-5xl">
                  {b.emoji}
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="default">{b.category}</Badge>
                    <span className="text-xs text-gray-400">{b.date}</span>
                  </div>
                  <h3 className="font-playfair font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">{b.title}</h3>
                  <p className="text-xs text-gray-500 mb-3 line-clamp-2">{b.excerpt}</p>
                  <div className="flex items-center gap-3 text-xs text-gray-400">
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{b.readTime} read</span>
                    <span className="flex items-center gap-1"><Eye className="h-3 w-3" />{b.views.toLocaleString()}</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
