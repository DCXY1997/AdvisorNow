import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const AgentSignup = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    representativeCode: "",
    financialInstitution: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const financialInstitutions = [
    "AIA",
    "Great Eastern",
    "Prudential",
    "HSBC Life",
    "Income",
    "Manulife",
    "Singlife",
    "FWD",
    "Tokio Marine Life",
    "Other"
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const { fullName, email, password, representativeCode, financialInstitution } = formData;
    
    if (!fullName || !email || !password || !representativeCode || !financialInstitution) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields to continue.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Insert registration data into Supabase
      const { error } = await (supabase as any)
        .from('agent_registrations')
        .insert({
          full_name: fullName,
          email: email,
          password: password,
          representative_code: representativeCode,
          financial_institution: financialInstitution,
          status: 'pending'
        });

      if (error) {
        throw error;
      }

      toast({
        title: "Registration Submitted",
        description: "Your agent registration has been submitted for review. We'll contact you soon.",
      });
      
      setFormData({
        fullName: "",
        email: "",
        password: "",
        representativeCode: "",
        financialInstitution: "",
      });
      
      // Redirect to index page after successful submission
      setTimeout(() => {
        navigate("/");
      }, 2000);
      
    } catch (error: any) {
      toast({
        title: "Registration Failed",
        description: error.message || "There was an error submitting your registration. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
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

          {/* Static Information Section */}
          <div className="bg-muted/30 border border-border rounded-lg p-6 mb-6 space-y-4">
            <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
              <svg className="h-5 w-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Registration Requirements
            </h3>
            
            <div className="space-y-3 text-sm text-muted-foreground">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <p className="font-medium text-foreground">Valid Representative License</p>
                  <p>Must possess a current financial advisor representative license with your financial institution</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <p className="font-medium text-foreground">Professional Email</p>
                  <p>Provide your professional email address for verification and communication</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <p className="font-medium text-foreground">Institution Affiliation</p>
                  <p>Select your current financial institution from our approved list</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <p className="font-medium text-foreground">Review Process</p>
                  <p>Applications are reviewed within 2-3 business days. You'll receive email updates on your status</p>
                </div>
              </div>
            </div>

            <div className="bg-background border border-border rounded-lg p-4 mt-4">
              <p className="text-xs text-muted-foreground">
                <strong>Note:</strong> All applications are subject to verification with your financial institution. 
                Incomplete or invalid information may result in application rejection.
              </p>
            </div>
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
              <Label htmlFor="password" className="text-sm font-medium text-foreground">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                placeholder="Enter your password"
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
              <Select value={formData.financialInstitution} onValueChange={(value) => handleInputChange("financialInstitution", value)}>
                <SelectTrigger className="h-12 transition-smooth focus:ring-2 focus:ring-primary/20 border-border bg-background">
                  <SelectValue placeholder="Select your financial institution" />
                </SelectTrigger>
                <SelectContent className="bg-background border-border z-50">
                  {financialInstitutions.map((institution) => (
                    <SelectItem key={institution} value={institution} className="hover:bg-muted">
                      {institution}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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