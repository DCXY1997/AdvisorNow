-- Add missing UPDATE policy for admin to approve/reject registrations
CREATE POLICY "Anyone can update agent registration status" 
ON public.agent_registrations 
FOR UPDATE 
USING (true);