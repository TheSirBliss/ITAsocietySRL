import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Shield, 
  Award, 
  Users, 
  TrendingUp, 
  CheckCircle,
  Star,
  Building,
  Globe
} from "lucide-react";

const certifications = [
  {
    name: "ISO 27001",
    description: "Information Security",
    icon: Shield,
    color: "from-ita-red to-ita-red-light"
  },
  {
    name: "SOC 2 Type II",
    description: "Compliance Audit",
    icon: Award,
    color: "from-ita-green to-quantum-teal"
  },
  {
    name: "GDPR Compliant",
    description: "Privacy Europea",
    icon: CheckCircle,
    color: "from-cyber-blue to-neural-purple"
  },
  {
    name: "AI Ethics Board",
    description: "Responsabilità AI",
    icon: Star,
    color: "from-neural-purple to-ita-green"
  }
];

const clientLogos = [
  { name: "Automotive Leader", sector: "Automotive" },
  { name: "Tech Giant", sector: "Technology" },
  { name: "Healthcare Pioneer", sector: "Healthcare" },
  { name: "Financial Services", sector: "Finance" },
  { name: "Manufacturing Corp", sector: "Manufacturing" },
  { name: "Retail Chain", sector: "Retail" }
];

const metrics = [
  {
    icon: Users,
    value: "500+",
    label: "Enterprise Clients",
    description: "Companies that trust us"
  },
  {
    icon: TrendingUp,
    value: "400%",
    label: "Average ROI",
    description: "Documented performance increase"
  },
  {
    icon: Building,
    value: "15+",
    label: "Industries Served",
    description: "Diverse expertise"
  },
  {
    icon: Globe,
    value: "25+",
    label: "Countries Served",
    description: "Global presence"
  }
];

export const TrustSection = () => {
  return (
    <section className="py-20 bg-gradient-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 border-primary/30 text-primary">
            Trust & Excellence
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
            Trusted Partner for Market Leaders
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            The world's most innovative companies rely on ITAsociety to transform
            their processes through secure and certified AI solutions.
          </p>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {metrics.map((metric, index) => (
            <Card key={metric.label} className="text-center bg-background/50 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-all duration-300 group">
              <CardContent className="p-6">
                <div className="flex items-center justify-center w-12 h-12 bg-gradient-neural rounded-full mb-4 mx-auto group-hover:scale-110 transition-transform duration-300">
                  <metric.icon className="w-6 h-6 text-foreground" />
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-primary mb-2">{metric.value}</div>
                <div className="text-sm font-medium text-foreground mb-1">{metric.label}</div>
                <div className="text-xs text-muted-foreground">{metric.description}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Certifications */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-foreground text-center mb-8">
            Certifications and Compliance
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {certifications.map((cert, index) => (
              <Card key={cert.name} className="text-center bg-background/50 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-all duration-300 group">
                <CardContent className="p-6">
                  <div className={`flex items-center justify-center w-16 h-16 bg-gradient-to-br ${cert.color} rounded-full mb-4 mx-auto group-hover:scale-110 transition-transform duration-300`}>
                    <cert.icon className="w-8 h-8 text-foreground" />
                  </div>
                  <h4 className="text-lg font-bold text-foreground mb-2">{cert.name}</h4>
                  <p className="text-sm text-muted-foreground">{cert.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Client Testimonial */}
        <div className="bg-gradient-neural rounded-2xl p-8 md:p-12 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-center mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 text-foreground fill-current" />
              ))}
            </div>
            <blockquote className="text-xl sm:text-2xl font-medium text-foreground mb-6 italic">
              "ITAsociety has completely transformed our production processes.
              The implementation of AI has reduced times by 60% and increased quality by 40%.
              A truly strategic technology partner."
            </blockquote>
            <div className="text-foreground/80">
              <div className="font-semibold">Marco Benedetti</div>
              <div className="text-sm">CTO, Automotive Excellence Group</div>
            </div>
          </div>
        </div>

        {/* Client Sectors */}
        <div className="mt-16">
          <h3 className="text-xl font-semibold text-foreground text-center mb-8">
            Industries Served
          </h3>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            {clientLogos.map((client, index) => (
              <div key={index} className="text-center group cursor-pointer">
                <div className="w-16 h-16 bg-gradient-card rounded-lg flex items-center justify-center mb-2 group-hover:shadow-glow transition-all duration-300">
                  <Building className="w-8 h-8 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
                </div>
                <div className="text-xs text-muted-foreground font-medium">{client.sector}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};