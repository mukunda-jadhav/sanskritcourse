'use client';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useTheme } from 'next-themes';
import axios from 'axios';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { toast } from '@/components/ui/Toaster';

export default function SettingsPage() {
  const { data: session } = useSession();
  const { theme, setTheme } = useTheme();
  const [name, setName] = useState(session?.user?.name || '');
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    try {
      await axios.patch('/api/users/profile', { name });
      toast('Profile updated!', 'success');
    } catch { toast('Failed', 'error'); }
    setLoading(false);
  };

  return (
    <div className="p-8 max-w-xl">
      <h1 className="font-playfair text-2xl font-bold text-gray-900 dark:text-white mb-6">Settings</h1>

      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6 mb-4">
        <h2 className="font-semibold text-gray-900 dark:text-white mb-4">Profile</h2>
        <div className="space-y-4">
          <Input label="Name" value={name} onChange={e => setName(e.target.value)} />
          <div>
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Email</p>
            <p className="px-4 py-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 text-sm text-gray-500">{session?.user?.email}</p>
          </div>
          <Button onClick={handleSave} loading={loading}>Save Changes</Button>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6">
        <h2 className="font-semibold text-gray-900 dark:text-white mb-4">Appearance</h2>
        <div className="flex gap-3">
          {['light', 'dark', 'system'].map(t => (
            <button key={t} onClick={() => setTheme(t)}
              className={`px-4 py-2 rounded-xl text-sm font-medium capitalize border transition-colors ${theme === t ? 'border-orange-400 bg-orange-50 text-orange-600 dark:bg-orange-950/30' : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400'}`}>
              {t}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}