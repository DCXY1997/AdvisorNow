import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Search, Filter, Eye, MoreHorizontal, CheckCircle, XCircle, Clock, User, Building2, FileText, UserCheck, UserX } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";

export const AdvisorRegistrations = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("pending");
  const [approvalReason, setApprovalReason] = useState("");
  const [rejectionReason, setRejectionReason] = useState("");

  // Mock registration data
  const registrations = [
    {
      id: "1",
      name: "Michael Chen",
      email: "michael.chen@email.com",
      phone: "+65 9123 4567",
      representativeNumber: "REP-2024-456",
      financialInstitution: "Morgan Stanley Wealth Management",
      specializations: ["Startup Financing", "Venture Capital", "Financial Tech"],
      credentials: ["CFP - Certified Financial Planner", "Series 7 - General Securities Representative"],
      bio: "Experienced financial advisor specializing in startup financing and venture capital advisory with 8+ years in the industry.",
      submittedDate: "2024-01-28",
      status: "pending",
      documents: ["License Certificate", "Resume", "References"],
      avatar: ""
    },
    {
      id: "2", 
      name: "Sarah Martinez",
      email: "sarah.martinez@email.com",
      phone: "+65 8765 4321",
      representativeNumber: "REP-2024-457",
      financialInstitution: "Charles Schwab Advisory Services",
      specializations: ["Retirement Planning", "Investment Strategies"],
      credentials: ["CFP - Certified Financial Planner", "CFA - Chartered Financial Analyst"],
      bio: "Dedicated to helping families secure their financial future through comprehensive retirement and investment planning.",
      submittedDate: "2024-01-27",
      status: "pending",
      documents: ["License Certificate", "Resume", "References", "Portfolio Examples"],
      avatar: ""
    },
    {
      id: "3",
      name: "David Kim",
      email: "david.kim@email.com", 
      phone: "+65 7654 3210",
      representativeNumber: "REP-2024-458",
      financialInstitution: "UBS Private Wealth Management",
      specializations: ["Wealth Management", "Estate Planning"],
      credentials: ["CFP - Certified Financial Planner", "ChFC - Chartered Financial Consultant"],
      bio: "High-net-worth specialist with expertise in comprehensive wealth management and estate planning strategies.",
      submittedDate: "2024-01-26",
      status: "approved",
      documents: ["License Certificate", "Resume", "References"],
      avatar: "",
      approvalDate: "2024-01-28",
      approvedBy: "Admin"
    },
    {
      id: "4",
      name: "Jennifer Wong",
      email: "jennifer.wong@email.com",
      phone: "+65 6543 2109", 
      representativeNumber: "REP-2024-459",
      financialInstitution: "Independent Advisor",
      specializations: ["Personal Finance"],
      credentials: ["Basic Certification"],
      bio: "New to financial advisory, looking to help with basic personal finance questions.",
      submittedDate: "2024-01-25",
      status: "rejected",
      documents: ["Resume"],
      avatar: "",
      rejectionDate: "2024-01-27",
      rejectionReason: "Insufficient credentials and experience for platform standards"
    }
  ];

  const filteredRegistrations = registrations.filter(registration => {
    const matchesSearch = registration.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         registration.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         registration.representativeNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || registration.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-700 border-yellow-200">Pending Review</Badge>;
      case "approved":
        return <Badge className="bg-green-100 text-green-700 border-green-200">Approved</Badge>;
      case "rejected":
        return <Badge className="bg-red-100 text-red-700 border-red-200">Rejected</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const handleApproveRegistration = (registrationId: string) => {
    console.log(`Approving registration ${registrationId} with reason: ${approvalReason}`);
    toast({
      title: "Registration Approved",
      description: "The advisor registration has been approved successfully.",
    });
    setApprovalReason("");
  };

  const handleRejectRegistration = (registrationId: string) => {
    console.log(`Rejecting registration ${registrationId} with reason: ${rejectionReason}`);
    toast({
      title: "Registration Rejected", 
      description: "The advisor registration has been rejected.",
      variant: "destructive"
    });
    setRejectionReason("");
  };

  // Calculate stats
  const stats = {
    pending: registrations.filter(r => r.status === "pending").length,
    approved: registrations.filter(r => r.status === "approved").length,
    rejected: registrations.filter(r => r.status === "rejected").length,
    total: registrations.length
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pending}</div>
            <p className="text-xs text-muted-foreground">
              Awaiting approval
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approved</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.approved}</div>
            <p className="text-xs text-muted-foreground">
              Active advisors
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rejected</CardTitle>
            <UserX className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.rejected}</div>
            <p className="text-xs text-muted-foreground">
              Applications denied
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground">
              All time submissions
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Registrations Management */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Advisor Registration Applications
          </CardTitle>
          <div className="text-sm font-normal text-muted-foreground">
            {filteredRegistrations.length} of {registrations.length} applications
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Search and Filter Controls */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, email, or rep number..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-48">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending Review</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Registrations Table */}
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Applicant</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Institution</TableHead>
                  <TableHead>Specializations</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Submitted</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRegistrations.map((registration) => (
                  <TableRow key={registration.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={registration.avatar} />
                          <AvatarFallback>
                            {registration.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{registration.name}</div>
                          <code className="text-xs bg-muted px-1 rounded">
                            {registration.representativeNumber}
                          </code>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>{registration.email}</div>
                        <div className="text-muted-foreground">{registration.phone}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">{registration.financialInstitution}</span>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1 flex-wrap max-w-48">
                        {registration.specializations.slice(0, 2).map((spec) => (
                          <Badge key={spec} variant="outline" className="text-xs">
                            {spec}
                          </Badge>
                        ))}
                        {registration.specializations.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{registration.specializations.length - 2}
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(registration.status)}</TableCell>
                    <TableCell>
                      <div className="text-sm">
                        {new Date(registration.submittedDate).toLocaleDateString()}
                      </div>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-background border shadow-lg">
                          <Dialog>
                            <DialogTrigger asChild>
                              <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                <Eye className="h-4 w-4 mr-2" />
                                View Application
                              </DropdownMenuItem>
                            </DialogTrigger>
                            <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                              <DialogHeader>
                                <DialogTitle>Application Details - {registration.name}</DialogTitle>
                              </DialogHeader>
                              
                              <div className="space-y-4">
                                {/* Application Information */}
                                <Card>
                                  <CardHeader>
                                    <CardTitle className="text-lg flex items-center gap-2">
                                      <User className="h-5 w-5" />
                                      Application Details
                                    </CardTitle>
                                  </CardHeader>
                                  <CardContent className="grid grid-cols-1 gap-4">
                                    <div>
                                      <Label className="text-sm font-medium text-muted-foreground">Full Name</Label>
                                      <div className="text-base font-medium">{registration.name}</div>
                                    </div>
                                    <div>
                                      <Label className="text-sm font-medium text-muted-foreground">Email</Label>
                                      <div className="text-base">{registration.email}</div>
                                    </div>
                                    <div>
                                      <Label className="text-sm font-medium text-muted-foreground">Representative Number</Label>
                                      <code className="bg-muted px-3 py-2 rounded text-base">
                                        {registration.representativeNumber}
                                      </code>
                                    </div>
                                    <div>
                                      <Label className="text-sm font-medium text-muted-foreground">Financial Institution</Label>
                                      <div className="text-base">{registration.financialInstitution}</div>
                                    </div>
                                  </CardContent>
                                </Card>

                                {/* Application Status */}
                                {registration.status !== "pending" && (
                                  <Card>
                                    <CardHeader>
                                      <CardTitle className="text-lg">Application Status</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                      <div className="space-y-2">
                                        <div className="flex items-center gap-2">
                                          <span className="text-sm font-medium">Status:</span>
                                          {getStatusBadge(registration.status)}
                                        </div>
                                        {registration.approvalDate && (
                                          <div className="text-sm text-muted-foreground">
                                            Approved on {new Date(registration.approvalDate).toLocaleDateString()} by {registration.approvedBy}
                                          </div>
                                        )}
                                        {registration.rejectionReason && (
                                          <div className="text-sm bg-red-50 p-3 rounded border-l-4 border-red-200">
                                            <strong>Rejection Reason:</strong> {registration.rejectionReason}
                                          </div>
                                        )}
                                      </div>
                                    </CardContent>
                                  </Card>
                                )}
                              </div>
                            </DialogContent>
                          </Dialog>

                          {registration.status === "pending" && (
                            <>
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="text-green-600">
                                    <CheckCircle className="h-4 w-4 mr-2" />
                                    Approve Registration
                                  </DropdownMenuItem>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Approve Registration</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      This will approve {registration.name}'s registration and allow them to start using the platform as an advisor.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <div className="space-y-4">
                                    <div>
                                      <Label htmlFor="approval-reason">Approval notes (optional)</Label>
                                      <Textarea
                                        id="approval-reason"
                                        placeholder="Add any notes about the approval..."
                                        value={approvalReason}
                                        onChange={(e) => setApprovalReason(e.target.value)}
                                      />
                                    </div>
                                  </div>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction 
                                      onClick={() => handleApproveRegistration(registration.id)}
                                      className="bg-green-600 hover:bg-green-700"
                                    >
                                      Approve Registration
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>

                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="text-red-600">
                                    <XCircle className="h-4 w-4 mr-2" />
                                    Reject Registration
                                  </DropdownMenuItem>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Reject Registration</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      This will reject {registration.name}'s registration. Please provide a reason for the rejection.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <div className="space-y-4">
                                    <div>
                                      <Label htmlFor="rejection-reason">Reason for rejection (required)</Label>
                                      <Textarea
                                        id="rejection-reason"
                                        placeholder="Explain why this registration is being rejected..."
                                        value={rejectionReason}
                                        onChange={(e) => setRejectionReason(e.target.value)}
                                      />
                                    </div>
                                  </div>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction 
                                      onClick={() => handleRejectRegistration(registration.id)}
                                      className="bg-red-600 hover:bg-red-700"
                                      disabled={!rejectionReason.trim()}
                                    >
                                      Reject Registration
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredRegistrations.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No registration applications found matching your search criteria.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};