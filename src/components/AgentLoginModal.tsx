import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

interface AgentLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AgentLoginModal = ({ isOpen, onClose }: AgentLoginModalProps) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    emailOrPhone: "",
    password: "",
  });
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.emailOrPhone || !formData.password) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields to continue.",
        variant: "destructive",
      });
      return;
    }

    setIsLoggingIn(true);
    
    try {
      // Step 1: Check if the email has an approved registration
      const { data: registration, error: regError } = await supabase
        .from('agent_registrations')
        .select('status')
        .eq('email', formData.emailOrPhone)
        .single();

      if (regError || !registration) {
        toast({
          title: "Registration Not Found",
          description: "Please register first or contact support if you believe this is an error.",
          variant: "destructive",
        });
        return;
      }

      // Step 2: Validate registration status
      if (registration.status !== 'approved') {
        const statusMessage = registration.status === 'pending' 
          ? "Your registration is still pending approval. Please wait for admin confirmation."
          : "Your registration has been rejected. Please contact support for more information.";
        
        toast({
          title: "Access Denied",
          description: statusMessage,
          variant: "destructive",
        });
        return;
      }

      // Step 3: Check if advisor record exists
      const { data: advisor, error: advisorError } = await supabase
        .from('advisors')
        .select('user_id, status, subscription')
        .eq('email', formData.emailOrPhone)
        .single();

      if (advisorError || !advisor) {
        toast({
          title: "Advisor Profile Not Found",
          description: "Your advisor profile is being set up. Please contact support.",
          variant: "destructive",
        });
        return;
      }

      // Step 4: Try to sign in with existing auth account
      if (advisor.user_id) {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email: formData.emailOrPhone,
          password: formData.password,
        });

        if (signInError) {
          if (signInError.message.includes('Invalid login credentials')) {
            toast({
              title: "Invalid Credentials",
              description: "Please check your email and password and try again.",
              variant: "destructive",
            });
          } else {
            toast({
              title: "Login Failed",
              description: signInError.message,
              variant: "destructive",
            });
          }
          return;
        }
      } else {
        // Step 5: First-time login - create auth account
        const { data: authData, error: signUpError } = await supabase.auth.signUp({
          email: formData.emailOrPhone,
          password: formData.password,
          options: {
            emailRedirectTo: `${window.location.origin}/agent-dashboard`
          }
        });

        if (signUpError) {
          if (signUpError.message.includes('rate limit')) {
            toast({
              title: "Too Many Attempts",
              description: "Please wait a moment before trying again.",
              variant: "destructive",
            });
          } else {
            toast({
              title: "Account Creation Failed",
              description: signUpError.message,
              variant: "destructive",
            });
          }
          return;
        }

        if (authData.user) {
          // Link the auth user to the advisor record
          await supabase
            .from('advisors')
            .update({ user_id: authData.user.id })
            .eq('email', formData.emailOrPhone);
            
          if (authData.user.email_confirmed_at) {
            // Email already confirmed, proceed with login
            toast({
              title: "Login Successful",
              description: "Welcome back! Redirecting to agent dashboard...",
            });
          } else {
            // Email needs confirmation
            toast({
              title: "Account Created",
              description: "Please check your email to confirm your account before logging in.",
            });
            return;
          }
        }
      }

      // Step 6: Final success
      toast({
        title: "Login Successful",
        description: "Welcome back! Redirecting to agent dashboard...",
      });
      
      onClose();
      setFormData({
        emailOrPhone: "",
        password: "",
      });
      navigate("/agent-dashboard");
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "Login Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleForgotPassword = () => {
    onClose();
    navigate("/forgot-password");
  };

  const handleSignUp = () => {
    onClose();
    navigate("/agent-signup");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[420px] gradient-card border-border/50 p-0">
        <div className="text-center py-8 px-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-primary mb-2">Advisor Now</h1>
            <h2 className="text-xl font-semibold text-muted-foreground">Agent Login</h2>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2 text-left">
              <Label htmlFor="emailOrPhone" className="text-sm font-medium text-foreground">
                Email address or phone number
              </Label>
              <Input
                id="emailOrPhone"
                value={formData.emailOrPhone}
                onChange={(e) => handleInputChange("emailOrPhone", e.target.value)}
                placeholder=""
                required
                className="h-12 transition-smooth focus:ring-2 focus:ring-primary/20 border-border"
              />
            </div>

            <div className="space-y-2 text-left">
              <Label htmlFor="password" className="text-sm font-medium text-foreground">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                placeholder=""
                required
                className="h-12 transition-smooth focus:ring-2 focus:ring-primary/20 border-border"
              />
            </div>

            <Button
              type="submit"
              disabled={isLoggingIn}
              className="w-full h-12 bg-primary hover:bg-primary-light text-primary-foreground font-semibold text-base transition-smooth"
            >
              {isLoggingIn ? "Logging in..." : "Login"}
            </Button>
          </form>

          <button
            onClick={handleForgotPassword}
            className="text-muted-foreground hover:text-foreground transition-smooth text-sm mt-4 mb-6"
          >
            Forgotten Password?
          </button>

          <Button
            onClick={handleSignUp}
            variant="outline"
            className="w-full h-12 bg-secondary/10 border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground font-semibold text-base transition-smooth"
          >
            Sign Up
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AgentLoginModal;