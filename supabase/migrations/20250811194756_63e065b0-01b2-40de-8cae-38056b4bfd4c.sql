-- Fix the user_id mapping - link Christine to her auth account and clear Darren's link
UPDATE public.advisors 
SET user_id = '02902e78-61b3-4b86-a91a-f863da0c00ba'
WHERE email = 'christinetan206@gmail.com';

-- Clear Darren's user_id since he should link to his own auth account later
UPDATE public.advisors 
SET user_id = NULL
WHERE email = 'young97@live.com.sg';