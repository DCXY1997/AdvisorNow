import { useState } from "react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import HowItWorks from "@/components/HowItWorks";
import Testimonials from "@/components/Testimonials";
import ServiceTabs from "@/components/ServiceTabs";
import Footer from "@/components/Footer";
import AdvisorMatchingForm from "@/components/AdvisorMatchingForm";
import heroImage from "@/assets/advisor-consultation-hero.jpg";

const Index = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const scrollToHowItWorks = () => {
    const element = document.getElementById('how-it-works');
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header onFindAdvisorClick={() => setIsFormOpen(true)} />

      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-[600px] md:min-h-[700px]">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-hero-background/85"></div>
        </div>
        
        {/* Decorative elements inspired by reference */}
        <div className="absolute top-20 right-20 w-32 h-16 bg-secondary rounded-full opacity-30 z-10"></div>
        <div className="absolute top-40 right-40 w-24 h-12 bg-secondary-light rounded-full opacity-20 z-10"></div>
        <div className="absolute bottom-20 left-20 w-40 h-20 bg-secondary rounded-full opacity-25 z-10"></div>
        <div className="absolute bottom-40 right-10 w-28 h-14 bg-secondary-light rounded-full opacity-15 z-10"></div>
        
        <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
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
                onClick={scrollToHowItWorks}
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
      <Footer />

      {/* Advisor Matching Form Modal */}
      <AdvisorMatchingForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
      />
    </div>
  );
};

export default Index;