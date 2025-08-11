-- Create storage bucket for advisor profile photos
INSERT INTO storage.buckets (id, name, public) VALUES ('advisor-profiles', 'advisor-profiles', true);

-- Create RLS policies for advisor profile photos
CREATE POLICY "Advisors can view all profile photos" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'advisor-profiles');

CREATE POLICY "Advisors can upload their own profile photo" 
ON storage.objects 
FOR INSERT 
WITH CHECK (
  bucket_id = 'advisor-profiles' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Advisors can update their own profile photo" 
ON storage.objects 
FOR UPDATE 
USING (
  bucket_id = 'advisor-profiles' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Advisors can delete their own profile photo" 
ON storage.objects 
FOR DELETE 
USING (
  bucket_id = 'advisor-profiles' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);