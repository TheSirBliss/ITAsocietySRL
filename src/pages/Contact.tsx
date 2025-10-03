import React, { useState } from "react";

export default function Contact(): JSX.Element {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [success, setSuccess] = useState(false);
  const api = import.meta.env.VITE_API_URL || "http://localhost:4000";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
        const err = await res.json();
        alert(err?.error || "Errore");
      }
    } catch (err) {
      console.error(err);
      alert("Errore di rete");
    }
  };

  return (
    <section className="py-12 max-w-2xl mx-auto px-4">
      <h2 className="text-xl font-semibold mb-4">Contattaci</h2>
      {success ? (
        <div className="p-4 bg-green-50 border border-green-200 rounded">Messaggio inviato, grazie.</div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            placeholder="Nome"
            className="w-full p-2 border rounded"
            aria-label="Nome"
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
          />
          <button type="submit" className="px-4 py-2 bg-primary text-white rounded" aria-label="Invia messaggio">
            Invia
          </button>
        </form>
      )}
    </section>
  );
}