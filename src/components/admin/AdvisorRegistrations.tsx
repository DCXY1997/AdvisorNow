import { useState, useEffect } from "react";
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
import { supabase } from "@/integrations/supabase/client";

export const AdvisorRegistrations = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("pending");
  const [approvalReason, setApprovalReason] = useState("");
  const [rejectionReason, setRejectionReason] = useState("");
  const [registrations, setRegistrations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch registrations from Supabase
  useEffect(() => {
    fetchRegistrations();
  }, []);

  const fetchRegistrations = async () => {
    try {
      const { data, error } = await (supabase as any)
        .from('agent_registrations')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching registrations:', error);
        toast({
          title: "Error",
          description: "Failed to fetch registrations",
          variant: "destructive"
        });
      } else {
        setRegistrations(data || []);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredRegistrations = registrations.filter(registration => {
    const matchesSearch = registration.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         registration.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         registration.representative_code.toLowerCase().includes(searchTerm.toLowerCase());
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

  const handleApproveRegistration = async (registrationId: string) => {
    try {
      // Find the registration to get details for email
      const registration = registrations.find(r => r.id === registrationId);
      if (!registration) {
        throw new Error('Registration not found');
      }

      // Update the registration status in database
      const { error } = await (supabase as any)
        .from('agent_registrations')
        .update({ 
          status: 'approved',
          approved_at: new Date().toISOString(),
          approved_by: 'Admin', // You can get actual admin name from auth
          approval_notes: approvalReason
        })
        .eq('id', registrationId);

      if (error) {
        throw error;
      }

      // Send approval email
      try {
        const emailResponse = await supabase.functions.invoke('send-approval-email', {
          body: {
            email: registration.email,
            fullName: registration.full_name,
            representativeCode: registration.representative_code,
            approvalNotes: approvalReason || undefined
          }
        });

        if (emailResponse.error) {
          console.error('Error sending approval email:', emailResponse.error);
          // Don't fail the approval process if email fails
        } else {
          console.log('Approval email sent successfully');
        }
      } catch (emailError) {
        console.error('Error sending approval email:', emailError);
        // Don't fail the approval process if email fails
      }

      toast({
        title: "Registration Approved",
        description: "The advisor registration has been approved and an email notification has been sent.",
      });
      setApprovalReason("");
      fetchRegistrations(); // Refresh the data
    } catch (error) {
      console.error('Error approving registration:', error);
      toast({
        title: "Error",
        description: "Failed to approve registration",
        variant: "destructive"
      });
    }
  };

  const handleRejectRegistration = async (registrationId: string) => {
    try {
      const { error } = await (supabase as any)
        .from('agent_registrations')
        .update({ 
          status: 'rejected',
          rejection_reason: rejectionReason
        })
        .eq('id', registrationId);

      if (error) {
        throw error;
      }

      toast({
        title: "Registration Rejected", 
        description: "The advisor registration has been rejected.",
        variant: "destructive"
      });
      setRejectionReason("");
      fetchRegistrations(); // Refresh the data
    } catch (error) {
      console.error('Error rejecting registration:', error);
      toast({
        title: "Error",
        description: "Failed to reject registration",
        variant: "destructive"
      });
    }
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
                           <AvatarImage src="" />
                           <AvatarFallback>
                             {registration.full_name.split(' ').map((n: string) => n[0]).join('')}
                           </AvatarFallback>
                         </Avatar>
                         <div>
                           <div className="font-medium">{registration.full_name}</div>
                           <code className="text-xs bg-muted px-1 rounded">
                             {registration.representative_code}
                           </code>
                         </div>
                      </div>
                    </TableCell>
                     <TableCell>
                       <div className="text-sm">
                         {registration.email}
                       </div>
                     </TableCell>
                     <TableCell>
                       <span className="text-sm">{registration.financial_institution}</span>
                     </TableCell>
                     <TableCell>{getStatusBadge(registration.status)}</TableCell>
                     <TableCell>
                       <div className="text-sm">
                         {new Date(registration.created_at).toLocaleDateString()}
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
                                 <DialogTitle>Application Details - {registration.full_name}</DialogTitle>
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
                                       <div className="text-base font-medium">{registration.full_name}</div>
                                     </div>
                                     <div>
                                       <Label className="text-sm font-medium text-muted-foreground">Email</Label>
                                       <div className="text-base">{registration.email}</div>
                                     </div>
                                     <div>
                                       <Label className="text-sm font-medium text-muted-foreground">Representative Code</Label>
                                       <code className="bg-muted px-3 py-2 rounded text-base">
                                         {registration.representative_code}
                                       </code>
                                     </div>
                                     <div>
                                       <Label className="text-sm font-medium text-muted-foreground">Financial Institution</Label>
                                       <div className="text-base">{registration.financial_institution}</div>
                                     </div>
                                     <div>
                                       <Label className="text-sm font-medium text-muted-foreground">Submitted Date</Label>
                                       <div className="text-base">{new Date(registration.created_at).toLocaleDateString()}</div>
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
                                         {registration.approved_at && (
                                           <div className="text-sm text-muted-foreground">
                                             Approved on {new Date(registration.approved_at).toLocaleDateString()} {registration.approved_by && `by ${registration.approved_by}`}
                                           </div>
                                         )}
                                         {registration.approval_notes && (
                                           <div className="text-sm bg-green-50 p-3 rounded border-l-4 border-green-200">
                                             <strong>Approval Notes:</strong> {registration.approval_notes}
                                           </div>
                                         )}
                                         {registration.rejection_reason && (
                                           <div className="text-sm bg-red-50 p-3 rounded border-l-4 border-red-200">
                                             <strong>Rejection Reason:</strong> {registration.rejection_reason}
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
                                      This will approve {registration.full_name}'s registration and allow them to start using the platform as an advisor.
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
                                      This will reject {registration.full_name}'s registration. Please provide a reason for the rejection.
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
      
      {loading && (
        <div className="flex items-center justify-center py-8">
          <div className="text-muted-foreground">Loading registrations...</div>
        </div>
      )}
      
      {!loading && registrations.length === 0 && (
        <div className="flex items-center justify-center py-8">
          <div className="text-muted-foreground">No registrations found</div>
        </div>
      )}
    </div>
  );
};