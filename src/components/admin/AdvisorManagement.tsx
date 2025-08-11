import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Filter, Eye, MoreHorizontal, Star, Phone, Calendar, Award, Building2 } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const AdvisorManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("name");
  const [statusFilter, setStatusFilter] = useState("all");

  // Mock advisor data with detailed information and reviews
  const advisors = [
    {
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
      specialties: ["Investment Planning", "Retirement", "Tax Strategy"],
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
        },
        {
          id: "r3",
          userId: "user789",
          userName: "Robert K.",
          rating: 5,
          date: "2024-01-15",
          comment: "Dr. Johnson helped me restructure my investment portfolio. Couldn't be happier with the results!",
          callId: "call_003"
        }
      ]
    },
    {
      id: "2", 
      name: "Michael Chen",
      email: "michael.chen@email.com",
      phone: "+1 (555) 234-5678",
      representativeNumber: "REP-456789012",
      financialInstitution: "Morgan Stanley Wealth Management",
      rating: 4.6,
      reviewCount: 89,
      status: "active",
      joinDate: "2024-02-01",
      subscription: "Basic",
      totalCalls: 156,
      specialties: ["Startup Financing", "Venture Capital", "Financial Tech"],
      credentialsAccolades: ["CFP - Certified Financial Planner", "Series 7 - General Securities Representative", "Fintech Innovation Award 2023"],
      bio: "Michael Chen specializes in startup financing and venture capital advisory. He has extensive experience working with tech entrepreneurs and early-stage companies, helping them navigate complex funding landscapes.",
      reviews: [
        {
          id: "r4",
          userId: "user321",
          userName: "Lisa T.",
          rating: 5,
          date: "2024-01-25",
          comment: "Michael's expertise in startup funding was invaluable for my new business venture.",
          callId: "call_004"
        },
        {
          id: "r5",
          userId: "user654",
          userName: "David W.",
          rating: 4,
          date: "2024-01-22",
          comment: "Good advice on venture capital opportunities. Very responsive and knowledgeable.",
          callId: "call_005"
        }
      ]
    },
    {
      id: "3",
      name: "Jennifer Davis",
      email: "jennifer.davis@email.com",
      phone: "+1 (555) 345-6789", 
      representativeNumber: "REP-123789456",
      financialInstitution: "Charles Schwab Advisory Services",
      rating: 3.2,
      reviewCount: 45,
      status: "suspended",
      joinDate: "2024-01-20",
      subscription: "Pro",
      totalCalls: 78,
      specialties: ["Personal Finance", "Debt Management"],
      credentialsAccolades: ["CFP - Certified Financial Planner"],
      bio: "Jennifer Davis focuses on personal finance management and debt reduction strategies for middle-income families.",
      reviews: [
        {
          id: "r6",
          userId: "user111",
          userName: "Tom M.",
          rating: 2,
          date: "2024-01-24",
          comment: "Session was not very helpful. Advisor seemed unprepared and gave generic advice.",
          callId: "call_006"
        },
        {
          id: "r7",
          userId: "user222",
          userName: "Sarah P.",
          rating: 4,
          date: "2024-01-20",
          comment: "Good basic advice on debt management, but nothing particularly insightful.",
          callId: "call_007"
        }
      ]
    },
    {
      id: "4",
      name: "Robert Wilson",
      email: "robert.wilson@email.com",
      phone: "+1 (555) 456-7890",
      representativeNumber: "REP-987654321",
      financialInstitution: "UBS Private Wealth Management", 
      rating: 4.9,
      reviewCount: 203,
      status: "active",
      joinDate: "2023-12-10",
      subscription: "Premium",
      totalCalls: 345,
      specialties: ["Wealth Management", "Estate Planning", "Tax Optimization"],
      credentialsAccolades: ["CFP - Certified Financial Planner", "CPA - Certified Public Accountant", "CLU - Chartered Life Underwriter", "ChFC - Chartered Financial Consultant", "Top 1% Wealth Advisors - Barron's 2023"],
      bio: "Robert Wilson is a highly experienced wealth manager with dual expertise in law and finance. He specializes in comprehensive estate planning and tax optimization for high-net-worth individuals.",
      reviews: [
        {
          id: "r8",
          userId: "user333",
          userName: "Elizabeth H.",
          rating: 5,
          date: "2024-01-26",
          comment: "Outstanding estate planning guidance. Robert's legal background really shows in his comprehensive approach.",
          callId: "call_008"
        },
        {
          id: "r9",
          userId: "user444",
          userName: "Michael R.",
          rating: 5,
          date: "2024-01-24",
          comment: "Exceptional wealth management advice. Robert helped save me thousands in taxes this year.",
          callId: "call_009"
        }
      ]
    }
  ];

  const filteredAdvisors = advisors.filter(advisor => {
    const matchesSearch = () => {
      const term = searchTerm.toLowerCase();
      switch (searchType) {
        case "name":
          return advisor.name.toLowerCase().includes(term);
        case "email":
          return advisor.email.toLowerCase().includes(term);
        case "representative":
          return advisor.representativeNumber.toLowerCase().includes(term);
        default:
          return true;
      }
    };

    const matchesStatus = statusFilter === "all" || advisor.status === statusFilter;
    
    return matchesSearch() && matchesStatus;
  });

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
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Advisor Management</span>
            <div className="text-sm font-normal text-muted-foreground">
              {filteredAdvisors.length} of {advisors.length} advisors
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Search and Filter Controls */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex flex-1 gap-2">
              <Select value={searchType} onValueChange={setSearchType}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Name</SelectItem>
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="representative">Representative</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder={`Search by ${searchType}...`}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="flex gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="suspended">Suspended</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Advisors Table */}
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Advisor</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Rep Number</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Subscription</TableHead>
                  <TableHead>Total Calls</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAdvisors.map((advisor) => (
                  <TableRow key={advisor.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src="" />
                          <AvatarFallback>
                            {advisor.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{advisor.name}</div>
                          <div className="text-sm text-muted-foreground">
                            Joined {new Date(advisor.joinDate).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">{advisor.email}</div>
                    </TableCell>
                    <TableCell>
                      <code className="text-xs bg-muted px-2 py-1 rounded">
                        {advisor.representativeNumber}
                      </code>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{advisor.rating}</span>
                        <span className="text-sm text-muted-foreground">
                          ({advisor.reviewCount})
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(advisor.status)}</TableCell>
                    <TableCell>{getSubscriptionBadge(advisor.subscription)}</TableCell>
                    <TableCell>
                      <span className="font-medium">{advisor.totalCalls}</span>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-white dark:bg-gray-800 border shadow-lg z-50">
                          <Dialog>
                            <DialogTrigger asChild>
                              <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                <Eye className="h-4 w-4 mr-2" />
                                View Details & Reviews
                              </DropdownMenuItem>
                            </DialogTrigger>
                            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                              <DialogHeader>
                                <DialogTitle className="flex items-center gap-3">
                                  <Avatar className="h-12 w-12">
                                    <AvatarImage src="" />
                                    <AvatarFallback className="text-lg">
                                      {advisor.name.split(' ').map(n => n[0]).join('')}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <div className="text-xl font-semibold">{advisor.name}</div>
                                    <div className="text-sm text-muted-foreground flex items-center gap-2">
                                      {getStatusBadge(advisor.status)}
                                      {getSubscriptionBadge(advisor.subscription)}
                                    </div>
                                  </div>
                                </DialogTitle>
                              </DialogHeader>
                              
                              <Tabs defaultValue="overview" className="w-full">
                                <TabsList className="grid w-full grid-cols-3">
                                  <TabsTrigger value="overview">Overview</TabsTrigger>
                                  <TabsTrigger value="reviews">Reviews ({advisor.reviewCount})</TabsTrigger>
                                  <TabsTrigger value="analytics">Analytics</TabsTrigger>
                                </TabsList>
                                
                                <TabsContent value="overview" className="space-y-6">
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
                                          <div>{advisor.phone}</div>
                                        </div>
                        <div>
                          <div className="text-sm font-medium text-muted-foreground">Representative Number</div>
                          <code className="bg-muted px-2 py-1 rounded text-sm">{advisor.representativeNumber}</code>
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
                                          <div>{advisor.financialInstitution}</div>
                                        </div>
                                        <div>
                                          <div className="text-sm font-medium text-muted-foreground">Credentials & Accolades</div>
                                          <div className="space-y-1">
                                            {advisor.credentialsAccolades.map((credential, index) => (
                                              <div key={index} className="text-sm bg-green-50 p-2 rounded border-l-2 border-green-200">
                                                {credential}
                                              </div>
                                            ))}
                                          </div>
                                        </div>
                                        <div>
                                          <div className="text-sm font-medium text-muted-foreground">Specialties</div>
                                          <div className="flex gap-1 flex-wrap">
                                            {advisor.specialties.map((specialty) => (
                                              <Badge key={specialty} className="bg-blue-100 text-blue-700">{specialty}</Badge>
                                            ))}
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
                                      <p className="text-muted-foreground leading-relaxed">{advisor.bio}</p>
                                    </CardContent>
                                  </Card>

                                  {/* Stats */}
                                  <div className="grid grid-cols-3 gap-4">
                                    <Card>
                                      <CardContent className="p-4 text-center">
                                        <div className="text-2xl font-bold text-green-600">{advisor.rating}</div>
                                        <div className="text-sm text-muted-foreground">Average Rating</div>
                                      </CardContent>
                                    </Card>
                                    <Card>
                                      <CardContent className="p-4 text-center">
                                        <div className="text-2xl font-bold text-blue-600">{advisor.totalCalls}</div>
                                        <div className="text-sm text-muted-foreground">Total Calls</div>
                                      </CardContent>
                                    </Card>
                                    <Card>
                                      <CardContent className="p-4 text-center">
                                        <div className="text-2xl font-bold text-purple-600">{advisor.reviewCount}</div>
                                        <div className="text-sm text-muted-foreground">Reviews</div>
                                      </CardContent>
                                    </Card>
                                  </div>
                                </TabsContent>

                                <TabsContent value="reviews" className="space-y-4">
                                  <div className="space-y-4">
                                    {advisor.reviews.map((review) => (
                                      <Card key={review.id}>
                                        <CardContent className="p-4">
                                          <div className="flex justify-between items-start mb-3">
                                            <div className="flex items-center gap-2">
                                              <Avatar className="h-8 w-8">
                                                <AvatarFallback className="text-xs">
                                                  {review.userName.split(' ').map(n => n[0]).join('')}
                                                </AvatarFallback>
                                              </Avatar>
                                              <div>
                                                <div className="font-medium">{review.userName}</div>
                                                <div className="text-xs text-muted-foreground">
                                                  {new Date(review.date).toLocaleDateString()} • Call #{review.callId}
                                                </div>
                                              </div>
                                            </div>
                                            <div className="flex items-center gap-1">
                                              {Array.from({ length: 5 }).map((_, i) => (
                                                <Star
                                                  key={i}
                                                  className={`h-4 w-4 ${
                                                    i < review.rating
                                                      ? 'fill-yellow-400 text-yellow-400'
                                                      : 'text-gray-300'
                                                  }`}
                                                />
                                              ))}
                                              <span className="ml-1 text-sm font-medium">{review.rating}/5</span>
                                            </div>
                                          </div>
                                          <p className="text-muted-foreground">{review.comment}</p>
                                        </CardContent>
                                      </Card>
                                    ))}
                                  </div>
                                </TabsContent>

                                <TabsContent value="analytics" className="space-y-4">
                                  <div className="grid grid-cols-2 gap-4">
                                    <Card>
                                      <CardHeader>
                                        <CardTitle className="text-lg">Join Date</CardTitle>
                                      </CardHeader>
                                      <CardContent>
                                        <div className="flex items-center gap-2">
                                          <Calendar className="h-4 w-4 text-muted-foreground" />
                                          {new Date(advisor.joinDate).toLocaleDateString()}
                                        </div>
                                      </CardContent>
                                    </Card>
                                    <Card>
                                      <CardHeader>
                                        <CardTitle className="text-lg">Subscription Plan</CardTitle>
                                      </CardHeader>
                                      <CardContent>
                                        {getSubscriptionBadge(advisor.subscription)}
                                      </CardContent>
                                    </Card>
                                  </div>
                                  <Card>
                                    <CardHeader>
                                      <CardTitle className="text-lg">Performance Metrics</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                      <div className="text-muted-foreground">
                                        Additional performance metrics and analytics data would be displayed here.
                                      </div>
                                    </CardContent>
                                  </Card>
                                </TabsContent>
                              </Tabs>
                            </DialogContent>
                          </Dialog>
                          <DropdownMenuItem>
                            View Call History
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            {advisor.status === "suspended" ? "Reactivate" : "Suspend"}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredAdvisors.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No advisors found matching your search criteria.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};