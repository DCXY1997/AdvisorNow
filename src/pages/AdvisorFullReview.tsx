import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Phone, Building2, Star, AlertTriangle } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const AdvisorFullReview = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [advisor, setAdvisor] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  // Get advisor ID from navigation state or URL params
  const advisorId = location.state?.advisorId || new URLSearchParams(location.search).get('id');

  useEffect(() => {
    const fetchAdvisorData = async () => {
      if (!advisorId) {
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('advisors')
          .select('*')
          .eq('id', advisorId)
          .single();

        if (error) {
          console.error('Error fetching advisor:', error);
          return;
        }

        setAdvisor(data);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAdvisorData();
  }, [advisorId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">Loading advisor information...</div>
      </div>
    );
  }

  if (!advisor) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">Advisor not found</h2>
          <Button onClick={() => navigate("/admin-dashboard")}>
            Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  // Parse specializations and credentials (handle JSON or comma-separated strings)
  const parseArrayField = (field: string | null) => {
    if (!field) return [];
    try {
      // Try parsing as JSON first
      const parsed = JSON.parse(field);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      // If not JSON, split by comma
      return field.split(',').map(item => item.trim()).filter(Boolean);
    }
  };

  const specializations = parseArrayField(advisor.specializations);
  const credentialsList = parseArrayField(advisor.credentials);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-700 border-green-200">Active</Badge>;
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
        {subscription}
      </Badge>
    );
  };

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
                  {advisor.full_name?.split(' ').map((n: string) => n[0]).join('') || 'A'}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-2xl font-bold text-foreground">{advisor.full_name || ''}</h1>
                <div className="flex items-center gap-2">
                  {getStatusBadge(advisor.status)}
                  {advisor.subscription && getSubscriptionBadge(advisor.subscription)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="container mx-auto p-6">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="reviews">Reviews (0)</TabsTrigger>
            <TabsTrigger value="reports">Reports (0)</TabsTrigger>
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
                    <div>{advisor.contact_number || ''}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-muted-foreground">Representative Number</div>
                    <code className="bg-muted px-2 py-1 rounded text-sm">{advisor.representative_code || ''}</code>
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
                    <div>{advisor.financial_institution || ''}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-muted-foreground">Credentials & Accolades</div>
                    <div className="space-y-1">
                      {credentialsList.length > 0 ? credentialsList.map((credential: string, index: number) => (
                        <div key={index} className="text-sm bg-green-50 p-2 rounded border-l-2 border-green-200">
                          {credential}
                        </div>
                      )) : <div className="text-sm text-muted-foreground">No credentials listed</div>}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-muted-foreground">Specialisations</div>
                    <div className="flex gap-1 flex-wrap">
                      {specializations.length > 0 ? specializations.map((specialty: string) => (
                        <Badge key={specialty} className="bg-blue-100 text-blue-700">{specialty}</Badge>
                      )) : <div className="text-sm text-muted-foreground">No specializations listed</div>}
                    </div>
                  </div>
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

            {/* Stats - Hidden since not available in database yet */}
            <div className="grid grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-green-600">-</div>
                  <div className="text-sm text-muted-foreground">Average Rating</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-blue-600">-</div>
                  <div className="text-sm text-muted-foreground">Total Calls</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-purple-600">-</div>
                  <div className="text-sm text-muted-foreground">Reviews</div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="reviews" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Client Reviews</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  No reviews available for this advisor yet.
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Reports & Issues</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  No reports or issues found for this advisor.
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