-- Clear all test data to allow fresh testing
DELETE FROM public.advisors;
DELETE FROM public.agent_registrations;
DELETE FROM auth.users WHERE email LIKE '%@gmail.com' OR email LIKE '%test%';