'use client';
import { motion } from 'framer-motion';
import { Youtube, ExternalLink } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function YouTubeSection() {
  return (
    <section className="py-20 bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm font-medium mb-4">
            <Youtube className="h-4 w-4" /> Free YouTube Content
          </div>
          <h2 className="font-playfair text-4xl font-bold text-gray-900 dark:text-white mb-3">Watch Free on YouTube</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">Hundreds of free videos to get you started</p>
          <div className="bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-950/20 dark:to-orange-950/20 rounded-3xl p-12 border border-red-100 dark:border-red-900/30 mb-8">
            <Youtube className="h-20 w-20 text-red-500 mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-400">Subscribe to our YouTube channel for free Sanskrit lessons</p>
          </div>
          <a href="https://youtube.com/@PratikshaSanskritAcademy" target="_blank" rel="noreferrer">
            <Button size="lg">
              <Youtube className="h-5 w-5 text-red-500" />
              Subscribe on YouTube
              <ExternalLink className="h-4 w-4" />
            </Button>
          </a>
        </motion.div>
      </div>
    </section>
  );
}