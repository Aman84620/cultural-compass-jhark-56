import React, { useState } from 'react';
import { Calendar, MapPin, Play, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import eventSarhul from '@/assets/event-sarhul.jpg';
import eventKarma from '@/assets/event-karma.jpg';

interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  description: string;
  images: string[];
  hasVideo: boolean;
  hasAudio: boolean;
  category: string;
}

const events: Event[] = [
  {
    id: '1',
    title: 'Sarhul Festival',
    date: 'March 15-17, 2024',
    location: 'Ranchi & Villages',
    description: 'The most significant festival of Jharkhand tribes, celebrating the worship of Sal trees and the spring season. Experience traditional dances, music, and rituals.',
    images: [eventSarhul],
    hasVideo: true,
    hasAudio: true,
    category: 'Cultural'
  },
  {
    id: '2',
    title: 'Karma Festival',
    date: 'August 22-24, 2024',
    location: 'Tribal Villages',
    description: 'A harvest festival dedicated to Karma deity, featuring traditional dances around the sacred Karma tree with drums and folk songs.',
    images: [eventKarma],
    hasVideo: true,
    hasAudio: true,
    category: 'Traditional'
  },
  {
    id: '3',
    title: 'Tusu Festival',
    date: 'January 14-15, 2024',
    location: 'Dhanbad Region',
    description: 'Winter harvest festival celebrated by unmarried girls, featuring beautiful Tusu dolls, folk songs, and community festivities.',
    images: [eventSarhul], // Using placeholder
    hasVideo: false,
    hasAudio: true,
    category: 'Harvest'
  },
];

const EventsSection: React.FC = () => {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openEventDetail = (event: Event) => {
    setSelectedEvent(event);
    setCurrentImageIndex(0);
  };

  const closeEventDetail = () => {
    setSelectedEvent(null);
    setCurrentImageIndex(0);
  };

  const nextImage = () => {
    if (selectedEvent && selectedEvent.images.length > 1) {
      setCurrentImageIndex((prev) => 
        prev === selectedEvent.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (selectedEvent && selectedEvent.images.length > 1) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? selectedEvent.images.length - 1 : prev - 1
      );
    }
  };

  return (
    <section id="events" className="py-20 px-4 bg-muted/30">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Cultural Events & Festivals
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Experience the rich cultural heritage of Jharkhand through vibrant festivals and traditional celebrations
          </p>
        </div>

        {/* Events Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <div key={event.id} className="cultural-card tribal-pattern p-6">
              <div className="relative mb-4">
                <img
                  src={event.images[0]}
                  alt={event.title}
                  className="w-full h-48 object-cover rounded-lg"
                />
                <Badge className="absolute top-3 right-3 bg-primary">
                  {event.category}
                </Badge>
              </div>
              
              <h3 className="text-xl font-bold text-foreground mb-2">
                {event.title}
              </h3>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{event.location}</span>
                </div>
              </div>
              
              <p className="text-muted-foreground mb-4 line-clamp-3">
                {event.description}
              </p>
              
              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  {event.hasVideo && (
                    <Badge variant="secondary" className="text-xs">
                      <Play className="h-3 w-3 mr-1" />
                      Video
                    </Badge>
                  )}
                  {event.hasAudio && (
                    <Badge variant="secondary" className="text-xs">
                      🎵 Audio
                    </Badge>
                  )}
                </div>
                
                <Button
                  onClick={() => openEventDetail(event)}
                  className="btn-cultural"
                >
                  More
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Event Detail Modal */}
        {selectedEvent && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-card rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="relative">
                {/* Image Carousel */}
                <div className="relative h-64 md:h-96">
                  <img
                    src={selectedEvent.images[currentImageIndex]}
                    alt={selectedEvent.title}
                    className="w-full h-full object-cover rounded-t-2xl"
                  />
                  
                  {selectedEvent.images.length > 1 && (
                    <>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white"
                        onClick={prevImage}
                      >
                        <ChevronLeft className="h-6 w-6" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white"
                        onClick={nextImage}
                      >
                        <ChevronRight className="h-6 w-6" />
                      </Button>
                      
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                        {selectedEvent.images.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setCurrentImageIndex(index)}
                            className={`w-2 h-2 rounded-full ${
                              index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                            }`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                  
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-4 right-4 bg-black/20 hover:bg-black/40 text-white"
                    onClick={closeEventDetail}
                  >
                    ✕
                  </Button>
                </div>

                {/* Event Content */}
                <div className="p-8">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h2 className="text-3xl font-bold text-foreground mb-2">
                        {selectedEvent.title}
                      </h2>
                      <Badge className="bg-primary">{selectedEvent.category}</Badge>
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="h-5 w-5" />
                      <span>{selectedEvent.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="h-5 w-5" />
                      <span>{selectedEvent.location}</span>
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {selectedEvent.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-4">
                    {selectedEvent.hasVideo && (
                      <Button className="btn-cultural">
                        <Play className="h-4 w-4 mr-2" />
                        Watch Video
                      </Button>
                    )}
                    {selectedEvent.hasAudio && (
                      <Button variant="outline">
                        🎵 Listen Audio
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default EventsSection;