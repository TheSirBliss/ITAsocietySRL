// src/pages/Contact.tsx (o src/components/Contact.tsx, a seconda di quale stai usando)
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";

const Contact = () => {
  const { toast } = useToast();
  const [status, setStatus] = useState("Send Message");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("Sending...");
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      // Chiamata all'endpoint relativo, che funzionerà sia in locale che su Vercel
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();

      if (responseData.success) {
        setStatus("Send Message");
        toast({
          title: "Message Sent! ✅",
          description: "Thank you for getting in touch. We'll reply shortly.",
        });
        (event.target as HTMLFormElement).reset();
      } else {
        throw new Error(responseData.message || 'An unknown error occurred.');
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setStatus("Send Message");
      toast({
        title: "Something went wrong! ❌",
        description: "Please try again or contact us directly via email.",
        variant: "destructive",
      });
    }
  };

  return (
    <motion.section
      id="contact"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-16"
    >
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
          Get in Touch
        </h1>
        <p className="text-xl text-muted-foreground">
          Have a project in mind, a question, or just want to say hello?
          We'd love to hear from you.
        </p>
      </div>

      <div className="max-w-2xl mx-auto mt-12">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              name="name"
              type="text"
              placeholder="Your Name"
              required
              className="bg-input"
              aria-label="Name"
            />
            <Input
              name="email"
              type="email"
              placeholder="Your Email"
              required
              className="bg-input"
              aria-label="Email"
            />
          </div>
          <Textarea
            name="message"
            placeholder="Your Message"
            rows={6}
            required
            className="bg-input"
            aria-label="Message"
          />
          <div className="text-center">
            <Button type="submit" variant="hero" size="lg" disabled={status === "Sending..."}>
              {status}
            </Button>
          </div>
        </form>
      </div>
    </motion.section>
  );
};

export default Contact;
