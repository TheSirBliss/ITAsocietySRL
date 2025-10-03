import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const SAMPLE = [
  {
    id: 1,
    slug: "ai-wizard-agent-nexus",
    title: "AI Wizard & Agent Nexus",
    description: "Automazione rapida per presenza online.",
    details: [
      { label: "Problema", value: "Processi lenti e costosi." },
      { label: "Soluzione", value: "Genera siti in 5s con agenti AI autonomi." },
      { label: "KPI", value: "-65% costi, +22% conversioni (case retail)." },
    ],
  },
  {
    id: 2,
    slug: "sentinel-cyber-nexus-ai",
    title: "Sentinel Cyber Nexus AI",
    description: "Cybersecurity proattiva.",
    details: [
      { label: "Problema", value: "Rischio breach e attacchi avanzati." },
      { label: "Soluzione", value: "Monitoraggio AI continuo e remediation automatica." },
      { label: "KPI", value: "-70% breach, +30% detection accuracy." },
    ],
  },
  {
    id: 3,
    slug: "creamio-business-nexus",
    title: "Creamio Business Nexus",
    description: "Analytics per crescita dati-driven.",
    details: [
      { label: "Problema", value: "Decisioni lente e poco informate." },
      { label: "Soluzione", value: "Dashboard AI per insight predittivi e azionabili." },
      { label: "KPI", value: "+40% efficienza, +18% revenue." },
    ],
  },
];

export default function servicesRouter(prisma: PrismaClient) {
  const router = Router();

  router.get("/", async (_req, res) => {
    try {
      const fromDb = await prisma.service.findMany();
      if (fromDb && fromDb.length > 0) return res.json(fromDb);
    } catch (e) {
      console.warn("Prisma services read failed, returning sample data");
    }
    return res.json(SAMPLE);
  });

  router.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const numeric = Number(id);
      if (!Number.isNaN(numeric)) {
        const svc = await prisma.service.findUnique({ where: { id: numeric } as any });
        if (svc) return res.json(svc);
      } else {
        const svc = await prisma.service.findFirst({ where: { slug: id } as any });
        if (svc) return res.json(svc);
      }
    } catch {
      // fallback
    }
    const found = SAMPLE.find((s) => String(s.id) === id || s.slug === id);
    if (!found) return res.status(404).json({ error: "Not found" });
    return res.json(found);
  });

  return router;
}