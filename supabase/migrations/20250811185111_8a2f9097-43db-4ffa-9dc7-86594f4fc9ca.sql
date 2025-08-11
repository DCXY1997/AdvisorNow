-- Update advisor status logic based on subscription
-- For now, set existing advisors to inactive since they don't have subscriptions yet
UPDATE public.advisors 
SET status = 'inactive' 
WHERE status = 'active';

-- Add subscription column to advisors table
ALTER TABLE public.advisors 
ADD COLUMN subscription TEXT DEFAULT NULL;