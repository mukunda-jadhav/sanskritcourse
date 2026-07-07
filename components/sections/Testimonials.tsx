'use client';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { toast } from '@/components/ui/Toaster';
import Button from '@/components/ui/Button';

export default function Testimonials() {
  const { data: session } = useSession();
  const [reviews, setReviews] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ rating: 5, text: '', userRole: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios.get('/api/reviews').then(r => setReviews(r.data));
  }, []);

  const submit = async () => {
    if (!form.text) return;
    setLoading(true);
    try {
      await axios.post('/api/reviews', form);
      toast('Review submitted! Pending approval.', 'success');
      setShowForm(false);
      setForm({ rating: 5, text: '', userRole: '' });
    } catch { toast('Login required', 'error'); }
    setLoading(false);
  };

  return (
    <section className="py-20 bg-amber-50/50 dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-playfair text-4xl font-bold text-gray-900 dark:text-white mb-3">What Our Students Say</h2>
          {reviews.length > 0 && (
            <div className="flex items-center justify-center gap-2 mt-2">
              <span className="text-amber-400 text-lg">{'★'.repeat(Math.round(reviews.reduce((a, r) => a + r.rating, 0) / reviews.length))}</span>
              <span className="text-sm text-gray-500">{(reviews.reduce((a, r) => a + r.rating, 0) / reviews.length).toFixed(1)}/5 from {reviews.length} reviews</span>
            </div>
          )}
        </div>

        {reviews.length === 0 ? (
          <p className="text-center text-gray-400 mb-8">No reviews yet. Be the first!</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {reviews.map((r, i) => (
              <motion.div key={r._id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} viewport={{ once: true }}
                className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-orange-100 dark:border-gray-800 shadow-sm">
                <div className="text-amber-400 mb-3">{'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}</div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">"{r.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-orange-400 to-amber-500 flex items-center justify-center text-white font-bold">
                    {r.userName?.[0]?.toUpperCase()}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">{r.userName}</p>
                    <p className="text-xs text-gray-500">{r.userRole}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Submit review */}
        <div className="text-center">
          {!showForm ? (
            <Button variant="outline" onClick={() => session ? setShowForm(true) : toast('Login to write a review', 'info')}>
              ✍️ Write a Review
            </Button>
          ) : (
            <div className="max-w-md mx-auto bg-white dark:bg-gray-900 rounded-2xl border border-orange-100 dark:border-gray-800 p-6 text-left">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Share your experience</h3>
              <div className="mb-3">
                <label className="text-sm text-gray-600 dark:text-gray-400 mb-1 block">Rating</label>
                <div className="flex gap-1">
                  {[1,2,3,4,5].map(s => (
                    <button key={s} onClick={() => setForm({...form, rating: s})}
                      className={`text-2xl ${s <= form.rating ? 'text-amber-400' : 'text-gray-300'}`}>★</button>
                  ))}
                </div>
              </div>
              <div className="mb-3">
                <label className="text-sm text-gray-600 dark:text-gray-400 mb-1 block">Your Role (optional)</label>
                <input value={form.userRole} onChange={e => setForm({...form, userRole: e.target.value})}
                  placeholder="e.g. Student, Teacher..."
                  className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-400" />
              </div>
              <div className="mb-4">
                <label className="text-sm text-gray-600 dark:text-gray-400 mb-1 block">Review</label>
                <textarea rows={3} value={form.text} onChange={e => setForm({...form, text: e.target.value})}
                  placeholder="Share your learning experience..."
                  className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-400 resize-none" />
              </div>
              <div className="flex gap-2">
                <Button onClick={submit} loading={loading}>Submit</Button>
                <Button variant="ghost" onClick={() => setShowForm(false)}>Cancel</Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}