-- Confirm email verification for both users
UPDATE auth.users 
SET email_confirmed_at = NOW()
WHERE email IN ('christinetan206@gmail.com', 'young97@live.com.sg') 
  AND email_confirmed_at IS NULL;