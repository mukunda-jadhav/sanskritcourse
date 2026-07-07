'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { formatDate, formatCurrency } from '@/lib/utils';
import { Badge } from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { CheckCircle, XCircle, Clock, Eye } from 'lucide-react';
import { toast } from '@/components/ui/Toaster';

export default function AdminPaymentsPage() {
  const [payments, setPayments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('pending');
  const [rejectId, setRejectId] = useState<string | null>(null);
  const [reason, setReason] = useState('');

  const fetchPayments = async () => {
    setLoading(true);
    const { data } = await axios.get('/api/payments');
    setPayments(data);
    setLoading(false);
  };

  useEffect(() => { fetchPayments(); }, []);

  const handleAction = async (id: string, action: 'approve' | 'reject') => {
    try {
      await axios.patch(`/api/payments/${id}`, { action, rejectionReason: reason });
      toast(`Payment ${action}d successfully`, 'success');
      setRejectId(null);
      setReason('');
      fetchPayments();
    } catch {
      toast('Action failed', 'error');
    }
  };

  const filtered = filter === 'all' ? payments : payments.filter(p => p.status === filter);

  const statusVariant = { pending: 'warning', approved: 'success', rejected: 'danger' } as const;

  return (
    <div className="p-6 md:p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-playfair text-2xl font-bold text-gray-900 dark:text-white">Payment Requests</h1>
          <p className="text-gray-500 text-sm mt-1">Review and approve UPI payment submissions</p>
        </div>
        <div className="flex gap-2">
          {(['all', 'pending', 'approved', 'rejected'] as const).map((f) => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-colors ${
                filter === f ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}>
              {f} {f !== 'all' && `(${payments.filter(p => p.status === f).length})`}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><div className="animate-spin h-8 w-8 rounded-full border-2 border-orange-500 border-t-transparent" /></div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20 text-gray-500">No {filter} payments found</div>
      ) : (
        <div className="space-y-4">
          {filtered.map((p) => (
            <div key={p._id} className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div>
                    <p className="text-xs text-gray-400">Student</p>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">{p.userName}</p>
                    <p className="text-xs text-gray-500">{p.userEmail}</p>
                    <p className="text-xs text-gray-500">{p.phone}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Plan</p>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white capitalize">{p.plan}</p>
                    <p className="text-sm font-bold text-orange-600">{formatCurrency(p.amount)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Transaction ID</p>
                    <p className="text-sm font-mono text-gray-900 dark:text-white break-all">{p.transactionId}</p>
                    <p className="text-xs text-gray-400 mt-1">{formatDate(p.createdAt)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 mb-1">Status</p>
                    <Badge variant={statusVariant[p.status as keyof typeof statusVariant]}>
                      {p.status === 'pending' && <Clock className="h-3 w-3 mr-1" />}
                      {p.status === 'approved' && <CheckCircle className="h-3 w-3 mr-1" />}
                      {p.status === 'rejected' && <XCircle className="h-3 w-3 mr-1" />}
                      {p.status}
                    </Badge>
                    {p.rejectionReason && <p className="text-xs text-red-500 mt-1">{p.rejectionReason}</p>}
                  </div>
                </div>

                {p.status === 'pending' && (
                  <div className="flex flex-col gap-2 shrink-0">
                    <Button size="sm" variant="primary" onClick={() => handleAction(p._id, 'approve')}>
                      <CheckCircle className="h-3.5 w-3.5" /> Approve
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => setRejectId(p._id)}>
                      <XCircle className="h-3.5 w-3.5" /> Reject
                    </Button>
                    {p.screenshot && (
                      <a href={p.screenshot} target="_blank" rel="noreferrer">
                        <Button size="sm" variant="outline"><Eye className="h-3.5 w-3.5" /> Screenshot</Button>
                      </a>
                    )}
                  </div>
                )}
              </div>

              {/* Reject modal inline */}
              {rejectId === p._id && (
                <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Rejection Reason</p>
                  <input
                    value={reason} onChange={(e) => setReason(e.target.value)}
                    placeholder="e.g. Transaction ID not found, Amount mismatch..."
                    className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-2.5 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-400 mb-2"
                  />
                  <div className="flex gap-2">
                    <Button size="sm" variant="destructive" onClick={() => handleAction(p._id, 'reject')}>Confirm Reject</Button>
                    <Button size="sm" variant="ghost" onClick={() => setRejectId(null)}>Cancel</Button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
