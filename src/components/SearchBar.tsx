import React, { useState } from 'react';
import { Search, MapPin, Clock, Star } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

interface SearchResult {
  id: string;
  title: string;
  category: string;
  description: string;
  rating: number;
  image: string;
}

const mockResults: SearchResult[] = [
  {
    id: '1',
    title: 'Netarhat Hill Station',
    category: 'Destination',
    description: 'Known as the Queen of Chotanagpur, famous for sunrise and sunset views.',
    rating: 4.8,
    image: '/api/placeholder/300/200'
  },
  {
    id: '2',
    title: 'Betla National Park',
    category: 'Wildlife',
    description: 'Home to tigers, elephants, and diverse wildlife in their natural habitat.',
    rating: 4.6,
    image: '/api/placeholder/300/200'
  },
  {
    id: '3',
    title: 'Sarhul Festival',
    category: 'Event',
    description: 'Traditional tribal festival celebrating the worship of Sal trees.',
    rating: 4.9,
    image: '/api/placeholder/300/200'
  },
];

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const { translate } = useLanguage();

  const handleSearch = async () => {
    if (!query.trim()) return;

    setIsSearching(true);
    // Simulate API call
    setTimeout(() => {
      const filteredResults = mockResults.filter(result =>
        result.title.toLowerCase().includes(query.toLowerCase()) ||
        result.category.toLowerCase().includes(query.toLowerCase()) ||
        result.description.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filteredResults);
      setIsSearching(false);
    }, 500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Search Input */}
      <div className="search-container p-4">
        <div className="flex items-center gap-3">
          <Input
            type="text"
            placeholder={translate('search_attractions')}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1 bg-transparent border-none text-white placeholder:text-white/70 focus-visible:ring-0 text-lg"
          />
          <Button
            onClick={handleSearch}
            disabled={isSearching}
            className="bg-white/20 hover:bg-white/30 text-white border-none"
            size="icon"
          >
            <Search className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Search Results */}
      {results.length > 0 && (
        <div className="mt-4 space-y-3 max-h-96 overflow-y-auto">
          {results.map((result) => (
            <div
              key={result.id}
              className="cultural-card p-4 bg-white/95 backdrop-blur-sm"
            >
              <div className="flex items-start gap-4">
                <img
                  src={result.image}
                  alt={result.title}
                  className="w-20 h-20 rounded-lg object-cover"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-foreground truncate">
                      {result.title}
                    </h3>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span>{result.rating}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs font-medium">
                      {result.category}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {result.description}
                  </p>
                  <Button
                    variant="link"
                    className="mt-2 p-0 h-auto text-primary font-semibold"
                    onClick={() => {
                      // Scroll to relevant section based on category
                      const sectionMap: { [key: string]: string } = {
                        'Destination': 'destinations',
                        'Wildlife': 'destinations',
                        'Event': 'events',
                        'Food': 'food'
                      };
                      const sectionId = sectionMap[result.category] || 'destinations';
                      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    More →
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* No Results */}
      {query && results.length === 0 && !isSearching && (
        <div className="mt-4 text-center text-white/70">
          <MapPin className="h-8 w-8 mx-auto mb-2 opacity-50" />
          <p>No attractions found for "{query}"</p>
          <p className="text-sm">Try searching for places like "Netarhat" or "Betla"</p>
        </div>
      )}

      {/* Loading */}
      {isSearching && (
        <div className="mt-4 text-center text-white/70">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white/50 mx-auto mb-2"></div>
          <p>Searching attractions...</p>
        </div>
      )}
    </div>
  );
};

export default SearchBar;