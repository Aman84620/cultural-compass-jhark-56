import React, { useState } from 'react';
import { Headset, Camera, Play, Eye, Smartphone, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const arvrExperiences = [
  {
    id: 1,
    title: 'Netarhat Sunrise VR',
    type: 'VR Experience',
    image: '/src/assets/hero-netarhat.jpg',
    duration: '5 min',
    description: 'Experience the magical sunrise at Netarhat through immersive virtual reality.',
    features: ['360° View', 'Spatial Audio', 'Weather Effects'],
    technology: 'VR Headset'
  },
  {
    id: 2,
    title: 'Betla Wildlife AR',
    type: 'AR Experience',
    image: '/src/assets/hero-betla.jpg',
    duration: '10 min',
    description: 'Get up close with tigers and elephants using augmented reality on your phone.',
    features: ['Live Animals', 'Interactive Guide', 'Photo Mode'],
    technology: 'Smartphone AR'
  },
  {
    id: 3,
    title: 'Tribal Village 360°',
    type: 'Virtual Tour',
    image: '/src/assets/hero-village.jpg',
    duration: '15 min',
    description: 'Walk through authentic tribal villages and witness traditional ceremonies.',
    features: ['Cultural Stories', 'Traditional Music', 'Craft Demos'],
    technology: 'Web Browser'
  },
  {
    id: 4,
    title: 'Sarhul Festival VR',
    type: 'Cultural VR',
    image: '/src/assets/hero-sarhul.jpg',
    duration: '8 min',
    description: 'Participate in the vibrant Sarhul festival celebrations virtually.',
    features: ['Festival Dance', 'Traditional Costumes', 'Sacred Rituals'],
    technology: 'VR/Mobile'
  }
];

const ARVRSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedExperience, setSelectedExperience] = useState<typeof arvrExperiences[0] | null>(null);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % arvrExperiences.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + arvrExperiences.length) % arvrExperiences.length);
  };

  const getVisibleExperiences = () => {
    const visible = [];
    for (let i = 0; i < 3; i++) {
      const index = (currentIndex + i) % arvrExperiences.length;
      visible.push(arvrExperiences[index]);
    }
    return visible;
  };

  const startExperience = (experience: typeof arvrExperiences[0]) => {
    setSelectedExperience(experience);
    // In a real app, this would launch the AR/VR experience
    alert(`Starting ${experience.title}...\nThis would launch the ${experience.type} in a real implementation.`);
  };

  return (
    <section id="ar-vr" className="py-16 md:py-20 px-4 bg-background">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            AR/VR Experiences
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Immersive virtual tours and augmented reality experiences of Jharkhand's attractions
          </p>
        </div>

        {/* Experience Carousel */}
        <div className="relative mb-12">
          <div className="overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {getVisibleExperiences().map((experience, index) => (
                <div key={`${experience.id}-${currentIndex}`} className="cultural-card tribal-pattern overflow-hidden group">
                  <div className="relative h-48 md:h-56">
                    <img
                      src={experience.image}
                      alt={experience.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    
                    <div className="absolute top-4 left-4">
                    <Badge className="bg-primary/90 text-primary-foreground">
                      <Headset className="h-3 w-3 mr-1" />
                      {experience.type}
                    </Badge>
                    </div>

                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-white font-bold text-lg mb-1">{experience.title}</h3>
                      <div className="flex items-center gap-2 text-white/80 text-sm">
                        <Eye className="h-4 w-4" />
                        <span>{experience.duration}</span>
                        <span>•</span>
                        <span>{experience.technology}</span>
                      </div>
                    </div>

                    <Button
                      onClick={() => startExperience(experience)}
                      size="sm"
                      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-primary/90 hover:bg-primary"
                    >
                      <Play className="h-4 w-4 mr-2" />
                      Start Experience
                    </Button>
                  </div>

                  <div className="p-6">
                    <p className="text-muted-foreground text-sm mb-4">
                      {experience.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {experience.features.map((feature, featureIndex) => (
                        <Badge key={featureIndex} variant="outline" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex gap-2">
                      <Button
                        onClick={() => startExperience(experience)}
                        className="btn-cultural flex-1 text-sm"
                      >
                        <Headset className="h-4 w-4 mr-2" />
                        Launch
                      </Button>
                      <Button variant="outline" className="flex-1 text-sm">
                        <Camera className="h-4 w-4 mr-2" />
                        Preview
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Carousel Controls */}
          <Button
            variant="outline"
            size="sm"
            onClick={prevSlide}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 hidden md:flex"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={nextSlide}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 hidden md:flex"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Mobile Carousel Controls */}
        <div className="flex justify-center gap-2 mb-8 md:hidden">
          <Button variant="outline" size="sm" onClick={prevSlide}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={nextSlide}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Technology Requirements */}
        <div className="bg-muted/30 rounded-lg p-6 md:p-8">
          <h3 className="text-xl font-bold text-foreground mb-4 text-center">
            Compatible Devices & Requirements
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <Headset className="h-12 w-12 mx-auto mb-3 text-primary" />
              <h4 className="font-semibold mb-2">VR Headset</h4>
              <p className="text-sm text-muted-foreground">
                Oculus Quest, HTC Vive, or any WebXR compatible headset
              </p>
            </div>
            
            <div className="text-center">
              <Smartphone className="h-12 w-12 mx-auto mb-3 text-primary" />
              <h4 className="font-semibold mb-2">Smartphone AR</h4>
              <p className="text-sm text-muted-foreground">
                Android 7.0+ or iOS 11+ with ARCore/ARKit support
              </p>
            </div>
            
            <div className="text-center">
              <Camera className="h-12 w-12 mx-auto mb-3 text-primary" />
              <h4 className="font-semibold mb-2">Web Browser</h4>
              <p className="text-sm text-muted-foreground">
                Chrome, Firefox, Safari with WebGL and camera access
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ARVRSection;