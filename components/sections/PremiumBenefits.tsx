'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import { CheckCircle, Crown } from 'lucide-react';

const FREE = ['Basic Sanskrit lessons', 'Selected free courses', 'Free notes & vocabulary', 'YouTube content'];
const PREMIUM = ['Everything in Free', 'All courses unlocked', 'Premium notes & PDFs', 'Quizzes & certificates', 'Audio pronunciation', 'Practice worksheets'];

export default function PremiumBenefits() {
  return (
    <section className="py-20 bg-white dark:bg-gray-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 text-sm font-medium mb-4">
            <Crown className="h-4 w-4" /> Membership Plans
          </div>
          <h2 className="font-playfair text-4xl font-bold text-gray-900 dark:text-white mb-3">Simple, Honest Pricing</h2>
          <p className="text-gray-500">Start free. Upgrade when ready.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Free */}
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="rounded-3xl border-2 border-gray-200 dark:border-gray-700 p-8 bg-white dark:bg-gray-900">
            <div className="text-3xl mb-3">🌱</div>
            <h3 className="font-playfair text-2xl font-bold text-gray-900 dark:text-white">Free</h3>
            <div className="text-4xl font-bold text-gray-900 dark:text-white my-3">₹0</div>
            <p className="text-sm text-gray-400 mb-6">Forever free</p>
            <ul className="space-y-3 mb-8">
              {FREE.map(f => (
                <li key={f} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <CheckCircle className="h-4 w-4 text-green-500 shrink-0" />{f}
                </li>
              ))}
            </ul>
            <Link href="/courses"><Button variant="outline" className="w-full">Start Free</Button></Link>
          </motion.div>

          {/* Premium */}
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="rounded-3xl border-2 border-orange-400 p-8 bg-gradient-to-br from-orange-500 to-amber-500 text-white relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white text-orange-600 text-xs font-bold px-4 py-1 rounded-full whitespace-nowrap">MOST POPULAR</div>
            <div className="text-3xl mb-3">👑</div>
            <h3 className="font-playfair text-2xl font-bold">Premium</h3>
            <div className="text-4xl font-bold my-3">₹299<span className="text-lg font-normal opacity-80">/month</span></div>
            <p className="text-sm opacity-70 mb-6">Cancel anytime</p>
            <ul className="space-y-3 mb-8">
              {PREMIUM.map(f => (
                <li key={f} className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 shrink-0" />{f}
                </li>
              ))}
            </ul>
            <Link href="/membership">
              <button className="w-full bg-white text-orange-600 font-bold py-3 rounded-xl hover:bg-orange-50 transition-colors flex items-center justify-center gap-2">
                <Crown className="h-5 w-5" /> Get Premium — ₹299/mo
              </button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}