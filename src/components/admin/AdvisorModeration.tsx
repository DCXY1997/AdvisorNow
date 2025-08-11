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
import { Shield, Ban, AlertTriangle, Users, Settings, CheckCircle, Filter, MoreHorizontal, Eye } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export const AdvisorModeration = () => {
  const [advisorLimit, setAdvisorLimit] = useState("1500");
  const [suspensionReason, setSuspensionReason] = useState("");
  const [resolutionNote, setResolutionNote] = useState("");
  const [caseFilter, setCaseFilter] = useState("active");

  // Mock data for actual user reports only
  const allModerationCases = [
    {
      id: "1",
      advisor: {
        name: "Alex Thompson",
        email: "alex.thompson@email.com",
        licenseCode: "FP-2024-015",
        avatar: ""
      },
      issue: "Inappropriate behavior",
      description: "User reported inappropriate behavior during consultation",
      reports: [
        {
          id: "1-1",
          userId: "user321",
          userName: "John Martinez",
          userContact: "+65 9876 5432",
          reportDate: "2024-01-26",
          rating: null,
          complaint: "Advisor made inappropriate personal comments during financial consultation",
          callId: "call_800",
          status: "active",
          resolutionNote: undefined
        }
      ],
      avgRating: 4.1,
      status: "flagged",
      reportedDate: "2024-01-26",
      severity: "high"
    },
    {
      id: "2",
      advisor: {
        name: "Jennifer Davis",
        email: "jennifer.davis@email.com",
        licenseCode: "FP-2024-003",
        avatar: ""
      },
      issue: "Unprofessional conduct",
      description: "User reported unprofessional behavior during call",
      reports: [
        {
          id: "2-1",
          userId: "user654",
          userName: "Sarah Chen",
          userContact: "+65 8765 4321",
          reportDate: "2024-01-27",
          rating: null,
          complaint: "Used unprofessional language during call",
          callId: "call_801",
          status: "active",
          resolutionNote: undefined
        }
      ],
      avgRating: 3.8,
      status: "under_review",
      reportedDate: "2024-01-27",
      severity: "medium"
    },
    {
      id: "3",
      advisor: {
        name: "Michael Roberts",
        email: "michael.roberts@email.com",
        licenseCode: "FP-2024-009",
        avatar: ""
      },
      issue: "Other",
      description: "User reported general behavioral concerns",
      reports: [
        {
          id: "3-1",
          userId: "user555",
          userName: "David Wong",
          userContact: "+65 7654 3210",
          reportDate: "2024-01-29",
          rating: null,
          complaint: "Advisor was consistently interrupting and not listening to my concerns",
          callId: "call_850",
          status: "active",
          resolutionNote: undefined
        }
      ],
      avgRating: 4.2,
      status: "under_review",
      reportedDate: "2024-01-29",
      severity: "high"
    },
    {
      id: "4",
      advisor: {
        name: "Sarah Wilson",
        email: "sarah.wilson@email.com",
        licenseCode: "FP-2024-012",
        avatar: ""
      },
      issue: "Inappropriate behavior",
      description: "Resolved - Investigation completed",
      reports: [
        {
          id: "4-1",
          userId: "user888",
          userName: "Lisa Tan",
          userContact: "+65 6543 2109",
          reportDate: "2024-01-15",
          rating: null,
          complaint: "Advisor made me uncomfortable with personal questions unrelated to finances",
          callId: "call_750",
          status: "resolved",
          resolutionNote: "Investigation completed - Advisor has been counseled on appropriate consultation boundaries"
        }
      ],
      avgRating: 4.3,
      status: "resolved",
      reportedDate: "2024-01-15",
      severity: "high"
    }
  ];

  // Filter cases based on selected filter
  const moderationCases = allModerationCases.filter(case_ => {
    if (caseFilter === "active") return case_.status !== "resolved";
    if (caseFilter === "resolved") return case_.status === "resolved";
    return true; // "all"
  });

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "high":
        return <Badge className="bg-red-100 text-red-700 border-red-200">High Priority</Badge>;
      case "medium":
        return <Badge className="bg-yellow-100 text-yellow-700 border-yellow-200">Medium Priority</Badge>;
      case "low":
        return <Badge className="bg-blue-100 text-blue-700 border-blue-200">Low Priority</Badge>;
      default:
        return <Badge variant="secondary">{severity}</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "flagged":
        return <Badge className="bg-red-100 text-red-700 border-red-200">Flagged</Badge>;
      case "under_review":
        return <Badge className="bg-yellow-100 text-yellow-700 border-yellow-200">Under Review</Badge>;
      case "resolved":
        return <Badge className="bg-green-100 text-green-700 border-green-200">Resolved</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const handleSuspendAdvisor = (advisorId: string) => {
    console.log(`Suspending advisor ${advisorId} with reason: ${suspensionReason}`);
    setSuspensionReason("");
    // Here you would make API call to suspend the advisor
  };

  const handleBlacklistAdvisor = (advisorId: string) => {
    console.log(`Blacklisting advisor ${advisorId}`);
    // Here you would make API call to blacklist the advisor
  };

  const handleResolveReport = (reportId: string) => {
    console.log(`Resolving report ${reportId} with note: ${resolutionNote}`);
    setResolutionNote("");
    // Here you would make API call to resolve the specific report
  };

  return (
    <div className="space-y-6">
      {/* Platform Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Platform Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="advisor-limit">Maximum Active Advisors</Label>
              <Input
                id="advisor-limit"
                type="number"
                value={advisorLimit}
                onChange={(e) => setAdvisorLimit(e.target.value)}
                placeholder="Enter limit"
              />
              <p className="text-sm text-muted-foreground">
                Current active: 1,089 advisors
              </p>
            </div>
            <div className="flex items-end">
              <Button>Update Limit</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Moderation Cases */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Report Cases Management
          </CardTitle>
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            <Select value={caseFilter} onValueChange={setCaseFilter}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active Cases</SelectItem>
                <SelectItem value="resolved">Resolved Cases</SelectItem>
                <SelectItem value="all">All Cases</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Advisor</TableHead>
                  <TableHead>Issue</TableHead>
                  <TableHead>Reports</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Severity</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {moderationCases.map((case_) => (
                  <TableRow key={case_.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={case_.advisor.avatar} />
                          <AvatarFallback>
                            {case_.advisor.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{case_.advisor.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {case_.advisor.email}
                          </div>
                          <code className="text-xs bg-muted px-1 rounded">
                            {case_.advisor.licenseCode}
                          </code>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-2">
                        <div>
                          <div className="font-medium">{case_.issue}</div>
                          <div className="text-sm text-muted-foreground">
                            {case_.description}
                          </div>
                        </div>
                        <div className="space-y-1">
                          <div className="text-xs font-medium text-muted-foreground">Recent Reports:</div>
                          {(case_.reports || []).slice(0, 2).map((report, index) => (
                            <div key={index} className="text-xs bg-orange-50 p-2 rounded border-l-2 border-orange-200">
                              {report.complaint}
                            </div>
                          ))}
                          {(case_.reports || []).length > 2 && (
                            <div className="text-xs text-muted-foreground">
                              +{(case_.reports || []).length - 2} more reports...
                            </div>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <AlertTriangle className="h-4 w-4 text-orange-500" />
                        <span className="font-medium">{(case_.reports || []).filter(r => r.status === 'active').length}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className={`font-medium ${case_.avgRating < 3.5 ? 'text-red-600' : 'text-green-600'}`}>
                        {case_.avgRating.toFixed(1)}
                      </span>
                    </TableCell>
                    <TableCell>{getSeverityBadge(case_.severity)}</TableCell>
                    <TableCell>{getStatusBadge(case_.status)}</TableCell>
                    <TableCell>
                      <div>
                        <div>{new Date(case_.reportedDate).toLocaleDateString()}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {case_.status === "resolved" ? (
                        <div className="text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            Case Resolved
                          </div>
                        </div>
                      ) : (
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <Dialog>
                              <DialogTrigger asChild>
                                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                  <Eye className="h-4 w-4 mr-2" />
                                  View Reports
                                </DropdownMenuItem>
                              </DialogTrigger>
                              <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                                <DialogHeader>
                                  <DialogTitle>Individual Reports for {case_.advisor.name}</DialogTitle>
                                </DialogHeader>
                                <div className="space-y-4">
                                  {(case_.reports || []).map((report) => (
                                    <div key={report.id} className="border rounded-lg p-4 space-y-3">
                                      <div className="flex justify-between items-start">
                                        <div className="space-y-1">
                                          <div className="text-sm font-medium">Report #{report.id}</div>
                                           <div className="text-xs text-muted-foreground">
                                             User: {report.userName} | Contact: {report.userContact} | Date: {new Date(report.reportDate).toLocaleDateString()}
                                           </div>
                                        </div>
                                        <Badge className={report.status === 'resolved' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}>
                                          {report.status}
                                        </Badge>
                                      </div>
                                      <div className="text-sm bg-gray-50 p-3 rounded">
                                        <strong>Complaint:</strong> {report.complaint}
                                      </div>
                                      {report.resolutionNote && (
                                        <div className="text-sm bg-green-50 p-3 rounded border-l-4 border-green-200">
                                          <strong>Resolution:</strong> {report.resolutionNote}
                                        </div>
                                      )}
                                      {report.status === 'active' && (
                                        <div className="flex gap-2">
                                          <AlertDialog>
                                            <AlertDialogTrigger asChild>
                                              <Button size="sm" variant="outline" className="text-green-600 border-green-200">
                                                <CheckCircle className="h-4 w-4 mr-1" />
                                                Resolve This Report
                                              </Button>
                                            </AlertDialogTrigger>
                                            <AlertDialogContent>
                                              <AlertDialogHeader>
                                                <AlertDialogTitle>Resolve Report #{report.id}</AlertDialogTitle>
                                                <AlertDialogDescription>
                                                  Are you sure you want to resolve this specific report? You'll need to provide a resolution note.
                                                </AlertDialogDescription>
                                              </AlertDialogHeader>
                                              <div className="space-y-4">
                                                <div>
                                                  <Label htmlFor="resolution-note">Resolution note (required)</Label>
                                                  <Textarea
                                                    id="resolution-note"
                                                    placeholder="Explain why this report is being resolved..."
                                                    value={resolutionNote}
                                                    onChange={(e) => setResolutionNote(e.target.value)}
                                                  />
                                                </div>
                                              </div>
                                              <AlertDialogFooter>
                                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                <AlertDialogAction 
                                                  onClick={() => handleResolveReport(report.id)}
                                                  className="bg-green-600 hover:bg-green-700"
                                                  disabled={!resolutionNote.trim()}
                                                >
                                                  Resolve Report
                                                </AlertDialogAction>
                                              </AlertDialogFooter>
                                            </AlertDialogContent>
                                          </AlertDialog>
                                        </div>
                                      )}
                                    </div>
                                  ))}
                                </div>
                              </DialogContent>
                            </Dialog>

                          </DropdownMenuContent>
                        </DropdownMenu>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Cases</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">
              Requiring immediate attention
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Suspended Advisors</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              Currently suspended
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Blacklisted</CardTitle>
            <Ban className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">
              Permanently banned
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};