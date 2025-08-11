import { useState } from "react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import HowItWorks from "@/components/HowItWorks";
import Testimonials from "@/components/Testimonials";
import ServiceTabs from "@/components/ServiceTabs";
import AdvisorMatchingForm from "@/components/AdvisorMatchingForm";

const Index = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header onFindAdvisorClick={() => setIsFormOpen(true)} />

      {/* Hero Section */}
      <section className="gradient-hero relative overflow-hidden">
        {/* Decorative elements inspired by reference */}
        <div className="absolute top-20 right-20 w-32 h-16 bg-secondary rounded-full opacity-30"></div>
        <div className="absolute top-40 right-40 w-24 h-12 bg-secondary-light rounded-full opacity-20"></div>
        <div className="absolute bottom-20 left-20 w-40 h-20 bg-secondary rounded-full opacity-25"></div>
        <div className="absolute bottom-40 right-10 w-28 h-14 bg-secondary-light rounded-full opacity-15"></div>
        
        <div className="container mx-auto px-4 py-20 md:py-32">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-bold text-primary mb-6 leading-tight">
              Talk to a Licensed<br />
              <span className="text-primary-light">Financial Advisor Instantly</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-2xl">
              No Pressure, No Hard Selling, Just Advice
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={() => setIsFormOpen(true)}
                size="lg"
                className="bg-primary hover:bg-primary-light text-primary-foreground shadow-button text-lg px-8 py-4 rounded-full transition-smooth font-semibold"
              >
                FIND AN ADVISOR NOW
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground text-lg px-8 py-4 rounded-full transition-smooth font-semibold"
              >
                SEE HOW IT WORKS
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <HowItWorks />

      {/* Service Tabs Section */}
      <ServiceTabs />

      {/* Testimonials Section */}
      <Testimonials />

      {/* Final CTA Section */}
      <section className="py-20 gradient-hero">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
              Ready to Get Expert Financial Advice?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Connect with certified financial advisors instantly and get the guidance you need.
            </p>
            <Button
              onClick={() => setIsFormOpen(true)}
              size="lg"
              className="bg-primary hover:bg-primary-light text-primary-foreground shadow-button text-lg px-8 py-4 rounded-full transition-smooth font-semibold"
            >
              Get Started Today
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <div className="w-10 h-7 bg-secondary rounded-full mr-3 flex items-center justify-center">
                  <div className="w-7 h-5 bg-secondary-light rounded-full"></div>
                </div>
                <span className="text-xl font-bold">FinanceMatch</span>
              </div>
              <p className="text-primary-foreground/80">
                Connecting you with licensed financial advisors for instant, pressure-free advice.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-primary-foreground/80">
                <li>Insurance Planning</li>
                <li>Investment Advisory</li>
                <li>Retirement Planning</li>
                <li>Education Funding</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <div className="space-y-2 text-primary-foreground/80">
                <p>📧 hello@financematch.sg</p>
                <p>📞 +65 6123 4567</p>
                <p>🏢 Singapore CBD</p>
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