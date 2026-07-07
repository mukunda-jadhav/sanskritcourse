'use client';
import Link from 'next/link';
import {  Star } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { BookOpen, FileText, Award, Bookmark, Settings, LogOut, LayoutDashboard, ClipboardList, Shield, Users, CreditCard, BarChart3, Megaphone, Tag, Home} from 'lucide-react';
import { cn } from '@/lib/utils';

const studentLinks = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/dashboard/courses', label: 'My Courses', icon: BookOpen },
  { href: '/dashboard/notes', label: 'Downloaded Notes', icon: FileText },
  { href: '/dashboard/quiz-results', label: 'Quiz Results', icon: ClipboardList },
  { href: '/dashboard/certificates', label: 'Certificates', icon: Award },
  { href: '/dashboard/bookmarks', label: 'Bookmarks', icon: Bookmark },
  { href: '/dashboard/settings', label: 'Settings', icon: Settings },
  
];

const adminLinks = [
  { href: '/admin', label: 'Overview', icon: BarChart3 },
  { href: '/admin/courses', label: 'Courses', icon: BookOpen },
  { href: '/admin/notes', label: 'Notes', icon: FileText },
  { href: '/admin/blog', label: 'Blog', icon: FileText },
  { href: '/admin/students', label: 'Students', icon: Users },
  { href: '/admin/payments', label: 'Payments', icon: CreditCard },
  { href: '/admin/analytics', label: 'Analytics', icon: BarChart3 },
  { href: '/admin/announcements', label: 'Announcements', icon: Megaphone },
  { href: '/admin/coupons', label: 'Coupons', icon: Tag },
  { href: '/admin/settings', label: 'Settings', icon: Settings },
  { href: '/admin/reviews', label: 'Reviews', icon: Star },
];

export default function DashboardSidebar({ user }: { user: any }) {
  const pathname = usePathname();
  const isAdmin = user?.role === 'admin';
  const links = isAdmin ? adminLinks : studentLinks;

  return (
    <aside className="w-64 shrink-0 border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 flex flex-col h-screen sticky top-0">
      {/* Logo */}
      <div className="p-5 border-b border-gray-100 dark:border-gray-800">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl">ॐ</span>
          <div>
            <div className="font-playfair font-bold text-sm gradient-text">Sanskrit Gurukul</div>
            {isAdmin && <span className="text-xs bg-orange-100 text-orange-600 px-1.5 py-0.5 rounded font-medium dark:bg-orange-900/30 dark:text-orange-400">Admin</span>}
          </div>
        </Link>
      </div>

      {/* User */}
      <div className="p-4 border-b border-gray-100 dark:border-gray-800">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-full bg-gradient-to-br from-orange-400 to-amber-500 flex items-center justify-center text-white font-bold text-sm shrink-0">
            {user?.name?.[0]?.toUpperCase() || 'U'}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">{user?.name}</p>
            <p className="text-xs text-gray-500 truncate">{user?.email}</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto p-3">
        <div className="space-y-1">
          {links.map((l) => (
            <Link key={l.href} href={l.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors',
                pathname === l.href
                  ? 'bg-orange-100 text-orange-700 dark:bg-orange-950/40 dark:text-orange-400'
                  : 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800'
              )}>
              <l.icon className="h-4 w-4 shrink-0" />
              {l.label}
            </Link>
          ))}
        </div>
      </nav>

      {/* Bottom */}
      <div className="p-3 border-t border-gray-100 dark:border-gray-800 space-y-1">
        <Link href="/" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 transition-colors">
          <Home className="h-4 w-4" /> Back to Site
        </Link>
        <button onClick={() => signOut({ callbackUrl: '/' })}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors">
          <LogOut className="h-4 w-4" /> Sign Out
        </button>
      </div>
    </aside>
  );
}
