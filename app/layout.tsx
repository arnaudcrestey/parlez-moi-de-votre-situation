import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Miroir d’Intuition',
  description:
    'Un éclairage intuitif personnalisé, chaleureux et structuré à partir de votre situation du moment.'
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
