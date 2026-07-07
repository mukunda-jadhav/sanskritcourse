'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Trophy } from 'lucide-react';
import { formatDate } from '@/lib/utils';

export default function QuizResultsPage() {
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/api/users/quiz-results').then(r => { setResults(r.data); setLoading(false); });
  }, []);

  return (
    <div className="p-8">
      <h1 className="font-playfair text-2xl font-bold text-gray-900 dark:text-white mb-6">Quiz Results</h1>
      {loading ? <div className="animate-spin h-6 w-6 rounded-full border-2 border-orange-500 border-t-transparent" /> :
        results.length === 0 ? (
          <div className="text-center py-20">
            <Trophy className="h-12 w-12 mx-auto text-gray-300 mb-3" />
            <p className="text-gray-400">No quiz attempts yet.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {results.map((r) => (
              <div key={r._id} className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 p-4 flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900 dark:text-white text-sm">{r.quizId?.title || 'Quiz'}</p>
                  <p className="text-xs text-gray-400">{formatDate(r.createdAt)}</p>
                </div>
                <div className="text-right">
                  <p className={`font-bold text-lg ${r.passed ? 'text-green-500' : 'text-red-500'}`}>{r.score}/{r.total}</p>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${r.passed ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {r.passed ? 'Passed' : 'Failed'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
    </div>
  );
}