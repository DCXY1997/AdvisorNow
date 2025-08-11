-- Check if trigger exists and create it if it doesn't
DROP TRIGGER IF EXISTS on_agent_registration_approved ON public.agent_registrations;

-- Create the trigger that calls our function when a registration is approved
CREATE TRIGGER on_agent_registration_approved
  AFTER UPDATE ON public.agent_registrations
  FOR EACH ROW
  WHEN (NEW.status = 'approved' AND OLD.status != 'approved')
  EXECUTE FUNCTION public.create_advisor_from_registration();