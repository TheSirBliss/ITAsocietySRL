import React, { useEffect, useState } from 'react';

type Sub = { id?: number; email?: string; createdAt?: string; raw?: string };

export default function AdminSubscriptions(): JSX.Element {
  const [items, setItems] = useState<Sub[]>([]);
  const [loading, setLoading] = useState(true);
  const [needLogin, setNeedLogin] = useState(false);
  const [password, setPassword] = useState('');

  const load = () => {
    setLoading(true);
    fetch('/api/admin/subscriptions')
      .then(async (r) => {
        if (r.status === 401) {
          setNeedLogin(true);
          return [];
        }
        return r.json();
      })
      .then((data) => setItems(data || []))
      .catch((e) => console.error(e))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, []);

  async function doLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const r = await fetch('/api/admin/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ password }) });
      if (r.ok) {
        setNeedLogin(false);
        setPassword('');
        load();
      } else {
        alert('Login failed');
      }
    } catch (err) {
      console.error(err);
      alert('Login failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-2xl font-bold mb-4">Subscriptions (admin)</h1>
        {needLogin ? (
          <form onSubmit={doLogin} className="space-y-2">
            <div>
              <label className="block">Password</label>
              <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="border px-2 py-1" />
            </div>
            <div>
              <button className="btn" type="submit">Login</button>
            </div>
          </form>
        ) : loading ? (
          <div>Loading...</div>
        ) : (
          <div className="space-y-2">
            {items.length === 0 && <div>No subscriptions yet</div>}
            {items.map((it) => (
              <div key={it.id ?? it.createdAt} className="p-3 border rounded">
                <div><strong>Email:</strong> {it.email ?? it.raw}</div>
                <div className="text-sm text-muted-foreground">{it.createdAt}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
