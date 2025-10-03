const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(bodyParser.json());

const SAMPLE = [
  {
    id: 1,
    slug: 'ai-wizard-agent-nexus',
    title: 'AI Wizard & Agent Nexus',
    description: 'Automazione rapida per presenza online.',
    details: [
      { label: 'Problema', value: 'Processi lenti e costosi.' },
      { label: 'Soluzione', value: 'Genera siti in 5s con agenti AI autonomi.' },
      { label: 'KPI', value: '-65% costi, +22% conversioni (case retail).' },
    ],
  },
  {
    id: 2,
    slug: 'sentinel-cyber-nexus-ai',
    title: 'Sentinel Cyber Nexus AI',
    description: 'Cybersecurity proattiva.',
    details: [
      { label: 'Problema', value: 'Rischio breach e attacchi avanzati.' },
      { label: 'Soluzione', value: 'Monitoraggio AI continuo e remediation automatica.' },
      { label: 'KPI', value: '-70% breach, +30% detection accuracy.' },
    ],
  },
  {
    id: 3,
    slug: 'creamio-business-nexus',
    title: 'Creamio Business Nexus',
    description: 'Analytics per crescita dati-driven.',
    details: [
      { label: 'Problema', value: 'Decisioni lente e poco informate.' },
      { label: 'Soluzione', value: 'Dashboard AI per insight predittivi e azionabili.' },
      { label: 'KPI', value: '+40% efficienza, +18% revenue.' },
    ],
  },
];

app.get('/api/services', (req, res) => {
  res.json(SAMPLE);
});

app.get('/api/services/:id', (req, res) => {
  const { id } = req.params;
  const found = SAMPLE.find((s) => String(s.id) === id || s.slug === id);
  if (!found) return res.status(404).json({ error: 'Not found' });
  return res.json(found);
});

app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body || {};
  if (!name || !email || !message) return res.status(400).json({ error: 'Missing fields' });
  const logDir = path.join(__dirname, 'logs');
  if (!fs.existsSync(logDir)) fs.mkdirSync(logDir, { recursive: true });
  const entry = { id: Date.now(), name, email, message, createdAt: new Date().toISOString() };
  fs.appendFileSync(path.join(logDir, 'contacts.log'), JSON.stringify(entry) + '\n');
  return res.status(201).json({ ok: true, id: entry.id });
});

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Mock backend listening on http://localhost:${port}`));

module.exports = app;
