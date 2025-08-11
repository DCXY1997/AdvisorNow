-- Create advisors table for approved registrations
CREATE TABLE public.advisors (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  registration_id UUID REFERENCES public.agent_registrations(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  representative_code TEXT NOT NULL,
  financial_institution TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.advisors ENABLE ROW LEVEL SECURITY;

-- Create policies for advisors table
CREATE POLICY "Advisors can view their own profile" 
ON public.advisors 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Advisors can update their own profile" 
ON public.advisors 
FOR UPDATE 
USING (auth.uid() = user_id);

-- Create trigger for automatic timestamp updates on advisors
CREATE TRIGGER update_advisors_updated_at
BEFORE UPDATE ON public.advisors
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Function to create advisor account when registration is approved
CREATE OR REPLACE FUNCTION public.create_advisor_from_registration()
RETURNS TRIGGER AS $$
BEGIN
  -- Only create advisor account when status changes to 'approved'
  IF NEW.status = 'approved' AND OLD.status != 'approved' THEN
    -- Insert into advisors table (user_id will be set when they first login)
    INSERT INTO public.advisors (
      registration_id,
      full_name,
      email,
      representative_code,
      financial_institution
    ) VALUES (
      NEW.id,
      NEW.full_name,
      NEW.email,
      NEW.representative_code,
      NEW.financial_institution
    );
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = '';

-- Create trigger to automatically create advisor when registration is approved
CREATE TRIGGER create_advisor_on_approval
AFTER UPDATE ON public.agent_registrations
FOR EACH ROW
EXECUTE FUNCTION public.create_advisor_from_registration();