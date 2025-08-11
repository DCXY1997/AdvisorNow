-- Create agent registrations table
CREATE TABLE public.agent_registrations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  representative_code TEXT NOT NULL,
  financial_institution TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.agent_registrations ENABLE ROW LEVEL SECURITY;

-- Create policies for agent registrations
CREATE POLICY "Anyone can create agent registration" 
ON public.agent_registrations 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Users can view their own registration" 
ON public.agent_registrations 
FOR SELECT 
USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_agent_registrations_updated_at
BEFORE UPDATE ON public.agent_registrations
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();