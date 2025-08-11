-- Clear all test data again for fresh testing
DELETE FROM public.advisors;
DELETE FROM public.agent_registrations;
DELETE FROM auth.users WHERE email LIKE '%@gmail.com' OR email LIKE '%test%';