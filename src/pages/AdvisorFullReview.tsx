import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Phone, Building2, Star, AlertTriangle } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const AdvisorFullReview = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get advisor data from navigation state
  const advisor = location.state?.advisor || {
    id: "1",
    name: "Dr. Sarah Johnson",
    email: "sarah.johnson@email.com",
    phone: "+1 (555) 123-4567",
    representativeNumber: "REP-789456123",
    financialInstitution: "AIA",
    rating: 4.8,
    reviewCount: 156,
    status: "active",
    joinDate: "2024-01-15",
    subscription: "Premium",
    totalCalls: 234,
    specialization: ["Investment Planning", "Retirement", "Tax Strategy"],
    credentialsAccolades: ["CFP - Certified Financial Planner", "CPA - Certified Public Accountant", "CFA - Chartered Financial Analyst", "Top 100 Financial Advisors 2023 - Forbes"],
    bio: "Dr. Sarah Johnson is a seasoned financial advisor specializing in comprehensive investment planning and retirement strategies. She has been recognized for her exceptional client service and innovative portfolio management techniques.",
    reviews: [
      {
        id: "r1",
        userId: "user123",
        userName: "John D.",
        rating: 5,
        date: "2024-01-20",
        comment: "Excellent advice on my retirement planning. Dr. Johnson was very thorough and explained everything clearly.",
        callId: "call_001"
      },
      {
        id: "r2",
        userId: "user456",
        userName: "Mary S.",
        rating: 4,
        date: "2024-01-18",
        comment: "Great insights on tax optimization strategies. Very knowledgeable and professional.",
        callId: "call_002"
      }
    ],
    reports: []
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-700 border-green-200">Active</Badge>;
      case "inactive":
        return <Badge className="bg-gray-100 text-gray-700 border-gray-200">Inactive</Badge>;
      case "suspended":
        return <Badge className="bg-red-100 text-red-700 border-red-200">Suspended</Badge>;
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-700 border-yellow-200">Pending</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getSubscriptionBadge = (subscription: string) => {
    if (!subscription) {
      return (
        <Badge className="bg-gray-100 text-gray-700 border-gray-200">
          N/A
        </Badge>
      );
    }
    
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
                <AvatarImage src="" />
                <AvatarFallback className="text-lg">
                  {(advisor.full_name || advisor.name || 'N/A').split(' ').map((n: string) => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-2xl font-bold text-foreground">{advisor.full_name || advisor.name || 'Unknown Advisor'}</h1>
                <div className="flex items-center gap-2">
                  {getStatusBadge(advisor.subscription ? 'active' : 'inactive')}
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
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="reviews">Reviews ({advisor.reviewCount || (advisor.reviews?.length) || 0})</TabsTrigger>
            <TabsTrigger value="reports">Reports ({advisor.reports?.length || 0})</TabsTrigger>
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
                    <div>{advisor.email || ''}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-muted-foreground">Phone</div>
                    <div>{advisor.phone || 'N/A'}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-muted-foreground">Representative Number</div>
                    <code className="bg-muted px-2 py-1 rounded text-sm">
                      {advisor.representative_code || advisor.representativeNumber || 'N/A'}
                    </code>
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
                    <div>{advisor.financial_institution || advisor.financialInstitution || 'N/A'}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-muted-foreground">Credentials & Accolades</div>
                    <div className="space-y-1">
                      {(advisor.credentialsAccolades || []).map((credential: string, index: number) => (
                        <div key={index} className="text-sm bg-green-50 p-2 rounded border-l-2 border-green-200">
                          {credential}
                        </div>
                      ))}
                      {(!advisor.credentialsAccolades || advisor.credentialsAccolades.length === 0) && (
                        <div className="text-sm text-muted-foreground">No credentials listed</div>
                      )}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-muted-foreground">Specialisations</div>
                    <div className="flex gap-1 flex-wrap">
                      {(advisor.specialization || []).map((specialty: string) => (
                        <Badge key={specialty} className="bg-blue-100 text-blue-700">{specialty}</Badge>
                      ))}
                      {(!advisor.specialization || advisor.specialization.length === 0) && (
                        <div className="text-sm text-muted-foreground">No specializations listed</div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Bio */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Biography</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{advisor.bio || ''}</p>
              </CardContent>
            </Card>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-green-600">{advisor.rating || 'N/A'}</div>
                  <div className="text-sm text-muted-foreground">Average Rating</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-blue-600">{advisor.totalCalls || '0'}</div>
                  <div className="text-sm text-muted-foreground">Total Calls</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-purple-600">{advisor.reviewCount || '0'}</div>
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
                {advisor.reviews && advisor.reviews.length > 0 ? (
                  <div className="space-y-4">
                    {advisor.reviews.map((review: any) => (
                      <div key={review.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <div className="font-medium">{review.userName}</div>
                            <div className="flex items-center gap-1">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                                  }`}
                                />
                              ))}
                              <span className="text-sm text-muted-foreground ml-1">
                                {new Date(review.date).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    No reviews found for this advisor.
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Reports & Issues</CardTitle>
              </CardHeader>
              <CardContent>
                {advisor.reports && advisor.reports.length > 0 ? (
                  <div className="space-y-4">
                    {advisor.reports.map((report: any) => (
                      <div key={report.id} className="border rounded-lg p-4 border-red-200 bg-red-50">
                        <div className="flex items-start gap-3">
                          <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
                          <div className="flex-1">
                            <div className="text-sm font-medium text-red-800">
                              Report from {report.userName} - {new Date(report.date).toLocaleDateString()}
                            </div>
                            <p className="text-sm text-red-700 mt-1">{report.complaint}</p>
                            <Badge className="mt-2 bg-red-100 text-red-700 border-red-200">
                              {report.status}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    No reports or issues found for this advisor.
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdvisorFullReview;