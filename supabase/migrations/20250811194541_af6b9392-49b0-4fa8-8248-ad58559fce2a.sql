-- Link the existing advisor record to the auth user
UPDATE public.advisors 
SET user_id = (
  SELECT id FROM auth.users WHERE email = 'young97@live.com.sg' LIMIT 1
)
WHERE email = 'young97@live.com.sg' AND user_id IS NULL;