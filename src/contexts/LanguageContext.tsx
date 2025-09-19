import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Language {
  code: string;
  name: string;
  flag: string;
}

export const languages: Language[] = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'hi', name: 'हिन्दी', flag: '🇮🇳' },
  { code: 'bn', name: 'বাংলা', flag: '🇧🇩' },
  { code: 'mr', name: 'मराठी', flag: '🇮🇳' },
  { code: 'or', name: 'ଓଡ଼ିଆ', flag: '🇮🇳' },
  { code: 'as', name: 'অসমীয়া', flag: '🇮🇳' },
  { code: 'gu', name: 'ગુજરાતી', flag: '🇮🇳' },
  { code: 'pa', name: 'ਪੰਜਾਬੀ', flag: '🇮🇳' },
  { code: 'ta', name: 'தமிழ்', flag: '🇮🇳' },
  { code: 'te', name: 'తెలుగు', flag: '🇮🇳' },
  { code: 'kn', name: 'ಕನ್ನಡ', flag: '🇮🇳' },
  { code: 'ml', name: 'മലയാളം', flag: '🇮🇳' },
  { code: 'ur', name: 'اردو', flag: '🇵🇰' },
];

// Translations object
export const translations: Record<string, Record<string, string>> = {
  en: {
    'explore_jharkhand': 'Explore Jharkhand',
    'land_of_forests': 'Jharkhand — The Land of Forests, Culture & Safety',
    'search_attractions': 'Search nearby attractions...',
    'plan_trip': 'Plan Trip',
    'destinations': 'Destinations',
    'ar_vr': 'AR/VR',
    'marketplace': 'Marketplace',
    'events': 'Events',
    'food': 'Food',
    'hire_guide': 'Hire Guide',
    'transport': 'Transport & Maps',
    'analytics': 'Analytics Dashboard',
    'feedback': 'Feedback',
    'home': 'Home',
    'blockchain_services': 'Blockchain Services',
    'transport_info': 'Transport Info',
    'sos': 'Emergency SOS',
    'welcome_message': 'Hi 👋, welcome to Jharkhand Tourism! How can I help you today?',
    'cultural_events': 'Cultural Events & Festivals',
    'authentic_cuisine': 'Authentic Jharkhand Cuisine',
    'verified_guides': 'Verified Local Guides',
    'ai_powered': 'AI Powered Features',
    'immersive_experience': 'Immersive AR/VR Experience',
    'local_marketplace': 'Local Marketplace',
    'navigate_ease': 'Navigate Jharkhand with ease',
    'tourism_insights': 'Tourism insights and engagement metrics',
    'share_feedback': 'Share Your Feedback'
  },
  hi: {
    'explore_jharkhand': 'झारखंड का अन्वेषण करें',
    'land_of_forests': 'झारखंड — वनों, संस्कृति और सुरक्षा की भूमि',
    'search_attractions': 'आस-पास के आकर्षण खोजें...',
    'plan_trip': 'यात्रा की योजना',
    'destinations': 'गंतव्य',
    'ar_vr': 'एआर/वीआर',
    'marketplace': 'बाज़ार',
    'events': 'कार्यक्रम',
    'food': 'भोजन',
    'hire_guide': 'गाइड भर्ती करें',
    'transport': 'परिवहन और मानचित्र',
    'analytics': 'एनालिटिक्स डैशबोर्ड',
    'feedback': 'प्रतिक्रिया',
    'home': 'होम',
    'blockchain_services': 'ब्लॉकचेन सेवाएं',
    'transport_info': 'परिवहन जानकारी',
    'sos': 'आपातकालीन एसओएस',
    'welcome_message': 'नमस्ते 👋, झारखंड पर्यटन में आपका स्वागत है! आज मैं आपकी कैसे सहायता कर सकता हूं?',
    'cultural_events': 'सांस्कृतिक कार्यक्रम और त्यौहार',
    'authentic_cuisine': 'प्रामाणिक झारखंड व्यंजन',
    'verified_guides': 'सत्यापित स्थानीय गाइड',
    'ai_powered': 'एआई संचालित सुविधाएं',
    'immersive_experience': 'इमर्सिव एआर/वीआर अनुभव',
    'local_marketplace': 'स्थानीय बाज़ार',
    'navigate_ease': 'आसानी से झारखंड में नेविगेट करें',
    'tourism_insights': 'पर्यटन अंतर्दृष्टि और जुड़ाव मेट्रिक्स',
    'share_feedback': 'अपनी प्रतिक्रिया साझा करें'
  },
  bn: {
    'explore_jharkhand': 'ঝাড়খণ্ড অন্বেষণ করুন',
    'land_of_forests': 'ঝাড়খণ্ড — বন, সংস্কৃতি ও নিরাপত্তার ভূমি',
    'search_attractions': 'কাছাকাছি আকর্ষণ খুঁজুন...',
    'plan_trip': 'ভ্রমণ পরিকল্পনা',
    'destinations': 'গন্তব্য',
    'ar_vr': 'এআর/ভিআর',
    'marketplace': 'বাজার',
    'events': 'অনুষ্ঠান',
    'food': 'খাবার',
    'hire_guide': 'গাইড নিয়োগ',
    'transport': 'পরিবহন ও মানচিত্র',
    'analytics': 'অ্যানালিটিক্স ড্যাশবোর্ড',
    'feedback': 'মতামত',
    'home': 'হোম',
    'blockchain_services': 'ব্লকচেইন সেবা',
    'transport_info': 'পরিবহন তথ্য',
    'sos': 'জরুরি এসওএস',
    'welcome_message': 'হ্যালো 👋, ঝাড়খণ্ড পর্যটনে স্বাগতম! আজ আমি কীভাবে আপনাকে সাহায্য করতে পারি?',
    'cultural_events': 'সাংস্কৃতিক অনুষ্ঠান ও উৎসব',
    'authentic_cuisine': 'প্রামাণিক ঝাড়খণ্ড রন্ধনশৈলী',
    'verified_guides': 'যাচাইকৃত স্থানীয় গাইড',
    'ai_powered': 'এআই চালিত বৈশিষ্ট্য',
    'immersive_experience': 'নিমজ্জনকারী এআর/ভিআর অভিজ্ঞতা',
    'local_marketplace': 'স্থানীয় বাজার',
    'navigate_ease': 'সহজে ঝাড়খণ্ড নেভিগেট করুন',
    'tourism_insights': 'পর্যটন অন্তর্দৃষ্টি এবং এনগেজমেন্ট মেট্রিক্স',
    'share_feedback': 'আপনার মতামত শেয়ার করুন'
  }
};

interface LanguageContextType {
  currentLanguage: Language;
  setCurrentLanguage: (language: Language) => void;
  translate: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(languages[0]);

  const translate = (key: string): string => {
    return translations[currentLanguage.code]?.[key] || translations.en[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, setCurrentLanguage, translate }}>
      {children}
    </LanguageContext.Provider>
  );
};