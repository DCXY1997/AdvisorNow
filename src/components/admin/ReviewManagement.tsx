import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Search, Flag, Star, Eye, MoreHorizontal, EyeOff, Trash2 } from "lucide-react";

export const ReviewManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [ratingFilter, setRatingFilter] = useState("all");
  const [actionReason, setActionReason] = useState("");

  // Mock appeal review data - only shows reviews that have been appealed
  const reviews = [
    {
      id: "1",
      client: {
        name: "John Smith",
        avatar: ""
      },
      advisor: {
        name: "Dr. Sarah Johnson",
        licenseCode: "FP-2024-001"
      },
      rating: 2,
      content: "Very unprofessional and gave poor advice. Seemed to not know what they were talking about.",
      date: "2024-01-28",
      status: "under_review",
      flagCount: 0,
      flagReasons: [],
      isAppeal: true,
      appealDate: "2024-01-29",
      appealReason: "Client had unrealistic expectations and the advice given was accurate based on their financial situation."
    },
    {
      id: "3", 
      client: {
        name: "Anonymous User",
        avatar: ""
      },
      advisor: {
        name: "Jennifer Davis",
        licenseCode: "FP-2024-003"
      },
      rating: 1,
      content: "This advisor used offensive language and was completely inappropriate. Should be banned!",
      date: "2024-01-26",
      status: "appeal_rejected",
      flagCount: 0,
      flagReasons: [],
      isAppeal: true,
      appealDate: "2024-01-27",
      appealReason: "The client misunderstood my explanation. I maintained professional conduct throughout the session."
    },
    {
      id: "5",
      client: {
        name: "Maria Rodriguez",
        avatar: ""
      },
      advisor: {
        name: "Thomas Anderson",
        licenseCode: "FP-2024-005"
      },
      rating: 3,
      content: "Session was okay but felt rushed. Could have been more thorough in explanations.",
      date: "2024-01-24",
      status: "appeal_approved",
      flagCount: 0,
      flagReasons: [],
      isAppeal: true,
      appealDate: "2024-01-25",
      appealReason: "The session was conducted within the allocated time and all key points were covered comprehensively."
    }
  ];

  const filteredReviews = reviews.filter(review => {
    const matchesSearch = 
      review.client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.advisor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.content.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === "all" || review.status === statusFilter;
    
    const matchesRating = ratingFilter === "all" || 
      (ratingFilter === "low" && review.rating <= 2) ||
      (ratingFilter === "high" && review.rating >= 4) ||
      (ratingFilter === "medium" && review.rating === 3);

    return matchesSearch && matchesStatus && matchesRating;
  });

  const getStatusBadge = (status: string, flagCount: number) => {
    if (status === "under_review") {
      return <Badge className="bg-blue-100 text-blue-700 border-blue-200">Under Review</Badge>;
    } else if (status === "appeal_approved") {
      return <Badge className="bg-green-100 text-green-700 border-green-200">Appeal Approved</Badge>;
    } else if (status === "appeal_rejected") {
      return <Badge className="bg-red-100 text-red-700 border-red-200">Appeal Rejected</Badge>;
    } else if (status === "flagged") {
      return <Badge className="bg-red-100 text-red-700 border-red-200">Flagged ({flagCount})</Badge>;
    } else if (status === "hidden") {
      return <Badge className="bg-yellow-100 text-yellow-700 border-yellow-200">Hidden</Badge>;
    } else {
      return <Badge className="bg-green-100 text-green-700 border-green-200">Active</Badge>;
    }
  };

  const getRatingStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
        }`}
      />
    ));
  };

  const handleHideReview = (reviewId: string) => {
    console.log(`Hiding review ${reviewId} with reason: ${actionReason}`);
    setActionReason("");
    // Here you would make API call to hide the review
  };

  const handleDeleteReview = (reviewId: string) => {
    console.log(`Deleting review ${reviewId} with reason: ${actionReason}`);
    setActionReason("");
    // Here you would make API call to delete the review
  };

  const handleRestoreReview = (reviewId: string) => {
    console.log(`Restoring review ${reviewId}`);
    // Here you would make API call to restore the review
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Appeal Review Management</span>
            <div className="text-sm font-normal text-muted-foreground">
              {filteredReviews.length} of {reviews.length} reviews
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Search and Filter Controls */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search reviews, clients, or advisors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="under_review">Under Review</SelectItem>
                  <SelectItem value="appeal_approved">Appeal Approved</SelectItem>
                  <SelectItem value="appeal_rejected">Appeal Rejected</SelectItem>
                </SelectContent>
              </Select>

              <Select value={ratingFilter} onValueChange={setRatingFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Rating" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Ratings</SelectItem>
                  <SelectItem value="low">Low (1-2 ⭐)</SelectItem>
                  <SelectItem value="medium">Medium (3 ⭐)</SelectItem>
                  <SelectItem value="high">High (4-5 ⭐)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Reviews Table */}
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Client</TableHead>
                  <TableHead>Advisor</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Review Content</TableHead>
                  <TableHead>Appeal Reason</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Appeal Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredReviews.map((review) => (
                  <TableRow key={review.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={review.client.avatar} />
                          <AvatarFallback className="text-xs">
                            {review.client.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{review.client.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{review.advisor.name}</div>
                        <code className="text-xs bg-muted px-1 rounded">
                          {review.advisor.licenseCode}
                        </code>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        {getRatingStars(review.rating)}
                        <span className="ml-2 font-medium">{review.rating}.0</span>
                      </div>
                    </TableCell>
                    <TableCell className="max-w-md">
                      <div className="text-sm">
                        {review.content.length > 100 
                          ? `${review.content.substring(0, 100)}...` 
                          : review.content
                        }
                      </div>
                      {review.flagReasons.length > 0 && (
                        <div className="mt-1">
                          {review.flagReasons.map((reason, index) => (
                            <Badge key={index} variant="outline" className="text-xs mr-1">
                              {reason}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="max-w-sm">
                      <div className="text-sm">
                        {(review as any).appealReason?.length > 80 
                          ? `${(review as any).appealReason.substring(0, 80)}...` 
                          : (review as any).appealReason
                        }
                      </div>
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(review.status, review.flagCount)}
                    </TableCell>
                    <TableCell>
                      {new Date((review as any).appealDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="h-4 w-4 mr-2" />
                            View Full Review
                          </DropdownMenuItem>
                          
                          {review.status === "active" ? (
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                  <EyeOff className="h-4 w-4 mr-2" />
                                  Hide Review
                                </DropdownMenuItem>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Hide Review</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    This review will be hidden from public view but not permanently deleted.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <div className="space-y-4">
                                  <div>
                                    <Label htmlFor="hide-reason">Reason for hiding</Label>
                                    <Textarea
                                      id="hide-reason"
                                      placeholder="Enter the reason for hiding this review..."
                                      value={actionReason}
                                      onChange={(e) => setActionReason(e.target.value)}
                                    />
                                  </div>
                                </div>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction 
                                    onClick={() => handleHideReview(review.id)}
                                    className="bg-yellow-600 hover:bg-yellow-700"
                                  >
                                    Hide Review
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          ) : (
                            <DropdownMenuItem onClick={() => handleRestoreReview(review.id)}>
                              <Eye className="h-4 w-4 mr-2" />
                              Restore Review
                            </DropdownMenuItem>
                          )}

                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="text-red-600">
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete Permanently
                              </DropdownMenuItem>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Delete Review</AlertDialogTitle>
                                <AlertDialogDescription>
                                  This action cannot be undone. The review will be permanently deleted from the system.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <div className="space-y-4">
                                <div>
                                  <Label htmlFor="delete-reason">Reason for deletion</Label>
                                  <Textarea
                                    id="delete-reason"
                                    placeholder="Enter the reason for deleting this review..."
                                    value={actionReason}
                                    onChange={(e) => setActionReason(e.target.value)}
                                  />
                                </div>
                              </div>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction 
                                  onClick={() => handleDeleteReview(review.id)}
                                  className="bg-red-600 hover:bg-red-700"
                                >
                                  Delete Permanently
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredReviews.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No reviews found matching your search criteria.
            </div>
          )}
        </CardContent>
      </Card>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Reviews</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8,456</div>
            <p className="text-xs text-muted-foreground">
              All time reviews
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Flagged Reviews</CardTitle>
            <Flag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23</div>
            <p className="text-xs text-muted-foreground">
              Requiring attention
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Hidden Reviews</CardTitle>
            <EyeOff className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <p className="text-xs text-muted-foreground">
              Currently hidden
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.2</div>
            <p className="text-xs text-muted-foreground">
              Platform average
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};