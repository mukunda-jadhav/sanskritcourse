'use client';
import { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { Mail } from 'lucide-react';
import { toast } from '@/components/ui/Toaster';
import Link from 'next/link';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    setLoading(true);
    try {
      await axios.post('/api/auth/forgot-password', { email });
      setSent(true);
    } catch { toast('Email not found', 'error'); }
    setLoading(false);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
      <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl p-8 border border-orange-100 dark:border-gray-800">
        <div className="text-center mb-8">
          <div className="text-4xl mb-2">🔐</div>
          <h1 className="font-playfair text-2xl font-bold text-gray-900 dark:text-white">Forgot Password</h1>
          <p className="text-sm text-gray-500 mt-1">We'll send a reset link to your email</p>
        </div>
        {sent ? (
          <div className="text-center">
            <div className="text-5xl mb-4">📧</div>
            <p className="font-semibold text-gray-900 dark:text-white mb-2">Reset link sent!</p>
            <p className="text-sm text-gray-500 mb-4">Check your email inbox.</p>
            <Link href="/login" className="text-orange-500 text-sm font-medium hover:underline">Back to Login</Link>
          </div>
        ) : (
          <div className="space-y-4">
            <Input label="Email" type="email" placeholder="you@example.com" icon={<Mail className="h-4 w-4" />} value={email} onChange={e => setEmail(e.target.value)} />
            <Button className="w-full" onClick={submit} loading={loading}>Send Reset Link</Button>
            <p className="text-center text-sm text-gray-500"><Link href="/login" className="text-orange-500 hover:underline">Back to Login</Link></p>
          </div>
        )}
      </div>
    </motion.div>
  );
}