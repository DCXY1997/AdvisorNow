-- Update the trigger function to automatically create auth user when approving registration
CREATE OR REPLACE FUNCTION public.create_advisor_from_registration()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO ''
AS $function$
DECLARE
  new_user_id uuid;
BEGIN
  -- Only create advisor account when status changes to 'approved'
  IF NEW.status = 'approved' AND OLD.status != 'approved' THEN
    -- First create the auth user account
    INSERT INTO auth.users (
      instance_id,
      id,
      aud,
      role,
      email,
      encrypted_password,
      email_confirmed_at,
      raw_app_meta_data,
      raw_user_meta_data,
      created_at,
      updated_at,
      confirmation_token,
      email_change,
      email_change_token_new,
      recovery_token
    ) VALUES (
      '00000000-0000-0000-0000-000000000000',
      gen_random_uuid(),
      'authenticated',
      'authenticated',
      NEW.email,
      crypt(NEW.password, gen_salt('bf')),
      NOW(),
      '{}',
      '{}',
      NOW(),
      NOW(),
      '',
      '',
      '',
      ''
    ) RETURNING id INTO new_user_id;

    -- Then insert into advisors table with the new user_id
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
      new_user_id
    );
  END IF;
  
  RETURN NEW;
END;
$function$;