import React, { useState } from 'react';
import { MessageCircle, X, Send, Mic, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useLanguage } from '@/contexts/LanguageContext';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const { translate } = useLanguage();
  
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: translate('welcome_message'),
      isUser: false,
      timestamp: new Date()
    }
  ]);

  const predefinedResponses: { [key: string]: string } = {
    'netarhat': 'Netarhat is known as the Queen of Chotanagpur! It offers stunning sunrise and sunset views. Best time to visit is October to March. Would you like information about accommodations?',
    'betla': 'Betla National Park is perfect for wildlife enthusiasts! You can spot tigers, elephants, and various bird species. Safari timings are 6 AM to 10 AM and 3 PM to 6 PM.',
    'sarhul': 'Sarhul is our most important festival celebrating the worship of Sal trees. It usually falls in March. The celebrations include traditional dances, music, and rituals.',
    'food': 'Jharkhand cuisine is amazing! Must-try dishes include Litti Chokha, Dhuska, and Handia. Would you like restaurant recommendations?',
    'guide': 'Our verified local guides can provide authentic cultural experiences. Prices start from ₹2000 per day. Shall I show you available guides?',
    'transport': 'Jharkhand is well-connected by road, rail, and air. Ranchi airport is the main gateway. Local transport includes buses, taxis, and auto-rickshaws.',
    'default': 'That\'s interesting! Jharkhand has so much to offer. You can explore our destinations, try local food, attend festivals, or hire a guide. What interests you most?'
  };

  const sendMessage = () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const lowerInput = inputText.toLowerCase();
      let response = predefinedResponses.default;

      // Check for keywords
      for (const [key, value] of Object.entries(predefinedResponses)) {
        if (key !== 'default' && lowerInput.includes(key)) {
          response = value;
          break;
        }
      }

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  const toggleVoice = () => {
    setIsListening(!isListening);
    // Voice recognition would be implemented here
    if (!isListening) {
      setTimeout(() => {
        setIsListening(false);
        setInputText('Hello, tell me about Netarhat');
      }, 2000);
    }
  };

  const speakMessage = (text: string) => {
    // Text-to-speech would be implemented here
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      speechSynthesis.speak(utterance);
    }
  };

  return (
    <>
      {/* Chat Button */}
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full btn-cultural shadow-lg z-40"
        size="icon"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-80 sm:w-96 h-80 sm:h-96 max-w-[calc(100vw-3rem)] max-h-[calc(100vh-8rem)] bg-card border border-border rounded-2xl shadow-2xl z-50 flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border rounded-t-2xl bg-primary text-primary-foreground">
            <div>
              <h3 className="font-semibold">Jharkhand Tourism Bot</h3>
              <p className="text-xs opacity-90">Multilingual Assistant</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="text-primary-foreground hover:bg-primary-foreground/20"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[70%] p-3 rounded-lg ${
                    message.isUser
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-foreground'
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                  {!message.isUser && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="mt-2 p-1 h-auto text-xs opacity-70 hover:opacity-100"
                      onClick={() => speakMessage(message.text)}
                    >
                      <Volume2 className="h-3 w-3" />
                    </Button>
                  )}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-muted p-3 rounded-lg">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-border">
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={toggleVoice}
                className={`${isListening ? 'bg-red-100 text-red-600' : ''}`}
              >
                <Mic className="h-4 w-4" />
              </Button>
              <Input
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1"
              />
              <Button onClick={sendMessage} size="icon" className="btn-cultural">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;