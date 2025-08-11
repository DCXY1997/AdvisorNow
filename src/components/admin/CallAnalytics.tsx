import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, LineChart, Line } from "recharts";
import { Phone, Clock, TrendingUp, Calendar, Filter } from "lucide-react";

export const CallAnalytics = () => {
  const [period, setPeriod] = useState("weekly");

  // Dynamic data based on filter period
  const getAnalyticsData = () => {
    const dataMap = {
      daily: {
        chartData: [
          { period: "12AM-3AM", calls: 2, duration: 15 },
          { period: "3AM-6AM", calls: 1, duration: 12 },
          { period: "6AM-9AM", calls: 8, duration: 28 },
          { period: "9AM-12PM", calls: 25, duration: 45 },
          { period: "12PM-3PM", calls: 32, duration: 52 },
          { period: "3PM-6PM", calls: 28, duration: 48 },
          { period: "6PM-9PM", calls: 15, duration: 35 },
          { period: "9PM-12AM", calls: 8, duration: 22 },
        ],
        label: "Today's Performance"
      },
      weekly: {
        chartData: [
          { period: "Mon", calls: 245, duration: 1850 },
          { period: "Tue", calls: 289, duration: 2100 },
          { period: "Wed", calls: 312, duration: 2350 },
          { period: "Thu", calls: 298, duration: 2200 },
          { period: "Fri", calls: 356, duration: 2680 },
          { period: "Sat", calls: 178, duration: 1420 },
          { period: "Sun", calls: 156, duration: 1280 }
        ],
        label: "This Week's Performance"
      },
      monthly: {
        chartData: [
          { period: "Week 1", calls: 1285, duration: 9195 },
          { period: "Week 2", calls: 1312, duration: 9218 },
          { period: "Week 3", calls: 1298, duration: 9205 },
          { period: "Week 4", calls: 1325, duration: 9232 },
        ],
        label: "This Month's Performance"
      },
      quarterly: {
        chartData: [
          { period: "Jan", calls: 5250, duration: 36850 },
          { period: "Feb", calls: 4980, duration: 34795 },
          { period: "Mar", calls: 5320, duration: 37920 },
        ],
        label: "Quarterly Performance"
      },
      yearly: {
        chartData: [
          { period: "Q1", calls: 15550, duration: 108565 },
          { period: "Q2", calls: 16125, duration: 112845 },
          { period: "Q3", calls: 15980, duration: 111720 },
          { period: "Q4", calls: 16200, duration: 113950 },
        ],
        label: "Yearly Performance"
      }
    };
    return dataMap[period as keyof typeof dataMap] || dataMap.weekly;
  };

  const currentData = getAnalyticsData();
  
  // Calculate statistics
  const totalCalls = currentData.chartData.reduce((sum, day) => sum + day.calls, 0);
  const totalMinutes = currentData.chartData.reduce((sum, day) => sum + day.duration, 0);
  const avgDuration = Math.round(totalMinutes / totalCalls);
  const peakPeriod = currentData.chartData.reduce((peak, day) => 
    day.calls > peak.calls ? day : peak, currentData.chartData[0]
  );

  return (
    <div className="space-y-6">
      {/* Filter Controls */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">{currentData.label}</h3>
        <Select value={period} onValueChange={setPeriod}>
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
          </SelectContent>
        </Select>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Calls</CardTitle>
            <Phone className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCalls.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {period === 'daily' ? 'Today' : 
               period === 'weekly' ? 'This week' :
               period === 'monthly' ? 'This month' :
               period === 'quarterly' ? 'This quarter' : 'This year'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Minutes</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Math.round(totalMinutes / 60).toLocaleString()}h</div>
            <p className="text-xs text-muted-foreground">{totalMinutes.toLocaleString()} minutes</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Duration</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgDuration}min</div>
            <p className="text-xs text-muted-foreground">Per call</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Peak Period</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{peakPeriod.period}</div>
            <p className="text-xs text-muted-foreground">{peakPeriod.calls.toLocaleString()} calls</p>
          </CardContent>
        </Card>
      </div>

      {/* Call Volume Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Call Volume</CardTitle>
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
                <Bar 
                  dataKey="calls" 
                  fill="hsl(var(--primary))" 
                  name="Calls"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Duration Trend */}
      <Card>
        <CardHeader>
          <CardTitle>Average Call Duration Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-60">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={currentData.chartData}>
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
                <Line 
                  type="monotone" 
                  dataKey="duration" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={3}
                  dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 4 }}
                  name="Duration (minutes)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};