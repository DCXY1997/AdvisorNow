import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { 
  Star, 
  Clock, 
  Flag,
  CheckCircle,
  AlertTriangle
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const ReviewRating = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [review, setReview] = useState("");
  const [isReporting, setIsReporting] = useState(false);
  const [reportReasons, setReportReasons] = useState<string[]>([]);
  const [reportDetails, setReportDetails] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Get advisor data from navigation state or use default
  const advisor = location.state?.advisor || {
    name: "Sarah Johnson",
    specialty: "Financial Planning",
    rating: 4.8,
    reviewCount: 127,
    licenseCode: "FP-2024-456",
    avatar: ""
  };

  const callDuration = location.state?.callDuration || 1245; // Default 20:45

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const reportOptions = [
    "Inappropriate behavior",
    "Unprofessional conduct", 
    "Provided incorrect information",
    "Was late or unprepared",
    "Technical issues on advisor's end",
    "Other"
  ];

  const handleReportReasonChange = (reason: string, checked: boolean) => {
    if (checked) {
      setReportReasons([...reportReasons, reason]);
    } else {
      setReportReasons(reportReasons.filter(r => r !== reason));
    }
  };

  const handleSubmitReview = async () => {
    if (rating === 0) {
      toast({
        title: "Rating Required",
        description: "Please provide a rating before submitting.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast({
      title: "Review Submitted",
      description: "Thank you for your feedback!",
    });
    
    navigate("/");
  };

  const handleSubmitReport = async () => {
    if (reportReasons.length === 0) {
      toast({
        title: "Report Reason Required",
        description: "Please select at least one reason for reporting.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast({
      title: "Report Submitted",
      description: "Your report has been submitted and will be reviewed by our team.",
    });
    
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-primary to-primary/80 rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">AN</span>
              </div>
              <span className="font-bold text-lg text-foreground">Advisor Now</span>
            </div>
          </div>
          
          <Badge variant="outline" className="text-green-600 border-green-600">
            <CheckCircle className="h-3 w-3 mr-1" />
            Call Completed
          </Badge>
        </div>
      </header>

      <div className="container mx-auto py-8 px-6 max-w-2xl">
        {/* Session Summary */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Session Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <Avatar className="w-16 h-16">
                <AvatarImage src={advisor.avatar} />
                <AvatarFallback className="text-xl">
                  {advisor.name.split(' ').map((n: string) => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h3 className="text-xl font-semibold">{advisor.name}</h3>
                <p className="text-muted-foreground">{advisor.specialty}</p>
                <div className="flex items-center gap-4 mt-2">
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-500">★</span>
                    <span className="font-medium">{advisor.rating}</span>
                    <span className="text-muted-foreground">({advisor.reviewCount} reviews)</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Duration: {formatDuration(callDuration)}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {!isReporting ? (
          /* Rating & Review Form */
          <Card>
            <CardHeader>
              <CardTitle>Rate Your Experience</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Star Rating */}
              <div className="text-center">
                <Label className="text-base font-medium">How would you rate this session?</Label>
                <div className="flex justify-center gap-2 mt-3 mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      className="transition-colors"
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => setRating(star)}
                    >
                      <Star
                        className={`h-8 w-8 ${
                          star <= (hoverRating || rating)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    </button>
                  ))}
                </div>
                {rating > 0 && (
                  <p className="text-sm text-muted-foreground">
                    {rating === 1 && "Poor experience"}
                    {rating === 2 && "Below expectations"}
                    {rating === 3 && "Average experience"}
                    {rating === 4 && "Good experience"}
                    {rating === 5 && "Excellent experience"}
                  </p>
                )}
              </div>

              {/* Written Review */}
              <div>
                <Label htmlFor="review">Share your experience (optional)</Label>
                <Textarea
                  id="review"
                  placeholder="Tell us about your consultation experience..."
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  rows={4}
                  className="mt-2"
                />
                <p className="text-sm text-muted-foreground mt-1">
                  {review.length}/500 characters
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-4">
                <Button 
                  onClick={handleSubmitReview}
                  disabled={isSubmitting}
                  className="flex-1"
                >
                  {isSubmitting ? "Submitting..." : "Submit Review"}
                </Button>
                
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline" className="flex items-center gap-2">
                      <Flag className="h-4 w-4" />
                      Report Issue
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Report an Issue</AlertDialogTitle>
                      <AlertDialogDescription>
                        If you experienced any problems during your consultation, please let us know. This will help us maintain quality standards.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => setIsReporting(true)}>
                        Continue to Report
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>

              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  Your feedback helps us maintain quality and improve our services. All reviews are confidential and help other users make informed decisions.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        ) : (
          /* Report Form */
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-orange-600">
                <Flag className="h-5 w-5" />
                Report Issue
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label className="text-base font-medium">What happened? (Select all that apply)</Label>
                <div className="mt-3 space-y-3">
                  {reportOptions.map((option) => (
                    <div key={option} className="flex items-center space-x-2">
                      <Checkbox
                        id={option}
                        checked={reportReasons.includes(option)}
                        onCheckedChange={(checked) => 
                          handleReportReasonChange(option, checked as boolean)
                        }
                      />
                      <Label htmlFor={option} className="text-sm font-normal">
                        {option}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label htmlFor="report-details">Additional Details</Label>
                <Textarea
                  id="report-details"
                  placeholder="Please provide more details about the issue..."
                  value={reportDetails}
                  onChange={(e) => setReportDetails(e.target.value)}
                  rows={4}
                  className="mt-2"
                />
              </div>

              <div className="flex gap-4 pt-4">
                <Button 
                  variant="outline" 
                  onClick={() => setIsReporting(false)}
                  className="flex-1"
                >
                  Back to Review
                </Button>
                <Button 
                  onClick={handleSubmitReport}
                  disabled={isSubmitting}
                  className="flex-1 bg-orange-600 hover:bg-orange-700"
                >
                  {isSubmitting ? "Submitting..." : "Submit Report"}
                </Button>
              </div>

              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  Reports are taken seriously and will be reviewed by our team. False reports may result in account restrictions.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ReviewRating;