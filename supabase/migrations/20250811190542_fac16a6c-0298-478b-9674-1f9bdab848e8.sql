-- Add password column to agent_registrations table
ALTER TABLE public.agent_registrations 
ADD COLUMN password TEXT;