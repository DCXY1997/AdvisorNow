import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Filter, Eye, MoreHorizontal, Star, Phone, Calendar, Award, Building2, History, Ban, UserX } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export const AdvisorManagement = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("name");
  const [statusFilter, setStatusFilter] = useState("all");
  const [advisors, setAdvisors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch advisors from database
  useEffect(() => {
    fetchAdvisors();
  }, []);

  const fetchAdvisors = async () => {
    try {
      setLoading(true);
      console.log("Fetching advisors...");
      const { data, error } = await supabase
        .from('advisors')
        .select('*')
        .order('created_at', { ascending: false });

      console.log("Advisors data:", data);
      console.log("Advisors error:", error);

      if (error) {
        console.error("Error fetching advisors:", error);
        toast({
          title: "Error",
          description: "Failed to fetch advisors",
          variant: "destructive",
        });
        return;
      }

      setAdvisors(data || []);
    } catch (error) {
      console.error("Catch error:", error);
      toast({
        title: "Error",
        description: "Failed to fetch advisors",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredAdvisors = advisors.filter(advisor => {
    const matchesSearch = () => {
      const term = searchTerm.toLowerCase();
      switch (searchType) {
        case "name":
          return advisor.full_name.toLowerCase().includes(term);
        case "email":
          return advisor.email.toLowerCase().includes(term);
        case "representative":
          return advisor.representative_code.toLowerCase().includes(term);
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
                  <TableHead>Rep Number</TableHead>
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
                          <AvatarFallback>
                            {advisor.full_name.split(' ').map((n: string) => n[0]).join('')}
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
                    </TableCell>
                    <TableCell>
                      <code className="text-xs bg-muted px-2 py-1 rounded">
                        {advisor.representative_code}
                      </code>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">N/A</span>
                        <span className="text-sm text-muted-foreground">
                          (0)
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(advisor.status)}</TableCell>
                    <TableCell>
                      <Badge className="bg-blue-100 text-blue-700 border-blue-200">
                        Basic
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span className="font-medium">0</span>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-white dark:bg-gray-800 border shadow-lg z-50">
                          <DropdownMenuItem 
                            onClick={() => navigate("/advisor-full-review", { state: { advisor } })}
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            View Advisor
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
                            Blacklist Advisor
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