import Link from 'next/link';
import Button from '@/components/ui/Button';
import { Youtube } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-amber-50/30 dark:bg-gray-950 pt-20">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="text-6xl mb-4">ॐ</div>
          <h1 className="font-playfair text-4xl font-bold text-gray-900 dark:text-white mb-4">About Sanskrit Gurukul</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
            Sanskrit Gurukul is dedicated to making the ancient language of Sanskrit accessible to everyone.
          </p>
        </div>

        <div className="prose prose-gray dark:prose-invert max-w-none space-y-8">
          <div className="bg-white dark:bg-gray-900 rounded-3xl border border-orange-100 dark:border-gray-800 p-8">
            <h2 className="font-playfair text-2xl font-bold text-gray-900 dark:text-white mb-4">Our Mission</h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              We believe Sanskrit is not just a language — it is the key to understanding India's vast philosophical, literary, and spiritual heritage. Our mission is to teach Sanskrit in a structured, modern, and accessible way so that anyone can learn it regardless of background.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {[
              { emoji: '🎯', title: 'Structured Learning', desc: 'Carefully designed curriculum from basics to advanced' },
              { emoji: '🧑‍🏫', title: 'Expert Teaching', desc: 'Experienced Sanskrit scholars with modern pedagogy' },
              { emoji: '🌐', title: 'Accessible Everywhere', desc: 'Learn at your own pace from anywhere in the world' },
            ].map(i => (
              <div key={i.title} className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-5 text-center">
                <div className="text-3xl mb-3">{i.emoji}</div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{i.title}</h3>
                <p className="text-sm text-gray-500">{i.desc}</p>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-r from-amber-900 to-orange-900 rounded-3xl p-8 text-white text-center">
            <h2 className="font-playfair text-2xl font-bold mb-3">Start Your Journey</h2>
            <p className="text-amber-200 mb-5">Join 10,000+ learners exploring the beauty of Sanskrit</p>
            <div className="flex justify-center gap-3">
              <Link href="/membership"><Button className="bg-white text-orange-700 hover:bg-amber-50">Get Started</Button></Link>
              <a href="https://youtube.com/@PratikshaSanskritAcademy" target="_blank" rel="noreferrer">
                <Button variant="outline" className="border-white/40 text-white hover:bg-white/10">
                  <Youtube className="h-4 w-4" /> YouTube
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
