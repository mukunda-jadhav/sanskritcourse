'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Search, Star, Clock, BookOpen, Users } from 'lucide-react';
import Input from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import Link from 'next/link';

const categories = ['All', 'Foundation', 'Grammar', 'Scripture', 'Speaking', 'Philosophy', 'Vedic'];
const difficulties = ['All', 'beginner', 'intermediate', 'advanced'];
const diffColors = { beginner: 'success', intermediate: 'warning', advanced: 'danger' } as const;

const FALLBACK = [
  { _id: '1', title: 'Sanskrit for Beginners', slug: 'sanskrit-for-beginners', category: 'Foundation', difficulty: 'beginner', duration: '20h', lessonsCount: 80, studentsCount: 3200, rating: 4.9, emoji: '🌱', description: 'Start from scratch with alphabets, basic grammar and simple sentences.' },
  { _id: '2', title: 'Bhagavad Gita', slug: 'bhagavad-gita', category: 'Scripture', difficulty: 'intermediate', duration: '40h', lessonsCount: 120, studentsCount: 5100, rating: 4.9, emoji: '📿', description: 'Study all 18 chapters with word-by-word meaning and grammar analysis.' },
  { _id: '3', title: 'Sanskrit Grammar', slug: 'sanskrit-grammar', category: 'Grammar', difficulty: 'intermediate', duration: '35h', lessonsCount: 110, studentsCount: 2800, rating: 4.8, emoji: '📐', description: 'Master Sandhi, Samasa, Karak, Vibhakti and verb conjugations.' },
  { _id: '4', title: 'Spoken Sanskrit', slug: 'spoken-sanskrit', category: 'Speaking', difficulty: 'beginner', duration: '15h', lessonsCount: 60, studentsCount: 2100, rating: 4.8, emoji: '🗣️', description: 'Conversational Sanskrit with daily vocabulary and dialogues.' },
  { _id: '5', title: 'Upanishads', slug: 'upanishads', category: 'Philosophy', difficulty: 'advanced', duration: '45h', lessonsCount: 140, studentsCount: 1900, rating: 4.9, emoji: '🕉️', description: 'Isha, Kena, Katha, Mundaka and other major Upanishads.' },
  { _id: '6', title: 'Vedic Sanskrit', slug: 'vedic-sanskrit', category: 'Vedic', difficulty: 'advanced', duration: '50h', lessonsCount: 160, studentsCount: 1200, rating: 4.7, emoji: '📜', description: 'Vedic grammar and chanting from Rigveda, Samaveda and Yajurveda.' },
];

export default function CoursesPage() {
  const [courses, setCourses] = useState<any[]>(FALLBACK);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [difficulty, setDifficulty] = useState('All');

  useEffect(() => {
    axios.get('/api/courses?limit=50').then(r => {
      if (r.data.courses?.length) setCourses(r.data.courses);
    }).catch(() => {});
  }, []);

  const filtered = courses.filter(c =>
    c.title.toLowerCase().includes(search.toLowerCase()) &&
    (category === 'All' || c.category === category) &&
    (difficulty === 'All' || c.difficulty === difficulty)
  );

  return (
    <div className="min-h-screen bg-amber-50/30 dark:bg-gray-950 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="text-center mb-10">
          <h1 className="font-playfair text-4xl font-bold text-gray-900 dark:text-white mb-2">All Courses</h1>
          <p className="text-gray-500 dark:text-gray-400">Learn Sanskrit from scratch to advanced mastery</p>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-4 mb-6 flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <Input placeholder="Search courses..." icon={<Search className="h-4 w-4" />} value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <div className="flex gap-2 flex-wrap">
            {difficulties.map(d => (
              <button key={d} onClick={() => setDifficulty(d)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-colors ${difficulty === d ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'}`}>
                {d}
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 mb-6">
          {categories.map(c => (
            <button key={c} onClick={() => setCategory(c)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${category === c ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow' : 'bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-800'}`}>
              {c}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((c, i) => (
            <motion.div key={c._id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="h-40 bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30 flex items-center justify-center text-6xl">
                {c.emoji || '📚'}
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant={diffColors[c.difficulty as keyof typeof diffColors] || 'default'}>{c.difficulty}</Badge>
                  <span className="text-xs text-gray-400">{c.category}</span>
                </div>
                <h3 className="font-playfair font-bold text-gray-900 dark:text-white mb-1">{c.title}</h3>
                <p className="text-xs text-gray-500 mb-4 line-clamp-2">{c.description}</p>
                <div className="flex items-center gap-3 text-xs text-gray-400 mb-4">
                  <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{c.duration || 'N/A'}</span>
                  <span className="flex items-center gap-1"><BookOpen className="h-3 w-3" />{c.lessonsCount || 0}</span>
                  <span className="flex items-center gap-1"><Users className="h-3 w-3" />{(c.studentsCount || 0).toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                    <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">{c.rating || '4.5'}</span>
                  </div>
                  <Link href={`/courses/${c.slug}`}>
                    <Button size="sm">View Course</Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-gray-500">No courses found.</div>
        )}
      </div>
    </div>
  );
}