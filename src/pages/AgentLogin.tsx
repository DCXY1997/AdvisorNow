import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { User as SupabaseUser, Session } from '@supabase/supabase-js';

const AgentLogin = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);

  // Authentication state management
  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        if (session?.user) {
          // Redirect to dashboard if already logged in
          navigate('/agent-dashboard');
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        navigate('/agent-dashboard');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    setIsLoggingIn(true);

    try {
      // First check if the user is an approved advisor
      const { data: registrationData, error: regError } = await (supabase as any)
        .from('agent_registrations')
        .select('*')
        .eq('email', formData.email)
        .eq('status', 'approved')
        .maybeSingle();

      if (!registrationData) {
        toast({
          title: "Access Denied",
          description: "Your advisor account is not approved yet or doesn't exist.",
          variant: "destructive"
        });
        setIsLoggingIn(false);
        return;
      }

      // Attempt to sign in
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (error) {
        // If user doesn't exist in auth, sign them up first
        if (error.message.includes('Invalid login credentials')) {
          const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
            email: formData.email,
            password: formData.password,
            options: {
              emailRedirectTo: `${window.location.origin}/agent-dashboard`
            }
          });

          if (signUpError) {
            throw signUpError;
          }

          if (signUpData.user && !signUpData.session) {
            toast({
              title: "Check Your Email",
              description: "Please check your email and click the verification link to complete your login.",
            });
          } else if (signUpData.session) {
            toast({
              title: "Welcome!",
              description: "Login successful. Redirecting to your dashboard...",
            });
            navigate('/agent-dashboard');
          }
        } else {
          throw error;
        }
      } else if (data.session) {
        toast({
          title: "Welcome Back!",
          description: "Login successful. Redirecting to your dashboard...",
        });
        navigate('/agent-dashboard');
      }
    } catch (error: any) {
      console.error('Login error:', error);
      toast({
        title: "Login Failed",
        description: error.message || "Invalid email or password. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-block">
            <h1 className="text-3xl font-bold text-primary mb-2">Advisor Now</h1>
          </Link>
          <h2 className="text-xl font-semibold text-muted-foreground">Agent Login</h2>
          <p className="text-sm text-muted-foreground mt-2">
            Access your advisor dashboard
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-center">Sign In</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  required
                  disabled={isLoggingIn}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter your password"
                  required
                  disabled={isLoggingIn}
                />
              </div>

              <Button 
                type="submit" 
                className="w-full" 
                disabled={isLoggingIn}
              >
                {isLoggingIn ? "Signing In..." : "Sign In"}
              </Button>
            </form>

            <div className="mt-6 space-y-4">
              <div className="text-center">
                <Link 
                  to="/forgot-password" 
                  className="text-sm text-primary hover:underline"
                >
                  Forgot your password?
                </Link>
              </div>
              
              <div className="border-t pt-4 text-center">
                <p className="text-sm text-muted-foreground mb-2">
                  Don't have an advisor account?
                </p>
                <Link to="/agent-signup">
                  <Button variant="outline" className="w-full">
                    Apply to Become an Advisor
                  </Button>
                </Link>
              </div>
              
              <div className="text-center">
                <Link 
                  to="/" 
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  ← Back to Home
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AgentLogin;