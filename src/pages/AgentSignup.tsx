import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const AgentSignup = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    representativeCode: "",
    financialInstitution: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const { fullName, email, representativeCode, financialInstitution } = formData;
    
    if (!fullName || !email || !representativeCode || !financialInstitution) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields to continue.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate signup process
    setTimeout(() => {
      toast({
        title: "Registration Submitted",
        description: "Your agent registration has been submitted for review. We'll contact you soon.",
      });
      setIsSubmitting(false);
      setFormData({
        fullName: "",
        email: "",
        representativeCode: "",
        financialInstitution: "",
      });
    }, 1500);
  };

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="gradient-card border-border/50 p-8 rounded-lg">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-primary mb-2">Advisor Now</h1>
            <h2 className="text-xl font-semibold text-muted-foreground">Agent Registration</h2>
            <p className="text-sm text-muted-foreground mt-2">
              Join our platform as a financial advisor and connect with clients looking for expert guidance.
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-sm font-medium text-foreground">
                Full Name
              </Label>
              <Input
                id="fullName"
                value={formData.fullName}
                onChange={(e) => handleInputChange("fullName", e.target.value)}
                placeholder="Enter your full name"
                required
                className="h-12 transition-smooth focus:ring-2 focus:ring-primary/20 border-border"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-foreground">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="Enter your email address"
                required
                className="h-12 transition-smooth focus:ring-2 focus:ring-primary/20 border-border"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="representativeCode" className="text-sm font-medium text-foreground">
                Representative Code
              </Label>
              <Input
                id="representativeCode"
                value={formData.representativeCode}
                onChange={(e) => handleInputChange("representativeCode", e.target.value)}
                placeholder="Enter your representative code"
                required
                className="h-12 transition-smooth focus:ring-2 focus:ring-primary/20 border-border"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="financialInstitution" className="text-sm font-medium text-foreground">
                Financial Institution
              </Label>
              <Input
                id="financialInstitution"
                value={formData.financialInstitution}
                onChange={(e) => handleInputChange("financialInstitution", e.target.value)}
                placeholder="Enter your financial institution"
                required
                className="h-12 transition-smooth focus:ring-2 focus:ring-primary/20 border-border"
              />
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-12 bg-primary hover:bg-primary-light text-primary-foreground font-semibold text-base transition-smooth"
            >
              {isSubmitting ? "Submitting..." : "Submit Registration"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-smooth text-sm"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentSignup;