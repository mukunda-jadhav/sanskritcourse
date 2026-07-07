'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from '@/components/ui/Toaster';
import Button from '@/components/ui/Button';

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<any[]>([]);

  const fetch = () => axios.get('/api/admin/reviews').then(r => setReviews(r.data));
  useEffect(() => { fetch(); }, []);

  const update = async (id: string, isApproved: boolean) => {
    await axios.patch('/api/admin/reviews', { id, isApproved });
    toast(isApproved ? 'Approved!' : 'Hidden!', 'success');
    fetch();
  };

  return (
    <div className="p-8">
      <h1 className="font-playfair text-2xl font-bold text-gray-900 dark:text-white mb-6">Reviews ({reviews.length})</h1>
      <div className="space-y-3">
        {reviews.map(r => (
          <div key={r._id} className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 p-4 flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-medium text-sm text-gray-900 dark:text-white">{r.userName}</span>
                <span className="text-xs text-gray-400">{r.userRole}</span>
                <span className="text-amber-400 text-xs">{'★'.repeat(r.rating)}</span>
              </div>
              <p className="text-sm text-gray-500">"{r.text}"</p>
            </div>
            <div className="flex gap-2 shrink-0">
              <Button size="sm" onClick={() => update(r._id, true)} variant={r.isApproved ? 'secondary' : 'primary'}>
                {r.isApproved ? 'Approved' : 'Approve'}
              </Button>
              {r.isApproved && <Button size="sm" variant="destructive" onClick={() => update(r._id, false)}>Hide</Button>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}