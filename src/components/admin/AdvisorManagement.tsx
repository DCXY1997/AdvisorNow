import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Search, MoreHorizontal } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

interface Advisor {
  id: string;
  full_name: string;
  email: string;
  representative_code: string;
  financial_institution: string;
  status: string;
  subscription_plan: string | null;
  subscription_end_date: string | null;
  created_at: string;
}

export const AdvisorManagement = () => {
  const [advisors, setAdvisors] = useState<Advisor[]>([]);
  const [filteredAdvisors, setFilteredAdvisors] = useState<Advisor[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const { toast } = useToast();

  useEffect(() => {
    fetchAdvisors();
  }, []);

  useEffect(() => {
    filterAdvisors();
  }, [advisors, searchQuery, statusFilter]);

  const fetchAdvisors = async () => {
    try {
      const { data, error } = await supabase
        .from('advisors')
        .select('id, full_name, email, representative_code, financial_institution, status, subscription_plan, subscription_end_date, created_at')
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

  const filterAdvisors = () => {
    let filtered = advisors;

    if (searchQuery) {
      filtered = filtered.filter(advisor => 
        advisor.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        advisor.email.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(advisor => advisor.status === statusFilter);
    }

    setFilteredAdvisors(filtered);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">active</Badge>;
      case 'inactive':
        return <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">inactive</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getSubscriptionInfo = (advisor: Advisor) => {
    if (!advisor.subscription_plan) {
      return 'N/A';
    }
    
    const endDate = advisor.subscription_end_date ? 
      new Date(advisor.subscription_end_date).toLocaleDateString() : 'N/A';
    
    return `${advisor.subscription_plan} (until ${endDate})`;
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Advisor Management</h2>
          <Badge variant="secondary">Loading...</Badge>
        </div>
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Advisor Management</h2>
        <Badge variant="secondary">
          {filteredAdvisors.length} of {advisors.length} advisors
        </Badge>
      </div>

      {/* Search and Filter */}
      <div className="flex gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className="border rounded-lg">
        {/* Table Header */}
        <div className="grid grid-cols-12 gap-4 p-4 border-b bg-muted/50 font-medium text-sm">
          <div className="col-span-2">Advisor</div>
          <div className="col-span-2">Contact</div>
          <div className="col-span-2">Rep Code</div>
          <div className="col-span-2">Institution</div>
          <div className="col-span-1">Status</div>
          <div className="col-span-2">Subscription</div>
          <div className="col-span-1 text-center">Actions</div>
        </div>

        {/* Table Body */}
        {filteredAdvisors.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            No advisors found
          </div>
        ) : (
          filteredAdvisors.map((advisor) => (
            <div key={advisor.id} className="grid grid-cols-12 gap-4 p-4 border-b last:border-b-0 hover:bg-muted/30">
              {/* Advisor Info */}
              <div className="col-span-2">
                <div className="font-medium">{advisor.full_name}</div>
                <div className="text-sm text-muted-foreground">
                  Joined {new Date(advisor.created_at).toLocaleDateString()}
                </div>
              </div>

              {/* Contact */}
              <div className="col-span-2">
                <div className="text-sm">{advisor.email}</div>
              </div>

              {/* Rep Code */}
              <div className="col-span-2">
                <div className="text-sm font-mono">{advisor.representative_code}</div>
              </div>

              {/* Institution */}
              <div className="col-span-2">
                <div className="text-sm">{advisor.financial_institution}</div>
              </div>

              {/* Status */}
              <div className="col-span-1">
                {getStatusBadge(advisor.status)}
              </div>

              {/* Subscription */}
              <div className="col-span-2">
                <div className="text-sm">{getSubscriptionInfo(advisor)}</div>
              </div>

              {/* Actions */}
              <div className="col-span-1 flex justify-center">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>View Profile</DropdownMenuItem>
                    <DropdownMenuItem>View Calls</DropdownMenuItem>
                    <DropdownMenuItem>Suspend</DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">Deactivate</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};