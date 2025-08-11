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

const AgentProfile = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  
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

  const [loading, setLoading] = useState(true);
  const [advisorId, setAdvisorId] = useState<string | null>(null);

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

  // Load advisor profile data on component mount
  useEffect(() => {
    loadAdvisorProfile();
  }, []);

  const loadAdvisorProfile = async () => {
    try {
      setLoading(true);
      
      // Get current user
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      if (authError) throw authError;
      if (!user) {
        toast({
          title: "Authentication Required",
          description: "Please log in to access your profile.",
          variant: "destructive",
        });
        navigate("/agent-login");
        return;
      }

      // Get advisor data
      const { data: advisor, error: advisorError } = await supabase
        .from('advisors')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      if (advisorError) {
        console.error('Advisors error:', advisorError);
        toast({
          title: "Error",
          description: "Could not load profile data.",
          variant: "destructive",
        });
        return;
      }

      if (!advisor) {
        toast({
          title: "Profile Not Found",
          description: "Your advisor profile is not set up yet. Please contact support.",
          variant: "destructive",
        });
        return;
      }

      if (advisor) {
        setAdvisorId(advisor.id);
        setProfileData({
          displayName: advisor.full_name || "",
          email: advisor.email || "",
          contactNumber: (advisor as any).contact_number || "",
          representativeNumber: advisor.representative_code || "",
          financialInstitution: advisor.financial_institution || "",
          bio: (advisor as any).bio || "",
          credentials: (advisor as any).credentials || "",
          tagline: (advisor as any).tagline || "",
          specializations: (advisor as any).specializations ? JSON.parse((advisor as any).specializations) : [],
          profileImage: (advisor as any).profile_image || ""
        });
      }
    } catch (error) {
      console.error('Error loading advisor profile:', error);
      toast({
        title: "Error",
        description: "Could not load profile data.",
        variant: "destructive",
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

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid File",
        description: "Please select an image file.",
        variant: "destructive",
      });
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File Too Large",
        description: "Please select an image smaller than 5MB.",
        variant: "destructive",
      });
      return;
    }

    try {
      // Get current user
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      if (authError || !user) {
        toast({
          title: "Authentication Error",
          description: "Please log in to upload photos.",
          variant: "destructive",
        });
        return;
      }

      // Create unique filename
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}/profile.${fileExt}`;

      // Upload to Supabase Storage
      const { data, error } = await supabase.storage
        .from('advisor-profiles')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: true // Replace existing file
        });

      if (error) throw error;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('advisor-profiles')
        .getPublicUrl(fileName);

      // Update profile data with new image URL
      setProfileData(prev => ({ ...prev, profileImage: publicUrl }));
      
      toast({
        title: "Image Uploaded",
        description: "Profile picture updated successfully.",
      });
    } catch (error) {
      console.error('Error uploading image:', error);
      toast({
        title: "Upload Failed",
        description: "Could not upload image. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleSave = async () => {
    if (!advisorId) {
      toast({
        title: "Error",
        description: "No advisor ID found. Please try logging in again.",
        variant: "destructive",
      });
      return;
    }

    setIsUpdating(true);
    
    try {
      const { error } = await supabase
        .from('advisors')
        .update({
          contact_number: profileData.contactNumber,
          bio: profileData.bio,
          credentials: profileData.credentials,
          tagline: profileData.tagline,
          specializations: JSON.stringify(profileData.specializations),
          profile_image: profileData.profileImage
        })
        .eq('id', advisorId);

      if (error) throw error;

      toast({
        title: "Profile Updated",
        description: "Your profile has been saved successfully.",
      });
    } catch (error) {
      console.error('Error saving profile:', error);
      toast({
        title: "Error",
        description: "Could not save profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const handleBackToDashboard = () => {
    navigate("/agent-dashboard");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading profile...</p>
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
                      readOnly
                      className="bg-muted/50 cursor-not-allowed"
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
                    {profileData.financialInstitution} • Rep ({profileData.representativeNumber})
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