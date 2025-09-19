import React, { useState } from 'react';
import { ShoppingCart, MapPin, Star, Heart, Filter, Search, Map, Home, Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const marketplaceItems = [
  {
    id: 1,
    name: 'Handwoven Silk Saree',
    category: 'Handicrafts',
    price: '₹3,500',
    originalPrice: '₹4,200',
    image: '/src/assets/guide-tribal.jpg',
    seller: 'Tribal Craft Center',
    rating: 4.8,
    reviews: 24,
    location: 'Ranchi',
    description: 'Traditional silk saree with intricate tribal patterns',
    tags: ['Authentic', 'Handmade', 'Traditional'],
    type: 'product'
  },
  {
    id: 2,
    name: 'Village Homestay Experience',
    category: 'Homestays',
    price: '₹1,200/night',
    originalPrice: '₹1,500',
    image: '/src/assets/hero-village.jpg',
    seller: 'Santali Village Collective',
    rating: 4.9,
    reviews: 18,
    location: 'Dumka',
    description: 'Stay with local families and experience authentic tribal culture',
    tags: ['Cultural', 'Authentic', 'Family-friendly'],
    type: 'service'
  },
  {
    id: 3,
    name: 'Eco-Trek to Netarhat',
    category: 'Tours',
    price: '₹2,800',
    originalPrice: '₹3,200',
    image: '/src/assets/hero-netarhat.jpg',
    seller: 'Green Trek Adventures',
    rating: 4.7,
    reviews: 31,
    location: 'Netarhat',
    description: '2-day eco-friendly trekking experience with sunrise viewpoint',
    tags: ['Adventure', 'Eco-friendly', 'Sunrise'],
    type: 'service'
  },
  {
    id: 4,
    name: 'Bamboo Craft Set',
    category: 'Handicrafts',
    price: '₹850',
    originalPrice: '₹1,100',
    image: '/src/assets/food-litti.jpg',
    seller: 'Jharkhand Bamboo Crafts',
    rating: 4.6,
    reviews: 15,
    location: 'Khunti',
    description: 'Complete set of bamboo kitchen utensils and decorative items',
    tags: ['Eco-friendly', 'Utility', 'Traditional'],
    type: 'product'
  }
];

const MarketplaceSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showMap, setShowMap] = useState(false);
  const [likedItems, setLikedItems] = useState<number[]>([]);

  const filteredItems = marketplaceItems.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category.toLowerCase() === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleLike = (itemId: number) => {
    setLikedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const handleBuyBook = (item: typeof marketplaceItems[0]) => {
    alert(`Demo ${item.type === 'product' ? 'Purchase' : 'Booking'} for ${item.name}\nPrice: ${item.price}\n\nDEMO MODE - NO REAL PAYMENT\n\nThis would redirect to payment gateway in a real implementation.`);
  };

  return (
    <section id="marketplace" className="py-16 md:py-20 px-4 bg-muted/30">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Local Marketplace
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover authentic handicrafts, homestays, and eco-tours from local artisans and guides
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-background rounded-lg p-4 md:p-6 mb-8 shadow-sm">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search products, homestays, tours..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="handicrafts">Handicrafts</SelectItem>
                <SelectItem value="homestays">Homestays</SelectItem>
                <SelectItem value="tours">Tours</SelectItem>
              </SelectContent>
            </Select>

            <Button
              variant={showMap ? "default" : "outline"}
              onClick={() => setShowMap(!showMap)}
              className="w-full md:w-auto"
            >
              <Map className="h-4 w-4 mr-2" />
              {showMap ? 'Hide Map' : 'Show Map'}
            </Button>
          </div>
        </div>

        {/* Map View */}
        {showMap && (
          <div className="mb-8 cultural-card tribal-pattern p-4 md:p-6">
            <div className="bg-muted/50 rounded-lg h-64 md:h-80 flex items-center justify-center">
              <div className="text-center">
                <Map className="h-12 w-12 mx-auto mb-3 text-muted-foreground" />
                <h3 className="font-semibold mb-2">Interactive Map</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Google Maps integration showing seller locations, homestays, and tour routes
                </p>
                <div className="flex flex-wrap gap-2 justify-center">
                  <Badge variant="outline">📍 Ranchi - Handicrafts</Badge>
                  <Badge variant="outline">🏠 Dumka - Homestays</Badge>
                  <Badge variant="outline">🏔️ Netarhat - Tours</Badge>
                  <Badge variant="outline">🎋 Khunti - Bamboo Crafts</Badge>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <div key={item.id} className="cultural-card tribal-pattern overflow-hidden group hover-scale">
              <div className="relative">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                
                <div className="absolute top-3 left-3">
                  <Badge className="bg-primary/90 text-primary-foreground text-xs">
                    {item.category}
                  </Badge>
                </div>

                <div className="absolute top-3 right-3 flex gap-2">
                  <Button
                    size="sm"
                    variant="secondary"
                    className="h-8 w-8 p-0 bg-background/80 backdrop-blur-sm"
                    onClick={() => toggleLike(item.id)}
                  >
                    <Heart 
                      className={`h-4 w-4 ${likedItems.includes(item.id) ? 'fill-red-500 text-red-500' : 'text-muted-foreground'}`} 
                    />
                  </Button>
                </div>

                {item.originalPrice && (
                  <div className="absolute bottom-3 left-3">
                    <Badge variant="destructive" className="text-xs">
                      Save ₹{parseInt(item.originalPrice.slice(1)) - parseInt(item.price.match(/\d+/)?.[0] || '0')}
                    </Badge>
                  </div>
                )}
              </div>

              <div className="p-4">
                <h3 className="font-semibold text-foreground mb-2 line-clamp-1">
                  {item.name}
                </h3>
                
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                  {item.description}
                </p>

                <div className="flex flex-wrap gap-1 mb-3">
                  {item.tags.slice(0, 2).map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center gap-2 mb-3 text-sm">
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{item.rating}</span>
                    <span className="text-muted-foreground">({item.reviews})</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-3 text-sm text-muted-foreground">
                  <MapPin className="h-3 w-3" />
                  <span>{item.location}</span>
                  <span>•</span>
                  <span>{item.seller}</span>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-foreground">{item.price}</span>
                    {item.originalPrice && (
                      <span className="text-sm text-muted-foreground line-through">
                        {item.originalPrice}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    onClick={() => handleBuyBook(item)}
                    className="btn-cultural flex-1 text-sm"
                  >
                    {item.type === 'product' ? (
                      <>
                        <ShoppingCart className="h-4 w-4 mr-1" />
                        Buy
                      </>
                    ) : (
                      <>
                        <Home className="h-4 w-4 mr-1" />
                        Book
                      </>
                    )}
                  </Button>
                  <Button variant="outline" size="sm" className="px-3">
                    <Camera className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <Search className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-semibold mb-2">No items found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}

        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            View All Products
          </Button>
        </div>
      </div>
    </section>
  );
};

export default MarketplaceSection;