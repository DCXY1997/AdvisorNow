import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Shield, PiggyBank, GraduationCap, CheckCircle, Star, MessageCircle } from "lucide-react";

const ServiceTabs = () => {
  const [activeTab, setActiveTab] = useState("investment");

  // Top-rated Insurance Advisors (sorted by rating then review count)
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
    // Sort by rating first (descending), then by review count (descending)
    if (b.rating !== a.rating) return b.rating - a.rating;
    return b.reviews - a.reviews;
  });

  const services = {
    investment: {
      icon: <TrendingUp className="w-8 h-8 text-primary" />,
      title: "Investment Planning",
      description: "Build wealth through strategic investment portfolios tailored to your risk tolerance and financial goals.",
      features: [
        "Portfolio diversification strategies",
        "Risk assessment and management",
        "Market analysis and insights",
        "Regular portfolio reviews",
        "Tax-efficient investing"
      ],
      highlight: "Personalized investment strategies"
    },
    insurance: {
      icon: <Shield className="w-8 h-8 text-primary" />,
      title: "Insurance Coverage",
      description: "Protect yourself and your loved ones with comprehensive insurance solutions for every life stage.",
      features: [
        "Life and health insurance",
        "Disability income protection",
        "Critical illness coverage",
        "Property and casualty insurance",
        "Insurance needs analysis"
      ],
      highlight: "Comprehensive protection coverage",
      advisors: topInsuranceAdvisors
    },
    retirement: {
      icon: <PiggyBank className="w-8 h-8 text-primary" />,
      title: "Retirement Planning",
      description: "Secure your golden years with strategic retirement planning and wealth preservation strategies.",
      features: [
        "CPF optimization strategies",
        "Retirement income planning",
        "Long-term care planning",
        "Estate planning guidance",
        "Withdrawal strategies"
      ],
      highlight: "Plan for comfortable retirement"
    },
    education: {
      icon: <GraduationCap className="w-8 h-8 text-primary" />,
      title: "Education Planning",
      description: "Invest in your children's future with strategic education funding and savings plans.",
      features: [
        "Education savings accounts",
        "Tuition fee planning",
        "Scholarship and grant guidance",
        "Study abroad financing",
        "Skills development funding"
      ],
      highlight: "Secure your child's future"
    }
  };

  return (
    <section className="py-16 bg-gradient-to-br from-background via-muted/30 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Comprehensive Financial Services
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our expert advisors provide personalized guidance across all aspects of financial planning
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-8 bg-muted/50 p-1 rounded-xl">
            <TabsTrigger value="investment" className="transition-smooth">
              Investment
            </TabsTrigger>
            <TabsTrigger value="insurance" className="transition-smooth">
              Insurance
            </TabsTrigger>
            <TabsTrigger value="retirement" className="transition-smooth">
              Retirement
            </TabsTrigger>
            <TabsTrigger value="education" className="transition-smooth">
              Education
            </TabsTrigger>
          </TabsList>

          {Object.entries(services).map(([key, service]) => (
            <TabsContent key={key} value={key} className="mt-8">
              <Card className="service-card max-w-4xl mx-auto border-border/50">
                <CardHeader className="text-center pb-6">
                  <div className="flex justify-center mb-4">
                    {service.icon}
                  </div>
                  <CardTitle className="text-2xl md:text-3xl font-bold text-primary">
                    {service.title}
                  </CardTitle>
                  <CardDescription className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 text-center">
                    <p className="text-primary font-semibold text-lg">
                      {service.highlight}
                    </p>
                  </div>
                  
                  {key === 'insurance' && 'advisors' in service && service.advisors && (
                    <div className="space-y-4">
                      <h4 className="font-semibold text-foreground text-lg mb-4">
                        Top-Rated Insurance Advisors:
                      </h4>
                      <div className="grid gap-4">
                        {service.advisors.map((advisor, index) => (
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
                    </div>
                  )}
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-foreground mb-4 text-lg">
                        What We Offer:
                      </h4>
                      <ul className="space-y-3">
                        {service.features.map((feature, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                            <span className="text-muted-foreground">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="bg-gradient-card p-6 rounded-lg border border-border/50">
                      <h4 className="font-semibold text-foreground mb-3">
                        Why Choose Our Advisors?
                      </h4>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• Certified financial professionals</li>
                        <li>• Personalized strategies for your goals</li>
                        <li>• Ongoing support and monitoring</li>
                        <li>• Transparent fee structure</li>
                        <li>• Proven track record of success</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};

export default ServiceTabs;