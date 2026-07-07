'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { Mail } from 'lucide-react';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async () => {
    if (!email) return;
    setSubmitted(true);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-amber-900 via-orange-900 to-amber-950">
      <div className="max-w-2xl mx-auto px-4 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="text-5xl mb-4">ॐ</div>
          <h2 className="font-playfair text-3xl font-bold text-white mb-3">Stay Connected with Sanskrit</h2>
          <p className="text-amber-200/80 mb-8">Get free Sanskrit lessons, tips, and updates delivered to your inbox.</p>

          {submitted ? (
            <div className="bg-green-500/20 border border-green-400/30 rounded-2xl p-6 text-green-300">
              <p className="font-semibold">🎉 Thank you for subscribing!</p>
              <p className="text-sm mt-1">You'll receive our next lesson in your inbox.</p>
            </div>
          ) : (
            <div className="flex gap-2 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                icon={<Mail className="h-4 w-4" />}
                className="flex-1 bg-white/10 border-white/20 text-white placeholder-white/50 focus:ring-amber-400"
              />
              <Button onClick={handleSubmit}>Subscribe</Button>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
