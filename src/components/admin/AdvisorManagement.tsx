import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Filter, Eye, MoreHorizontal, Star, History, Ban, UserX } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const AdvisorManagement = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("name");
  const [statusFilter, setStatusFilter] = useState("all");
  const [advisors, setAdvisors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch approved advisors from Supabase
  useEffect(() => {
    const fetchAdvisors = async () => {
      try {
        const { data, error } = await supabase
          .from('advisors')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          throw error;
        }

        setAdvisors(data || []);
      } catch (error: any) {
        toast({
          title: "Error Loading Advisors",
          description: error.message || "Failed to load advisor data",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchAdvisors();
  }, [toast]);

  const filteredAdvisors = advisors.filter(advisor => {
    const matchesSearch = () => {
      const term = searchTerm.toLowerCase();
      switch (searchType) {
        case "name":
          return advisor.full_name?.toLowerCase().includes(term) || false;
        case "email":
          return advisor.email?.toLowerCase().includes(term) || false;
        case "representative":
          return advisor.representative_code?.toLowerCase().includes(term) || false;
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
        {subscription || "N/A"}
      </Badge>
    );
  };

  const getInitials = (name: string) => {
    return name ? name.split(' ').map(n => n[0]).join('').toUpperCase() : 'NA';
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <div className="text-muted-foreground">Loading advisor data...</div>
        </CardContent>
      </Card>
    );
  }

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
                  <SelectItem value="representative">Representative</SelectItem>
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
                  <TableHead>Rep Code</TableHead>
                  <TableHead>Institution</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Subscription</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAdvisors.map((advisor) => (
                  <TableRow key={advisor.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={advisor.profile_image || ""} />
                          <AvatarFallback>
                            {getInitials(advisor.full_name)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{advisor.full_name}</div>
                          <div className="text-sm text-muted-foreground">
                            Joined {new Date(advisor.created_at).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">{advisor.email}</div>
                      {advisor.contact_number && (
                        <div className="text-xs text-muted-foreground">{advisor.contact_number}</div>
                      )}
                    </TableCell>
                    <TableCell>
                      <code className="text-xs bg-muted px-2 py-1 rounded">
                        {advisor.representative_code}
                      </code>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">{advisor.financial_institution}</div>
                    </TableCell>
                    <TableCell>{getStatusBadge(advisor.status)}</TableCell>
                    <TableCell>{getSubscriptionBadge(advisor.subscription)}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-background border shadow-lg z-50">
                          <DropdownMenuItem 
                            onClick={() => navigate("/advisor-full-review", { state: { advisor } })}
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <History className="h-4 w-4 mr-2" />
                            View Call History
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            <Ban className="h-4 w-4 mr-2" />
                            {advisor.status === "suspended" ? "Reactivate" : "Suspend"}
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-700">
                            <UserX className="h-4 w-4 mr-2" />
                            Remove Advisor
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
              {advisors.length === 0 
                ? "No advisors have been approved yet." 
                : "No advisors found matching your search criteria."
              }
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};