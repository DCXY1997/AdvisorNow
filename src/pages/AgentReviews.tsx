import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Star, User, FileText, CreditCard, ChevronDown, Settings, LogOut, BarChart, AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const AgentReviews = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isOnline, setIsOnline] = useState(true);
  const [appealText, setAppealText] = useState("");
  const [isAppealDialogOpen, setIsAppealDialogOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState<number | null>(null);

  const sidebarItems = [
    { icon: BarChart, label: "Dashboard", active: false, path: "/agent-dashboard" },
    { icon: FileText, label: "Reviews", active: true, path: "/agent-reviews" },
    { icon: CreditCard, label: "Subscription", active: false, path: "/agent-subscription" },
  ];

  const overallRating = 4.7;
  const totalReviews = 127;

  const categoryRatings = [
    { category: "Investment", rating: 3.5, maxRating: 5 },
    { category: "Insurance", rating: 4.2, maxRating: 5 },
    { category: "Retirement", rating: 3.7, maxRating: 5 },
    { category: "Education", rating: 4.4, maxRating: 5 },
  ];

  const reviews = [
    {
      id: 1,
      clientName: "Tom",
      clientInitial: "T",
      service: "Investment",
      rating: 5,
      comment: "He was helpful and extremely knowledgeable about investment. He was not pushy!!!"
    },
    {
      id: 2,
      clientName: "James",
      clientInitial: "J",
      service: "Insurance",
      rating: 4,
      comment: "He did a policies review and help clarify what are the different type of insurance."
    },
    {
      id: 3,
      clientName: "Sarah",
      clientInitial: "S",
      service: "Retirement",
      rating: 5,
      comment: "Excellent advice on retirement planning. Very patient and explained everything clearly."
    },
    {
      id: 4,
      clientName: "Michael",
      clientInitial: "M",
      service: "Education",
      rating: 4,
      comment: "Great insights on education savings plans. Helped me understand the options available."
    },
    {
      id: 5,
      clientName: "Lisa",
      clientInitial: "L",
      service: "Investment",
      rating: 3,
      comment: "Good service overall, could have been more detailed in explaining the risks involved."
    },
    {
      id: 6,
      clientName: "David",
      clientInitial: "D",
      service: "Insurance",
      rating: 5,
      comment: "Professional and thorough. Found the perfect insurance plan for my family's needs."
    },
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`h-4 w-4 ${
          index < rating 
            ? "fill-primary text-primary" 
            : "text-muted-foreground"
        }`}
      />
    ));
  };

  const handleAppeal = (reviewId: number) => {
    setSelectedReview(reviewId);
    setIsAppealDialogOpen(true);
  };

  const submitAppeal = () => {
    if (!appealText.trim()) {
      toast({
        title: "Appeal Required",
        description: "Please provide a reason for your appeal.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Appeal Submitted",
      description: "Your appeal has been submitted for review. We'll respond within 2-3 business days.",
    });

    setAppealText("");
    setIsAppealDialogOpen(false);
    setSelectedReview(null);
  };

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
            <h1 className="text-2xl font-bold text-foreground">Reviews and Ratings</h1>
            
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

        {/* Reviews Content */}
        <div className="p-6">
          {/* Overall Rating Card */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="flex items-center gap-8">
                {/* Overall Rating */}
                <div className="text-center">
                  <div className="text-6xl font-bold text-primary mb-2">{overallRating}</div>
                  <div className="flex justify-center gap-1 mb-2">
                    {renderStars(Math.floor(overallRating))}
                  </div>
                  <p className="text-sm text-muted-foreground">{totalReviews} reviews</p>
                </div>

                {/* Divider */}
                <div className="w-px h-24 bg-border"></div>

                {/* Category Ratings */}
                <div className="flex-1 space-y-4">
                  {categoryRatings.map((item) => (
                    <div key={item.category} className="flex items-center gap-4">
                      <div className="w-20 text-sm font-medium text-foreground">
                        {item.category}
                      </div>
                      <div className="flex-1">
                        <Progress 
                          value={(item.rating / item.maxRating) * 100} 
                          className="h-2"
                        />
                      </div>
                      <div className="w-8 text-sm font-medium text-foreground">
                        {item.rating}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Individual Reviews */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {reviews.map((review) => (
              <Card key={review.id} className="bg-muted/30">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    {/* Avatar */}
                    <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-semibold">
                      {review.clientInitial}
                    </div>

                    {/* Review Content */}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-semibold text-foreground">{review.clientName}</h4>
                      </div>
                      
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-sm font-medium text-foreground">{review.service}</span>
                        <div className="flex gap-1">
                          {renderStars(review.rating)}
                        </div>
                      </div>
                      
                      <p className="text-sm text-foreground leading-relaxed mb-3">
                        {review.comment}
                      </p>

                      {/* Appeal Button for Low Ratings (3 or below) */}
                      {review.rating <= 3 && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleAppeal(review.id)}
                          className="flex items-center gap-2 text-orange-600 border-orange-200 hover:bg-orange-50"
                        >
                          <AlertTriangle className="h-3 w-3" />
                          Appeal Review
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Appeal Dialog */}
          <Dialog open={isAppealDialogOpen} onOpenChange={setIsAppealDialogOpen}>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-orange-600" />
                  Appeal Review
                </DialogTitle>
              </DialogHeader>
              
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="appeal-reason">Reason for Appeal</Label>
                  <Textarea
                    id="appeal-reason"
                    value={appealText}
                    onChange={(e) => setAppealText(e.target.value)}
                    placeholder="Please explain why you believe this review is unfair or inaccurate. Include any relevant details about the consultation."
                    className="min-h-[120px]"
                    maxLength={500}
                  />
                  <p className="text-sm text-muted-foreground">
                    {appealText.length}/500 characters
                  </p>
                </div>
                
                <div className="bg-muted/50 p-4 rounded-lg">
                  <h4 className="font-medium text-sm mb-2">Appeal Guidelines:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Appeals are reviewed within 2-3 business days</li>
                    <li>• Provide specific details about the consultation</li>
                    <li>• Reviews may be removed if they violate our guidelines</li>
                    <li>• False appeals may result in account penalties</li>
                  </ul>
                </div>
              </div>
              
              <div className="flex justify-end gap-3">
                <Button
                  variant="outline"
                  onClick={() => setIsAppealDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  onClick={submitAppeal}
                  className="bg-orange-600 hover:bg-orange-700 text-white"
                >
                  Submit Appeal
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default AgentReviews;