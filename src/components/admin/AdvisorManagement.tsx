import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Search, MoreHorizontal, Users } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

interface Advisor {
  id: string;
  full_name: string;
  email: string;
  representative_code: string;
  financial_institution: string;
  status: string;
  subscription_plan: string | null;
  created_at: string;
}

export const AdvisorManagement = () => {
  const [advisors, setAdvisors] = useState<Advisor[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const { toast } = useToast();

  useEffect(() => {
    fetchAdvisors();
  }, []);

  const fetchAdvisors = async () => {
    try {
      const { data, error } = await supabase
        .from('advisors')
        .select('id, full_name, email, representative_code, financial_institution, status, subscription_plan, created_at')
        .in('status', ['inactive', 'active']) // Only show approved advisors
        .order('created_at', { ascending: false });

      if (error) throw error;
      setAdvisors(data || []);
    } catch (error) {
      console.error('Error fetching advisors:', error);
      toast({
        title: "Error",
        description: "Failed to load advisors.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredAdvisors = advisors.filter(advisor => {
    const matchesSearch = advisor.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         advisor.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All Status' || advisor.status === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800">active</Badge>;
      case 'inactive':
        return <Badge className="bg-yellow-100 text-yellow-800">inactive</Badge>;
      case 'rejected':
        return <Badge className="bg-red-100 text-red-800">rejected</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-sm text-muted-foreground">Loading advisors...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Advisor Management</h2>
        <div className="text-sm text-muted-foreground">
          {filteredAdvisors.length} of {advisors.length} advisors
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All Status">All Status</SelectItem>
            <SelectItem value="Active">Active</SelectItem>
            <SelectItem value="Inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Advisors Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b">
                <tr className="text-left">
                  <th className="p-4 font-medium text-muted-foreground">Advisor</th>
                  <th className="p-4 font-medium text-muted-foreground">Contact</th>
                  <th className="p-4 font-medium text-muted-foreground">Rep Code</th>
                  <th className="p-4 font-medium text-muted-foreground">Institution</th>
                  <th className="p-4 font-medium text-muted-foreground">Status</th>
                  <th className="p-4 font-medium text-muted-foreground">Subscription</th>
                  <th className="p-4 font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredAdvisors.map((advisor) => (
                  <tr key={advisor.id} className="border-b hover:bg-muted/50">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium">
                          {advisor.representative_code.substring(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <div className="font-medium">{advisor.full_name}</div>
                          <div className="text-sm text-muted-foreground">
                            Joined {new Date(advisor.created_at).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-sm">{advisor.email}</td>
                    <td className="p-4 text-sm font-mono">{advisor.representative_code}</td>
                    <td className="p-4 text-sm">{advisor.financial_institution}</td>
                    <td className="p-4">{getStatusBadge(advisor.status)}</td>
                    <td className="p-4 text-sm">{advisor.subscription_plan || 'N/A'}</td>
                    <td className="p-4">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>Edit Profile</DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">Suspend</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredAdvisors.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              No advisors found
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};