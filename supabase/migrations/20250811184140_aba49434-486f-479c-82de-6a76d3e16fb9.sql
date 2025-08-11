-- Add approval tracking fields to agent_registrations
ALTER TABLE public.agent_registrations 
ADD COLUMN approved_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN approved_by TEXT,
ADD COLUMN rejection_reason TEXT;

-- Update existing approved records to have approval timestamp
UPDATE public.agent_registrations 
SET approved_at = updated_at 
WHERE status = 'approved' AND approved_at IS NULL;