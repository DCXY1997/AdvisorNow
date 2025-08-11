import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Users, 
  Shield, 
  MessageSquare, 
  CreditCard, 
  BarChart3,
  ChevronDown, 
  LogOut,
  Settings,
  UserPlus
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AdvisorManagement } from "@/components/admin/AdvisorManagement";
import { AdvisorModeration } from "@/components/admin/AdvisorModeration";
import { ReviewManagement } from "@/components/admin/ReviewManagement";
import { SubscriptionManagement } from "@/components/admin/SubscriptionManagement";
import { AdvisorRegistrations } from "@/components/admin/AdvisorRegistrations";
import { CallAnalytics } from "@/components/admin/CallAnalytics";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");

  // Mock overview stats
  const overviewStats = {
    totalAdvisors: 1247,
    activeAdvisors: 1089,
    suspendedAdvisors: 12,
    totalReviews: 8456,
    flaggedReviews: 23,
    totalCalls: 15678,
    totalCallMinutes: 234567,
    monthlyRevenue: 89450
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-primary to-primary-light rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">A</span>
              </div>
              <span className="font-bold text-lg text-foreground">Advisor Now - Admin</span>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2 p-2">
                  <Avatar>
                    <AvatarImage src="" />
                    <AvatarFallback>
                      <Settings className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium">Admin</span>
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 bg-background border-border">
                <DropdownMenuItem 
                  className="flex items-center gap-2 cursor-pointer hover:bg-muted"
                  onClick={() => navigate("/")}
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Dashboard Content */}
      <div className="p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="advisors" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Advisors
            </TabsTrigger>
            <TabsTrigger value="registrations" className="flex items-center gap-2">
              <UserPlus className="h-4 w-4" />
              Registrations
            </TabsTrigger>
            <TabsTrigger value="moderation" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Moderation
            </TabsTrigger>
            <TabsTrigger value="reviews" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Reviews
            </TabsTrigger>
            <TabsTrigger value="subscriptions" className="flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              Subscriptions
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Advisors</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{overviewStats.totalAdvisors.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">
                    {overviewStats.activeAdvisors} active, {overviewStats.suspendedAdvisors} suspended
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Reviews</CardTitle>
                  <MessageSquare className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{overviewStats.totalReviews.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">
                    {overviewStats.flaggedReviews} flagged for review
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Calls</CardTitle>
                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{overviewStats.totalCalls.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">
                    {Math.round(overviewStats.totalCallMinutes / 60).toLocaleString()} hours total
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">${overviewStats.monthlyRevenue.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">
                    From advisor subscriptions
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Call Analytics */}
            <Card>
              <CardHeader>
                <CardTitle>Call Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <CallAnalytics />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="advisors">
            <AdvisorManagement />
          </TabsContent>

          <TabsContent value="registrations">
            <AdvisorRegistrations />
          </TabsContent>

          <TabsContent value="moderation">
            <AdvisorModeration />
          </TabsContent>

          <TabsContent value="reviews">
            <ReviewManagement />
          </TabsContent>

          <TabsContent value="subscriptions">
            <SubscriptionManagement />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;