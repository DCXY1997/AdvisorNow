-- Add profile-related columns to advisors table
ALTER TABLE public.advisors 
ADD COLUMN contact_number TEXT,
ADD COLUMN bio TEXT,
ADD COLUMN credentials TEXT,
ADD COLUMN tagline TEXT,
ADD COLUMN specializations TEXT,
ADD COLUMN profile_image TEXT;