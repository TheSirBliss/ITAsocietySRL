import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const projectsData = [
  {
    slug: "ai-wizard-agent-nexus",
    title: "AI Wizard & Agent Nexus",
    description: "Automazione rapida per presenza online.",
    details: [ /* ... */ ],
  },
  {
    slug: "sentinel-cyber-nexus-ai",
    title: "Sentinel Cyber Nexus AI",
    description: "Cybersecurity proattiva.",
    details: [ /* ... */ ],
  },
  {
    slug: "creamio-business-nexus",
    title: "Creamio Business Nexus",
    description: "Analytics per crescita dati-driven.",
    details: [ /* ... */ ],
  },
];

const Projects: React.FC = () => (
  <section className="py-16 bg-gray-50 px-4" aria-labelledby="projects-heading" tabIndex={-1}>
    <motion.h2 id="projects-heading" className="text-3xl md:text-4xl font-serif text-navy text-center mb-12" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
      Progetti di Punta
    </motion.h2>
    <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
      {projectsData.map((project) => (
        <Card className="border-navy" key={project.slug}>
          <CardHeader>
            <CardTitle>{project.title}</CardTitle>
            <CardDescription>{project.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible>
              <AccordionItem value={project.slug}>
                <AccordionTrigger aria-label={`Dettagli ${project.title}`}>Esplora Dettagli</AccordionTrigger>
                <AccordionContent>
                  {/* render dettagli qui */}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <div className="mt-4">
              <Link to={`/services/${project.slug}`} className="inline-block px-3 py-2 bg-primary text-white rounded" aria-label={`Scopri di più su ${project.title}`}>
                Scopri di più
              </Link>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  </section>
);

export default Projects;