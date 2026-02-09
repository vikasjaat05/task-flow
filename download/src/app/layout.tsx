import type { Metadata } from 'next';
import './globals.css';
import { TasksProvider } from '@/contexts/tasks-context';
import { Toaster } from '@/components/ui/toaster';
import { BottomNav } from '@/components/bottom-nav';

export const metadata: Metadata = {
  title: 'HeroTask',
  description: 'A premium mobile-first Task Management App.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased bg-mesh-gradient">
        <TasksProvider>
          <div className="relative mx-auto flex h-full min-h-screen w-full max-w-lg flex-col bg-background/80 shadow-2xl backdrop-blur-lg">
            <main className="flex-1 pb-24">{children}</main>
            <BottomNav />
          </div>
          <Toaster />
        </TasksProvider>
      </body>
    </html>
  );
}
