import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Search, Check, X, MoreHorizontal } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

interface PendingAdvisor {
  id: string;
  full_name: string;
  email: string;
  representative_code: string;
  financial_institution: string;
  status: string;
  created_at: string;
}

export const AdvisorRegistrations = () => {
  const [advisors, setAdvisors] = useState<PendingAdvisor[]>([]);
  const [filteredAdvisors, setFilteredAdvisors] = useState<PendingAdvisor[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('pending');
  const { toast } = useToast();

  useEffect(() => {
    fetchAdvisors();
  }, [statusFilter]);

  useEffect(() => {
    filterAdvisors();
  }, [advisors, searchQuery, statusFilter]);

  const fetchAdvisors = async () => {
    try {
      let query = supabase
        .from('advisors')
        .select('id, full_name, email, representative_code, financial_institution, status, created_at')
        .order('created_at', { ascending: false });

      // Filter by status
      if (statusFilter !== 'all') {
        query = query.eq('status', statusFilter);
      } else {
        // For registration tab, we want pending, approved, and rejected (not active)
        query = query.in('status', ['pending', 'approved', 'rejected']);
      }

      const { data, error } = await query;

      if (error) throw error;
      setAdvisors(data || []);
    } catch (error) {
      console.error('Error fetching advisors:', error);
      toast({
        title: "Error",
        description: "Failed to load advisor registrations.",
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

    setFilteredAdvisors(filtered);
  };

  const handleApprove = async (advisorId: string) => {
    setActionLoading(advisorId);
    
    try {
      const { error } = await supabase
        .from('advisors')
        .update({ 
          status: 'inactive', // approved but not active until subscription
          approved_at: new Date().toISOString()
        })
        .eq('id', advisorId);

      if (error) throw error;

      toast({
        title: "Advisor Approved! ✅",
        description: "Email confirmation will be sent to the advisor.",
      });

      fetchAdvisors();
      
    } catch (error) {
      console.error('Error approving advisor:', error);
      toast({
        title: "Error",
        description: "Failed to approve advisor.",
        variant: "destructive",
      });
    } finally {
      setActionLoading(null);
    }
  };

  const handleReject = async (advisorId: string) => {
    const reason = prompt("Please provide a reason for rejection:");
    if (!reason) return;

    setActionLoading(advisorId);
    
    try {
      const { error } = await supabase
        .from('advisors')
        .update({ 
          status: 'rejected',
          rejection_reason: reason
        })
        .eq('id', advisorId);

      if (error) throw error;

      toast({
        title: "Advisor Rejected",
        description: "Registration has been rejected.",
      });

      fetchAdvisors();
      
    } catch (error) {
      console.error('Error rejecting advisor:', error);
      toast({
        title: "Error",
        description: "Failed to reject advisor.",
        variant: "destructive",
      });
    } finally {
      setActionLoading(null);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">pending</Badge>;
      case 'approved':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">approved</Badge>;
      case 'rejected':
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">rejected</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const pendingCount = advisors.filter(a => a.status === 'pending').length;

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Advisor Registrations</h2>
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
        <h2 className="text-2xl font-bold">Advisor Registrations</h2>
        <Badge variant="secondary">
          {pendingCount} pending
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
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
            <SelectItem value="all">All Status</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className="border rounded-lg">
        {/* Table Header */}
        <div className="grid grid-cols-12 gap-4 p-4 border-b bg-muted/50 font-medium text-sm">
          <div className="col-span-3">Advisor</div>
          <div className="col-span-2">Contact</div>
          <div className="col-span-2">Rep Code</div>
          <div className="col-span-2">Institution</div>
          <div className="col-span-2">Status</div>
          <div className="col-span-1 text-center">Actions</div>
        </div>

        {/* Table Body */}
        {filteredAdvisors.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            {statusFilter === 'pending' ? 'No pending registrations' : 'No advisors found'}
          </div>
        ) : (
          filteredAdvisors.map((advisor) => (
            <div key={advisor.id} className="grid grid-cols-12 gap-4 p-4 border-b last:border-b-0 hover:bg-muted/30">
              {/* Advisor Info */}
              <div className="col-span-3">
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
              <div className="col-span-2">
                {getStatusBadge(advisor.status)}
              </div>

              {/* Actions */}
              <div className="col-span-1 flex justify-center">
                {advisor.status === 'pending' ? (
                  <div className="flex gap-1">
                    <Button
                      size="sm"
                      onClick={() => handleApprove(advisor.id)}
                      disabled={actionLoading === advisor.id}
                      className="h-8 w-8 p-0 bg-green-600 hover:bg-green-700"
                    >
                      <Check className="h-3 w-3" />
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleReject(advisor.id)}
                      disabled={actionLoading === advisor.id}
                      className="h-8 w-8 p-0"
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ) : (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-3 w-3" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                      <DropdownMenuItem>Contact Advisor</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};