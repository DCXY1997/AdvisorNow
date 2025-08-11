-- Fix Darren's advisor record to link to his current auth session
UPDATE public.advisors 
SET user_id = '811b9841-d5a3-4fde-9487-2d4b1041da52'
WHERE email = 'young97@live.com.sg';