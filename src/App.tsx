// src/App.tsx

import "./i18n";
import React, { Suspense, lazy } from "react"; // <-- 1. IMPORTA Suspense e lazy
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";

// Layout Components (importati normalmente)
import Header from "./components/Header";
import Footer from "./components/Footer";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// 2. IMPOSTA IL LAZY LOADING PER LE PAGINE "PESANTI" O SECONDARIE
const ServicesList = lazy(() => import("./pages/ServicesList"));
const ServiceDetail = lazy(() => import("./pages/ServiceDetail"));
const Contact = lazy(() => import("./pages/Contact"));
const Gallery = lazy(() => import("./pages/Gallery"));

const queryClient = new QueryClient();

// Componente per il fallback di caricamento
const LoadingFallback = () => (
  <div className="min-h-screen w-full flex items-center justify-center bg-background">
    <p className="text-foreground">Loading...</p>
  </div>
);

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Header />
          <main className="pt-16"> {/* Offset per l'header fisso */}
            {/* 3. AVVOLGI LE ROUTES IN SUSPENSE */}
            <Suspense fallback={<LoadingFallback />}>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/services" element={<ServicesList />} />
                <Route path="/services/:id" element={<ServiceDetail />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </main>
          <Footer />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
