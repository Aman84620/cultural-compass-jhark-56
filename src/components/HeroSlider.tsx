import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import SearchBar from './SearchBar';
import heroNetarhat from '@/assets/hero-netarhat.jpg';
import heroBetla from '@/assets/hero-betla.jpg';
import heroSarhul from '@/assets/hero-sarhul.jpg';
import heroVillage from '@/assets/hero-village.jpg';

const slides = [
  {
    id: 1,
    image: heroNetarhat,
    title: 'Netarhat Hills',
    description: 'Queen of Chotanagpur',
  },
  {
    id: 2,
    image: heroBetla,
    title: 'Betla National Park',
    description: 'Wildlife Paradise',
  },
  {
    id: 3,
    image: heroSarhul,
    title: 'Sarhul Festival',
    description: 'Cultural Heritage',
  },
  {
    id: 4,
    image: heroVillage,
    title: 'Tribal Villages',
    description: 'Authentic Life',
  },
];

const HeroSlider: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const { translate } = useLanguage();

  const navButtons = [
    { label: translate('plan_trip'), target: 'plan-trip' },
    { label: translate('destinations'), target: 'destinations' },
    { label: translate('ar_vr'), target: 'ar-vr' },
    { label: translate('marketplace'), target: 'marketplace' },
  ];

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  const scrollToSection = (target: string) => {
    const element = document.getElementById(target);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative h-screen w-full overflow-hidden">
      {/* Hero Images */}
      <div className="relative h-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 overlay-gradient" />
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-6 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white border border-white/20 backdrop-blur-sm"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>
      
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-6 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white border border-white/20 backdrop-blur-sm"
        onClick={nextSlide}
      >
        <ChevronRight className="h-6 w-6" />
      </Button>

      {/* Hero Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
        <div className="animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
            {translate('explore_jharkhand')}
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl">
            {translate('land_of_forests')}
          </p>
          
          {/* Search Bar */}
          <div className="mb-12">
            <SearchBar />
          </div>

          {/* Navigation Buttons */}
          <div className="flex flex-wrap gap-4 justify-center">
            {navButtons.map((button) => (
              <Button
                key={button.target}
                onClick={() => scrollToSection(button.target)}
                className="btn-cultural px-6 py-3 font-semibold"
              >
                {button.label}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? 'bg-white scale-125'
                : 'bg-white/50 hover:bg-white/75'
            }`}
          />
        ))}
      </div>

      {/* Current Slide Info */}
      <div className="absolute bottom-8 right-8 text-right text-white">
        <h3 className="text-lg font-semibold">{slides[currentSlide].title}</h3>
        <p className="text-sm text-white/80">{slides[currentSlide].description}</p>
      </div>
    </section>
  );
};

export default HeroSlider;