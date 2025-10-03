import { Button } from "@/components/ui/button";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Linkedin, 
  Twitter, 
  Github,
  ArrowRight,
  Brain,
  Shield,
  Zap,
  Rocket
} from "lucide-react";

const quickLinks = [
  { name: "AI Wizard", href: "#ai-wizard" },
  { name: "Agent Nexus", href: "#agent-nexus" },
  { name: "Sentinel Cyber", href: "#sentinel-cyber" },
  { name: "Business Nexus", href: "#business-nexus" },
];

const solutions = [
  { name: "AI Development", href: "#ai-development", icon: Brain },
  { name: "Security", href: "#security", icon: Shield },
  { name: "Business Solutions", href: "#business", icon: Zap },
  { name: "Innovations", href: "#innovations", icon: Rocket },
];

const company = [
  { name: "About", href: "#about" },
  { name: "Our Mission", href: "#mission" },
  { name: "The Team", href: "#team" },
  { name: "Careers", href: "#contact" },
  { name: "Partners", href: "#partners" },
];

const legal = [
  { name: "Privacy Policy", href: "#privacy" },
  { name: "Terms of Service", href: "#terms" },
  { name: "Cookie Policy", href: "#cookies" },
  { name: "GDPR Compliance", href: "#gdpr" },
];

export const Footer = () => {
  return (
    <footer className="bg-background border-t border-border">
      {/* Newsletter Section */}
      <div className="bg-gradient-neural">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
              Stay Up to Date on AI Innovations
            </h3>
            <p className="text-lg text-foreground/80 mb-8 max-w-2xl mx-auto">
              Receive exclusive insights, case studies, and the latest news from the world of enterprise AI.
            </p>
            <div className="flex flex-col sm:flex-row max-w-md mx-auto space-y-4 sm:space-y-0 sm:space-x-4">
              <input
                type="email"
                placeholder="Your Professional Email"
                className="flex-1 px-4 py-3 bg-background/20 backdrop-blur-sm border border-border/50 rounded-md text-foreground placeholder-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Button variant="hero" className="group">
                Subscribe
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <img 
                src="/images/logo.png" 
                alt="ITAsociety Logo" 
                className="h-8 w-auto"
              />
            </div>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              ITAsociety transforms the future of businesses through cutting-edge AI solutions.
              Our integrated technology ecosystem optimizes processes, improves security,
              and accelerates innovation.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-muted-foreground">
                <Mail className="w-4 h-4 text-primary" />
                <span>info@itasocietysrl.com</span>
              </div>
              <div className="flex items-center space-x-3 text-muted-foreground">
                <Phone className="w-4 h-4 text-primary" />
                <span>+39 320 574 2205</span>
              </div>
              <div className="flex items-center space-x-3 text-muted-foreground">
                <MapPin className="w-4 h-4 text-primary" />
                <span>Torino, Cso Peschiera 240</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4 mt-6">
              <Button variant="ghost" size="icon" className="hover:bg-primary/20">
                <Linkedin className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:bg-primary/20">
                <Twitter className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:bg-primary/20">
                <Github className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Solutions */}
          <div>
            <h4 className="text-lg font-semibold text-foreground mb-6">Soluzioni</h4>
            <ul className="space-y-3">
              {solutions.map((item) => (
                <li key={item.name}>
                  <a 
                    href={item.href}
                    className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors duration-300 group"
                  >
                    <item.icon className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                    <span>{item.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-lg font-semibold text-foreground mb-6">Azienda</h4>
            <ul className="space-y-3">
              {company.map((item) => (
                <li key={item.name}>
                  <a 
                    href={item.href}
                    className="text-muted-foreground hover:text-primary transition-colors duration-300"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-foreground mb-6">Prodotti</h4>
            <ul className="space-y-3">
              {quickLinks.map((item) => (
                <li key={item.name}>
                  <a 
                    href={item.href}
                    className="text-muted-foreground hover:text-primary transition-colors duration-300"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-lg font-semibold text-foreground mb-6">Legale</h4>
            <ul className="space-y-3">
              {legal.map((item) => (
                <li key={item.name}>
                  <a 
                    href={item.href}
                    className="text-muted-foreground hover:text-primary transition-colors duration-300"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-muted-foreground text-sm">
              © 2025 ITAsociety. All rights reserved. | Powered by Advanced AI Technology
            </div>
            <div className="flex items-center space-x-6 text-sm text-muted-foreground">
              <span className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-ita-green rounded-full animate-pulse"></div>
                <span>Operating Systems</span>
              </span>
              <span className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                <span>AI Services Active</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;