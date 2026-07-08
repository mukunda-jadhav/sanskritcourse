'use client';
import { useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import axios from 'axios';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { Lock } from 'lucide-react';
import { toast } from '@/components/ui/Toaster';
import { motion } from 'framer-motion';

function ResetPasswordForm() {
  const params = useSearchParams();
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    setLoading(true);
    try {
      await axios.post('/api/auth/reset-password', { token: params.get('token'), password });
      toast('Password reset! Please login.', 'success');
      router.push('/login');
    } catch { toast('Invalid or expired link', 'error'); }
    setLoading(false);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
      <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl p-8 border border-orange-100 dark:border-gray-800">
        <div className="text-center mb-8">
          <div className="text-4xl mb-2">🔑</div>
          <h1 className="font-playfair text-2xl font-bold text-gray-900 dark:text-white">Reset Password</h1>
        </div>
        <div className="space-y-4">
          <Input label="New Password" type="password" placeholder="Min 6 characters" icon={<Lock className="h-4 w-4" />} value={password} onChange={e => setPassword(e.target.value)} />
          <Button className="w-full" onClick={submit} loading={loading}>Reset Password</Button>
        </div>
      </div>
    </motion.div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div className="text-center text-gray-400">Loading...</div>}>
      <ResetPasswordForm />
    </Suspense>
  );
}