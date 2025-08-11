import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Check, X, User, FileText, CreditCard, ChevronDown, Settings, LogOut, BarChart } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AgentSubscription = () => {
  const navigate = useNavigate();
  const [isOnline, setIsOnline] = useState(true);

  const sidebarItems = [
    { icon: BarChart, label: "Dashboard", active: false, path: "/agent-dashboard" },
    { icon: FileText, label: "Reviews", active: false, path: "/agent-reviews" },
    { icon: CreditCard, label: "Subscription", active: true, path: "/agent-subscription" },
  ];

  const plans = [
    {
      name: "Basic",
      color: "bg-gradient-to-br from-cyan-400 to-cyan-500",
      textColor: "text-white",
      featured: false
    },
    {
      name: "Premium",
      color: "bg-gradient-to-br from-teal-600 to-teal-700",
      textColor: "text-white",
      featured: true
    },
    {
      name: "Pro",
      color: "bg-gradient-to-br from-cyan-300 to-cyan-400",
      textColor: "text-white",
      featured: false
    }
  ];

  const pricingData = [
    {
      term: "Monthly",
      prices: ["$299", "$809", "$2,870"],
      discounts: [null, null, null]
    },
    {
      term: "Quarterly", 
      prices: ["$809", "$2,187", "$7,740"],
      discounts: [null, "10%", "20%"]
    },
    {
      term: "Annually",
      prices: ["$2,870", "$7,740", "$27,480"],
      discounts: [null, "10%", "20%"]
    }
  ];

  const planFeatures = [
    {
      name: "Basic",
      duration: "Monthly Billing",
      savings: null,
      features: [
        "Full access to advisor platform",
        "Complete analytics dashboard",
        "Client consultation management",
        "Review and rating system",
        "Profile customization",
        "Email support",
        "Data export capabilities",
        "Historical performance tracking"
      ]
    },
    {
      name: "Premium", 
      duration: "Quarterly Billing",
      savings: "Save 10%",
      features: [
        "Full access to advisor platform",
        "Complete analytics dashboard",
        "Client consultation management",
        "Review and rating system",
        "Profile customization",
        "Email support",
        "Data export capabilities",
        "Historical performance tracking"
      ]
    },
    {
      name: "Pro",
      duration: "Annual Billing",
      savings: "Save 20%",
      features: [
        "Full access to advisor platform",
        "Complete analytics dashboard",
        "Client consultation management",
        "Review and rating system",
        "Profile customization",
        "Email support",
        "Data export capabilities",
        "Historical performance tracking"
      ]
    }
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
            <h1 className="text-2xl font-bold text-foreground">Subscription Plans</h1>
            
            <div className="flex items-center gap-4">
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
                      <AvatarImage src="" />
                      <AvatarFallback>
                        <User className="h-4 w-4" />
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
                  <DropdownMenuItem className="flex items-center gap-2 cursor-pointer hover:bg-muted">
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Subscription Content */}
        <div className="p-6">
          {/* Plan Headers */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {plans.map((plan, index) => (
              <div
                key={plan.name}
                className={`${plan.color} ${plan.textColor} rounded-lg p-8 text-center relative`}
              >
                {plan.featured && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-orange-500 text-white">
                    Most Popular
                  </Badge>
                )}
                <h2 className="text-2xl font-bold">{plan.name}</h2>
              </div>
            ))}
          </div>

          {/* Pricing Table */}
          <Card className="mb-8">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left p-6 font-semibold text-foreground">Plan Details</th>
                      <th className="text-center p-6 font-semibold text-foreground">Basic</th>
                      <th className="text-center p-6 font-semibold text-foreground">Premium</th>
                      <th className="text-center p-6 font-semibold text-foreground">Pro</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-border">
                      <td className="p-6 font-medium text-foreground">Billing Period</td>
                      <td className="text-center p-6 text-foreground font-semibold">Monthly</td>
                      <td className="text-center p-6 text-foreground font-semibold">Quarterly</td>
                      <td className="text-center p-6 text-foreground font-semibold">Annually</td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="p-6 font-medium text-foreground">Price</td>
                      <td className="text-center p-6 text-foreground font-semibold">$299</td>
                      <td className="text-center p-6 text-foreground font-semibold">$809</td>
                      <td className="text-center p-6 text-foreground font-semibold">$2,870</td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="p-6 font-medium text-foreground">Savings</td>
                      <td className="text-center p-6">
                        <span className="text-muted-foreground">-</span>
                      </td>
                      <td className="text-center p-6">
                        <span className="text-green-600 font-bold text-lg">Save 10%</span>
                      </td>
                      <td className="text-center p-6">
                        <span className="text-green-600 font-bold text-lg">Save 20%</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="p-6 font-medium text-foreground">Discount</td>
                      <td className="text-center p-6">
                        <span className="text-muted-foreground">No discount</span>
                      </td>
                      <td className="text-center p-6">
                        <div className="flex flex-col items-center">
                          <span className="text-green-600 font-bold text-lg">10% OFF</span>
                          <span className="text-xs text-muted-foreground">vs monthly</span>
                        </div>
                      </td>
                      <td className="text-center p-6">
                        <div className="flex flex-col items-center">
                          <span className="text-green-600 font-bold text-lg">20% OFF</span>
                          <span className="text-xs text-muted-foreground">vs monthly</span>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Plan Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {planFeatures.map((plan, index) => (
              <Card key={plan.name} className={`${plans[index].featured ? 'ring-2 ring-primary ring-offset-2' : ''}`}>
                <CardHeader>
                  <CardTitle className="text-center text-xl">{plan.name}</CardTitle>
                  <p className="text-center text-sm text-muted-foreground">{plan.duration}</p>
                  {plan.savings && (
                    <Badge className="mx-auto bg-green-100 text-green-700 border-green-200">
                      {plan.savings}
                    </Badge>
                  )}
                  {plans[index].featured && (
                    <Badge className="mx-auto bg-primary text-primary-foreground mt-2">
                      Most Popular
                    </Badge>
                  )}
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="space-y-3">
                    <Button 
                      className="w-full"
                      variant={plans[index].featured ? "default" : "outline"}
                    >
                      Choose {plan.name}
                    </Button>
                    <p className="text-xs text-muted-foreground text-center">
                      No setup fees • Cancel anytime
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Additional Info */}
          <div className="mt-12 text-center">
            <h3 className="text-xl font-semibold text-foreground mb-4">
              Need a Custom Solution?
            </h3>
            <p className="text-muted-foreground mb-6">
              Contact our sales team for enterprise pricing and custom features tailored to your organization.
            </p>
            <Button variant="outline" size="lg">
              Contact Sales
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentSubscription;