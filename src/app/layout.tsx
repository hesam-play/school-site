import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ThemePicker from '@/components/ThemePicker';

export const metadata: Metadata = {
  title: 'دبستان فرهنگیان ۳ — دوره ابتدایی دخترانه',
  description: 'سایت رسمی دبستان دخترانه فرهنگیان ۳',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Vazirmatn:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body>
        <ThemeProvider>
          <Navbar />
          <main style={{ paddingTop: '68px', minHeight: 'calc(100vh - 68px)' }}>
            {children}
          </main>
          <Footer />
          <ThemePicker />
        </ThemeProvider>
      </body>
    </html>
  );
}
