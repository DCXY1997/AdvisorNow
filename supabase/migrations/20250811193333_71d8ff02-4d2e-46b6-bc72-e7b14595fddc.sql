-- Create auth user for approved advisor
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
  gen_random_uuid(),
  'authenticated',
  'authenticated',
  'christinetan206@gmail.com',
  crypt('Solorien2309$', gen_salt('bf')),
  NOW(),
  NULL,
  NULL,
  '{"provider":"email","providers":["email"]}',
  '{}',
  NOW(),
  NOW(),
  '',
  '',
  '',
  ''
);

-- Update advisor record with the new user_id
UPDATE public.advisors 
SET user_id = (
  SELECT id FROM auth.users WHERE email = 'christinetan206@gmail.com' LIMIT 1
)
WHERE email = 'christinetan206@gmail.com' AND user_id IS NULL;