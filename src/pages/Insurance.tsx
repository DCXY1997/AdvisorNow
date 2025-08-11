import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, CheckCircle, Star, MessageCircle } from "lucide-react";
import { useState } from "react";
import AdvisorMatchingForm from "@/components/AdvisorMatchingForm";

const Insurance = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const topInsuranceAdvisors = [
    {
      name: "Sarah Chen",
      rating: 4.9,
      reviews: 167,
      specialties: ["Life Insurance", "Health Insurance", "Critical Illness"],
      experience: "8 years",
      institution: "Great Eastern"
    },
    {
      name: "Michael Tan",
      rating: 4.8,
      reviews: 203,
      specialties: ["Term Life", "Whole Life", "Investment-Linked"],
      experience: "12 years", 
      institution: "AIA"
    },
    {
      name: "Jennifer Lim",
      rating: 4.8,
      reviews: 156,
      specialties: ["Family Protection", "Business Insurance", "Disability"],
      experience: "6 years",
      institution: "Prudential"
    },
    {
      name: "David Wong",
      rating: 4.7,
      reviews: 189,
      specialties: ["Estate Planning", "Legacy Protection", "Wealth Transfer"],
      experience: "15 years",
      institution: "Income"
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