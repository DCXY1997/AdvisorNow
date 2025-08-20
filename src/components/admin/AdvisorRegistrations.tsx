import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Check, X, Mail, Building, Hash } from 'lucide-react';

interface PendingAdvisor {
  id: string;
  full_name: string;
  email: string;
  representative_code: string;
  financial_institution: string;
  created_at: string;
}

export const AdvisorRegistrations = () => {
  const [pendingAdvisors, setPendingAdvisors] = useState<PendingAdvisor[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchPendingAdvisors();
  }, []);

  const fetchPendingAdvisors = async () => {
    try {
      const { data, error } = await supabase
        .from('advisors')
        .select('id, full_name, email, representative_code, financial_institution, created_at')
        .eq('status', 'pending')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPendingAdvisors(data || []);
    } catch (error) {
      console.error('Error fetching pending advisors:', error);
      toast({
        title: "Error",
        description: "Failed to load pending registrations.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (advisorId: string) => {
    setActionLoading(advisorId);
    
    try {
      // Update advisor status to inactive (awaiting email confirmation)
      const { error } = await supabase
        .from('advisors')
        .update({ 
          status: 'inactive',
          approved_at: new Date().toISOString()
        })
        .eq('id', advisorId);

      if (error) throw error;

      toast({
        title: "Advisor Approved",
        description: "Email confirmation will be sent to the advisor.",
      });

      // Refresh the list
      fetchPendingAdvisors();
      
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
    setActionLoading(advisorId);
    
    try {
      const { error } = await supabase
        .from('advisors')
        .update({ 
          status: 'rejected',
          rejection_reason: 'Application rejected by admin'
        })
        .eq('id', advisorId);

      if (error) throw error;

      toast({
        title: "Advisor Rejected",
        description: "Registration has been rejected.",
      });

      // Refresh the list
      fetchPendingAdvisors();
      
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

  if (loading) {
    return (
      <Card>
        <CardContent className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="text-sm text-muted-foreground mt-2">Loading registrations...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Advisor Registrations</h2>
        <Badge variant="secondary">
          {pendingAdvisors.length} pending
        </Badge>
      </div>

      {pendingAdvisors.length === 0 ? (
        <Card>
          <CardContent className="text-center py-8">
            <p className="text-muted-foreground">No pending registrations</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {pendingAdvisors.map((advisor) => (
            <Card key={advisor.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{advisor.full_name}</CardTitle>
                  <Badge variant="outline">Pending Review</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{advisor.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Hash className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{advisor.representative_code}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Building className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{advisor.financial_institution}</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Applied: {new Date(advisor.created_at).toLocaleDateString()}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    onClick={() => handleApprove(advisor.id)}
                    disabled={actionLoading === advisor.id}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <Check className="h-4 w-4 mr-2" />
                    {actionLoading === advisor.id ? 'Approving...' : 'Approve'}
                  </Button>
                  <Button
                    onClick={() => handleReject(advisor.id)}
                    disabled={actionLoading === advisor.id}
                    variant="destructive"
                  >
                    <X className="h-4 w-4 mr-2" />
                    {actionLoading === advisor.id ? 'Rejecting...' : 'Reject'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};