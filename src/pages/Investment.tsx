import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, CheckCircle, Star, MessageCircle } from "lucide-react";
import { useState } from "react";
import AdvisorMatchingForm from "@/components/AdvisorMatchingForm";

const Investment = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const topInvestmentAdvisors = [
    {
      name: "Alex Thompson",
      rating: 4.9,
      reviews: 234,
      specialties: ["Portfolio Management", "ETF Strategies", "Tax-Efficient Investing"],
      experience: "10 years",
      institution: "HSBC Life"
    },
    {
      name: "Priya Sharma",
      rating: 4.8,
      reviews: 198,
      specialties: ["Growth Investing", "Dividend Strategies", "Risk Assessment"],
      experience: "8 years",
      institution: "Manulife"
    },
    {
      name: "Kevin Lim",
      rating: 4.8,
      reviews: 156,
      specialties: ["Value Investing", "Market Analysis", "Asset Allocation"],
      experience: "12 years",
      institution: "Great Eastern"
    }
  ].sort((a, b) => {
    if (b.rating !== a.rating) return b.rating - a.rating;
    return b.reviews - a.reviews;
  });

  const features = [
    "Portfolio diversification strategies",
    "Risk assessment and management", 
    "Market analysis and insights",
    "Regular portfolio reviews",
    "Tax-efficient investing"
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header onFindAdvisorClick={() => setIsFormOpen(true)} />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <TrendingUp className="w-16 h-16 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">
              Investment Planning
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Build wealth through strategic investment portfolios tailored to your risk tolerance and financial goals.
            </p>
            <Button
              onClick={() => setIsFormOpen(true)}
              size="lg"
              className="bg-primary hover:bg-primary-light text-primary-foreground shadow-button text-lg px-8 py-4 rounded-full transition-smooth font-semibold"
            >
              Find Investment Advisor
            </Button>
          </div>

          {/* Top Advisors */}
          <Card className="service-card mb-8">
            <CardHeader>
              <CardTitle className="text-2xl text-primary">Top-Rated Investment Advisors</CardTitle>
              <CardDescription>Ranked by rating and review count</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {topInvestmentAdvisors.map((advisor, index) => (
                  <div key={advisor.name} className="bg-card border border-border/50 rounded-lg p-4 hover:shadow-card transition-smooth">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-foreground text-lg">{advisor.name}</span>
                          <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">#{index + 1}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{advisor.experience} • {advisor.institution}</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1 mb-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-semibold text-foreground">{advisor.rating}</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <MessageCircle className="w-3 h-3" />
                          <span>{advisor.reviews} reviews</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {advisor.specialties.map((specialty) => (
                        <span key={specialty} className="bg-secondary/10 text-secondary-foreground text-xs px-2 py-1 rounded-full">
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Features */}
          <Card className="service-card">
            <CardHeader>
              <CardTitle className="text-2xl text-primary">What We Offer</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <ul className="space-y-4">
                    {features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="bg-gradient-card p-6 rounded-lg border border-border/50">
                  <h4 className="font-semibold text-foreground mb-3">
                    Why Choose Our Investment Advisors?
                  </h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• CFA and CFP certified professionals</li>
                    <li>• Proven track record of portfolio performance</li>
                    <li>• Regular market updates and insights</li>
                    <li>• Transparent fee structure</li>
                    <li>• Personalized investment strategies</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <AdvisorMatchingForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
      />
    </div>
  );
};

export default Investment;