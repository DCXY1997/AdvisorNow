import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Filter, Eye, MoreHorizontal, Star } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export const AdvisorManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("name");
  const [statusFilter, setStatusFilter] = useState("all");

  // Mock advisor data
  const advisors = [
    {
      id: "1",
      name: "Dr. Sarah Johnson",
      email: "sarah.johnson@email.com",
      licenseCode: "FP-2024-001",
      rating: 4.8,
      reviewCount: 156,
      status: "active",
      joinDate: "2024-01-15",
      subscription: "Premium",
      totalCalls: 234
    },
    {
      id: "2", 
      name: "Michael Chen",
      email: "michael.chen@email.com",
      licenseCode: "FP-2024-002",
      rating: 4.6,
      reviewCount: 89,
      status: "active",
      joinDate: "2024-02-01",
      subscription: "Basic",
      totalCalls: 156
    },
    {
      id: "3",
      name: "Jennifer Davis",
      email: "jennifer.davis@email.com", 
      licenseCode: "FP-2024-003",
      rating: 3.2,
      reviewCount: 45,
      status: "suspended",
      joinDate: "2024-01-20",
      subscription: "Pro",
      totalCalls: 78
    },
    {
      id: "4",
      name: "Robert Wilson",
      email: "robert.wilson@email.com",
      licenseCode: "FP-2024-004", 
      rating: 4.9,
      reviewCount: 203,
      status: "active",
      joinDate: "2023-12-10",
      subscription: "Premium",
      totalCalls: 345
    }
  ];

  const filteredAdvisors = advisors.filter(advisor => {
    const matchesSearch = () => {
      const term = searchTerm.toLowerCase();
      switch (searchType) {
        case "name":
          return advisor.name.toLowerCase().includes(term);
        case "email":
          return advisor.email.toLowerCase().includes(term);
        case "license":
          return advisor.licenseCode.toLowerCase().includes(term);
        default:
          return true;
      }
    };

    const matchesStatus = statusFilter === "all" || advisor.status === statusFilter;
    
    return matchesSearch() && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-700 border-green-200">Active</Badge>;
      case "suspended":
        return <Badge className="bg-red-100 text-red-700 border-red-200">Suspended</Badge>;
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-700 border-yellow-200">Pending</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getSubscriptionBadge = (subscription: string) => {
    const colorMap: Record<string, string> = {
      "Basic": "bg-blue-100 text-blue-700 border-blue-200",
      "Premium": "bg-purple-100 text-purple-700 border-purple-200", 
      "Pro": "bg-orange-100 text-orange-700 border-orange-200"
    };
    
    return (
      <Badge className={colorMap[subscription] || "bg-gray-100 text-gray-700 border-gray-200"}>
        {subscription}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Advisor Management</span>
            <div className="text-sm font-normal text-muted-foreground">
              {filteredAdvisors.length} of {advisors.length} advisors
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Search and Filter Controls */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex flex-1 gap-2">
              <Select value={searchType} onValueChange={setSearchType}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Name</SelectItem>
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="license">License</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder={`Search by ${searchType}...`}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="flex gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="suspended">Suspended</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Advisors Table */}
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Advisor</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>License</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Subscription</TableHead>
                  <TableHead>Total Calls</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAdvisors.map((advisor) => (
                  <TableRow key={advisor.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src="" />
                          <AvatarFallback>
                            {advisor.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{advisor.name}</div>
                          <div className="text-sm text-muted-foreground">
                            Joined {new Date(advisor.joinDate).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">{advisor.email}</div>
                    </TableCell>
                    <TableCell>
                      <code className="text-xs bg-muted px-2 py-1 rounded">
                        {advisor.licenseCode}
                      </code>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{advisor.rating}</span>
                        <span className="text-sm text-muted-foreground">
                          ({advisor.reviewCount})
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(advisor.status)}</TableCell>
                    <TableCell>{getSubscriptionBadge(advisor.subscription)}</TableCell>
                    <TableCell>
                      <span className="font-medium">{advisor.totalCalls}</span>
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
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            View Reviews
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            View Call History
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            {advisor.status === "suspended" ? "Reactivate" : "Suspend"}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredAdvisors.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No advisors found matching your search criteria.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};