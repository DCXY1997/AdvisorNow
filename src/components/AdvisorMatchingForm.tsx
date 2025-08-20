import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

interface FormData {
  name: string;
  phoneNumber: string;
  topic: string;
  financialInstitution: string;
  pdpaConsent: boolean;
}

interface AdvisorMatchingFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const AdvisorMatchingForm = ({ isOpen, onClose }: AdvisorMatchingFormProps) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    phoneNumber: "",
    topic: "",
    financialInstitution: "",
    pdpaConsent: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.pdpaConsent) {
      toast({
        title: "Consent Required",
        description: "Please consent to the PDPA terms to proceed.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Advisor Found!",
        description: "Connecting you to your advisor now...",
      });
      setIsSubmitting(false);
      onClose();
      setFormData({
        name: "",
        phoneNumber: "",
        topic: "",
        financialInstitution: "",
        pdpaConsent: false,
      });
      // Navigate to video call page
      navigate('/video-call');
    }, 1500);
  };

  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const financialInstitutions = [
    "Any",
    "AIA",
    "Great Eastern", 
    "Prudential",
    "HSBC Life",
    "Income",
    "Manulife",
    "Singlife",
    "FWD",
    "Tokio Marine Life"
  ];

  const topics = [
    "Insurance Planning",
    "Investment Planning",
    "Retirement Planning",
    "Estate Planning",
    "Education Planning",
    "Corporate Solution"
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] gradient-card border-border/50">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-primary text-center">
            Find Your Financial Advisor
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6 mt-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium">
              Full Name *
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              placeholder="Enter your full name"
              required
              className="transition-smooth focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="text-sm font-medium">
              Phone Number *
            </Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phoneNumber}
              onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
              placeholder="+65 9XXX XXXX"
              required
              className="transition-smooth focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="topic" className="text-sm font-medium">
              Topic of Interest *
            </Label>
            <Select onValueChange={(value) => handleInputChange("topic", value)} required>
              <SelectTrigger className="transition-smooth focus:ring-2 focus:ring-primary/20">
                <SelectValue placeholder="Select your area of interest" />
              </SelectTrigger>
              <SelectContent>
                {topics.map((topic) => (
                  <SelectItem key={topic} value={topic}>
                    {topic}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="institution" className="text-sm font-medium">
              Preferred Financial Institution *
            </Label>
            <Select onValueChange={(value) => handleInputChange("financialInstitution", value)} required>
              <SelectTrigger className="transition-smooth focus:ring-2 focus:ring-primary/20">
                <SelectValue placeholder="Any" />
              </SelectTrigger>
              <SelectContent>
                {financialInstitutions.map((institution) => (
                  <SelectItem key={institution} value={institution}>
                    {institution}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-start space-x-3 p-4 bg-muted rounded-lg">
            <Checkbox
              id="pdpa"
              checked={formData.pdpaConsent}
              onCheckedChange={(checked) => handleInputChange("pdpaConsent", checked as boolean)}
              className="mt-1"
            />
            <div className="space-y-1">
              <Label htmlFor="pdpa" className="text-sm font-medium leading-5 cursor-pointer">
                I consent to the collection and use of my personal data *
              </Label>
              <p className="text-xs text-muted-foreground leading-4">
                By checking this box, you agree to our Personal Data Protection Act (PDPA) policy. 
                Your information will be used solely for matching you with qualified financial advisors.
              </p>
            </div>
          </div>

          <Button
            type="submit"
            disabled={isSubmitting || !formData.name || !formData.phoneNumber || !formData.topic || !formData.financialInstitution || !formData.pdpaConsent}
            className="w-full h-12 text-lg font-semibold bg-primary hover:bg-primary-light text-primary-foreground shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 border-0"
          >
            {isSubmitting ? "Submitting..." : "Find My Advisor"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AdvisorMatchingForm;