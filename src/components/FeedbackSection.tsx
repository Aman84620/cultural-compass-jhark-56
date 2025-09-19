import React, { useState } from 'react';
import { Star, Send, ThumbsUp, MessageCircle, TrendingUp, Award, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

const FeedbackSection: React.FC = () => {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitFeedback = async () => {
    if (!rating || !feedback.trim()) {
      alert('Please provide a rating and feedback message');
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      alert(`Thank you for your feedback!\n\nRating: ${rating} stars\nFeedback: ${feedback}\n\nYour review helps improve Jharkhand tourism experience.`);
      
      // Reset form
      setRating(0);
      setFeedback('');
      setName('');
      setEmail('');
      setIsSubmitting(false);
    }, 1500);
  };

  const recentReviews = [
    {
      id: 1,
      name: 'Priya Sharma',
      rating: 5,
      comment: 'Amazing experience in Betla National Park! The AI guide was very helpful.',
      location: 'Betla National Park',
      date: '2 days ago',
      helpful: 12
    },
    {
      id: 2,
      name: 'Rajesh Kumar',
      rating: 4,
      comment: 'Beautiful sunrise at Netarhat. The AR experience was incredible!',
      location: 'Netarhat',
      date: '5 days ago',
      helpful: 8
    },
    {
      id: 3,
      name: 'Anjali Devi',
      rating: 5,
      comment: 'Stayed at a tribal village homestay. Such authentic cultural experience!',
      location: 'Tribal Village',
      date: '1 week ago',
      helpful: 15
    }
  ];

  const sentimentData = [
    { category: 'Very Positive', percentage: 45, color: 'bg-green-500' },
    { category: 'Positive', percentage: 35, color: 'bg-blue-500' },
    { category: 'Neutral', percentage: 15, color: 'bg-yellow-500' },
    { category: 'Negative', percentage: 5, color: 'bg-red-500' }
  ];

  return (
    <section id="feedback" className="py-16 md:py-20 px-4 bg-background">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Feedback & Reviews
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Share your experiences and help improve tourism in Jharkhand
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Feedback Form */}
          <div className="cultural-card tribal-pattern p-6 md:p-8">
            <h3 className="text-xl font-bold text-foreground mb-6">Share Your Experience</h3>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Name (Optional)</label>
                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email (Optional)</label>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-3">Overall Rating</label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoveredRating(star)}
                      onMouseLeave={() => setHoveredRating(0)}
                      className="transition-colors duration-200"
                    >
                      <Star
                        className={`h-8 w-8 ${
                          star <= (hoveredRating || rating)
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-muted-foreground'
                        }`}
                      />
                    </button>
                  ))}
                  {rating > 0 && (
                    <span className="ml-2 text-sm text-muted-foreground">
                      {rating} star{rating !== 1 ? 's' : ''}
                    </span>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Your Feedback</label>
                <Textarea
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Tell us about your experience in Jharkhand..."
                  rows={4}
                  maxLength={500}
                />
                <div className="text-right text-xs text-muted-foreground mt-1">
                  {feedback.length}/500
                </div>
              </div>

              <Button
                onClick={submitFeedback}
                disabled={isSubmitting || !rating || !feedback.trim()}
                className="btn-cultural w-full"
              >
                {isSubmitting ? (
                  <>
                    <div className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Submit Feedback
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Sentiment Analysis */}
          <div className="cultural-card tribal-pattern p-6 md:p-8">
            <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Sentiment Analysis
            </h3>
            
            <div className="space-y-4 mb-6">
              {sentimentData.map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-foreground">{item.category}</span>
                    <span className="text-muted-foreground">{item.percentage}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className={`${item.color} h-2 rounded-full transition-all duration-700`}
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-foreground">4.6</div>
                <div className="text-sm text-muted-foreground">Avg Rating</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">1,247</div>
                <div className="text-sm text-muted-foreground">Total Reviews</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">95%</div>
                <div className="text-sm text-muted-foreground">Recommend</div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Reviews */}
        <div className="cultural-card tribal-pattern p-6 md:p-8">
          <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
            <MessageCircle className="h-5 w-5" />
            Recent Reviews
          </h3>
          
          <div className="space-y-6">
            {recentReviews.map((review) => (
              <div key={review.id} className="border-b border-border last:border-b-0 pb-6 last:pb-0">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="h-10 w-10 bg-primary/20 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-primary">
                        {review.name.charAt(0)}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-medium text-foreground">{review.name}</span>
                      <div className="flex items-center gap-1">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {review.location}
                      </Badge>
                    </div>
                    
                    <p className="text-muted-foreground mb-3">{review.comment}</p>
                    
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{review.date}</span>
                      <button className="flex items-center gap-1 hover:text-foreground transition-colors">
                        <ThumbsUp className="h-3 w-3" />
                        <span>Helpful ({review.helpful})</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-6">
            <Button variant="outline">
              View All Reviews
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeedbackSection;