// src/components/Contact.tsx
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

export const Contact = () => {
  const { toast } = useToast();
  const [status, setStatus] = useState("Send Message");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("Sending...");
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      // QUESTA È LA CORREZIONE FONDAMENTALE NEL FILE GIUSTO
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
    <section id="contact" className="py-20 bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">Contact Us</h2>
          <p className="text-xl text-muted-foreground mt-4">
            Have a project in mind or just want to say hello? We'd love to hear from you.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input 
              type="text" 
              name="name" 
              placeholder="Your Name" 
              required 
              className="bg-input"
            />
            <Input 
              type="email" 
              name="email" 
              placeholder="Your Email" 
              required 
              className="bg-input"
            />
          </div>
          
          <Textarea 
            name="message" 
            placeholder="Your Message" 
            required 
            rows={6} 
            className="bg-input"
          />
          
          <div className="text-center">
            <Button type="submit" variant="hero" size="lg" disabled={status === "Sending..."}>
              {status}
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
};
