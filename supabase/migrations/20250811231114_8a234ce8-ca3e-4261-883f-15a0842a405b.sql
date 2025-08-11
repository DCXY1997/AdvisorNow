-- Add approval_notes column to agent_registrations table
ALTER TABLE public.agent_registrations 
ADD COLUMN approval_notes text;