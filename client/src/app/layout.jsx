import { Inter } from 'next/font/google';
import './globals.css';
import ProviderWrapper from './provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Sentient SaaS Platform',
  description: 'Sentient SaaS Platform for AI Image Generation'
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body>
        <main className='' data-theme='light dark:dark'>
          <ProviderWrapper>{children}</ProviderWrapper>
        </main>
      </body>
    </html>
  );
}
