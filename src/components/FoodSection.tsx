import React, { useState } from 'react';
import { ChefHat, Star, MapPin, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import foodLitti from '@/assets/food-litti.jpg';

interface FoodItem {
  id: string;
  name: string;
  description: string;
  culturalBackground: string;
  images: string[];
  rating: number;
  preparationTime: string;
  region: string;
  spiceLevel: 'Mild' | 'Medium' | 'Spicy';
  category: string;
}

const foodItems: FoodItem[] = [
  {
    id: '1',
    name: 'Litti Chokha',
    description: 'Traditional roasted wheat balls filled with sattu (roasted gram flour) served with mashed vegetables.',
    culturalBackground: 'A staple food of Jharkhand that represents the simple yet nutritious diet of tribal communities. Often prepared during festivals and special occasions.',
    images: [foodLitti],
    rating: 4.8,
    preparationTime: '45 mins',
    region: 'Ranchi, Dhanbad',
    spiceLevel: 'Medium',
    category: 'Main Course'
  },
  {
    id: '2',
    name: 'Dhuska',
    description: 'Deep-fried bread made from rice and lentil batter, crispy outside and soft inside.',
    culturalBackground: 'Popular breakfast item among tribal communities, often served with aloo sabzi (potato curry). Symbol of hospitality in Jharkhand villages.',
    images: [foodLitti], // Using placeholder
    rating: 4.6,
    preparationTime: '30 mins',
    region: 'Jamshedpur, Bokaro',
    spiceLevel: 'Mild',
    category: 'Breakfast'
  },
  {
    id: '3',
    name: 'Handia',
    description: 'Traditional fermented rice beer with medicinal properties, served in earthen pots.',
    culturalBackground: 'Sacred drink used in tribal rituals and festivals. Prepared by tribal women using traditional fermentation methods passed down through generations.',
    images: [foodLitti], // Using placeholder
    rating: 4.3,
    preparationTime: '3-5 days',
    region: 'Tribal Villages',
    spiceLevel: 'Mild',
    category: 'Beverages'
  }
];

const FoodSection: React.FC = () => {
  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null);

  const openFoodDetail = (food: FoodItem) => {
    setSelectedFood(food);
  };

  const closeFoodDetail = () => {
    setSelectedFood(null);
  };

  const getSpiceLevelColor = (level: string) => {
    switch (level) {
      case 'Mild': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Spicy': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <section id="food" className="py-20 px-4 bg-background">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Jharkhand Cuisine
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover the authentic flavors of tribal cuisine, rich in tradition and nutrition
          </p>
        </div>

        {/* Food Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {foodItems.map((food) => (
            <div key={food.id} className="cultural-card tribal-pattern p-6">
              <div className="relative mb-4">
                <img
                  src={food.images[0]}
                  alt={food.name}
                  className="w-full h-48 object-cover rounded-lg"
                />
                <Badge className={`absolute top-3 right-3 ${getSpiceLevelColor(food.spiceLevel)}`}>
                  {food.spiceLevel}
                </Badge>
              </div>
              
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-xl font-bold text-foreground">
                  {food.name}
                </h3>
                <div className="flex items-center gap-1 text-sm">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{food.rating}</span>
                </div>
              </div>
              
              <Badge variant="outline" className="mb-3">
                <ChefHat className="h-3 w-3 mr-1" />
                {food.category}
              </Badge>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>{food.preparationTime}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{food.region}</span>
                </div>
              </div>
              
              <p className="text-muted-foreground mb-4 line-clamp-3">
                {food.description}
              </p>
              
              <div className="flex gap-3">
                <Button
                  onClick={() => openFoodDetail(food)}
                  variant="outline"
                  className="flex-1"
                >
                  More
                </Button>
                <Button className="btn-cultural flex-1">
                  Try / Book
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Food Detail Modal */}
        {selectedFood && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-card rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="relative">
                <img
                  src={selectedFood.images[0]}
                  alt={selectedFood.name}
                  className="w-full h-64 md:h-96 object-cover rounded-t-2xl"
                />
                
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-4 right-4 bg-black/20 hover:bg-black/40 text-white"
                  onClick={closeFoodDetail}
                >
                  ✕
                </Button>
              </div>

              <div className="p-8">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-3xl font-bold text-foreground mb-2">
                      {selectedFood.name}
                    </h2>
                    <div className="flex gap-2">
                      <Badge className="bg-primary">{selectedFood.category}</Badge>
                      <Badge className={getSpiceLevelColor(selectedFood.spiceLevel)}>
                        {selectedFood.spiceLevel}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    <span className="font-bold text-lg">{selectedFood.rating}</span>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="h-5 w-5" />
                    <span>{selectedFood.preparationTime}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-5 w-5" />
                    <span>{selectedFood.region}</span>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-3">Description</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {selectedFood.description}
                  </p>
                </div>
                
                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-3">Cultural Background</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {selectedFood.culturalBackground}
                  </p>
                </div>
                
                <div className="flex flex-wrap gap-4">
                  <Button className="btn-cultural">
                    <ChefHat className="h-4 w-4 mr-2" />
                    Try Now
                  </Button>
                  <Button variant="outline">
                    Book Cooking Experience
                  </Button>
                  <Button variant="outline">
                    Find Restaurants
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default FoodSection;