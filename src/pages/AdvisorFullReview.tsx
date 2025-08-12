import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Phone, Building2, Star, AlertTriangle } from "lucide-react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const AdvisorFullReview = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [advisor, setAdvisor] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  // Get advisor data from navigation state or fetch from database
  useEffect(() => {
    const fetchAdvisorData = async () => {
      try {
        // If advisor data is passed via navigation state, use it
        if (location.state?.advisor) {
          setAdvisor(location.state.advisor);
          setLoading(false);
          return;
        }

        // If no advisor data in state, you might want to redirect or show error
        // For now, we'll show a default message
        setAdvisor(null);
        setLoading(false);
      } catch (error: any) {
        toast({
          title: "Error Loading Advisor",
          description: error.message || "Failed to load advisor data",
          variant: "destructive",
        });
        setLoading(false);
      }
    };

    fetchAdvisorData();
  }, [location.state, toast]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-700 border-green-200">Active</Badge>;
      case "inactive":
        return <Badge className="bg-orange-100 text-orange-700 border-orange-200">Inactive</Badge>;
      case "suspended":
        return <Badge className="bg-red-100 text-red-700 border-red-200">Suspended</Badge>;
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-700 border-yellow-200">Pending</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getSubscriptionBadge = (subscription: string) => {
    const colorMap: Record<string, string> = {
      "Basic": "bg-blue-100 text-blue-700 border-blue-200",
      "Premium": "bg-purple-100 text-purple-700 border-purple-200", 
      "Pro": "bg-orange-100 text-orange-700 border-orange-200"
    };
    
    return (
      <Badge className={colorMap[subscription] || "bg-gray-100 text-gray-700 border-gray-200"}>
        {subscription || "No Subscription"}
      </Badge>
    );
  };

  const getInitials = (name: string) => {
    return name ? name.split(' ').map(n => n[0]).join('').toUpperCase() : 'NA';
  };

  const parseSpecializations = (specializations: string | null) => {
    if (!specializations) return [];
    try {
      // If it's already an array, return it
      if (Array.isArray(specializations)) return specializations;
      // If it's a JSON string, parse it
      return JSON.parse(specializations);
    } catch {
      // If parsing fails, treat as comma-separated string
      return specializations.split(',').map(s => s.trim());
    }
  };

  const parseCredentials = (credentials: string | null) => {
    if (!credentials) return [];
    try {
      // If it's already an array, return it
      if (Array.isArray(credentials)) return credentials;
      // If it's a JSON string, parse it
      return JSON.parse(credentials);
    } catch {
      // If parsing fails, treat as comma-separated string
      return credentials.split(',').map(s => s.trim());
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-muted-foreground">Loading advisor data...</div>
      </div>
    );
  }

  if (!advisor) {
    return (
      <div className="min-h-screen bg-background">
        <header className="bg-card border-b border-border px-6 py-4">
          <Button
            onClick={() => navigate("/admin-dashboard")}
            variant="ghost"
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Button>
        </header>
        <div className="container mx-auto p-6 text-center">
          <div className="text-muted-foreground">No advisor data available</div>
        </div>
      </div>
    );
  }

  const specializations = parseSpecializations(advisor.specializations);
  const credentials = parseCredentials(advisor.credentials);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              onClick={() => navigate("/admin-dashboard")}
              variant="ghost"
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Button>
            <div className="flex items-center gap-3">
              <Avatar className="h-12 w-12">
                <AvatarImage src={advisor.profile_image || ""} />
                <AvatarFallback className="text-lg">
                  {getInitials(advisor.full_name)}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-2xl font-bold text-foreground">{advisor.full_name}</h1>
                <div className="flex items-center gap-2">
                  {getStatusBadge(advisor.status)}
                  {getSubscriptionBadge(advisor.subscription)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="container mx-auto p-6">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Contact Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Phone className="h-5 w-5" />
                    Contact Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <div className="text-sm font-medium text-muted-foreground">Email</div>
                    <div>{advisor.email}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-muted-foreground">Phone</div>
                    <div>{advisor.contact_number || "Not provided"}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-muted-foreground">Representative Code</div>
                    <code className="bg-muted px-2 py-1 rounded text-sm">{advisor.representative_code}</code>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-muted-foreground">Registration Date</div>
                    <div>{new Date(advisor.created_at).toLocaleDateString()}</div>
                  </div>
                </CardContent>
              </Card>

              {/* Professional Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Building2 className="h-5 w-5" />
                    Professional Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <div className="text-sm font-medium text-muted-foreground">Financial Institution</div>
                    <div>{advisor.financial_institution}</div>
                  </div>
                  {credentials.length > 0 && (
                    <div>
                      <div className="text-sm font-medium text-muted-foreground">Credentials</div>
                      <div className="space-y-1">
                        {credentials.map((credential: string, index: number) => (
                          <div key={index} className="text-sm bg-green-50 p-2 rounded border-l-2 border-green-200">
                            {credential}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {specializations.length > 0 && (
                    <div>
                      <div className="text-sm font-medium text-muted-foreground">Specializations</div>
                      <div className="flex gap-1 flex-wrap">
                        {specializations.map((specialty: string, index: number) => (
                          <Badge key={index} className="bg-blue-100 text-blue-700">{specialty}</Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  {advisor.tagline && (
                    <div>
                      <div className="text-sm font-medium text-muted-foreground">Tagline</div>
                      <div className="text-sm italic text-muted-foreground">{advisor.tagline}</div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Bio */}
            {advisor.bio && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Biography</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">{advisor.bio}</p>
                </CardContent>
              </Card>
            )}

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-2xl font-bold text-green-600">{advisor.status}</div>
                  <div className="text-sm text-muted-foreground">Status</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-2xl font-bold text-blue-600">{advisor.subscription || "None"}</div>
                  <div className="text-sm text-muted-foreground">Subscription</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-2xl font-bold text-purple-600">{new Date(advisor.created_at).toLocaleDateString()}</div>
                  <div className="text-sm text-muted-foreground">Joined</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-2xl font-bold text-orange-600">{advisor.registration_id ? "Yes" : "No"}</div>
                  <div className="text-sm text-muted-foreground">From Registration</div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="activity" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Activity & Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-sm text-muted-foreground">
                    Activity data and performance metrics will be available once the advisor becomes active and starts taking calls.
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-lg font-semibold">0</div>
                      <div className="text-sm text-muted-foreground">Total Calls</div>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-lg font-semibold">0</div>
                      <div className="text-sm text-muted-foreground">Reviews</div>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-lg font-semibold">N/A</div>
                      <div className="text-sm text-muted-foreground">Rating</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdvisorFullReview;