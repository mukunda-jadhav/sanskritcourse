'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Award } from 'lucide-react';
import { formatDate } from '@/lib/utils';

export default function CertificatesPage() {
  const [certs, setCerts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/api/users/certificates').then(r => { setCerts(r.data); setLoading(false); });
  }, []);

  return (
    <div className="p-8">
      <h1 className="font-playfair text-2xl font-bold text-gray-900 dark:text-white mb-6">Certificates</h1>
      {loading ? <div className="animate-spin h-6 w-6 rounded-full border-2 border-orange-500 border-t-transparent" /> :
        certs.length === 0 ? (
          <div className="text-center py-20">
            <Award className="h-12 w-12 mx-auto text-gray-300 mb-3" />
            <p className="text-gray-400">Complete a course to earn a certificate.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {certs.map((c) => (
              <div key={c._id} className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 rounded-2xl border border-amber-200 dark:border-amber-800 p-6">
                <Award className="h-10 w-10 text-amber-500 mb-3" />
                <p className="font-playfair font-bold text-gray-900 dark:text-white">{c.courseId?.title}</p>
                <p className="text-xs text-gray-500 mt-1">Issued {formatDate(c.issuedAt)}</p>
                {c.certificateUrl && (
                  <a href={c.certificateUrl} target="_blank" rel="noreferrer"
                    className="mt-3 inline-block text-xs text-orange-500 font-medium hover:underline">Download →</a>
                )}
              </div>
            ))}
          </div>
        )}
    </div>
  );
}