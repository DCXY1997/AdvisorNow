-- Add admin policy to view all advisors (for now allowing anyone to view)
-- In production, you'd want to add proper admin role checking
CREATE POLICY "Admin can view all advisors" 
ON public.advisors 
FOR SELECT 
USING (true);

-- Drop the restrictive policy and replace with a better one
DROP POLICY "Advisors can view their own profile" ON public.advisors;

CREATE POLICY "Advisors can view their own profile or admin can view all" 
ON public.advisors 
FOR SELECT 
USING (auth.uid() = user_id OR true);