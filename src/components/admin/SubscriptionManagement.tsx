import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CreditCard, DollarSign, TrendingUp, Calendar } from "lucide-react";

export const SubscriptionManagement = () => {
  const [basicPrice, setBasicPrice] = useState("299");
  const [premiumPrice, setPremiumPrice] = useState("809");
  const [proPrice, setProPrice] = useState("2870");

  // Mock pricing data
  const currentPricing = [
    {
      plan: "Basic",
      billing: "Monthly",
      currentPrice: 299,
      currency: "USD",
      subscribers: 456,
      revenue: 136344,
      lastUpdated: "2024-01-15"
    },
    {
      plan: "Premium", 
      billing: "Quarterly",
      currentPrice: 809,
      currency: "USD",
      subscribers: 298,
      revenue: 241082,
      lastUpdated: "2024-01-15"
    },
    {
      plan: "Pro",
      billing: "Annual", 
      currentPrice: 2870,
      currency: "USD",
      subscribers: 189,
      revenue: 542430,
      lastUpdated: "2024-01-15"
    }
  ];

  // Mock recent subscription activity
  const recentActivity = [
    {
      id: "1",
      advisor: "Dr. Sarah Johnson",
      action: "upgraded",
      fromPlan: "Basic",
      toPlan: "Premium",
      date: "2024-01-28",
      amount: 809
    },
    {
      id: "2", 
      advisor: "Michael Chen",
      action: "renewed",
      fromPlan: "Basic",
      toPlan: "Basic",
      date: "2024-01-27",
      amount: 299
    },
    {
      id: "3",
      advisor: "Jennifer Davis",
      action: "downgraded",
      fromPlan: "Pro",
      toPlan: "Premium", 
      date: "2024-01-26",
      amount: 809
    },
    {
      id: "4",
      advisor: "Robert Wilson",
      action: "renewed",
      fromPlan: "Pro",
      toPlan: "Pro",
      date: "2024-01-25",
      amount: 2870
    }
  ];

  const handleUpdatePricing = () => {
    console.log("Updating pricing:", {
      basic: basicPrice,
      premium: premiumPrice,
      pro: proPrice
    });
    // Here you would make API calls to update pricing
  };

  const getActionBadge = (action: string) => {
    switch (action) {
      case "upgraded":
        return <Badge className="bg-green-100 text-green-700 border-green-200">Upgraded</Badge>;
      case "downgraded":
        return <Badge className="bg-yellow-100 text-yellow-700 border-yellow-200">Downgraded</Badge>;
      case "renewed":
        return <Badge className="bg-blue-100 text-blue-700 border-blue-200">Renewed</Badge>;
      case "cancelled":
        return <Badge className="bg-red-100 text-red-700 border-red-200">Cancelled</Badge>;
      default:
        return <Badge variant="secondary">{action}</Badge>;
    }
  };

  const getPlanBadge = (plan: string) => {
    const colorMap: Record<string, string> = {
      "Basic": "bg-blue-100 text-blue-700 border-blue-200",
      "Premium": "bg-purple-100 text-purple-700 border-purple-200",
      "Pro": "bg-orange-100 text-orange-700 border-orange-200"
    };
    
    return (
      <Badge className={colorMap[plan] || "bg-gray-100 text-gray-700 border-gray-200"}>
        {plan}
      </Badge>
    );
  };

  const totalRevenue = currentPricing.reduce((sum, plan) => sum + plan.revenue, 0);
  const totalSubscribers = currentPricing.reduce((sum, plan) => sum + plan.subscribers, 0);

  return (
    <div className="space-y-6">
      {/* Pricing Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            Subscription Pricing Management
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="basic-price">Basic Plan (Monthly)</Label>
              <div className="flex items-center gap-2">
                <span className="text-sm">$</span>
                <Input
                  id="basic-price"
                  type="number"
                  value={basicPrice}
                  onChange={(e) => setBasicPrice(e.target.value)}
                  placeholder="299"
                />
              </div>
              <p className="text-sm text-muted-foreground">
                Current: ${currentPricing[0].currentPrice}
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="premium-price">Premium Plan (Quarterly)</Label>
              <div className="flex items-center gap-2">
                <span className="text-sm">$</span>
                <Input
                  id="premium-price"
                  type="number"
                  value={premiumPrice}
                  onChange={(e) => setPremiumPrice(e.target.value)}
                  placeholder="809"
                />
              </div>
              <p className="text-sm text-muted-foreground">
                Current: ${currentPricing[1].currentPrice}
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="pro-price">Pro Plan (Annual)</Label>
              <div className="flex items-center gap-2">
                <span className="text-sm">$</span>
                <Input
                  id="pro-price"
                  type="number"
                  value={proPrice}
                  onChange={(e) => setProPrice(e.target.value)}
                  placeholder="2870"
                />
              </div>
              <p className="text-sm text-muted-foreground">
                Current: ${currentPricing[2].currentPrice}
              </p>
            </div>
          </div>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button className="w-full md:w-auto">
                Update Pricing
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Update Subscription Pricing</AlertDialogTitle>
                <AlertDialogDescription>
                  These pricing changes will apply to new subscriptions and renewals. Existing subscriptions will maintain their current pricing until renewal.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <strong>Basic:</strong> ${basicPrice}/month
                  </div>
                  <div>
                    <strong>Premium:</strong> ${premiumPrice}/quarter
                  </div>
                  <div>
                    <strong>Pro:</strong> ${proPrice}/year
                  </div>
                </div>
              </div>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleUpdatePricing}>
                  Update Pricing
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardContent>
      </Card>

      {/* Current Pricing Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Current Pricing Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Plan</TableHead>
                  <TableHead>Billing Period</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Subscribers</TableHead>
                  <TableHead>Monthly Revenue</TableHead>
                  <TableHead>Last Updated</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentPricing.map((plan) => (
                  <TableRow key={plan.plan}>
                    <TableCell>{getPlanBadge(plan.plan)}</TableCell>
                    <TableCell>{plan.billing}</TableCell>
                    <TableCell>
                      <span className="font-medium">${plan.currentPrice}</span>
                    </TableCell>
                    <TableCell>
                      <span className="font-medium">{plan.subscribers}</span>
                    </TableCell>
                    <TableCell>
                      <span className="font-medium">${plan.revenue.toLocaleString()}</span>
                    </TableCell>
                    <TableCell>
                      {new Date(plan.lastUpdated).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Recent Subscription Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Subscription Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Advisor</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead>Plan Change</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentActivity.map((activity) => (
                  <TableRow key={activity.id}>
                    <TableCell>
                      <span className="font-medium">{activity.advisor}</span>
                    </TableCell>
                    <TableCell>
                      {getActionBadge(activity.action)}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getPlanBadge(activity.fromPlan)}
                        {activity.fromPlan !== activity.toPlan && (
                          <>
                            <span className="text-muted-foreground">→</span>
                            {getPlanBadge(activity.toPlan)}
                          </>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="font-medium">${activity.amount}</span>
                    </TableCell>
                    <TableCell>
                      {new Date(activity.date).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Revenue Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Monthly recurring revenue
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Subscribers</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalSubscribers}</div>
            <p className="text-xs text-muted-foreground">
              Active subscriptions
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Revenue</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${Math.round(totalRevenue / totalSubscribers)}</div>
            <p className="text-xs text-muted-foreground">
              Per subscriber
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Growth Rate</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+12.5%</div>
            <p className="text-xs text-muted-foreground">
              Month over month
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};