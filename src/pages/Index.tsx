import React from 'react';
import HeroSlider from '@/components/HeroSlider';
import EventsSection from '@/components/EventsSection';
import FoodSection from '@/components/FoodSection';
import HireGuideSection from '@/components/HireGuideSection';
import AISection from '@/components/AISection';
import DestinationsSection from '@/components/DestinationsSection';
import ARVRSection from '@/components/ARVRSection';
import MarketplaceSection from '@/components/MarketplaceSection';
import FeedbackSection from '@/components/FeedbackSection';
import TransportSection from '@/components/TransportSection';
import AnalyticsSection from '@/components/AnalyticsSection';
import ChatBot from '@/components/ChatBot';

const Index = () => {
  return (
    <div className="min-h-screen w-full">
      {/* Hero Section */}
      <HeroSlider />
      
      {/* Events Section */}
      <EventsSection />
      
      {/* Food Section */}
      <FoodSection />
      
      {/* Hire Guide Section */}
      <HireGuideSection />
      
      {/* AI & Blockchain Section */}
      <AISection />
      
      {/* Destinations Section */}
      <DestinationsSection />
      
      {/* AR/VR Section */}
      <ARVRSection />
      
      {/* Local Marketplace */}
      <MarketplaceSection />
      
      <section id="transport" className="py-20 px-4 bg-background">
        <TransportSection />
      </section>
      
      <section id="analytics" className="py-20 px-4 bg-muted/30">
        <AnalyticsSection />
      </section>
      
      {/* Feedback Section */}
      <FeedbackSection />
      
      <section id="sos" className="py-20 px-4 bg-red-50">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4 text-red-600">Emergency SOS</h2>
          <p className="text-lg text-red-600">Emergency assistance and safety services</p>
        </div>
      </section>
      
      {/* Chatbot */}
      <ChatBot />
    </div>
  );
};

export default Index;
