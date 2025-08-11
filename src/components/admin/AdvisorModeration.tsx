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
import { Shield, Ban, AlertTriangle, Users, Settings, CheckCircle, Filter } from "lucide-react";

export const AdvisorModeration = () => {
  const [advisorLimit, setAdvisorLimit] = useState("1500");
  const [suspensionReason, setSuspensionReason] = useState("");
  const [resolutionNote, setResolutionNote] = useState("");
  const [caseFilter, setCaseFilter] = useState("active");

  // Mock data for advisors requiring moderation
  const allModerationCases = [
    {
      id: "1",
      advisor: {
        name: "Jennifer Davis",
        email: "jennifer.davis@email.com",
        licenseCode: "FP-2024-003",
        avatar: ""
      },
      issue: "Low ratings",
      description: "Consistently receiving ratings below 3.0 stars (15+ reviews)",
      reportCount: 15,
      avgRating: 2.8,
      status: "under_review",
      reportedDate: "2024-01-25",
      severity: "medium",
      resolvedDate: null,
      resolutionNote: null
    },
    {
      id: "2", 
      advisor: {
        name: "Alex Thompson",
        email: "alex.thompson@email.com",
        licenseCode: "FP-2024-015",
        avatar: ""
      },
      issue: "Inappropriate conduct",
      description: "Multiple reports of unprofessional behavior during consultations",
      reportCount: 5,
      avgRating: 3.1,
      status: "flagged",
      reportedDate: "2024-01-28",
      severity: "high",
      resolvedDate: null,
      resolutionNote: null
    },
    {
      id: "3",
      advisor: {
        name: "Sarah Wilson",
        email: "sarah.wilson@email.com",
        licenseCode: "FP-2024-012",
        avatar: ""
      },
      issue: "False complaint reports",
      description: "Investigation revealed reports were false accusations from competitor",
      reportCount: 8,
      avgRating: 4.3,
      status: "resolved",
      reportedDate: "2024-01-15",
      severity: "low",
      resolvedDate: "2024-01-30",
      resolutionNote: "After thorough investigation, all reports were determined to be false accusations. Advisor cleared of all charges."
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

  const handleResolveCase = (advisorId: string) => {
    console.log(`Resolving case ${advisorId} with note: ${resolutionNote}`);
    setResolutionNote("");
    // Here you would make API call to resolve the case and update status
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
            Advisor Moderation Cases
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
                      <div>
                        <div className="font-medium">{case_.issue}</div>
                        <div className="text-sm text-muted-foreground">
                          {case_.description}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <AlertTriangle className="h-4 w-4 text-orange-500" />
                        <span className="font-medium">{case_.reportCount}</span>
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
                        {case_.resolvedDate && (
                          <div className="text-xs text-green-600">
                            Resolved: {new Date(case_.resolvedDate).toLocaleDateString()}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2 flex-wrap">{case_.status === "resolved" ? (
                          <div className="text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <CheckCircle className="h-4 w-4 text-green-600" />
                              Case Resolved
                            </div>
                            {case_.resolutionNote && (
                              <div className="mt-1 text-xs bg-green-50 p-2 rounded border-l-2 border-green-200">
                                {case_.resolutionNote}
                              </div>
                            )}
                          </div>
                        ) : (
                          <>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="outline" size="sm" className="text-green-600 border-green-200 hover:bg-green-50">
                                  <CheckCircle className="h-4 w-4 mr-1" />
                                  Resolve
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Resolve Case</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Are you sure you want to resolve the case for {case_.advisor.name}? This will mark the case as resolved and remove it from active moderation.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <div className="space-y-4">
                                  <div>
                                    <Label htmlFor="resolution-note">Resolution note (required)</Label>
                                    <Textarea
                                      id="resolution-note"
                                      placeholder="Enter the reason for resolution (e.g., false report, advisor corrected issue, etc.)..."
                                      value={resolutionNote}
                                      onChange={(e) => setResolutionNote(e.target.value)}
                                    />
                                  </div>
                                </div>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction 
                                    onClick={() => handleResolveCase(case_.id)}
                                    className="bg-green-600 hover:bg-green-700"
                                    disabled={!resolutionNote.trim()}
                                  >
                                    Resolve Case
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>

                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="outline" size="sm">
                                  <Shield className="h-4 w-4 mr-1" />
                                  Suspend
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Suspend Advisor</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Are you sure you want to suspend {case_.advisor.name}? They will not be able to take new consultations until reactivated.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <div className="space-y-4">
                                  <div>
                                    <Label htmlFor="suspension-reason">Reason for suspension</Label>
                                    <Textarea
                                      id="suspension-reason"
                                      placeholder="Enter the reason for suspension..."
                                      value={suspensionReason}
                                      onChange={(e) => setSuspensionReason(e.target.value)}
                                    />
                                  </div>
                                </div>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction 
                                    onClick={() => handleSuspendAdvisor(case_.id)}
                                    className="bg-orange-600 hover:bg-orange-700"
                                  >
                                    Suspend Advisor
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>

                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="destructive" size="sm">
                                  <Ban className="h-4 w-4 mr-1" />
                                  Blacklist
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Blacklist Advisor</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Are you sure you want to blacklist {case_.advisor.name}? This action is permanent and cannot be undone. The advisor will be permanently banned from the platform.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction 
                                    onClick={() => handleBlacklistAdvisor(case_.id)}
                                    className="bg-red-600 hover:bg-red-700"
                                  >
                                    Blacklist Advisor
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </>
                        )}
                      </div>
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