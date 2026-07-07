'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqs = [
  { q: 'Do I need any prior knowledge of Sanskrit?', a: 'No! Our beginner course starts from zero — the Devanagari script, basic pronunciation and everything you need.' },
  { q: 'What does the membership include?', a: 'Membership gives unlimited access to all 50+ courses, premium PDF notes, quizzes, assignments, certificates and future content.' },
  { q: 'How does the manual UPI payment work?', a: 'You pay via UPI to our ID, submit your transaction ID, and our team verifies and activates your membership within a few hours.' },
  { q: 'Are the certificates recognized?', a: 'Our completion certificates demonstrate your Sanskrit proficiency and are great for personal achievement, though not affiliated with formal institutions.' },
  { q: 'Can I download the course content?', a: 'Premium members can download PDF notes and worksheets. Video content is available for online streaming.' },
  { q: 'Is there a refund policy?', a: 'Yes, we offer refunds within 7 days of purchase if you are not satisfied. See our Refund Policy page for details.' },
];

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="py-20 bg-white dark:bg-gray-950">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <h2 className="font-playfair text-4xl font-bold text-gray-900 dark:text-white mb-3">Frequently Asked Questions</h2>
        </motion.div>
        <div className="space-y-3">
          {faqs.map((f, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} viewport={{ once: true }}
              className="rounded-2xl border border-orange-100 dark:border-gray-800 overflow-hidden">
              <button onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left bg-white dark:bg-gray-900 hover:bg-orange-50 dark:hover:bg-orange-950/20 transition-colors">
                <span className="font-medium text-gray-900 dark:text-white text-sm">{f.q}</span>
                <ChevronDown className={`h-5 w-5 text-orange-500 transition-transform shrink-0 ml-3 ${open === i ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden">
                    <p className="px-5 pb-5 text-sm text-gray-600 dark:text-gray-400 bg-amber-50/50 dark:bg-amber-950/10">{f.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
