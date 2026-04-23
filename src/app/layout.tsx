import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@fortawesome/fontawesome-svg-core/styles.css';
import './globals.css';
import { config } from '@fortawesome/fontawesome-svg-core';
import { AppProviders } from '@/components/layout/providers';
import { AppToaster } from '@/components/ui/toaster';

config.autoAddCss = false;

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'),
  title: {
    default: 'Divinerock Engineering Services',
    template: '%s | Divinerock Engineering Services',
  },
  description: 'Engineering, procurement, construction and technical support services.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppProviders>
          {children}
          <AppToaster />
        </AppProviders>
      </body>
    </html>
  );
}
