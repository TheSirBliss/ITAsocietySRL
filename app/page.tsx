'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [email, setEmail] = useState('');
  const router = useRouter();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: In Fase 2, integra API per newsletter
    alert('Iscritto! Reindirizzamento a thank-you...');
    router.push('/thank-you');
  };

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center bg-black overflow-hidden">
        <video autoPlay muted loop className="absolute inset-0 w-full h-full object-cover opacity-70">
          <source src="/videos/ai-intro.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80" />
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center text-white z-10 px-4"
        >
          <h1 className="text-6xl md:text-8xl font-bold mb-4">ITA Society AI Nexus</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">Soluzioni AI enterprise per cybersecurity e blockchain. Partner con crypto.com.</p>
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="La tua email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="px-4 py-2 rounded-full text-black"
              required
            />
            <button type="submit" className="px-8 py-2 bg-blue-600 rounded-full text-white hover:bg-blue-700 transition">
              Inizia Ora
            </button>
          </form>
        </motion.div>
      </section>
      {/* Altre sezioni da aggiungere nei passi successivi */}
    </main>
  );
}