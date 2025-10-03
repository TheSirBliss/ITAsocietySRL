// src/pages/Gallery.tsx
import { ModelViewer } from '@/components/ModelViewer';
import { Badge } from "@/components/ui/badge"; // Component for technology tags

const caseStudies = [
  {
    title: "Puppetz: Interactive Digital Marionette",
    path: "/models/puppetz.fbx", // IMPORTANT: Converted to .glb for web performance
    client: "Internal R&D Project",
    challenge: "To create a real-time, interactive 3D character that could be manipulated by users directly in the browser, testing the limits of web-based animation and rigging.",
    solution: "We developed 'Puppetz,' a fully rigged digital marionette. The model was optimized for the web by converting it from FBX to GLB format, ensuring fast load times and smooth performance across devices. This project became a foundational piece for our interactive web experiences.",
    technologies: ["FBX to GLB", "Blender", "React Three Fiber", "Rigging"]
  },
  {
    title: "Kinetic Animation Study",
    path: "/models/animation.fbx", // IMPORTANT: Converted to .glb for web performance
    client: "FutureMotion Studios",
    challenge: "FutureMotion needed a proof-of-concept for a complex mechanical animation sequence to pitch for a new sci-fi series, requiring a realistic yet fluid demonstration of motion.",
    solution: "We created a detailed kinetic sculpture and animated its complex movements. The 3D model was delivered as a lightweight GLB file, allowing the client to easily share and showcase the fluid animation in high quality during their presentations, leading to a successful project greenlight.",
    technologies: ["3ds Max", "Animation", "React Three Fiber", "V-Ray"]
  },
  // Add more case studies here...
];

const Gallery = () => {
  return (
    <div className="bg-background min-h-screen text-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 pt-32">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold">Portfolio & Case Studies</h1>
          <p className="text-xl text-muted-foreground mt-4">
            Explore our innovations. Each project represents a unique challenge we solved.
          </p>
        </div>

        <div className="space-y-24">
          {caseStudies.map((study, index) => (
            <div key={index} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              
              {/* Left Column: 3D Viewer */}
              <div className="w-full h-96 lg:h-[500px] rounded-lg bg-black/20">
                <ModelViewer modelUrl={study.path} />
              </div>

              {/* Right Column: Case Study Details */}
              <div className="flex flex-col">
                <span className="text-primary font-semibold">{study.client}</span>
                <h2 className="text-3xl font-bold mt-2 mb-4">{study.title}</h2>
                
                <div className="space-y-4 text-muted-foreground">
                  <div>
                    <h3 className="font-semibold text-foreground">The Challenge</h3>
                    <p>{study.challenge}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">The Solution</h3>
                    <p>{study.solution}</p>
                  </div>
                </div>
                
                <div className="mt-6">
                  <h4 className="font-semibold text-foreground mb-2">Technologies Used:</h4>
                  <div className="flex flex-wrap gap-2">
                    {study.technologies.map(tech => (
                      <Badge key={tech} variant="secondary">{tech}</Badge>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery;