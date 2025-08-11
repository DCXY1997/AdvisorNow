import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { Filter, User, FileText, CreditCard, ChevronDown, CalendarIcon, LogOut, Settings } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const AgentDashboard = () => {
  const navigate = useNavigate();
  const [isOnline, setIsOnline] = useState(false);
  const [filterPeriod, setFilterPeriod] = useState("weekly");
  const [customStartDate, setCustomStartDate] = useState<Date>();
  const [customEndDate, setCustomEndDate] = useState<Date>();
  const [advisorProfile, setAdvisorProfile] = useState<{
    profileImage: string;
    displayName: string;
  }>({
    profileImage: "",
    displayName: ""
  });

  // Load advisor profile data on component mount
  useEffect(() => {
    loadAdvisorProfile();
  }, []);

  const loadAdvisorProfile = async () => {
    try {
      // Get current user
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      if (authError || !user) return;

      // Get advisor data
      const { data: advisor, error: advisorError } = await supabase
        .from('advisors')
        .select('full_name, profile_image')
        .eq('user_id', user.id)
        .single();

      if (advisor) {
        setAdvisorProfile({
          profileImage: (advisor as any).profile_image || "",
          displayName: advisor.full_name || ""
        });
      }
    } catch (error) {
      console.error('Error loading advisor profile:', error);
    }
  };
  
  // Dynamic data based on filter period
  const getDashboardData = () => {
    const dataMap = {
      daily: {
        consultations: 18,
        activeHours: 8,
        period: "Today",
        chartData: [
          { period: "12AM-3AM", value1: 0, value2: 0 },
          { period: "3AM-6AM", value1: 0, value2: 0 },
          { period: "6AM-9AM", value1: 1, value2: 1 },
          { period: "9AM-12PM", value1: 9, value2: 3 },
          { period: "12PM-3PM", value1: 7, value2: 3 },
          { period: "3PM-6PM", value1: 1, value2: 1 },
          { period: "6PM-9PM", value1: 0, value2: 0 },
          { period: "9PM-12AM", value1: 0, value2: 0 },
        ]
      },
      weekly: {
        consultations: 142,
        activeHours: 45,
        period: "This week",
        chartData: [
          { period: "Monday", value1: 8, value2: 8 },
          { period: "Tuesday", value1: 12, value2: 8 },
          { period: "Wednesday", value1: 16, value2: 8 },
          { period: "Thursday", value1: 20, value2: 8 },
          { period: "Friday", value1: 18, value2: 8 },
          { period: "Saturday", value1: 13, value2: 6 },
          { period: "Sunday", value1: 17, value2: 5 },
        ]
      },
      monthly: {
        consultations: 580,
        activeHours: 168,
        period: "This year",
        chartData: [
          { period: "Jan", value1: 48, value2: 16 },
          { period: "Feb", value1: 52, value2: 15 },
          { period: "Mar", value1: 45, value2: 14 },
          { period: "Apr", value1: 49, value2: 15 },
          { period: "May", value1: 51, value2: 16 },
          { period: "Jun", value1: 47, value2: 14 },
          { period: "Jul", value1: 50, value2: 15 },
          { period: "Aug", value1: 48, value2: 14 },
          { period: "Sep", value1: 46, value2: 13 },
          { period: "Oct", value1: 49, value2: 15 },
          { period: "Nov", value1: 52, value2: 16 },
          { period: "Dec", value1: 43, value2: 12 },
        ]
      },
      quarterly: {
        consultations: 1740,
        activeHours: 520,
        period: "This year",
        chartData: [
          { period: "Q1", value1: 145, value2: 45 },
          { period: "Q2", value1: 147, value2: 47 },
          { period: "Q3", value1: 144, value2: 44 },
          { period: "Q4", value1: 142, value2: 42 },
        ]
      },
      yearly: {
        consultations: 6840,
        activeHours: 2080,
        period: "Since subscription",
        chartData: [
          { period: "2021", value1: 1200, value2: 480 },
          { period: "2022", value1: 1680, value2: 520 },
          { period: "2023", value1: 1820, value2: 540 },
          { period: "2024", value1: 2140, value2: 540 },
        ]
      },
      custom: {
        consultations: getCustomConsultations(),
        activeHours: getCustomActiveHours(),
        period: getCustomPeriodLabel(),
        chartData: getCustomChartData()
      }
    };
    return dataMap[filterPeriod as keyof typeof dataMap] || dataMap.weekly;
  };

  // Helper functions for custom date range
  const getCustomConsultations = () => {
    if (!customStartDate || !customEndDate) return 0;
    const daysDiff = Math.ceil((customEndDate.getTime() - customStartDate.getTime()) / (1000 * 60 * 60 * 24));
    return Math.round(daysDiff * 3.2); // ~3.2 consultations per day average
  };

  const getCustomActiveHours = () => {
    if (!customStartDate || !customEndDate) return 0;
    const daysDiff = Math.ceil((customEndDate.getTime() - customStartDate.getTime()) / (1000 * 60 * 60 * 24));
    return Math.round(daysDiff * 1.1); // ~1.1 active hours per day average
  };

  const getCustomPeriodLabel = () => {
    if (!customStartDate || !customEndDate) return "Custom period";
    return `${format(customStartDate, "MMM dd")} - ${format(customEndDate, "MMM dd")}`;
  };

  const getCustomChartData = () => {
    if (!customStartDate || !customEndDate) {
      return [
        { period: "No dates", value1: 0, value2: 0 },
      ];
    }

    const daysDiff = Math.ceil((customEndDate.getTime() - customStartDate.getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysDiff <= 7) {
      // Show daily data for short periods
      const data = [];
      for (let i = 0; i <= daysDiff; i++) {
        const date = new Date(customStartDate);
        date.setDate(date.getDate() + i);
        data.push({
          period: format(date, "MMM dd"),
          value1: Math.floor(Math.random() * 8) + 2, // 2-10 consultations
          value2: Math.floor(Math.random() * 4) + 2, // 2-6 active hours
        });
      }
      return data;
    } else if (daysDiff <= 60) {
      // Show weekly data for medium periods
      const weeksCount = Math.ceil(daysDiff / 7);
      const data = [];
      for (let i = 0; i < weeksCount; i++) {
        data.push({
          period: `Week ${i + 1}`,
          value1: Math.floor(Math.random() * 30) + 15, // 15-45 consultations
          value2: Math.floor(Math.random() * 10) + 8, // 8-18 active hours
        });
      }
      return data;
    } else {
      // Show monthly data for long periods
      const monthsCount = Math.ceil(daysDiff / 30);
      const data = [];
      for (let i = 0; i < monthsCount; i++) {
        const date = new Date(customStartDate);
        date.setMonth(date.getMonth() + i);
        data.push({
          period: format(date, "MMM"),
          value1: Math.floor(Math.random() * 20) + 40, // 40-60 consultations
          value2: Math.floor(Math.random() * 8) + 12, // 12-20 active hours
        });
      }
      return data;
    }
  };

  const currentData = getDashboardData();

  const sidebarItems = [
    { icon: BarChart, label: "Dashboard", active: true, path: "/agent-dashboard" },
    { icon: FileText, label: "Reviews", active: false, path: "/agent-reviews" },
    { icon: CreditCard, label: "Subscription", active: false, path: "/agent-subscription" },
  ];

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <div className="w-64 bg-card border-r border-border">
        <div className="p-6">
          <div className="flex items-center gap-2 mb-8">
            <div className="w-8 h-8 bg-gradient-to-r from-primary to-primary-light rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">A</span>
            </div>
            <span className="font-bold text-lg text-foreground">Advisor Now</span>
          </div>
          
          <nav className="space-y-2">
            {sidebarItems.map((item) => (
              <button
                key={item.label}
                onClick={() => item.path !== "#" && navigate(item.path)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-smooth ${
                  item.active 
                    ? "bg-primary/10 text-primary font-medium" 
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        {/* Header */}
        <header className="bg-card border-b border-border px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
            
            <div className="flex items-center gap-4">
              <Select value={filterPeriod} onValueChange={setFilterPeriod}>
                <SelectTrigger className="w-[180px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter by period" />
                </SelectTrigger>
                <SelectContent className="bg-background border-border z-50">
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="quarterly">Quarterly</SelectItem>
                  <SelectItem value="yearly">Yearly</SelectItem>
                  <SelectItem value="custom">Custom</SelectItem>
                </SelectContent>
              </Select>
              
              {/* Custom Date Range Picker */}
              {filterPeriod === "custom" && (
                <div className="flex gap-2">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-[140px] justify-start text-left font-normal",
                          !customStartDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {customStartDate ? format(customStartDate, "MMM dd") : "Start date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={customStartDate}
                        onSelect={setCustomStartDate}
                        initialFocus
                        className={cn("p-3 pointer-events-auto")}
                      />
                    </PopoverContent>
                  </Popover>
                  
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-[140px] justify-start text-left font-normal",
                          !customEndDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {customEndDate ? format(customEndDate, "MMM dd") : "End date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={customEndDate}
                        onSelect={setCustomEndDate}
                        initialFocus
                        className={cn("p-3 pointer-events-auto")}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              )}
              
              <div className="flex items-center gap-2">
                <Badge variant={isOnline ? "default" : "destructive"} className="px-3 py-1">
                  {isOnline ? "ON" : "OFF"}
                </Badge>
                <Switch 
                  checked={isOnline} 
                  onCheckedChange={setIsOnline}
                  className="data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-gray-400"
                />
              </div>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2 p-2">
                    <Avatar>
                      <AvatarImage src={advisorProfile.profileImage} />
                      <AvatarFallback>
                        {advisorProfile.displayName ? advisorProfile.displayName.charAt(0).toUpperCase() : <User className="h-4 w-4" />}
                      </AvatarFallback>
                    </Avatar>
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 bg-background border-border">
                  <DropdownMenuItem 
                    className="flex items-center gap-2 cursor-pointer hover:bg-muted"
                    onClick={() => navigate("/agent-profile")}
                  >
                    <Settings className="h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Total Consultations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary">{currentData.consultations}</div>
                <p className="text-sm text-muted-foreground">{currentData.period}</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Total Active Hours</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary">{currentData.activeHours}</div>
                <p className="text-sm text-muted-foreground">Hours {currentData.period.toLowerCase()}</p>
              </CardContent>
            </Card>
          </div>

          {/* Weekly Chart */}
          <Card>
            <CardHeader>
              <CardTitle>{filterPeriod.charAt(0).toUpperCase() + filterPeriod.slice(1)} Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={currentData.chartData}>
                    <XAxis 
                      dataKey="period"
                      axisLine={false}
                      tickLine={false}
                      className="text-muted-foreground"
                    />
                    <YAxis 
                      axisLine={false}
                      tickLine={false}
                      className="text-muted-foreground"
                    />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px',
                        color: 'hsl(var(--foreground))'
                      }}
                    />
                    <Legend />
                    <Bar 
                      dataKey="value1" 
                      fill="hsl(var(--primary))" 
                      name="Consultations"
                      radius={[4, 4, 0, 0]}
                    />
                    <Bar 
                      dataKey="value2" 
                      fill="hsl(var(--primary) / 0.6)" 
                      name="Active Hours"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AgentDashboard;