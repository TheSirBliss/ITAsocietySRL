// src/components/layout/Header.tsx

import React, { useState } from "react";
import { Link } from "react-router-dom"; // <-- 1. IMPORTA IL COMPONENTE LINK
import { Button } from "@/components/ui/button";
import { Menu, X, Zap, Brain, Shield, Rocket, User, Layers } from "lucide-react"; // Aggiunto Layers per l'icona della galleria

// 2. AGGIUNTO IL LINK ALLA GALLERY E ICONE
const navigationItems = [
  { name: "AI Development", href: "#ai-development", icon: Brain },
  { name: "Security", href: "#security", icon: Shield },
  { name: "Business", href: "#business", icon: Zap },
  { name: "Innovations", href: "#innovations", icon: Rocket },
  { name: "3D Gallery", href: "/gallery", icon: Layers }, // <-- LINK ALLA GALLERY
  { name: "About Us", href: "#about", icon: User },
];

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Funzione per renderizzare i link, riutilizzabile per desktop e mobile
  const renderNavLinks = (isMobile = false) =>
    navigationItems.map((item) => {
      const Icon = item.icon;
      const isInternalLink = item.href.startsWith("/");

      const linkContent = (
        <>
          {Icon && <Icon className="w-4 h-4" aria-hidden="true" />}
          <span>{item.name}</span>
        </>
      );

      const linkClasses = isMobile
        ? "flex items-center space-x-2 text-foreground hover:text-primary transition-colors duration-300 font-medium py-2 focus:outline-none focus:ring-2 focus:ring-primary rounded"
        : "flex items-center space-x-2 text-foreground hover:text-primary transition-colors duration-300 font-medium focus:outline-none focus:ring-2 focus:ring-primary rounded";

      // 3. LOGICA CONDIZIONALE: USA <Link> PER LE PAGINE INTERNE, <a> PER GLI ANCHOR
      if (isInternalLink) {
        return (
          <Link
            key={item.name}
            to={item.href}
            role="menuitem"
            aria-label={`Go to ${item.name}`}
            className={linkClasses}
            onClick={() => isMobile && setIsMenuOpen(false)}
          >
            {linkContent}
          </Link>
        );
      } else {
        return (
          <a
            key={item.name}
            href={item.href}
            role="menuitem"
            aria-label={`Go to ${item.name}`}
            className={linkClasses}
            onClick={() => isMobile && setIsMenuOpen(false)}
          >
            {linkContent}
          </a>
        );
      }
    });

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border"
      role="banner"
    >
      <nav
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        aria-label="Primary"
      >
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <Link to="/" aria-label="Go to home" className="inline-flex">
              <img
                src="/images/logo.png"
                alt="ITAsociety Logo"
                className="h-10 w-auto animate-neural-pulse"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8" role="menubar">
            {renderNavLinks()}
          </div>

          {/* CTA Buttons (desktop) */}
          <div className="hidden md:flex items-center space-x-3">
            <Button
              type="button"
              variant="enterprise"
              size="sm"
              aria-label="Contact the ITAsociety team"
              onClick={() => (window.location.href = "/#contact")}
            >
              Contact Us
            </Button>
            <Button
              type="button"
              variant="hero"
              size="sm"
              aria-label="Request a personalized demo"
              onClick={() => (window.location.href = "mailto:sales@itasocietysrl.com?subject=Request for a Demo")}
            >
              Request Demo
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-controls="mobile-menu"
              aria-expanded={isMenuOpen}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              onClick={() => setIsMenuOpen((v) => !v)}
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" aria-hidden="true" />
              ) : (
                <Menu className="w-6 h-6" aria-hidden="true" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div
            id="mobile-menu"
            className="md:hidden absolute top-16 left-0 right-0 bg-background/95 backdrop-blur-lg border-t border-border"
            role="dialog"
            aria-modal="false"
            aria-label="Mobile menu"
          >
            <div className="px-4 py-6 space-y-4">
              {renderNavLinks(true)}

              <div className="flex flex-col space-y-2 pt-4">
                <Button
                  type="button"
                  variant="enterprise"
                  size="sm"
                  aria-label="Contatta il team ITAsociety"
                  onClick={() => (window.location.href = "/#contatti")}
                >
                  Contact Us
                </Button>
                <Button
                  type="button"
                  variant="hero"
                  size="sm"
                  aria-label="Request a personalized demo"
                  onClick={() => (window.location.href = "mailto:sales@itasocietysrl.com?subject=Request for a Demo")}
                >
                  Request Demo
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;