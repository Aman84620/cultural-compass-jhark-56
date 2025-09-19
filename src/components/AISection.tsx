import React, { useState } from 'react';
import { Bot, Calendar, MapPin, Download, Zap, Shield, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Itinerary {
  id: string;
  title: string;
  duration: string;
  budget: string;
  highlights: string[];
  days: {
    day: number;
    activities: string[];
    accommodation: string;
    meals: string[];
  }[];
}

const AISection: React.FC = () => {
  const [duration, setDuration] = useState('');
  const [budget, setBudget] = useState('');
  const [interests, setInterests] = useState('');
  const [generatedItinerary, setGeneratedItinerary] = useState<Itinerary | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateItinerary = async () => {
    if (!duration || !budget || !interests) return;

    setIsGenerating(true);

    // Simulate AI generation
    setTimeout(() => {
      const sampleItinerary: Itinerary = {
        id: '1',
        title: `${duration} Jharkhand Cultural & Nature Experience`,
        duration: `${duration} Days`,
        budget: budget,
        highlights: ['Netarhat Sunrise', 'Betla Wildlife Safari', 'Tribal Village Visit', 'Sarhul Festival Experience'],
        days: [
          {
            day: 1,
            activities: ['Arrival in Ranchi', 'Local market tour', 'Tribal museum visit'],
            accommodation: 'Heritage Hotel, Ranchi',
            meals: ['Welcome lunch with Litti Chokha', 'Traditional dinner']
          },
          {
            day: 2,
            activities: ['Drive to Netarhat', 'Sunset viewpoint', 'Nature walk'],
            accommodation: 'Hill Resort, Netarhat',
            meals: ['Early breakfast', 'Packed lunch', 'Campfire dinner']
          }
        ]
      };

      if (parseInt(duration) >= 3) {
        sampleItinerary.days.push({
          day: 3,
          activities: ['Betla National Park safari', 'Wildlife photography', 'Tribal cultural program'],
          accommodation: 'Forest Lodge, Betla',
          meals: ['Jungle breakfast', 'Local tribal lunch', 'BBQ dinner']
        });
      }

      setGeneratedItinerary(sampleItinerary);
      setIsGenerating(false);
    }, 2000);
  };

  const downloadPDF = () => {
    alert('PDF download would be implemented here with the generated itinerary');
  };

  const blockchainServices = [
    {
      icon: Shield,
      title: 'Guide Verification',
      description: 'Blockchain-verified guide credentials and certifications for trust and authenticity.',
      color: 'bg-green-100 text-green-800'
    },
    {
      icon: Zap,
      title: 'Secure Payments',
      description: 'Cryptocurrency and blockchain-secured payment processing for transparency.',
      color: 'bg-blue-100 text-blue-800'
    },
    {
      icon: Award,
      title: 'Digital Certificates',
      description: 'Blockchain-issued tourism certificates and achievement badges.',
      color: 'bg-purple-100 text-purple-800'
    }
  ];

  return (
    <section id="ai-features" className="py-20 px-4 bg-background">
      <div className="container mx-auto max-w-7xl">
        
        {/* AI Itinerary Planner */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              AI Itinerary Planner
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Let our AI create personalized travel plans based on your preferences and budget
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="cultural-card tribal-pattern p-4 md:p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Duration (Days)</label>
                  <Select value={duration} onValueChange={setDuration}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2">2 Days</SelectItem>
                      <SelectItem value="3">3 Days</SelectItem>
                      <SelectItem value="5">5 Days</SelectItem>
                      <SelectItem value="7">7 Days</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Budget Range</label>
                  <Select value={budget} onValueChange={setBudget}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select budget" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="budget">Budget (₹5,000-10,000)</SelectItem>
                      <SelectItem value="mid">Mid-range (₹10,000-25,000)</SelectItem>
                      <SelectItem value="luxury">Luxury (₹25,000+)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Interests</label>
                  <Input
                    value={interests}
                    onChange={(e) => setInterests(e.target.value)}
                    placeholder="e.g., Culture, Wildlife, Adventure"
                  />
                </div>
              </div>

              <Button
                onClick={generateItinerary}
                disabled={isGenerating || !duration || !budget || !interests}
                className="btn-cultural w-full"
              >
                {isGenerating ? (
                  <>
                    <Bot className="h-4 w-4 mr-2 animate-spin" />
                    Generating AI Itinerary...
                  </>
                ) : (
                  <>
                    <Bot className="h-4 w-4 mr-2" />
                    Generate AI Itinerary
                  </>
                )}
              </Button>
            </div>

            {/* Generated Itinerary */}
            {generatedItinerary && (
              <div className="mt-8 cultural-card tribal-pattern p-4 md:p-8 animate-fade-in">
                <div className="flex flex-col md:flex-row md:items-start justify-between mb-6 gap-4">
                  <div className="flex-1">
                    <h3 className="text-xl md:text-2xl font-bold text-foreground mb-2">
                      {generatedItinerary.title}
                    </h3>
                    <div className="flex flex-col md:flex-row gap-2 md:gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {generatedItinerary.duration}
                      </span>
                      <span>Budget: {generatedItinerary.budget}</span>
                    </div>
                  </div>
                  <Button onClick={downloadPDF} className="btn-cultural w-full md:w-auto">
                    <Download className="h-4 w-4 mr-2" />
                    Download PDF
                  </Button>
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold mb-3">Highlights</h4>
                  <div className="flex flex-wrap gap-2">
                    {generatedItinerary.highlights.map((highlight, index) => (
                      <Badge key={index} className="bg-primary">
                        {highlight}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="space-y-6">
                  {generatedItinerary.days.map((day) => (
                    <div key={day.day} className="border border-border rounded-lg p-4">
                      <h4 className="font-semibold text-lg mb-3">Day {day.day}</h4>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <h5 className="font-medium mb-2">Activities</h5>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            {day.activities.map((activity, index) => (
                              <li key={index}>• {activity}</li>
                            ))}
                          </ul>
                        </div>
                        
                        <div>
                          <h5 className="font-medium mb-2">Accommodation</h5>
                          <p className="text-sm text-muted-foreground">{day.accommodation}</p>
                        </div>
                        
                        <div>
                          <h5 className="font-medium mb-2">Meals</h5>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            {day.meals.map((meal, index) => (
                              <li key={index}>• {meal}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Blockchain Services */}
        <div>
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Blockchain Services
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Cutting-edge blockchain technology ensuring trust, security, and transparency
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {blockchainServices.map((service, index) => {
              const Icon = service.icon;
              return (
                <div key={index} className="cultural-card tribal-pattern p-6 md:p-8 text-center">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${service.color} mb-4`}>
                    <Icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {service.description}
                  </p>
                  <Button variant="outline" className="mt-4">
                    Learn More
                  </Button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AISection;