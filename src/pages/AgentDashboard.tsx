import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { Filter, User, FileText, CreditCard, ChevronDown } from "lucide-react";

const AgentDashboard = () => {
  const [isOnline, setIsOnline] = useState(true);
  const [filterPeriod, setFilterPeriod] = useState("weekly");
  
  // Dynamic data based on filter period
  const getDashboardData = () => {
    const dataMap = {
      daily: {
        consultations: 18,
        avgMinutes: 24,
        period: "Today",
        chartData: [
          { period: "12AM-3AM", value1: 0, value2: 0 },
          { period: "3AM-6AM", value1: 0, value2: 0 },
          { period: "6AM-9AM", value1: 1, value2: 24 },
          { period: "9AM-12PM", value1: 9, value2: 216 },
          { period: "12PM-3PM", value1: 7, value2: 168 },
          { period: "3PM-6PM", value1: 1, value2: 24 },
          { period: "6PM-9PM", value1: 0, value2: 0 },
          { period: "9PM-12AM", value1: 0, value2: 0 },
        ]
      },
      weekly: {
        consultations: 142,
        avgMinutes: 26,
        period: "This week",
        chartData: [
          { period: "Monday", value1: 8, value2: 192 },
          { period: "Tuesday", value1: 12, value2: 312 },
          { period: "Wednesday", value1: 16, value2: 416 },
          { period: "Thursday", value1: 20, value2: 520 },
          { period: "Friday", value1: 18, value2: 468 },
          { period: "Saturday", value1: 13, value2: 338 },
          { period: "Sunday", value1: 17, value2: 442 },
        ]
      },
      monthly: {
        consultations: 580,
        avgMinutes: 28,
        period: "This year",
        chartData: [
          { period: "Jan", value1: 48, value2: 1344 },
          { period: "Feb", value1: 52, value2: 1456 },
          { period: "Mar", value1: 45, value2: 1260 },
          { period: "Apr", value1: 49, value2: 1372 },
          { period: "May", value1: 51, value2: 1428 },
          { period: "Jun", value1: 47, value2: 1316 },
          { period: "Jul", value1: 50, value2: 1400 },
          { period: "Aug", value1: 48, value2: 1344 },
          { period: "Sep", value1: 46, value2: 1288 },
          { period: "Oct", value1: 49, value2: 1372 },
          { period: "Nov", value1: 52, value2: 1456 },
          { period: "Dec", value1: 43, value2: 1204 },
        ]
      },
      quarterly: {
        consultations: 1740,
        avgMinutes: 27,
        period: "This year",
        chartData: [
          { period: "Q1", value1: 145, value2: 4060 },
          { period: "Q2", value1: 147, value2: 4116 },
          { period: "Q3", value1: 144, value2: 4032 },
          { period: "Q4", value1: 142, value2: 3976 },
        ]
      },
      yearly: {
        consultations: 6840,
        avgMinutes: 25,
        period: "Since subscription",
        chartData: [
          { period: "2021", value1: 1200, value2: 30000 },
          { period: "2022", value1: 1680, value2: 42000 },
          { period: "2023", value1: 1820, value2: 45500 },
          { period: "2024", value1: 2140, value2: 53500 },
        ]
      },
      custom: {
        consultations: 89,
        avgMinutes: 29,
        period: "Custom period",
        chartData: [
          { period: "Period 1", value1: 25, value2: 700 },
          { period: "Period 2", value1: 32, value2: 896 },
          { period: "Period 3", value1: 32, value2: 896 },
        ]
      }
    };
    return dataMap[filterPeriod as keyof typeof dataMap] || dataMap.weekly;
  };

  const currentData = getDashboardData();

  const sidebarItems = [
    { icon: BarChart, label: "Dashboard", active: true },
    { icon: FileText, label: "Reviews", active: false },
    { icon: CreditCard, label: "Subscription", active: false },
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
              
              <div className="flex items-center gap-2">
                <Badge variant={isOnline ? "default" : "destructive"} className="px-3 py-1">
                  {isOnline ? "ON" : "OFF"}
                </Badge>
                <Switch 
                  checked={isOnline} 
                  onCheckedChange={setIsOnline}
                  className="data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-red-500"
                />
              </div>
              
              <Avatar>
                <AvatarImage src="" />
                <AvatarFallback>
                  <User className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
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
                <CardTitle className="text-lg">Average Minutes per Call</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary">{currentData.avgMinutes}</div>
                <p className="text-sm text-muted-foreground">Minutes average</p>
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
                      name="Call Minutes"
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