import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import { Providers } from '@/components/layout/Providers';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Sanskrit Gurukul - Learn Sanskrit Online',
    template: '%s | Sanskrit Gurukul',
  },
  description:
    'Learn Sanskrit from basics to mastery. Sanskrit Grammar, Spoken Sanskrit, Shlokas, Bhagavad Gita, Ramayana, Upanishads and much more.',
  keywords: ['Sanskrit', 'Sanskrit learning', 'Sanskrit grammar', 'Bhagavad Gita', 'Vedic Sanskrit', 'online Sanskrit course'],
  authors: [{ name: 'Sanskrit Gurukul' }],
  openGraph: {
    title: 'Sanskrit Gurukul - Learn Sanskrit Online',
    description: 'Learn Sanskrit from basics to mastery.',
    type: 'website',
    locale: 'en_IN',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
