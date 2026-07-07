'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Badge } from '@/components/ui/Badge';
import { Star, Clock, BookOpen, Users } from 'lucide-react';
import Button from '@/components/ui/Button';

const diffColors = { beginner: 'success', intermediate: 'warning', advanced: 'danger' } as const;

export default function FeaturedCourses() {
  const [courses, setCourses] = useState<any[]>([]);

  useEffect(() => {
    axios.get('/api/courses?limit=6').then(r => setCourses(r.data.courses || []));
  }, []);

  if (!courses.length) return null;

  return (
    <section className="py-20 bg-amber-50/50 dark:bg-gray-950 sanskrit-pattern">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <h2 className="font-playfair text-4xl font-bold text-gray-900 dark:text-white mb-3">Featured Courses</h2>
          <p className="text-gray-600 dark:text-gray-400">Begin your sacred journey into the language of the gods</p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((c, i) => (
            <motion.div key={c._id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} viewport={{ once: true }}
              className="group bg-white dark:bg-gray-900 rounded-2xl border border-orange-100 dark:border-gray-800 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="h-40 bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30 flex items-center justify-center text-6xl">
                {c.emoji || '📚'}
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant={diffColors[c.difficulty as keyof typeof diffColors] || 'default'}>{c.difficulty}</Badge>
                  <span className="text-xs text-gray-400">{c.category}</span>
                </div>
                <h3 className="font-playfair font-bold text-gray-900 dark:text-white mb-2">{c.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 line-clamp-2">{c.description}</p>
                <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
                  <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{c.duration || '0h'}</span>
                  <span className="flex items-center gap-1"><BookOpen className="h-3 w-3" />{c.lessonsCount || 0} lessons</span>
                  <span className="flex items-center gap-1"><Users className="h-3 w-3" />{c.studentsCount || 0}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-500">
                    <Star className="h-4 w-4 fill-current" />
                    <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">{c.rating || 4.5}</span>
                  </div>
                  <Link href={`/courses/${c.slug}`}><Button size="sm">View Course</Button></Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link href="/courses"><Button variant="outline" size="lg">View All Courses</Button></Link>
        </div>
      </div>
    </section>
  );
}