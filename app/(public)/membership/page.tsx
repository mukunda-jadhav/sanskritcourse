'use client';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { CheckCircle, Crown, Lock, Copy, Smartphone, Upload } from 'lucide-react';
import { toast } from '@/components/ui/Toaster';
import axios from 'axios';

const FREE_FEATURES = ['Basic Sanskrit lessons', 'Selected free courses', 'Free notes & vocabulary', 'YouTube content access'];
const PREMIUM_FEATURES = ['Everything in Free', 'All 50+ courses unlocked', 'All premium notes & PDFs', 'Quizzes & assignments', 'Completion certificates', 'Audio pronunciation guide', 'Practice worksheets', 'Priority support'];

const UPI_ID = process.env.NEXT_PUBLIC_UPI_ID || 'yourname@upi';

const schema = z.object({
  phone: z.string().min(10, 'Valid phone required'),
  transactionId: z.string().min(6, 'Enter UTR/Transaction ID'),
});
type FormData = z.infer<typeof schema>;

export default function MembershipPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [step, setStep] = useState<'select' | 'pay' | 'verify' | 'done'>('select');
  const [copied, setCopied] = useState(false);
  const PRICE = 299;
  const upiLink = `upi://pay?pa=${UPI_ID}&pn=Sanskrit%20Gurukul&am=${PRICE}&cu=INR&tn=Sanskrit%20Gurukul%20Premium`;

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({ resolver: zodResolver(schema) });

  const copyUPI = () => { navigator.clipboard.writeText(UPI_ID); setCopied(true); toast('Copied!', 'success'); setTimeout(() => setCopied(false), 2000); };

  const onSubmit = async (data: FormData) => {
    if (!session) { router.push('/login?callbackUrl=/membership'); return; }
    try {
      await axios.post('/api/payments', { plan: 'monthly', ...data });
      setStep('done');
      toast('Submitted! We will verify shortly.', 'success');
    } catch { toast('Submission failed', 'error'); }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 dark:from-gray-950 dark:to-amber-950/10 pt-20">
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="font-playfair text-4xl font-bold text-gray-900 dark:text-white mb-3">Choose Your Plan</h1>
          <p className="text-gray-500">Start free, upgrade when you're ready</p>
        </div>

        {step === 'select' && (
          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {/* Free Plan */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-gray-900 rounded-3xl border-2 border-gray-200 dark:border-gray-700 p-8">
              <div className="text-3xl mb-2">🌱</div>
              <h2 className="font-playfair text-2xl font-bold text-gray-900 dark:text-white mb-1">Free</h2>
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">₹0</div>
              <p className="text-sm text-gray-400 mb-6">Forever free</p>
              <ul className="space-y-3 mb-8">
                {FREE_FEATURES.map(f => (
                  <li key={f} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <CheckCircle className="h-4 w-4 text-green-500 shrink-0" />{f}
                  </li>
                ))}
              </ul>
              <Button variant="outline" className="w-full" onClick={() => router.push('/courses')}>
                Start Free
              </Button>
            </motion.div>

            {/* Premium Plan */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              className="bg-gradient-to-br from-orange-500 to-amber-500 rounded-3xl border-2 border-orange-400 p-8 text-white relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white text-orange-600 text-xs font-bold px-4 py-1 rounded-full">MOST POPULAR</div>
              <div className="text-3xl mb-2">👑</div>
              <h2 className="font-playfair text-2xl font-bold mb-1">Premium</h2>
              <div className="text-3xl font-bold mb-1">₹299<span className="text-lg font-normal opacity-80">/month</span></div>
              <p className="text-sm opacity-70 mb-6">Cancel anytime</p>
              <ul className="space-y-3 mb-8">
                {PREMIUM_FEATURES.map(f => (
                  <li key={f} className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 shrink-0" />{f}
                  </li>
                ))}
              </ul>
              <button onClick={() => { if (!session) { router.push('/login?callbackUrl=/membership'); return; } setStep('pay'); }}
                className="w-full bg-white text-orange-600 font-bold py-3 rounded-xl hover:bg-orange-50 transition-colors flex items-center justify-center gap-2">
                <Crown className="h-5 w-5" /> Get Premium — ₹299/mo
              </button>
            </motion.div>
          </div>
        )}

        {step === 'pay' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-sm mx-auto">
            <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 border border-orange-100 dark:border-gray-800 shadow-xl text-center">
              <div className="bg-orange-50 dark:bg-orange-950/30 rounded-xl p-3 inline-block mb-2">
                <Crown className="h-6 w-6 text-orange-500" />
              </div>
              <h2 className="font-playfair text-xl font-bold text-gray-900 dark:text-white mb-1">Pay ₹299</h2>
              <p className="text-sm text-gray-400 mb-6">Scan QR or use UPI ID below</p>
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-white rounded-2xl border-2 border-orange-200 shadow-inner">
                  <QRCodeSVG value={upiLink} size={160} />
                </div>
              </div>
              <div className="flex items-center gap-2 bg-amber-50 dark:bg-amber-950/30 rounded-xl p-3 mb-4">
                <div className="flex-1 text-left">
                  <p className="text-xs text-gray-400">UPI ID</p>
                  <p className="font-semibold text-gray-900 dark:text-white text-sm">{UPI_ID}</p>
                </div>
                <Button variant="outline" size="sm" onClick={copyUPI}><Copy className="h-4 w-4" />{copied ? 'Copied!' : 'Copy'}</Button>
              </div>
              <a href={upiLink}><Button variant="secondary" className="w-full mb-3"><Smartphone className="h-4 w-4" />Open UPI App</Button></a>
              <Button className="w-full" onClick={() => setStep('verify')}>I Have Paid</Button>
            </div>
          </motion.div>
        )}

        {step === 'verify' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-sm mx-auto">
            <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 border border-orange-100 dark:border-gray-800 shadow-xl">
              <h2 className="font-playfair text-xl font-bold text-gray-900 dark:text-white mb-1">Verify Payment</h2>
              <p className="text-sm text-gray-400 mb-6">Enter your transaction details</p>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="bg-amber-50 dark:bg-amber-950/30 rounded-xl p-3 text-sm flex justify-between">
                  <span className="text-gray-500">Amount Paid</span>
                  <span className="font-bold text-orange-600">₹299</span>
                </div>
                <Input label="Phone Number" type="tel" placeholder="9876543210" error={errors.phone?.message} {...register('phone')} />
                <Input label="Transaction ID (UTR)" placeholder="e.g. 423812381231" error={errors.transactionId?.message} {...register('transactionId')} />
                <Button type="submit" className="w-full" loading={isSubmitting}><Upload className="h-4 w-4" />Submit</Button>
              </form>
            </div>
          </motion.div>
        )}

        {step === 'done' && (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="max-w-sm mx-auto text-center">
            <div className="bg-white dark:bg-gray-900 rounded-3xl p-10 border border-green-200 shadow-xl">
              <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>
              <h2 className="font-playfair text-2xl font-bold text-gray-900 dark:text-white mb-2">Submitted!</h2>
              <p className="text-gray-400 text-sm mb-6">We'll verify and activate your premium access within a few hours.</p>
              <Button onClick={() => router.push('/dashboard')} className="w-full">Go to Dashboard</Button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}