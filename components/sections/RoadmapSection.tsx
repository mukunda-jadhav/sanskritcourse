'use client';
import { motion } from 'framer-motion';

const steps = [
  { step: '01', title: 'Devanagari Script', desc: 'Learn to read and write all 46 Sanskrit alphabets with correct pronunciation.', emoji: '🔤' },
  { step: '02', title: 'Basic Grammar', desc: 'Understand nouns, pronouns, verbs, and sentence construction fundamentals.', emoji: '📐' },
  { step: '03', title: 'Sandhi & Samasa', desc: 'Master the rules of word joining and compound formation.', emoji: '🔗' },
  { step: '04', title: 'Shlokas & Texts', desc: 'Read and understand Bhagavad Gita, Ramayana and Upanishads in original Sanskrit.', emoji: '📿' },
  { step: '05', title: 'Vedic Sanskrit', desc: 'Explore the ancient Vedic language and chant mantras with proper svara.', emoji: '🕉️' },
  { step: '06', title: 'Mastery', desc: 'Achieve fluency in reading, writing and understanding Sanskrit literature.', emoji: '🎓' },
];

export default function RoadmapSection() {
  return (
    <section className="py-20 bg-amber-50/50 dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <h2 className="font-playfair text-4xl font-bold text-gray-900 dark:text-white mb-3">Your Learning Roadmap</h2>
          <p className="text-gray-600 dark:text-gray-400">A structured path from beginner to Sanskrit scholar</p>
        </motion.div>

        <div className="relative">
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-orange-300 to-amber-300 hidden lg:block" />
          <div className="space-y-8">
            {steps.map((s, i) => (
              <motion.div key={s.step}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }} whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }} viewport={{ once: true }}
                className={`flex items-center gap-6 ${i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
              >
                <div className={`flex-1 ${i % 2 === 0 ? 'lg:text-right' : 'lg:text-left'}`}>
                  <div className="bg-white dark:bg-gray-900 rounded-2xl p-5 border border-orange-100 dark:border-gray-800 shadow-sm inline-block text-left">
                    <span className="text-3xl mb-2 block">{s.emoji}</span>
                    <div className="text-xs font-bold text-orange-500 mb-1">STEP {s.step}</div>
                    <h3 className="font-playfair font-bold text-gray-900 dark:text-white mb-1">{s.title}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{s.desc}</p>
                  </div>
                </div>
                <div className="hidden lg:flex h-10 w-10 rounded-full bg-gradient-to-br from-orange-400 to-amber-500 items-center justify-center text-white text-sm font-bold shrink-0 z-10 shadow-lg">
                  {s.step}
                </div>
                <div className="flex-1 hidden lg:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
