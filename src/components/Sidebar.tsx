import React from 'react';
import { X, Home, MapPin, Calendar, Camera, Utensils, ShoppingBag, UserCheck, Blocks, Bus, BarChart3, MessageSquare, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import LanguageSelector from './LanguageSelector';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuItems = [
  { icon: Home, label: 'Home', id: 'home' },
  { icon: MapPin, label: 'Plan Trip', id: 'plan-trip' },
  { icon: MapPin, label: 'Destinations', id: 'destinations' },
  { icon: Calendar, label: 'Events', id: 'events' },
  { icon: Camera, label: 'AR/VR', id: 'ar-vr' },
  { icon: Utensils, label: 'Food', id: 'food' },
  { icon: ShoppingBag, label: 'Marketplace', id: 'marketplace' },
  { icon: UserCheck, label: 'Hire Guide', id: 'hire-guide' },
  { icon: Blocks, label: 'Blockchain Services', id: 'blockchain' },
  { icon: Bus, label: 'Transport Info', id: 'transport' },
  { icon: BarChart3, label: 'Analytics', id: 'analytics' },
  { icon: MessageSquare, label: 'Feedback', id: 'feedback' },
  { icon: AlertTriangle, label: 'SOS', id: 'sos' },
];

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      onClose();
    }
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 h-full w-80 bg-card border-r border-border z-50
        transform transition-transform duration-300 ease-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        animate-slide-in-left
      `}>
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-xl font-bold text-foreground">Jharkhand Tourism</h2>
              <p className="text-sm text-muted-foreground">Explore the Land of Forests</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="hover:bg-secondary"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Language Selector */}
          <div className="mb-6">
            <LanguageSelector />
          </div>

          {/* Navigation Menu */}
          <nav className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="nav-item w-full text-left"
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </>
  );
};

export default Sidebar;