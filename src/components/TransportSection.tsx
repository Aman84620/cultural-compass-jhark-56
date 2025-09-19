import React, { useState } from 'react';
import { MapPin, Car, Train, Plane, Bus, Navigation } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const TransportSection: React.FC = () => {
  const [selectedLocation, setSelectedLocation] = useState('ranchi');

  const locations = [
    { id: 'ranchi', name: 'Ranchi', lat: 23.3441, lng: 85.3096 },
    { id: 'netarhat', name: 'Netarhat', lat: 23.4703, lng: 84.2581 },
    { id: 'betla', name: 'Betla National Park', lat: 23.8974, lng: 84.1934 },
    { id: 'jamshedpur', name: 'Jamshedpur', lat: 22.8046, lng: 86.2029 },
    { id: 'dhanbad', name: 'Dhanbad', lat: 23.7957, lng: 86.4304 }
  ];

  const transportOptions = [
    {
      type: 'Air',
      icon: <Plane className="h-5 w-5" />,
      details: 'Ranchi Airport (IXR) - Main gateway to Jharkhand',
      routes: ['Delhi', 'Mumbai', 'Kolkata', 'Bangalore'],
      price: '₹3,500 - ₹8,000'
    },
    {
      type: 'Rail',
      icon: <Train className="h-5 w-5" />,
      details: 'Well connected railway network',
      routes: ['Ranchi Junction', 'Dhanbad', 'Jamshedpur'],
      price: '₹200 - ₹1,500'
    },
    {
      type: 'Road',
      icon: <Bus className="h-5 w-5" />,
      details: 'State and private buses, taxis available',
      routes: ['NH-33', 'NH-23', 'State Highways'],
      price: '₹100 - ₹800'
    },
    {
      type: 'Local',
      icon: <Car className="h-5 w-5" />,
      details: 'Auto-rickshaws, taxis, rental cars',
      routes: ['City Transport', 'Tourist Taxis'],
      price: '₹50 - ₹2,000/day'
    }
  ];

  const openGoogleMaps = (location: any) => {
    const url = `https://www.google.com/maps?q=${location.lat},${location.lng}`;
    window.open(url, '_blank');
  };

  return (
    <section id="transport" className="py-20 px-4 bg-background">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-foreground">Transport & Maps</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Navigate Jharkhand with ease using our comprehensive transport guide and interactive maps
          </p>
        </div>

        <Tabs defaultValue="transport" className="space-y-8">
          <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
            <TabsTrigger value="transport">Transport Options</TabsTrigger>
            <TabsTrigger value="maps">Interactive Maps</TabsTrigger>
          </TabsList>

          <TabsContent value="transport" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {transportOptions.map((option, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="text-center">
                    <div className="mx-auto mb-2 p-3 bg-primary/10 rounded-full w-fit">
                      {option.icon}
                    </div>
                    <CardTitle className="text-xl">{option.type}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm text-muted-foreground">{option.details}</p>
                    <div>
                      <h4 className="font-semibold text-sm mb-2">Popular Routes:</h4>
                      <ul className="text-xs space-y-1">
                        {option.routes.map((route, idx) => (
                          <li key={idx} className="text-muted-foreground">• {route}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="pt-2 border-t">
                      <span className="font-semibold text-primary">{option.price}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="maps" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Location Selector */}
              <div className="lg:col-span-1 space-y-4">
                <h3 className="text-xl font-semibold">Select Destination</h3>
                <div className="space-y-2">
                  {locations.map((location) => (
                    <Button
                      key={location.id}
                      variant={selectedLocation === location.id ? "default" : "outline"}
                      className="w-full justify-start"
                      onClick={() => setSelectedLocation(location.id)}
                    >
                      <MapPin className="h-4 w-4 mr-2" />
                      {location.name}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Map Preview */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Navigation className="h-5 w-5" />
                      {locations.find(l => l.id === selectedLocation)?.name} Location
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {/* Map Placeholder - In real app, this would be Google Maps */}
                    <div className="aspect-video bg-gradient-to-br from-green-100 to-blue-100 rounded-lg flex items-center justify-center relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20"></div>
                      <div className="text-center z-10">
                        <MapPin className="h-12 w-12 text-primary mx-auto mb-2" />
                        <h4 className="font-semibold text-lg">
                          {locations.find(l => l.id === selectedLocation)?.name}
                        </h4>
                        <p className="text-sm text-muted-foreground mb-4">
                          Lat: {locations.find(l => l.id === selectedLocation)?.lat}, 
                          Lng: {locations.find(l => l.id === selectedLocation)?.lng}
                        </p>
                        <Button 
                          onClick={() => openGoogleMaps(locations.find(l => l.id === selectedLocation))}
                          className="btn-cultural"
                        >
                          <Navigation className="h-4 w-4 mr-2" />
                          Get Directions
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Transport Info for Selected Location */}
                <Card className="mt-4">
                  <CardHeader>
                    <CardTitle>Transport to {locations.find(l => l.id === selectedLocation)?.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-semibold mb-2">By Road</h4>
                        <p className="text-sm text-muted-foreground">
                          State buses and private taxis available. Journey time varies by location.
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">By Rail</h4>
                        <p className="text-sm text-muted-foreground">
                          Nearest railway station connectivity and booking options.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default TransportSection;