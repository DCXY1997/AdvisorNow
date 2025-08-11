-- Fix the trigger function to handle existing advisor records
CREATE OR REPLACE FUNCTION public.create_advisor_from_registration()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO ''
AS $function$
BEGIN
  -- Only create advisor account when status changes to 'approved'
  IF NEW.status = 'approved' AND OLD.status != 'approved' THEN
    -- Check if advisor record already exists
    IF NOT EXISTS (SELECT 1 FROM public.advisors WHERE email = NEW.email) THEN
      -- Insert into advisors table only if it doesn't exist
      INSERT INTO public.advisors (
        registration_id,
        full_name,
        email,
        representative_code,
        financial_institution,
        user_id
      ) VALUES (
        NEW.id,
        NEW.full_name,
        NEW.email,
        NEW.representative_code,
        NEW.financial_institution,
        NULL  -- Will be set when user first logs in
      );
    END IF;
  END IF;
  
  RETURN NEW;
END;
$function$;