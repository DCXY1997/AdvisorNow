import { supabase } from "@/integrations/supabase/client";

export const logout = async () => {
  try {
    // Sign out from Supabase which clears the session
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      console.error('Error during logout:', error);
      throw error;
    }
    
    // Clear any localStorage data that might be cached
    localStorage.clear();
    
    // Force redirect to home page
    window.location.href = '/';
    
  } catch (error) {
    console.error('Logout failed:', error);
    // Even if there's an error, still redirect to home
    window.location.href = '/';
  }
};