import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, CheckCircle, Star, Users } from "lucide-react";
import { useState } from "react";
import AdvisorMatchingForm from "@/components/AdvisorMatchingForm";

const Insurance = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const topInsuranceAdvisors = [
    {
      name: "Sarah Chen",
      rating: 4.9,
      reviews: 167,
      specialties: "Life Insurance, Health Insurance, Critical Illness",
      experience: "8 years at Great Eastern",
      connections: "Li Wei and 6 other mutual connections",
      avatar: "SC"
    },
    {
      name: "Michael Tan",
      rating: 4.8,
      reviews: 203,
      specialties: "Term Life, Whole Life, Investment-Linked",
      experience: "12 years at AIA",
      connections: "James Lim and 12 other mutual connections",
      avatar: "MT"
    },
    {
      name: "Jennifer Lim",
      rating: 4.8,
      reviews: 156,
      specialties: "Family Protection, Business Insurance, Disability",
      experience: "6 years at Prudential",
      connections: "Rachel Wong and 8 other mutual connections",
      avatar: "JL"
    },
    {
      name: "David Wong",
      rating: 4.7,
      reviews: 189,
      specialties: "Estate Planning, Legacy Protection, Wealth Transfer",
      experience: "15 years at Income",
      connections: "Kevin Ng and 15 other mutual connections",
      avatar: "DW"
    },
    {
      name: "Amanda Lee",
      rating: 4.7,
      reviews: 134,
      specialties: "Young Professional Insurance, Health Coverage",
      experience: "5 years at Singlife",
      connections: "Mark Tan and 7 other mutual connections",
      avatar: "AL"
    },
    {
      name: "Robert Chua",
      rating: 4.6,
      reviews: 198,
      specialties: "Business Insurance, Corporate Solutions",
      experience: "11 years at FWD",
      connections: "Peter Lee and 18 other mutual connections",
      avatar: "RC"
    }
  ].sort((a, b) => {
    if (b.rating !== a.rating) return b.rating - a.rating;
    return b.reviews - a.reviews;
  });

  const features = [
    "Life and health insurance",
    "Disability income protection",
    "Critical illness coverage",
    "Property and casualty insurance",
    "Insurance needs analysis"
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header onFindAdvisorClick={() => setIsFormOpen(true)} />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <Shield className="w-16 h-16 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">
              Insurance Coverage
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Protect yourself and your loved ones with comprehensive insurance solutions for every life stage.
            </p>
            <Button
              onClick={() => setIsFormOpen(true)}
              size="lg"
              className="bg-primary hover:bg-primary-light text-primary-foreground shadow-button text-lg px-8 py-4 rounded-full transition-smooth font-semibold"
            >
              Find Insurance Advisor
            </Button>
          </div>

          {/* Top-Rated Advisors Grid */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-primary mb-6 text-center">
              Top-Rated Insurance Advisors
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {topInsuranceAdvisors.map((advisor, index) => (
                <Card key={advisor.name} className="service-card p-6 relative">
                  <div className="flex flex-col items-center text-center">
                    {/* Profile Avatar */}
                    <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center text-white font-bold text-xl mb-4">
                      {advisor.avatar}
                    </div>
                    
                    {/* Name and Rating */}
                    <h3 className="font-semibold text-lg text-foreground mb-2">
                      {advisor.name}
                    </h3>
                    
                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold text-foreground">{advisor.rating}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        ({advisor.reviews} reviews)
                      </span>
                    </div>
                    
                    {/* Experience */}
                    <p className="text-sm text-muted-foreground mb-3">
                      {advisor.experience}
                    </p>
                    
                    {/* Specialties */}
                    <p className="text-xs text-muted-foreground mb-4 line-clamp-2">
                      {advisor.specialties}
                    </p>
                    
                    {/* Mutual Connections */}
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mb-4">
                      <Users className="w-3 h-3" />
                      <span>{advisor.connections}</span>
                    </div>
                    
                    {/* Connect Button */}
                    <Button
                      onClick={() => setIsFormOpen(true)}
                      variant="outline"
                      className="w-full text-primary border-primary hover:bg-primary hover:text-primary-foreground"
                    >
                      Connect
                    </Button>
                  </div>
                  
                  {/* Ranking Badge */}
                  <div className="absolute top-4 right-4">
                    <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full font-semibold">
                      #{index + 1}
                    </span>
                  </div>
                </Card>
              ))}
            </div>
          </div>

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
                    Why Choose Our Insurance Advisors?
                  </h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Licensed insurance professionals</li>
                    <li>• Comprehensive needs analysis</li>
                    <li>• Claims assistance and support</li>
                    <li>• Regular policy reviews</li>
                    <li>• Multi-company comparisons</li>
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

export default Insurance;