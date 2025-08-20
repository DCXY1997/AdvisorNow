import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { UserSearch, Users, CheckCircle } from 'lucide-react';

interface ConsumerMatchProps {
  onMatch?: (matchData: any) => void;
}

const ConsumerMatch: React.FC<ConsumerMatchProps> = ({ onMatch }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    serviceType: '',
    budget: '',
    experience: '',
    preferences: [] as string[],
    consent: false
  });

  const serviceTypes = [
    'Investment Planning',
    'Retirement Planning',
    'Insurance Coverage',
    'Education Savings',
    'General Financial Advice'
  ];

  const budgetRanges = [
    'Under $10,000',
    '$10,000 - $50,000',
    '$50,000 - $100,000',
    '$100,000 - $500,000',
    'Over $500,000'
  ];

  const experienceLevels = [
    'Beginner',
    'Intermediate',
    'Advanced',
    'Expert'
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePreferenceChange = (preference: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      preferences: checked
        ? [...prev.preferences, preference]
        : prev.preferences.filter(p => p !== preference)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onMatch) {
      onMatch(formData);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4">
          <UserSearch className="h-12 w-12 text-primary" />
        </div>
        <CardTitle className="text-2xl">Find Your Perfect Advisor Match</CardTitle>
        <CardDescription>
          Tell us about your financial goals and we'll connect you with the right advisor
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Users className="h-5 w-5" />
              Personal Information
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Enter your full name"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="+65 XXXX XXXX"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="your.email@example.com"
                required
              />
            </div>
          </div>

          {/* Service Preferences */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Service Preferences</h3>
            
            <div className="space-y-2">
              <Label htmlFor="service-type">Primary Service Needed</Label>
              <Select value={formData.serviceType} onValueChange={(value) => handleInputChange('serviceType', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select service type" />
                </SelectTrigger>
                <SelectContent>
                  {serviceTypes.map((type) => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="budget">Investment Budget</Label>
                <Select value={formData.budget} onValueChange={(value) => handleInputChange('budget', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select budget range" />
                  </SelectTrigger>
                  <SelectContent>
                    {budgetRanges.map((range) => (
                      <SelectItem key={range} value={range}>{range}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="experience">Experience Level</Label>
                <Select value={formData.experience} onValueChange={(value) => handleInputChange('experience', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select experience" />
                  </SelectTrigger>
                  <SelectContent>
                    {experienceLevels.map((level) => (
                      <SelectItem key={level} value={level}>{level}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Advisor Preferences */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Advisor Preferences</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {['English Speaking', 'Mandarin Speaking', 'Malay Speaking', 'Tamil Speaking', 'Weekend Availability', 'Online Consultation'].map((preference) => (
                <div key={preference} className="flex items-center space-x-2">
                  <Checkbox
                    id={preference}
                    checked={formData.preferences.includes(preference)}
                    onCheckedChange={(checked) => handlePreferenceChange(preference, checked as boolean)}
                  />
                  <Label htmlFor={preference} className="text-sm">{preference}</Label>
                </div>
              ))}
            </div>
          </div>

          {/* Consent */}
          <div className="space-y-4">
            <div className="flex items-start space-x-2">
              <Checkbox
                id="consent"
                checked={formData.consent}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, consent: checked as boolean }))}
                required
              />
              <div className="space-y-1">
                <Label htmlFor="consent" className="text-sm font-medium">
                  Privacy and Data Consent
                </Label>
                <p className="text-xs text-muted-foreground">
                  I consent to AdvisorNow collecting and processing my personal data for advisor matching purposes. 
                  Data will be handled in accordance with our Privacy Policy.
                </p>
              </div>
            </div>
          </div>

          <Button type="submit" className="w-full" size="lg">
            <CheckCircle className="h-5 w-5 mr-2" />
            Find My Perfect Match
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ConsumerMatch;