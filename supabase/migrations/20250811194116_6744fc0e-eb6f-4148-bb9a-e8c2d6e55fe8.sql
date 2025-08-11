-- Fix the trigger function - the auth.users insert was too complex
-- Let's simplify and use Supabase's built-in auth functions approach
CREATE OR REPLACE FUNCTION public.create_advisor_from_registration()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO ''
AS $function$
BEGIN
  -- Only create advisor account when status changes to 'approved'
  IF NEW.status = 'approved' AND OLD.status != 'approved' THEN
    -- Just insert into advisors table for now
    -- The auth user creation will be handled separately
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
      NULL  -- Will be set when user first logs in via the signup process
    );
  END IF;
  
  RETURN NEW;
END;
$function$;