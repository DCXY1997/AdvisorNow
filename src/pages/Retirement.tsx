import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PiggyBank, CheckCircle, Star, MessageCircle } from "lucide-react";
import { useState } from "react";
import AdvisorMatchingForm from "@/components/AdvisorMatchingForm";

const Retirement = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const topRetirementAdvisors = [
    {
      name: "Robert Johnson",
      rating: 4.9,
      reviews: 178,
      specialties: ["CPF Optimization", "Retirement Income", "Estate Planning"],
      experience: "14 years",
      institution: "Singlife"
    },
    {
      name: "Michelle Lee",
      rating: 4.8,
      reviews: 145,
      specialties: ["Pension Planning", "Long-term Care", "Wealth Preservation"],
      experience: "11 years",
      institution: "Income"
    },
    {
      name: "Daniel Chua",
      rating: 4.7,
      reviews: 192,
      specialties: ["Retirement Strategies", "Tax Planning", "Asset Protection"],
      experience: "16 years",
      institution: "Great Eastern"
    }
  ].sort((a, b) => {
    if (b.rating !== a.rating) return b.rating - a.rating;
    return b.reviews - a.reviews;
  });

  const features = [
    "CPF optimization strategies",
    "Retirement income planning",
    "Long-term care planning",
    "Estate planning guidance",
    "Withdrawal strategies"
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header onFindAdvisorClick={() => setIsFormOpen(true)} />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <PiggyBank className="w-16 h-16 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">
              Retirement Planning
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Secure your golden years with strategic retirement planning and wealth preservation strategies.
            </p>
            <Button
              onClick={() => setIsFormOpen(true)}
              size="lg"
              className="bg-primary hover:bg-primary-light text-primary-foreground shadow-button text-lg px-8 py-4 rounded-full transition-smooth font-semibold"
            >
              Find Retirement Advisor
            </Button>
          </div>

          {/* Top Advisors */}
          <Card className="service-card mb-8">
            <CardHeader>
              <CardTitle className="text-2xl text-primary">Top-Rated Retirement Advisors</CardTitle>
              <CardDescription>Ranked by rating and review count</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {topRetirementAdvisors.map((advisor, index) => (
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
                    Why Choose Our Retirement Advisors?
                  </h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• CPF and retirement planning specialists</li>
                    <li>• Comprehensive retirement income analysis</li>
                    <li>• Estate and legacy planning expertise</li>
                    <li>• Tax-efficient withdrawal strategies</li>
                    <li>• Long-term care planning guidance</li>
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

export default Retirement;