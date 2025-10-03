import React, { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Determine API base in multiple environments:
  // - If running in a Vite-frontend, use import.meta.env.VITE_API_URL
  // - If rendered server-side or building, fallback to process.env.API_BASE (if set)
  // - Finally fallback to localhost:4000 for local backend/mock
  const getApiBase = () => {
    try {
      // @ts-ignore - import.meta exists in Vite frontend
      const vite = (typeof import.meta !== 'undefined' && (import.meta as any).env && (import.meta as any).env.VITE_API_URL) || null;
      if (vite) return vite;
    } catch (e) {
      // ignore
    }
    if (typeof process !== 'undefined' && process.env && process.env.API_BASE) return process.env.API_BASE;
    return 'http://localhost:4000';
  };

  const api = getApiBase();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const res = await fetch(`${api}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setSuccess(true);
        setForm({ name: "", email: "", message: "" });
      } else {
        let msg = 'Errore';
        try {
          const err = await res.json();
          msg = err?.error || JSON.stringify(err);
        } catch (e) {
          msg = await res.text();
        }
        setError(msg);
      }
    } catch (err: any) {
      console.error(err);
      setError(err?.message || 'Errore di rete');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="py-12 max-w-2xl mx-auto px-4">
      <h2 className="text-xl font-semibold mb-4">Contattaci</h2>
      {success ? (
        <div className="p-4 bg-green-50 border border-green-200 rounded">Messaggio inviato, grazie.</div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <div className="p-2 bg-red-50 border border-red-200 text-red-800">{error}</div>}
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            placeholder="Nome"
            className="w-full p-2 border rounded"
            aria-label="Nome"
            disabled={submitting}
          />
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            placeholder="Email"
            className="w-full p-2 border rounded"
            aria-label="Email"
            type="email"
            disabled={submitting}
          />
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            required
            placeholder="Messaggio"
            className="w-full p-2 border rounded"
            aria-label="Messaggio"
            rows={6}
            disabled={submitting}
          />
          <button type="submit" className="px-4 py-2 bg-primary text-white rounded" aria-label="Invia messaggio" disabled={submitting}>
            {submitting ? 'Invio...' : 'Invia'}
          </button>
        </form>
      )}
    </section>
  );
}