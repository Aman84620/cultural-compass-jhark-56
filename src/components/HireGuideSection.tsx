import React, { useState } from 'react';
import { Star, MapPin, Languages, Shield, Phone, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import guideTribal from '@/assets/guide-tribal.jpg';

interface Guide {
  id: string;
  name: string;
  image: string;
  rating: number;
  reviewCount: number;
  specialization: string[];
  languages: string[];
  location: string;
  experience: string;
  pricePerDay: number;
  verified: boolean;
  description: string;
  certifications: string[];
}

const guides: Guide[] = [
  {
    id: '1',
    name: 'Birsa Munda',
    image: guideTribal,
    rating: 4.9,
    reviewCount: 127,
    specialization: ['Tribal Culture', 'Wildlife', 'Trekking'],
    languages: ['Hindi', 'English', 'Santhali', 'Ho'],
    location: 'Ranchi',
    experience: '8 years',
    pricePerDay: 2500,
    verified: true,
    description: 'Expert in tribal culture and traditions. Born and raised in a tribal community, I offer authentic cultural experiences and nature walks.',
    certifications: ['Certified Guide', 'First Aid', 'Wildlife Expert']
  },
  {
    id: '2',
    name: 'Jhano Hansda',
    image: guideTribal, // Using placeholder
    rating: 4.7,
    reviewCount: 89,
    specialization: ['Historical Sites', 'Photography', 'Adventure'],
    languages: ['Hindi', 'English', 'Mundari'],
    location: 'Jamshedpur',
    experience: '6 years',
    pricePerDay: 2000,
    verified: true,
    description: 'Passionate photographer and adventure guide. Specializes in historical sites and capturing the beauty of Jharkhand.',
    certifications: ['Tourism Guide', 'Photography Expert']
  },
  {
    id: '3',
    name: 'Sita Soren',
    image: guideTribal, // Using placeholder
    rating: 4.8,
    reviewCount: 156,
    specialization: ['Eco-Tourism', 'Bird Watching', 'Handicrafts'],
    languages: ['Hindi', 'English', 'Santhali', 'Bengali'],
    location: 'Dumka',
    experience: '10 years',
    pricePerDay: 3000,
    verified: true,
    description: 'Eco-tourism specialist with deep knowledge of local flora and fauna. Expert in traditional handicrafts and sustainability.',
    certifications: ['Eco-Guide', 'Bird Guide', 'Handicraft Expert']
  }
];

const HireGuideSection: React.FC = () => {
  const [selectedGuide, setSelectedGuide] = useState<Guide | null>(null);
  const [bookingStep, setBookingStep] = useState<'guide' | 'booking' | 'payment'>('guide');

  const openGuideProfile = (guide: Guide) => {
    setSelectedGuide(guide);
    setBookingStep('guide');
  };

  const proceedToBooking = () => {
    setBookingStep('booking');
  };

  const proceedToPayment = () => {
    setBookingStep('payment');
  };

  const handleDemoPayment = () => {
    alert('DEMO MODE - Payment would be processed here');
    setSelectedGuide(null);
    setBookingStep('guide');
  };

  return (
    <section id="hire-guide" className="py-20 px-4 bg-muted/30">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Hire Local Guides
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Connect with verified local experts for authentic cultural experiences and safe adventures
          </p>
        </div>

        {/* Guides Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {guides.map((guide) => (
            <div key={guide.id} className="cultural-card tribal-pattern p-6">
              <div className="relative mb-4">
                <img
                  src={guide.image}
                  alt={guide.name}
                  className="w-full h-48 object-cover rounded-lg"
                />
                {guide.verified && (
                  <Badge className="absolute top-3 right-3 bg-green-500">
                    <Shield className="h-3 w-3 mr-1" />
                    Verified
                  </Badge>
                )}
              </div>
              
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-xl font-bold text-foreground">
                  {guide.name}
                </h3>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium text-sm">{guide.rating}</span>
                  <span className="text-xs text-muted-foreground">({guide.reviewCount})</span>
                </div>
              </div>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{guide.location} • {guide.experience} experience</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Languages className="h-4 w-4" />
                  <span>{guide.languages.join(', ')}</span>
                </div>
              </div>
              
              <div className="mb-4">
                <p className="text-sm font-medium mb-2">Specializations:</p>
                <div className="flex flex-wrap gap-1">
                  {guide.specialization.map((spec, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {spec}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl font-bold text-primary">
                  ₹{guide.pricePerDay}
                </span>
                <span className="text-sm text-muted-foreground">per day</span>
              </div>
              
              <div className="flex gap-2">
                <Button
                  onClick={() => openGuideProfile(guide)}
                  variant="outline"
                  className="flex-1"
                >
                  View Profile
                </Button>
                <Button
                  onClick={() => {
                    setSelectedGuide(guide);
                    setBookingStep('booking');
                  }}
                  className="btn-cultural flex-1"
                >
                  Book
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Guide Profile/Booking Modal */}
        {selectedGuide && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-card rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              
              {bookingStep === 'guide' && (
                <>
                  <div className="relative">
                    <img
                      src={selectedGuide.image}
                      alt={selectedGuide.name}
                      className="w-full h-64 object-cover rounded-t-2xl"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-4 right-4 bg-black/20 hover:bg-black/40 text-white"
                      onClick={() => setSelectedGuide(null)}
                    >
                      ✕
                    </Button>
                  </div>

                  <div className="p-8">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h2 className="text-3xl font-bold text-foreground mb-2">
                          {selectedGuide.name}
                        </h2>
                        <div className="flex items-center gap-2 mb-2">
                          <Badge className="bg-primary">{selectedGuide.location}</Badge>
                          {selectedGuide.verified && (
                            <Badge className="bg-green-500">
                              <Shield className="h-3 w-3 mr-1" />
                              Verified
                            </Badge>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1 mb-1">
                          <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                          <span className="font-bold text-lg">{selectedGuide.rating}</span>
                          <span className="text-muted-foreground">({selectedGuide.reviewCount})</span>
                        </div>
                        <p className="text-2xl font-bold text-primary">₹{selectedGuide.pricePerDay}/day</p>
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <h3 className="font-semibold mb-2">Experience</h3>
                        <p className="text-muted-foreground">{selectedGuide.experience}</p>
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">Languages</h3>
                        <p className="text-muted-foreground">{selectedGuide.languages.join(', ')}</p>
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <h3 className="font-semibold mb-2">Specializations</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedGuide.specialization.map((spec, index) => (
                          <Badge key={index} variant="secondary">{spec}</Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <h3 className="font-semibold mb-2">About</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {selectedGuide.description}
                      </p>
                    </div>
                    
                    <div className="mb-6">
                      <h3 className="font-semibold mb-2">Certifications</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedGuide.certifications.map((cert, index) => (
                          <Badge key={index} className="bg-green-100 text-green-800">{cert}</Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex gap-4">
                      <Button className="btn-cultural flex-1" onClick={proceedToBooking}>
                        Book Guide
                      </Button>
                      <Button variant="outline" className="flex-1">
                        <Phone className="h-4 w-4 mr-2" />
                        Contact
                      </Button>
                      <Button variant="outline" className="flex-1">
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Message
                      </Button>
                    </div>
                  </div>
                </>
              )}

              {bookingStep === 'booking' && (
                <div className="p-8">
                  <h2 className="text-2xl font-bold mb-6">Book {selectedGuide.name}</h2>
                  <div className="space-y-4 mb-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Date</label>
                      <input type="date" className="w-full p-3 border rounded-lg" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Duration</label>
                      <select className="w-full p-3 border rounded-lg">
                        <option>1 Day (₹{selectedGuide.pricePerDay})</option>
                        <option>2 Days (₹{selectedGuide.pricePerDay * 2})</option>
                        <option>3 Days (₹{selectedGuide.pricePerDay * 3})</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Special Requirements</label>
                      <textarea className="w-full p-3 border rounded-lg" rows={3} placeholder="Any specific requests or requirements..."></textarea>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <Button variant="outline" onClick={() => setBookingStep('guide')}>Back</Button>
                    <Button className="btn-cultural flex-1" onClick={proceedToPayment}>Continue to Payment</Button>
                  </div>
                </div>
              )}

              {bookingStep === 'payment' && (
                <div className="p-8">
                  <h2 className="text-2xl font-bold mb-6">Demo Payment</h2>
                  <div className="bg-yellow-100 border border-yellow-400 text-yellow-800 px-4 py-3 rounded mb-6">
                    <p className="font-semibold">DEMO MODE - NO REAL PAYMENT</p>
                    <p className="text-sm">This is a demonstration. No actual payment will be processed.</p>
                  </div>
                  
                  <div className="space-y-4 mb-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Payment Method</label>
                      <select className="w-full p-3 border rounded-lg">
                        <option>Credit Card</option>
                        <option>UPI</option>
                        <option>Net Banking</option>
                      </select>
                    </div>
                    <div className="bg-muted p-4 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span>Guide Fee (1 Day)</span>
                        <span>₹{selectedGuide.pricePerDay}</span>
                      </div>
                      <div className="flex justify-between items-center font-bold">
                        <span>Total</span>
                        <span>₹{selectedGuide.pricePerDay}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <Button variant="outline" onClick={() => setBookingStep('booking')}>Back</Button>
                    <Button className="btn-cultural flex-1" onClick={handleDemoPayment}>
                      Pay Now (Demo)
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default HireGuideSection;