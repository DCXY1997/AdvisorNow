import Header from "@/components/Header";
import { useState } from "react";
import AdvisorMatchingForm from "@/components/AdvisorMatchingForm";
import InsuranceAdvisorCards from "@/components/InsuranceAdvisorCards";
import Footer from "@/components/Footer";

const Insurance = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Header onFindAdvisorClick={() => setIsFormOpen(true)} />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <InsuranceAdvisorCards onConnectClick={() => setIsFormOpen(true)} />
        </div>
      </div>

      <Footer />

      <AdvisorMatchingForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
      />
    </div>
  );
};

export default Insurance;