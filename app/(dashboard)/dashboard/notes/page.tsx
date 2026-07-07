'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { FileText, Download } from 'lucide-react';
import { formatDate } from '@/lib/utils';

export default function MyNotesPage() {
  const [downloads, setDownloads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/api/users/notes').then(r => { setDownloads(r.data); setLoading(false); });
  }, []);

  return (
    <div className="p-8">
      <h1 className="font-playfair text-2xl font-bold text-gray-900 dark:text-white mb-6">Downloaded Notes</h1>
      {loading ? <div className="animate-spin h-6 w-6 rounded-full border-2 border-orange-500 border-t-transparent" /> :
        downloads.length === 0 ? (
          <div className="text-center py-20">
            <FileText className="h-12 w-12 mx-auto text-gray-300 mb-3" />
            <p className="text-gray-400">No downloaded notes yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {downloads.map((d) => (
              <div key={d._id} className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FileText className="h-8 w-8 text-orange-400" />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white text-sm">{d.noteId?.title}</p>
                    <p className="text-xs text-gray-400">{d.noteId?.category} • {formatDate(d.createdAt)}</p>
                  </div>
                </div>
                {d.noteId?.fileUrl && (
                  <a href={d.noteId.fileUrl} target="_blank" rel="noreferrer"
                    onClick={() => axios.post('/api/users/notes', { noteId: d.noteId._id })}
                    className="text-orange-500 hover:text-orange-600">
                    <Download className="h-5 w-5" />
                  </a>
                )}
              </div>
            ))}
          </div>
        )}
    </div>
  );
}