import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const { toast } = useToast();
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!emailOrPhone) {
      toast({
        title: "Missing Information",
        description: "Please enter your email address or phone number.",
        variant: "destructive",
      });
      return;
    }

    setIsSending(true);
    
    // Simulate sending reset link
    setTimeout(() => {
      toast({
        title: "Reset Link Sent",
        description: "Password reset instructions have been sent to your email/phone.",
      });
      setIsSending(false);
      setEmailOrPhone("");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="gradient-card border-border/50 p-8 rounded-lg">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-primary mb-2">Advisor Now</h1>
            <h2 className="text-xl font-semibold text-muted-foreground">Reset Password</h2>
            <p className="text-sm text-muted-foreground mt-2">
              Enter your email address or phone number and we'll send you a link to reset your password.
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="emailOrPhone" className="text-sm font-medium text-foreground">
                Email address or phone number
              </Label>
              <Input
                id="emailOrPhone"
                value={emailOrPhone}
                onChange={(e) => setEmailOrPhone(e.target.value)}
                placeholder="Enter your email or phone number"
                required
                className="h-12 transition-smooth focus:ring-2 focus:ring-primary/20 border-border"
              />
            </div>

            <Button
              type="submit"
              disabled={isSending}
              className="w-full h-12 bg-primary hover:bg-primary-light text-primary-foreground font-semibold text-base transition-smooth"
            >
              {isSending ? "Sending..." : "Send Reset Link"}
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

export default ForgotPassword;