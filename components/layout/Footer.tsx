import Link from 'next/link';
import { Youtube, Mail, MessageCircle } from 'lucide-react';

const links = {
  Learn: [
    { label: 'Courses', href: '/courses' },
    { label: 'Premium Notes', href: '/notes' },
    { label: 'Membership', href: '/membership' },
    { label: 'YouTube', href: '/youtube' },
  ],
  Info: [
    { label: 'About', href: '/about' },
    { label: 'Blog', href: '/blog' },
    { label: 'Contact', href: '/contact' },
  ],
  Legal: [
    { label: 'Privacy Policy', href: '/privacy-policy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Refund Policy', href: '/refund-policy' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-amber-950 text-amber-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-3xl text-amber-400">ॐ</span>
              <div>
                <div className="font-playfair font-bold text-lg text-white">Sanskrit Gurukul</div>
                <div className="text-xs text-amber-400">संस्कृत गुरुकुल</div>
              </div>
            </div>
            <p className="text-sm text-amber-200/70 leading-relaxed mb-4">
              Learn Sanskrit from basics to mastery. Explore grammar, shlokas, Bhagavad Gita, Upanishads and more.
            </p>
            <div className="flex gap-3">
              <a href="https://youtube.com/@PratikshaSanskritAcademy" target="_blank" rel="noreferrer"
                className="p-2 rounded-lg bg-amber-900 hover:bg-red-600 transition-colors">
                <Youtube className="h-4 w-4" />
              </a>
              <a href="mailto:contact@sanskritgurukul.com"
                className="p-2 rounded-lg bg-amber-900 hover:bg-amber-700 transition-colors">
                <Mail className="h-4 w-4" />
              </a>
              <a href="https://wa.me/91XXXXXXXXXX" target="_blank" rel="noreferrer"
                className="p-2 rounded-lg bg-amber-900 hover:bg-green-600 transition-colors">
                <MessageCircle className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Links */}
          {Object.entries(links).map(([section, items]) => (
            <div key={section}>
              <h4 className="font-semibold text-white mb-3">{section}</h4>
              <ul className="space-y-2">
                {items.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="text-sm text-amber-200/70 hover:text-amber-300 transition-colors">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-amber-900 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-xs text-amber-200/50">© {new Date().getFullYear()} Sanskrit Gurukul. All rights reserved.</p>
          <p className="text-xs text-amber-200/50">Made with ❤️ for Sanskrit learners</p>
        </div>
      </div>
    </footer>
  );
}
