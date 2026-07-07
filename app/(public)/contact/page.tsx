'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MessageCircle, Youtube, Send } from 'lucide-react';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { toast } from '@/components/ui/Toaster';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    setTimeout(() => {
      toast('Message sent! We will reply within 24 hours.', 'success');
      setForm({ name: '', email: '', subject: '', message: '' });
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-amber-50/30 dark:bg-gray-950 pt-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="text-center mb-10">
          <h1 className="font-playfair text-4xl font-bold text-gray-900 dark:text-white mb-2">Contact Us</h1>
          <p className="text-gray-500 dark:text-gray-400">We'd love to hear from you</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 p-8">
              <h2 className="font-playfair text-xl font-bold text-gray-900 dark:text-white mb-6">Send a Message</h2>
              <div className="space-y-4">
                <Input label="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Your name" />
                <Input label="Email" type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="you@example.com" />
                <Input label="Subject" value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })} placeholder="How can we help?" />
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Message</label>
                  <textarea rows={5} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
                    placeholder="Write your message..."
                    className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-2.5 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-400 resize-none" />
                </div>
                <Button onClick={handleSubmit} loading={loading} className="w-full">
                  <Send className="h-4 w-4" /> Send Message
                </Button>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-5">
            {[
              { icon: Mail, label: 'Email', value: 'contact@sanskritgurukul.com', href: 'mailto:contact@sanskritgurukul.com', color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-900/20' },
              { icon: MessageCircle, label: 'WhatsApp', value: '+91 XXXXX XXXXX', href: 'https://wa.me/91XXXXXXXXXX', color: 'text-green-500', bg: 'bg-green-50 dark:bg-green-900/20' },
              { icon: Youtube, label: 'YouTube', value: '@SanskritGurukul', href: 'https://youtube.com', color: 'text-red-500', bg: 'bg-red-50 dark:bg-red-900/20' },
            ].map((item) => (
              <a key={item.label} href={item.href} target="_blank" rel="noreferrer"
                className="flex items-center gap-4 p-5 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 hover:shadow-md transition-shadow">
                <div className={`h-12 w-12 rounded-xl ${item.bg} flex items-center justify-center`}>
                  <item.icon className={`h-6 w-6 ${item.color}`} />
                </div>
                <div>
                  <p className="text-xs text-gray-400">{item.label}</p>
                  <p className="font-semibold text-gray-900 dark:text-white">{item.value}</p>
                </div>
              </a>
            ))}

            <div className="bg-gradient-to-br from-amber-900 to-orange-900 rounded-2xl p-6 text-white">
              <div className="text-3xl mb-3">ॐ</div>
              <h3 className="font-playfair text-lg font-bold mb-2">Response Time</h3>
              <p className="text-amber-200 text-sm">We typically reply within 24 hours. For urgent membership queries, WhatsApp is fastest.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
