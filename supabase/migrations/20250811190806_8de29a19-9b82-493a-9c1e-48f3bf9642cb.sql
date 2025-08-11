-- Create auth user account for the approved advisor
-- Get the password from agent_registrations and create auth user
DO $$
DECLARE
    registration_rec RECORD;
    new_user_id UUID;
BEGIN
    -- Get the registration details
    SELECT * INTO registration_rec 
    FROM public.agent_registrations 
    WHERE email = 'young97@live.com.sg' AND status = 'approved';
    
    IF registration_rec.id IS NOT NULL THEN
        -- Generate a new UUID for the user
        new_user_id := gen_random_uuid();
        
        -- Insert the auth user manually
        INSERT INTO auth.users (
            instance_id,
            id,
            aud,
            role,
            email,
            encrypted_password,
            email_confirmed_at,
            recovery_sent_at,
            last_sign_in_at,
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
            new_user_id,
            'authenticated',
            'authenticated',
            registration_rec.email,
            crypt(registration_rec.password, gen_salt('bf')),
            now(),
            now(),
            now(),
            '{"provider": "email", "providers": ["email"]}',
            '{}',
            now(),
            now(),
            '',
            '',
            '',
            ''
        );
        
        -- Link the auth user to the advisor record
        UPDATE public.advisors 
        SET user_id = new_user_id
        WHERE email = registration_rec.email;
        
        RAISE NOTICE 'Auth user created and linked for email: %', registration_rec.email;
    ELSE
        RAISE NOTICE 'No approved registration found for email: young97@live.com.sg';
    END IF;
END $$;