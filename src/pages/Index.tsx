import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ServiceTabs from "@/components/ServiceTabs";
import AdvisorMatchingForm from "@/components/AdvisorMatchingForm";
import { Users, Award, Clock, Shield } from "lucide-react";
import heroImage from "@/assets/hero-financial-consultation.jpg";

const Index = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const stats = [
    {
      icon: <Users className="w-8 h-8 text-primary" />,
      number: "10,000+",
      label: "Clients Served"
    },
    {
      icon: <Award className="w-8 h-8 text-primary" />,
      number: "500+",
      label: "Certified Advisors"
    },
    {
      icon: <Clock className="w-8 h-8 text-primary" />,
      number: "24hr",
      label: "Response Time"
    },
    {
      icon: <Shield className="w-8 h-8 text-primary" />,
      number: "100%",
      label: "Secure & Confidential"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-hero"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{ backgroundImage: `url(${heroImage})` }}
        ></div>
        
        <div className="relative z-10 container mx-auto px-4 py-20 md:py-32">
          <div className="hero-content max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Find Your Perfect
              <span className="block text-secondary-light">Financial Advisor</span>
            </h1>
            
            <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-2xl mx-auto">
              Connect with certified financial professionals who understand your goals and 
              help you build a secure financial future.
            </p>
            
            <Button
              onClick={() => setIsFormOpen(true)}
              size="lg"
              className="bg-white text-primary hover:bg-white/90 shadow-elevated text-lg px-8 py-4 rounded-full transition-bounce font-semibold"
            >
              Find an Advisor
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <Card key={index} className="service-card text-center border-border/50">
                <CardContent className="pt-6">
                  <div className="flex justify-center mb-4">
                    {stat.icon}
                  </div>
                  <div className="text-2xl md:text-3xl font-bold text-primary mb-2">
                    {stat.number}
                  </div>
                  <div className="text-sm text-muted-foreground font-medium">
                    {stat.label}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Service Tabs Section */}
      <ServiceTabs />

      {/* Call to Action Section */}
      <section className="py-20 gradient-hero">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto hero-content">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Take Control of Your Financial Future?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of satisfied clients who have achieved their financial goals 
              with our expert guidance.
            </p>
            <Button
              onClick={() => setIsFormOpen(true)}
              size="lg"
              className="bg-white text-primary hover:bg-white/90 shadow-elevated text-lg px-8 py-4 rounded-full transition-bounce font-semibold"
            >
              Get Matched Today
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">FinanceMatch</h3>
              <p className="text-primary-foreground/80">
                Connecting you with trusted financial advisors for a secure financial future.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-primary-foreground/80">
                <li>Investment Planning</li>
                <li>Insurance Coverage</li>
                <li>Retirement Planning</li>
                <li>Education Planning</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <div className="space-y-2 text-primary-foreground/80">
                <p>📧 contact@financematch.sg</p>
                <p>📞 +65 6123 4567</p>
                <p>🏢 Singapore Financial District</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-primary-foreground/60">
            <p>&copy; 2024 FinanceMatch. All rights reserved. | Privacy Policy | Terms of Service</p>
          </div>
        </div>
      </footer>

      {/* Advisor Matching Form Modal */}
      <AdvisorMatchingForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
      />
    </div>
  );
};

export default Index;