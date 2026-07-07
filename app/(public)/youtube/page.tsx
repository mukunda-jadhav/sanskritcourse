import { Youtube, ExternalLink } from 'lucide-react';
import Button from '@/components/ui/Button';

const playlists = [
  { title: 'Sanskrit for Beginners', videos: 45, emoji: '🌱', desc: 'Complete beginner course from alphabets to sentences' },
  { title: 'Bhagavad Gita Series', videos: 72, emoji: '📿', desc: 'Chapter-by-chapter study with word analysis' },
  { title: 'Grammar Masterclass', videos: 60, emoji: '📐', desc: 'Sandhi, Samasa, Karak and more' },
  { title: 'Sanskrit Shlokas', videos: 38, emoji: '🕉️', desc: 'Beautiful shlokas with meaning and recitation' },
];

const featured = [
  { id: 'dQw4w9WgXcQ', title: 'Sanskrit Alphabet - Complete Guide for Beginners' },
  { id: 'dQw4w9WgXcQ', title: 'Bhagavad Gita Chapter 1 - Full Analysis' },
  { id: 'dQw4w9WgXcQ', title: '50 Sanskrit Words You Must Know' },
];

export default function YouTubePage() {
  return (
    <div className="min-h-screen bg-amber-50/30 dark:bg-gray-950 pt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 dark:bg-red-900/20 text-red-600 text-sm font-medium mb-4">
            <Youtube className="h-4 w-4" /> Free YouTube Content
          </div>
          <h1 className="font-playfair text-4xl font-bold text-gray-900 dark:text-white mb-2">Watch Sanskrit Gurukul</h1>
          <p className="text-gray-500 mb-6">Hundreds of free lessons available on YouTube</p>
          <a href="https://www.youtube.com/@PratikshaSanskritAcademy" target="_blank" rel="noreferrer">
            <Button size="lg">
              <Youtube className="h-5 w-5 text-red-500" />
              Subscribe to Channel
              <ExternalLink className="h-4 w-4" />
            </Button>
          </a>
        </div>

        {/* Featured Videos */}
        <h2 className="font-playfair text-2xl font-bold text-gray-900 dark:text-white mb-5">Featured Videos</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
          {featured.map((v, i) => (
            <div key={i} className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden">
              <div className="aspect-video bg-gray-900">
                <iframe src={`https://www.youtube.com/embed/${v.id}`} className="w-full h-full" allowFullScreen title={v.title} />
              </div>
              <div className="p-3">
                <p className="text-sm font-medium text-gray-800 dark:text-white line-clamp-2">{v.title}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Playlists */}
        <h2 className="font-playfair text-2xl font-bold text-gray-900 dark:text-white mb-5">Playlists</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {playlists.map((p) => (
            <a key={p.title} href="https://youtube.com" target="_blank" rel="noreferrer"
              className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-5 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <div className="text-4xl mb-3">{p.emoji}</div>
              <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-1">{p.title}</h3>
              <p className="text-xs text-gray-500 mb-2">{p.desc}</p>
              <span className="text-xs text-orange-500 font-medium">{p.videos} videos →</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
