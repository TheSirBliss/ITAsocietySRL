import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  MessageCircle,
  Calendar,
  Users,
  Zap
} from "lucide-react";

const contactMethods = [
  {
    icon: Phone,
    title: "Strategic Call",
    description: "Immediate consultation with our experts",
    action: "+39 320 574 2205",
    color: "from-ita-green to-quantum-teal"
  },
  {
    icon: Mail,
    title: "Email Enterprise",
    description: "Guaranteed response within 4 business hours",
    action: "info@itasocietysrl.com",
    color: "from-cyber-blue to-neural-purple"
  },
  {
    icon: MapPin,
    title: "Visit Our Offices",
    description: "Torino, Cso Peschiera 240",
    action: "Book a visit",
    color: "from-ita-red to-ita-red-light"
  },
  {
    icon: MessageCircle,
    title: "Chat AI Assistant",
    description: "Supporto istantaneo 24/7 con AI",
    action: "Start chat",
    color: "from-neural-purple to-ita-green"
  }
];

const serviceTypes = [
  "AI Strategy Consulting",
  "Implementazione Soluzioni",
  "Partnership Tecnologica",
  "Training & Formazione",
  "Support & Maintenance",
  "Custom Development"
];

export const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    role: "",
    service: "",
    message: "",
    budget: ""
  });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // basic validation
    if (!formData.name || !formData.email || !formData.message) {
      toast({ title: "Compila tutti i campi obbligatori", description: "Name, email e message sono richiesti." });
      return;
    }

    setSubmitting(true);
    const api = import.meta.env.VITE_API_URL || "http://localhost:4000";
    try {
      const res = await fetch(`${api}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        toast({ title: "Richiesta inviata", description: "Il nostro team ti contatterà a breve." });
        setFormData({ name: "", email: "", company: "", role: "", service: "", message: "", budget: "" });
      } else {
        const err = await res.json().catch(() => ({}));
        toast({ title: "Errore invio", description: err?.error || "Errore durante l'invio, riprova." });
      }
    } catch (err) {
      console.error(err);
      toast({ title: "Network error", description: "Impossibile contattare il server." });
    } finally {
      setSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <section id="contact" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 border-primary/30 text-primary">
            Enterprise Contacts
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
            Start Your Digital Transformation
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Talk to our AI experts to discover how ITAsociety can accelerate
            innovation in your company with tailored solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Methods */}
          <div className="lg:col-span-1">
            <h3 className="text-2xl font-bold text-foreground mb-8">
              Contact Methods
            </h3>
            <div className="space-y-6">
              {contactMethods.map((method, index) => (
                <Card key={method.title} className="group bg-gradient-card hover:shadow-glow transition-all duration-500 border-border/50 hover:border-primary/30 cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className={`flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br ${method.color} group-hover:scale-110 transition-transform duration-300`}>
                        <method.icon className="w-6 h-6 text-foreground" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-foreground mb-1">{method.title}</h4>
                        <p className="text-sm text-muted-foreground mb-2">{method.description}</p>
                        <span className="text-sm font-medium text-primary">
                          {method.title === 'Email Enterprise' ? (
                            <a href={`mailto:${method.action}`} className="hover:underline">{method.action}</a>
                          ) : method.title === 'Strategic Call' ? (
                            <a href={`tel:${method.action.replace(/\s+/g, '')}`} className="hover:underline">{method.action}</a>
                          ) : method.title === 'Visit Our Offices' ? (
                            <a href="#contact" className="hover:underline">{method.action}</a>
                          ) : (
                            <a href="#contact" className="hover:underline">{method.action}</a>
                          )}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Office Hours */}
            <Card className="mt-8 bg-gradient-neural">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-foreground">
                  <Clock className="w-5 h-5" />
                  <span>Support Hours</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-foreground/80">
                  <div className="flex justify-between">
                    <span>Mon - Fri:</span>
                    <span className="font-medium"> 09:00 - 18:00 (9 AM - 6 PM)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday:</span>
                    <span className="font-medium"> 10:00 - 14:00 (10 AM - 2 PM)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Emergencies: <span className="font-medium">----- 24/7 -----</span></span>
                    
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="bg-gradient-card border-border/50">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-foreground flex items-center space-x-2">
                  <Send className="w-6 h-6 text-primary" />
                  <span>Request a Free Consultation</span>
                </CardTitle>
                <p className="text-muted-foreground">
                  Fill out the form to receive a personalized assessment of your AI needs.
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Full Name *
                      </label>
                      <Input
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        placeholder="Your Name"
                        required
                        className="bg-background/50 border-border/50 focus:border-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Company Email *
                      </label>
                      <Input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        placeholder="nome@azienda.com"
                        required
                        className="bg-background/50 border-border/50 focus:border-primary"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Company *
                      </label>
                      <Input
                        value={formData.company}
                        onChange={(e) => handleInputChange("company", e.target.value)}
                        placeholder="Company Name"
                        required
                        className="bg-background/50 border-border/50 focus:border-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Role
                      </label>
                      <Input
                        value={formData.role}
                        onChange={(e) => handleInputChange("role", e.target.value)}
                        placeholder="CEO, CTO, IT Manager..."
                        className="bg-background/50 border-border/50 focus:border-primary"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Service of Interest
                    </label>
                    <select
                      value={formData.service}
                      onChange={(e) => handleInputChange("service", e.target.value)}
                      className="w-full px-3 py-2 bg-background/50 border border-border/50 rounded-md text-foreground focus:border-primary focus:outline-none"
                    >
                      <option value="">Select a service</option>
                      {serviceTypes.map((service) => (
                        <option key={service} value={service}>{service}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Indicative Budget
                    </label>
                    <select
                      value={formData.budget}
                      onChange={(e) => handleInputChange("budget", e.target.value)}
                      className="w-full px-3 py-2 bg-background/50 border border-border/50 rounded-md text-foreground focus:border-primary focus:outline-none"
                    >
                      <option value="">Select a range</option>
                      <option value="10k-50k">€10k - €50k</option>
                      <option value="50k-100k">€50k - €100k</option>
                      <option value="100k-500k">€100k - €500k</option>
                      <option value="500k+">€500k+</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Describe your project *
                    </label>
                    <Textarea
                      value={formData.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                      placeholder="Tell us about your company, current challenges, and goals. The more details you provide, the more accurate our consultation will be."
                      rows={4}
                      required
                      className="bg-background/50 border-border/50 focus:border-primary"
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                    <Button type="submit" variant="hero" size="lg" className="flex-1 group">
                      <Send className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform duration-300" />
                      Submit Request
                    </Button>
                    <a href="#contact" className="inline-block">
                      <Button type="button" variant="enterprise" size="lg" className="flex items-center space-x-2">
                        <Calendar className="w-5 h-5" />
                        <span>Book Call</span>
                      </Button>
                    </a>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Quick Response Promise */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center space-x-4 bg-gradient-quantum rounded-full px-8 py-4">
            <div className="flex items-center justify-center w-10 h-10 bg-background/20 backdrop-blur-sm rounded-full">
              <Zap className="w-5 h-5 text-foreground" />
            </div>
            <div className="text-foreground">
              <div className="font-semibold">Guaranteed Response in 2 Hours</div>
              <div className="text-sm opacity-80">Our AI experts will contact you promptly</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};