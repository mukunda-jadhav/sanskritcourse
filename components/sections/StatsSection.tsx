'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Users, BookOpen, Clock, Download } from 'lucide-react';
import axios from 'axios';

export default function StatsSection() {
  const [stats, setStats] = useState({ students: 0, courses: 0, enrollments: 0, downloads: 0 });

  useEffect(() => {
    axios.get('/api/stats').then(r => setStats(r.data));
  }, []);

  const items = [
    { icon: Users, value: stats.students, label: 'Students Enrolled', color: 'text-orange-500' },
    { icon: BookOpen, value: stats.courses, label: 'Courses', color: 'text-amber-500' },
    { icon: Clock, value: stats.enrollments, label: 'Enrollments', color: 'text-yellow-500' },
    { icon: Download, value: stats.downloads, label: 'Downloads', color: 'text-red-500' },
  ];

  return (
    <section className="py-16 bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} viewport={{ once: true }}
              className="text-center p-6 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 dark:from-gray-900 dark:to-amber-950/20 border border-orange-100 dark:border-orange-900/30">
              <s.icon className={`h-8 w-8 mx-auto mb-3 ${s.color}`} />
              <div className="font-playfair text-3xl font-bold text-gray-900 dark:text-white">{s.value.toLocaleString()}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}