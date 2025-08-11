import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Upload, User, Save, ChevronDown, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { User as SupabaseUser, Session } from '@supabase/supabase-js';

const AgentProfile = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  
  const [profileData, setProfileData] = useState({
    displayName: "",
    email: "",
    contactNumber: "",
    representativeNumber: "",
    financialInstitution: "",
    bio: "",
    credentials: "",
    tagline: "",
    specializations: [] as string[],
    profileImage: ""
  });

  const specializationOptions = [
    "Investment Planning",
    "Insurance Coverage", 
    "Retirement Planning",
    "Education Planning",
    "Wealth Management",
    "Tax Planning",
    "Estate Planning"
  ];

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  const [isUpdating, setIsUpdating] = useState(false);

  // Authentication and data fetching
  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        if (session?.user) {
          fetchAdvisorData(session.user.email!);
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchAdvisorData(session.user.email!);
      } else {
        // Redirect to login if not authenticated
        navigate('/agent-login');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const fetchAdvisorData = async (email: string) => {
    try {
      // First, try to get data from advisors table
      const { data: advisorData, error: advisorError } = await (supabase as any)
        .from('advisors')
        .select('*')
        .eq('email', email)
        .maybeSingle();

      if (advisorData) {
        // Use data from advisors table
        setProfileData({
          displayName: advisorData.full_name || "",
          email: advisorData.email || "",
          contactNumber: advisorData.contact_number || "",
          representativeNumber: advisorData.representative_code || "",
          financialInstitution: advisorData.financial_institution || "",
          bio: advisorData.bio || "",
          credentials: advisorData.credentials || "",
          tagline: advisorData.tagline || "",
          specializations: advisorData.specializations ? advisorData.specializations.split(',').map((s: string) => s.trim()) : [],
          profileImage: advisorData.profile_image || ""
        });
      } else {
        // Fallback to agent_registrations table if not in advisors table yet
        const { data: registrationData, error: regError } = await (supabase as any)
          .from('agent_registrations')
          .select('*')
          .eq('email', email)
          .eq('status', 'approved')
          .maybeSingle();

        if (registrationData) {
          setProfileData({
            displayName: registrationData.full_name || "",
            email: registrationData.email || "",
            contactNumber: "",
            representativeNumber: registrationData.representative_code || "",
            financialInstitution: registrationData.financial_institution || "",
            bio: "",
            credentials: "",
            tagline: "",
            specializations: [],
            profileImage: ""
          });
        }
      }
    } catch (error) {
      console.error('Error fetching advisor data:', error);
      toast({
        title: "Error",
        description: "Failed to load profile data",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSpecializationToggle = (specialization: string) => {
    setProfileData(prev => ({
      ...prev,
      specializations: prev.specializations.includes(specialization)
        ? prev.specializations.filter(s => s !== specialization)
        : [...prev.specializations, specialization]
    }));
  };

  const removeSpecialization = (specialization: string) => {
    setProfileData(prev => ({
      ...prev,
      specializations: prev.specializations.filter(s => s !== specialization)
    }));
  };

  const handleInputChange = (field: keyof typeof profileData, value: string) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // In a real app, you'd upload to a server and get back a URL
      const imageUrl = URL.createObjectURL(file);
      setProfileData(prev => ({ ...prev, profileImage: imageUrl }));
      toast({
        title: "Image Uploaded",
        description: "Profile picture updated successfully.",
      });
    }
  };

  const handleSave = async () => {
    if (!user?.email) {
      toast({
        title: "Error",
        description: "You must be logged in to save changes",
        variant: "destructive"
      });
      return;
    }

    setIsUpdating(true);
    
    try {
      // First check if advisor record exists
      const { data: existingAdvisor } = await (supabase as any)
        .from('advisors')
        .select('id')
        .eq('email', user.email)
        .maybeSingle();

      const updateData = {
        full_name: profileData.displayName,
        email: profileData.email,
        contact_number: profileData.contactNumber,
        bio: profileData.bio,
        credentials: profileData.credentials,
        tagline: profileData.tagline,
        specializations: profileData.specializations.join(', '),
        profile_image: profileData.profileImage,
        updated_at: new Date().toISOString()
      };

      if (existingAdvisor) {
        // Update existing advisor
        const { error } = await (supabase as any)
          .from('advisors')
          .update(updateData)
          .eq('email', user.email);

        if (error) throw error;
      } else {
        // Create new advisor record (this should be handled by the approval process)
        const { data: registrationData } = await (supabase as any)
          .from('agent_registrations')
          .select('*')
          .eq('email', user.email)
          .eq('status', 'approved')
          .maybeSingle();

        if (registrationData) {
          const { error } = await (supabase as any)
            .from('advisors')
            .insert({
              ...updateData,
              representative_code: registrationData.representative_code,
              financial_institution: registrationData.financial_institution,
              registration_id: registrationData.id,
              user_id: user.id
            });

          if (error) throw error;
        }
      }

      toast({
        title: "Profile Updated",
        description: "Your profile has been saved successfully.",
      });
    } catch (error) {
      console.error('Error saving profile:', error);
      toast({
        title: "Error",
        description: "Failed to save profile changes",
        variant: "destructive"
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const handleBackToDashboard = () => {
    navigate("/agent-dashboard");
  };

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="text-lg font-medium">Loading profile...</div>
          <div className="text-sm text-muted-foreground">Please wait while we fetch your data</div>
        </div>
      </div>
    );
  }

  // Show error if no user
  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="text-lg font-medium">Access Denied</div>
          <div className="text-sm text-muted-foreground">Please log in to view your profile</div>
          <Button onClick={() => navigate('/agent-login')} className="mt-4">
            Go to Login
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              onClick={handleBackToDashboard}
              variant="ghost"
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Button>
            <h1 className="text-2xl font-bold text-foreground">Agent Profile</h1>
          </div>
          
          <Button
            onClick={handleSave}
            disabled={isUpdating}
            className="gap-2 bg-primary hover:bg-primary-light text-primary-foreground"
          >
            <Save className="h-4 w-4" />
            {isUpdating ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </header>

      {/* Profile Content */}
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        {/* Profile Picture & Basic Info */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Profile Picture */}
            <div className="flex items-start gap-6">
              <div className="flex flex-col items-center gap-4">
                <Avatar className="w-24 h-24">
                  <AvatarImage src={profileData.profileImage} />
                  <AvatarFallback className="text-lg">
                    <User className="h-8 w-8" />
                  </AvatarFallback>
                </Avatar>
                
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    id="profile-upload"
                  />
                  <Button variant="outline" className="gap-2">
                    <Upload className="h-4 w-4" />
                    Upload Photo
                  </Button>
                </div>
              </div>
              
              <div className="flex-1 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="displayName">Display Name</Label>
                    <Input
                      id="displayName"
                      value={profileData.displayName}
                      onChange={(e) => handleInputChange("displayName", e.target.value)}
                      className="transition-smooth focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profileData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className="transition-smooth focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="contactNumber">Contact Number</Label>
                    <Input
                      id="contactNumber"
                      type="tel"
                      value={profileData.contactNumber}
                      onChange={(e) => handleInputChange("contactNumber", e.target.value)}
                      placeholder="+65 9123 4567"
                      className="transition-smooth focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="representativeNumber">Representative Number</Label>
                    <Input
                      id="representativeNumber"
                      value={profileData.representativeNumber}
                      readOnly
                      className="bg-muted/50 cursor-not-allowed"
                    />
                  </div>
                  
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="financialInstitution">Financial Institution</Label>
                    <Input
                      id="financialInstitution"
                      value={profileData.financialInstitution}
                      readOnly
                      className="bg-muted/50 cursor-not-allowed"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="tagline">Professional Tagline (Optional)</Label>
                  <Input
                    id="tagline"
                    value={profileData.tagline}
                    onChange={(e) => handleInputChange("tagline", e.target.value)}
                    placeholder="e.g., Building your financial future, one step at a time"
                    className="transition-smooth focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Professional Bio */}
        <Card>
          <CardHeader>
            <CardTitle>Professional Bio</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label htmlFor="bio">Short Professional Bio</Label>
              <Textarea
                id="bio"
                value={profileData.bio}
                onChange={(e) => handleInputChange("bio", e.target.value)}
                placeholder="Tell clients about your experience, specialties, and approach to financial planning..."
                className="min-h-[120px] transition-smooth focus:ring-2 focus:ring-primary/20"
                maxLength={500}
              />
              <p className="text-sm text-muted-foreground">
                {profileData.bio.length}/500 characters
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Specialization */}
        <Card>
          <CardHeader>
            <CardTitle>Specialisations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Label>Areas of Expertise</Label>
              
              {/* Selected Specializations */}
              <div className="flex flex-wrap gap-2 min-h-[40px] p-3 border border-input rounded-md bg-background">
                {profileData.specializations.map((spec) => (
                  <Badge
                    key={spec}
                    variant="secondary"
                    className="px-3 py-1 text-sm bg-primary/10 text-primary hover:bg-primary/20 cursor-pointer group"
                  >
                    {spec}
                    <X
                      className="ml-2 h-3 w-3 group-hover:text-destructive"
                      onClick={() => removeSpecialization(spec)}
                    />
                  </Badge>
                ))}
                {profileData.specializations.length === 0 && (
                  <span className="text-muted-foreground text-sm">Select your areas of expertise...</span>
                )}
              </div>

              {/* Dropdown */}
              <div className="relative">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full justify-between"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  Add Specialisation
                  <ChevronDown className={`h-4 w-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </Button>
                
                {isDropdownOpen && (
                  <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-background border border-input rounded-md shadow-lg">
                    <div className="p-1">
                      {specializationOptions.map((option) => (
                        <button
                          key={option}
                          type="button"
                          className={`w-full text-left px-3 py-2 text-sm rounded-sm hover:bg-accent hover:text-accent-foreground transition-colors ${
                            profileData.specializations.includes(option) 
                              ? 'bg-primary/10 text-primary' 
                              : ''
                          }`}
                          onClick={() => {
                            handleSpecializationToggle(option);
                            setIsDropdownOpen(false);
                          }}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Credentials & Accolades */}
        <Card>
          <CardHeader>
            <CardTitle>Credentials & Accolades</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label htmlFor="credentials">Professional Credentials & Achievements</Label>
              <Textarea
                id="credentials"
                value={profileData.credentials}
                onChange={(e) => handleInputChange("credentials", e.target.value)}
                placeholder="List your certifications, awards, years of experience, etc."
                className="min-h-[100px] transition-smooth focus:ring-2 focus:ring-primary/20"
                maxLength={1000}
              />
              <p className="text-sm text-muted-foreground">
                {profileData.credentials.length}/1000 characters
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Preview Section */}
        <Card>
          <CardHeader>
            <CardTitle>Profile Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-muted/30 p-6 rounded-lg">
              <div className="flex items-start gap-4">
                <Avatar className="w-16 h-16">
                  <AvatarImage src={profileData.profileImage} />
                  <AvatarFallback>
                    <User className="h-6 w-6" />
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-primary mb-1">
                    {profileData.displayName}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-1">
                    {profileData.financialInstitution} • Rep #{profileData.representativeNumber}
                  </p>
                  <p className="text-sm text-muted-foreground mb-2">
                    📧 {profileData.email} • 📞 {profileData.contactNumber}
                  </p>
                  {profileData.tagline && (
                    <p className="text-sm text-muted-foreground italic mb-3">
                      "{profileData.tagline}"
                    </p>
                  )}
                  <p className="text-sm text-foreground mb-3">
                    {profileData.bio}
                  </p>
                  <p className="text-sm text-muted-foreground mb-2">
                    <strong>Specialisations:</strong> {profileData.specializations.join(", ")}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <strong>Credentials:</strong> {profileData.credentials}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AgentProfile;