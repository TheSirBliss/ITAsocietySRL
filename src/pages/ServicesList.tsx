import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

type Service = { id?: number; slug?: string; title: string; description: string };

const ServicesList: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  useEffect(() => {
    const api = import.meta.env.VITE_API_URL || "http://localhost:4000";
    fetch(`${api}/api/services`)
      .then((r) => r.json())
      .then(setServices)
      .catch((err) => console.error(err));
  }, []);
  return (
    <section className="py-12">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-2xl font-semibold mb-6">Servizi</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {services.map((s) => {
            const slug = s.slug ?? s.id;
            return (
              <div
                key={s.id ?? s.slug}
                id={s.slug}
                className="block p-4 border rounded hover:shadow-lg transition"
              >
                <h3 className="font-medium">{s.title}</h3>
                <p className="text-sm text-muted-foreground mt-2">{s.description}</p>
                <div className="mt-4">
                  <Link
                    to={`/services/${slug}`}
                    className="inline-block px-3 py-2 bg-primary text-white rounded"
                    aria-label={`Scopri di più su ${s.title}`}
                  >
                    Scopri di più
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesList;