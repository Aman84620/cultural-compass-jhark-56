import React, { useState } from 'react';
import { 
  BarChart3, 
  Users, 
  MapPin, 
  DollarSign, 
  TrendingUp, 
  Eye, 
  Lock,
  Unlock,
  Shield
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

const AnalyticsSection: React.FC = () => {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');

  const handleAdminLogin = () => {
    // Demo password - in real app, this would be proper authentication
    if (adminPassword === 'admin123') {
      setIsAdminAuthenticated(true);
    } else {
      alert('Demo Password: admin123');
    }
  };

  const analyticsData = {
    totalVisitors: 12543,
    monthlyGrowth: 18.5,
    popularDestinations: [
      { name: 'Netarhat', visits: 3420, growth: 12 },
      { name: 'Betla National Park', visits: 2890, growth: 25 },
      { name: 'Ranchi', visits: 2156, growth: 8 },
      { name: 'Jamshedpur', visits: 1876, growth: 15 }
    ],
    bookingStats: {
      guides: 245,
      tours: 189,
      accommodations: 312
    },
    economicImpact: {
      revenue: '₹45.2L',
      jobs: 156,
      localBusiness: 89
    }
  };

  if (!isAdminAuthenticated) {
    return (
      <section id="analytics" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-md">
          <Card className="border-2 border-primary/20">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-2xl">Admin Access Required</CardTitle>
              <p className="text-muted-foreground">
                Enter admin credentials to view analytics dashboard
              </p>
              <Badge variant="secondary" className="mx-auto">
                Demo Mode
              </Badge>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Admin Password</label>
                <Input
                  type="password"
                  placeholder="Enter admin password"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAdminLogin()}
                />
              </div>
              <Button onClick={handleAdminLogin} className="w-full btn-cultural">
                <Unlock className="h-4 w-4 mr-2" />
                Access Dashboard
              </Button>
              <p className="text-xs text-center text-muted-foreground">
                Demo Password: <code className="bg-muted px-1 rounded">admin123</code>
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    );
  }

  return (
    <section id="analytics" className="py-20 px-4 bg-muted/30">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-4xl font-bold mb-2">Analytics Dashboard</h2>
            <p className="text-lg text-muted-foreground">
              Tourism insights and engagement metrics
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-green-600 border-green-600">
              <Eye className="h-3 w-3 mr-1" />
              Admin View
            </Badge>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsAdminAuthenticated(false)}
            >
              <Lock className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Visitors</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analyticsData.totalVisitors.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                <TrendingUp className="h-3 w-3 inline mr-1" />
                +{analyticsData.monthlyGrowth}% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Revenue Generated</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analyticsData.economicImpact.revenue}</div>
              <p className="text-xs text-muted-foreground">Monthly tourism revenue</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Guide Bookings</CardTitle>
              <MapPin className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analyticsData.bookingStats.guides}</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Jobs Created</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analyticsData.economicImpact.jobs}</div>
              <p className="text-xs text-muted-foreground">Direct employment</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="destinations" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto">
            <TabsTrigger value="destinations">Destinations</TabsTrigger>
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="impact">Impact</TabsTrigger>
          </TabsList>

          <TabsContent value="destinations" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Popular Destinations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analyticsData.popularDestinations.map((dest, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                      <div>
                        <h4 className="font-semibold">{dest.name}</h4>
                        <p className="text-sm text-muted-foreground">{dest.visits} visits</p>
                      </div>
                      <Badge variant={dest.growth > 15 ? "default" : "secondary"}>
                        +{dest.growth}%
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="bookings" className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Guide Bookings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-primary">
                    {analyticsData.bookingStats.guides}
                  </div>
                  <p className="text-sm text-muted-foreground">This month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Tour Packages</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-primary">
                    {analyticsData.bookingStats.tours}
                  </div>
                  <p className="text-sm text-muted-foreground">Booked</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Accommodations</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-primary">
                    {analyticsData.bookingStats.accommodations}
                  </div>
                  <p className="text-sm text-muted-foreground">Reservations</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="impact" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Economic Impact</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Total Revenue</span>
                    <span className="font-bold text-primary">{analyticsData.economicImpact.revenue}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Jobs Created</span>
                    <span className="font-bold">{analyticsData.economicImpact.jobs}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Local Businesses</span>
                    <span className="font-bold">{analyticsData.economicImpact.localBusiness}</span>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Sustainability Metrics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Eco-tours</span>
                    <span className="font-bold text-green-600">75%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Local Guide Employment</span>
                    <span className="font-bold text-green-600">89%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Community Projects</span>
                    <span className="font-bold text-green-600">12</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default AnalyticsSection;