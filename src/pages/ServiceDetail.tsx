// src/pages/ServiceDetail.tsx

import { useParams, Link } from 'react-router-dom';
import { allServices } from '@/components/Services';
import servicesContent from '@/data/services-content.json';
import { Button } from '@/components/ui/button';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import NotFound from './NotFound';

const ServiceDetail = () => {
  const { id } = useParams<{ id: string }>();

  const serviceBaseInfo = allServices.find(s => s.slug === id);
  const serviceExtendedContent = servicesContent.find(c => c.slug === id);

  // SEZIONE CORRETTA: Se non troviamo il servizio, fermiamo tutto e mostriamo la pagina 404.
  if (!serviceBaseInfo || !serviceExtendedContent) {
    return <NotFound />;
  }

  const service = { ...serviceBaseInfo, ...serviceExtendedContent };

  const mailtoLink = `mailto:sales@itasocietysrl.com?subject=Request for a Demo: ${service.mainTitle}&body=Hi, I'm interested in a custom demo of ${service.mainTitle}. Please provide me with more information.`;

  return (
    <div className="bg-background min-h-screen text-foreground">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        
        <Button asChild variant="ghost" className="mb-8">
          <Link to="/#ai-development"> {/* Puoi cambiare questo link se preferisci */}
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to all services {/* Testo corretto in inglese */}
          </Link>
        </Button>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-12">
            <div className={`flex-shrink-0 flex items-center justify-center w-20 h-20 rounded-lg bg-gradient-to-br ${service.color}`}>
                <service.icon className="w-10 h-10 text-foreground" />
            </div>
            <div>
                <h1 className="text-4xl sm:text-5xl font-bold text-foreground">{service.mainTitle}</h1>
                <p className="text-xl text-muted-foreground mt-2">{service.description}</p>
            </div>
        </div>

        {service.imageUrl && (
          <div className="mb-12">
            <img 
                src={service.imageUrl} 
                alt={service.mainTitle} 
                className="w-full h-auto rounded-lg shadow-lg object-cover"
                style={{ maxHeight: '450px' }} 
            />
          </div>
        )}

        <div className="prose prose-invert prose-lg max-w-none">
            <p>{service.longDescription}</p>

            <h3>Key Benefits</h3> {/* Titolo corretto in inglese */}
            <ul className="list-none p-0">
              {service.keyFeatures.map((feature) => (
                <li key={feature.title} className="flex items-start mb-4">
                  <CheckCircle className="w-6 h-6 text-ita-green mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <strong className="text-foreground">{feature.title}:</strong>
                    <span className="text-muted-foreground"> {feature.description}</span>
                  </div>
                </li>
              ))}
            </ul>
        </div>

        <div className="mt-16 text-center">
            <a href={mailtoLink}>
                <Button variant="hero" size="xl">
                    Request a Custom Demo
                </Button>
            </a>
        </div>

      </div>
    </div>
  );
};

export default ServiceDetail;