'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import { Play, BookOpen, Star } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden sanskrit-pattern bg-gradient-to-br from-amber-50 via-orange-50 to-cream dark:from-gray-950 dark:via-amber-950/20 dark:to-gray-950">
      {/* Decorative orbs */}
      <div className="absolute top-20 right-10 w-96 h-96 bg-orange-300/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 left-10 w-80 h-80 bg-amber-300/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 text-sm font-medium mb-6"
            >
              <Star className="h-3.5 w-3.5 fill-current" />
              Trusted by 10,000+ Sanskrit learners
            </motion.div>

            <h1 className="font-playfair text-5xl sm:text-6xl font-bold text-gray-900 dark:text-white leading-tight mb-4">
              Learn Sanskrit from{' '}
              <span className="gradient-text">Basics to Mastery</span>
            </h1>

            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-8 max-w-xl">
              Learn Sanskrit Grammar, Spoken Sanskrit, Shlokas, Bhagavad Gita, Ramayana, Upanishads and much more — all in one place.
            </p>

            <div className="flex flex-wrap gap-3 mb-8">
              <Link href="/membership">
                <Button size="lg">
                  <BookOpen className="h-5 w-5" />
                  Start Learning
                </Button>
              </Link>
              <a href="https://youtube.com/@PratikshaSanskritAcademy" target="_blank" rel="noreferrer">
                <Button variant="outline" size="lg">
                  <Play className="h-5 w-5 fill-current" />
                  Watch on YouTube
                </Button>
              </a>
            </div>

            {/* Social proof */}
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                {['A', 'R', 'S', 'P', 'V'].map((l, i) => (
                  <div key={i} className="h-9 w-9 rounded-full bg-gradient-to-br from-orange-400 to-amber-500 border-2 border-white dark:border-gray-900 flex items-center justify-center text-white text-xs font-bold">
                    {l}
                  </div>
                ))}
              </div>
              <div>
                <div className="flex text-amber-400 text-sm">★★★★★</div>
                <p className="text-xs text-gray-500 dark:text-gray-400">4.9/5 from 500+ reviews</p>
              </div>
            </div>
          </motion.div>

          {/* Decorative card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="hidden lg:block"
          >
            <div className="relative">
              <div className="glass rounded-3xl p-8 shadow-2xl border border-white/40">
                <div className="text-center mb-6">
                  <div className="text-8xl mb-2">ॐ</div>
                  <h3 className="font-playfair text-2xl font-bold text-gray-800 dark:text-white">Sanskrit Gurukul</h3>
                  <p className="text-amber-600 text-sm mt-1">संस्कृत गुरुकुल</p>
                </div>
                <div className="space-y-3">
                  {[
                    { emoji: '📚', label: 'Sanskrit Grammar', desc: '500+ lessons' },
                    { emoji: '🕉️', label: 'Bhagavad Gita', desc: '18 chapters' },
                    { emoji: '🎙️', label: 'Spoken Sanskrit', desc: 'Conversational' },
                    { emoji: '📜', label: 'Vedic Texts', desc: 'Original scripts' },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center gap-3 p-3 rounded-xl bg-white/60 dark:bg-gray-800/60">
                      <span className="text-xl">{item.emoji}</span>
                      <div>
                        <p className="text-sm font-semibold text-gray-800 dark:text-white">{item.label}</p>
                        <p className="text-xs text-gray-500">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {/* Floating badges */}
              <motion.div animate={{ y: [0, -8, 0] }} transition={{ repeat: Infinity, duration: 3 }}
                className="absolute -top-4 -right-4 glass rounded-2xl p-3 shadow-lg">
                <p className="text-xs font-bold text-orange-600">🎓 Certificate</p>
                <p className="text-xs text-gray-500">On completion</p>
              </motion.div>
              <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 3.5 }}
                className="absolute -bottom-4 -left-4 glass rounded-2xl p-3 shadow-lg">
                <p className="text-xs font-bold text-green-600">✅ Lifetime Access</p>
                <p className="text-xs text-gray-500">All future courses</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
