import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css'; // Assumi Tailwind in globals.css
import Navbar from '../src/components/Navbar';   

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ITA Society AI Nexus - Advanced AI & Cyber Solutions',
  description: 'Piattaforma enterprise per AI etica, blockchain e cybersecurity.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it">
      <body className={inter.className}>{children}</body> <Navbar />
    </html>
  );
}