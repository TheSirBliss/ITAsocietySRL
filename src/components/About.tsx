import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Users, 
  Target, 
  Lightbulb, 
  Globe, 
  Award, 
  TrendingUp,
  Brain,
  Rocket,
  Shield,
  Zap
} from "lucide-react";

const teamMembers = [
  {
    name: "Dr. Alberto Gravagno",
    role: "CEO & CTO",
    description: "5+ anni in ricerca VR, AI e innovazione digitale. Psicologo Clinico e Digitale, ipnotista e Psicoterapeuta Sistemico in formazione",
    icon: Brain,
    gradient: "from-ita-green to-quantum-teal"
  },
  {
    name: "Dr. Lorenzo Prete",
    role: "Co-Founder, Chief Architect & Business Executive",
    description: "Architetto software enterprise con expertise in sistemi distribuiti e cloud computing.",
    icon: Rocket,
    gradient: "from-cyber-blue to-neural-purple"
  },
  {
    name: "Dr. Andrea Pirrera",
    role: "Head of Security",
    description: "Esperto in cybersecurity e protezione dati. Consulente per Fortune 500.",
    icon: Shield,
    gradient: "from-ita-red to-ita-red-light"
  },
  {
    name: "Dr. Igor Paoli",
    role: "Innovation Director",
    description: "Pioniera in ricerca olografica e neuroscienze computazionali.",
    icon: Lightbulb,
    gradient: "from-neural-purple to-ita-green"
  }
];

const values = [
  {
    icon: Target,
    title: "Precision",
    description: "Every solution is designed with millimetric accuracy to maximize business impact."
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "We constantly push the boundaries of technology to create the future today."
  },
  {
    icon: Users,
    title: "Collaboration",
    description: "We work as strategic partners, not just technology providers."
  },
  {
    icon: Globe,
    title: "Global Impact",
    description: "Our solutions are designed to scale and transform entire industries."
  }
];

const achievements = [
  {
    icon: Award,
    metric: "15+",
    label: "Tech Patents",
    description: "Internationally recognized innovations"
  },
  {
    icon: TrendingUp,
    metric: "400%",
    label: "Average Client ROI",
    description: "Documented increase in business performance"
  },
  {
    icon: Globe,
    metric: "25+",
    label: "Countries Served",
    description: "Global presence with local expertise"
  },
  {
    icon: Zap,
    metric: "99.9%",
    label: "Uptime SLA",
    description: "Enterprise-grade reliability guaranteed"
  }
];

export const About = () => {
  return (
    <section id="about" className="py-20 bg-gradient-hero">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center space-x-2 bg-primary/20 backdrop-blur-sm rounded-full px-6 py-2 border border-primary/30 mb-8">
            <Users className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">The Minds of the Revolution</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
            About Us
          </h2>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            ITAsociety was born from the union of visionary minds who have dedicated their lives to transforming
            the impossible into reality. We are pioneers in integrating artificial intelligence
            into business processes, with the aim of democratizing technological innovation.
          </p>
        </div>

        {/* Mission Statement */}
        <div className="bg-gradient-card rounded-2xl p-8 md:p-12 mb-20 border border-border/50">
          <div className="text-center">
            <div className="flex items-center justify-center w-20 h-20 bg-gradient-neural rounded-full mb-8 mx-auto">
              <Target className="w-10 h-10 text-foreground" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-6">
              Our Mission
            </h3>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-8">
              To make artificial intelligence accessible, safe, and transformative for every business.
              We believe that AI should not replace human intelligence but amplify it,
              creating an ecosystem where technology and human creativity merge to generate unprecedented value.
            </p>
            <blockquote className="text-xl font-medium text-foreground italic">
              "We are not just building technologies. We are shaping the future of human work."
            </blockquote>
            <cite className="text-sm text-muted-foreground mt-2 block">
              — Dr. Alberto Gravagno, CEO ITAsociety
            </cite>
          </div>
        </div>

        {/* Team Members */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-foreground text-center mb-12">
            Our Executive Team
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={member.name} className="group bg-gradient-card hover:shadow-glow transition-all duration-500 border-border/50 hover:border-primary/30">
                <CardContent className="p-8">
                  <div className="flex items-start space-x-4">
                    <div className={`flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br ${member.gradient} group-hover:scale-110 transition-transform duration-300`}>
                      <member.icon className="w-8 h-8 text-foreground" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xl font-bold text-foreground mb-1">{member.name}</h4>
                      <p className="text-primary font-medium mb-3">{member.role}</p>
                      <p className="text-muted-foreground leading-relaxed">{member.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Values */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-foreground text-center mb-12">
            Our Values
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={value.title} className="text-center bg-gradient-card hover:shadow-glow transition-all duration-500 border-border/50 hover:border-primary/30 group">
                <CardContent className="p-6">
                  <div className="flex items-center justify-center w-16 h-16 bg-gradient-neural rounded-full mb-4 mx-auto group-hover:scale-110 transition-transform duration-300">
                    <value.icon className="w-8 h-8 text-foreground" />
                  </div>
                  <h4 className="text-lg font-bold text-foreground mb-3">{value.title}</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-foreground text-center mb-12">
            Our Results
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <Card key={achievement.label} className="text-center bg-gradient-card hover:shadow-glow transition-all duration-500 border-border/50 hover:border-primary/30 group">
                <CardContent className="p-6">
                  <div className="flex items-center justify-center w-16 h-16 bg-gradient-quantum rounded-full mb-4 mx-auto group-hover:scale-110 transition-transform duration-300">
                    <achievement.icon className="w-8 h-8 text-foreground" />
                  </div>
                  <div className="text-3xl font-bold text-primary mb-2">{achievement.metric}</div>
                  <h4 className="text-lg font-bold text-foreground mb-2">{achievement.label}</h4>
                  <p className="text-muted-foreground text-sm">{achievement.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Vision CTA */}
        <div className="bg-gradient-neural rounded-2xl p-8 md:p-12 text-center">
          <div className="flex items-center justify-center w-20 h-20 bg-background/20 backdrop-blur-sm rounded-full mb-8 mx-auto">
            <Rocket className="w-10 h-10 text-foreground" />
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-6">
            Join the Digital Revolution
          </h3>
          <p className="text-lg text-foreground/80 max-w-2xl mx-auto mb-8">
            We are always on the lookout for exceptional talent who share our passion
            for innovation and want to help shape the future of enterprise AI.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <a href="#contact" className="inline-block">
              <Button variant="hero" size="xl">
                Careers at ITAsociety
              </Button>
            </a>
            <a href="#contact" className="inline-block">
              <Button variant="enterprise" size="xl">
                Become a Partner
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};