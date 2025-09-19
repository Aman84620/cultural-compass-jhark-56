import React from 'react';
import { MapPin, Clock, Star, Camera, Mountain, TreePine } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const destinations = [
  {
    id: 1,
    name: 'Netarhat',
    image: '/src/assets/hero-netarhat.jpg',
    category: 'Hill Station',
    rating: 4.8,
    duration: '2-3 days',
    highlights: ['Sunrise Point', 'Sunset Point', 'Pine Forests', 'Cool Climate'],
    description: 'Known as the "Queen of Chotanagpur", Netarhat offers breathtaking sunrises and sunsets with rolling hills covered in pine forests.',
    icon: Mountain
  },
  {
    id: 2,
    name: 'Betla National Park',
    image: '/src/assets/hero-betla.jpg',
    category: 'Wildlife',
    rating: 4.6,
    duration: '1-2 days',
    highlights: ['Tiger Safari', 'Elephant Safari', 'Bird Watching', 'Forest Lodge'],
    description: 'First national park in Jharkhand, home to tigers, elephants, and diverse wildlife in the Palamau Tiger Reserve.',
    icon: TreePine
  },
  {
    id: 3,
    name: 'Tribal Villages',
    image: '/src/assets/hero-village.jpg',
    category: 'Cultural',
    rating: 4.9,
    duration: '1 day',
    highlights: ['Traditional Crafts', 'Folk Dance', 'Local Cuisine', 'Ancient Rituals'],
    description: 'Experience authentic tribal culture, traditional art forms, and age-old customs in remote villages.',
    icon: Camera
  }
];

const DestinationsSection: React.FC = () => {
  return (
    <section id="destinations" className="py-16 md:py-20 px-4 bg-muted/30">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Popular Destinations
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover the natural beauty and rich cultural heritage of Jharkhand
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {destinations.map((destination) => {
            const IconComponent = destination.icon;
            return (
              <div key={destination.id} className="cultural-card tribal-pattern overflow-hidden group hover-scale">
                <div className="relative h-48 md:h-56">
                  <img
                    src={destination.image}
                    alt={destination.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-primary/90 text-primary-foreground">
                      {destination.category}
                    </Badge>
                  </div>
                  <div className="absolute top-4 right-4 bg-background/80 backdrop-blur-sm rounded-full p-2">
                    <IconComponent className="h-4 w-4 text-foreground" />
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-bold text-foreground">{destination.name}</h3>
                    <div className="flex items-center gap-1 text-sm">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-muted-foreground">{destination.rating}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-4 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>{destination.duration}</span>
                    <MapPin className="h-4 w-4 ml-2" />
                    <span>Jharkhand</span>
                  </div>

                  <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                    {destination.description}
                  </p>

                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {destination.highlights.slice(0, 3).map((highlight, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {highlight}
                        </Badge>
                      ))}
                      {destination.highlights.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{destination.highlights.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button className="btn-cultural flex-1 text-sm">
                      <MapPin className="h-4 w-4 mr-2" />
                      Explore
                    </Button>
                    <Button variant="outline" className="flex-1 text-sm">
                      Plan Visit
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            View All Destinations
          </Button>
        </div>
      </div>
    </section>
  );
};

export default DestinationsSection;