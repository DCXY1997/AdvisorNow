import { useState, useEffect } from "react";
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
import { supabase } from "@/integrations/supabase/client";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [overviewStats, setOverviewStats] = useState({
    totalAdvisors: 0,
    activeAdvisors: 0,
    suspendedAdvisors: 0,
    pendingRegistrations: 0,
    totalRegistrations: 0
  });
  const [loading, setLoading] = useState(true);

  // Fetch overview statistics from Supabase
  useEffect(() => {
    const fetchOverviewStats = async () => {
      try {
        setLoading(true);
        
        // Fetch advisor statistics
        const { data: advisors, error: advisorsError } = await (supabase as any)
          .from('advisors')
          .select('status');
        
        if (advisorsError) throw advisorsError;

        // Fetch registration statistics
        const { data: registrations, error: registrationsError } = await (supabase as any)
          .from('agent_registrations')
          .select('status');
        
        if (registrationsError) throw registrationsError;

        // Calculate statistics
        const totalAdvisors = advisors?.length || 0;
        const activeAdvisors = advisors?.filter((advisor: any) => advisor.status === 'active')?.length || 0;
        const suspendedAdvisors = advisors?.filter((advisor: any) => advisor.status === 'suspended')?.length || 0;
        
        const totalRegistrations = registrations?.length || 0;
        const pendingRegistrations = registrations?.filter((reg: any) => reg.status === 'pending')?.length || 0;

        setOverviewStats({
          totalAdvisors,
          activeAdvisors,
          suspendedAdvisors,
          pendingRegistrations,
          totalRegistrations
        });
      } catch (error) {
        console.error('Error fetching overview stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOverviewStats();
  }, []);

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
                  <CardTitle className="text-sm font-medium">Registrations</CardTitle>
                  <UserPlus className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{overviewStats.totalRegistrations.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">
                    {overviewStats.pendingRegistrations} pending approval
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">System Status</CardTitle>
                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">Online</div>
                  <p className="text-xs text-muted-foreground">
                    All services operational
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Data Summary</CardTitle>
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{(overviewStats.totalAdvisors + overviewStats.totalRegistrations).toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">
                    Total records in system
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