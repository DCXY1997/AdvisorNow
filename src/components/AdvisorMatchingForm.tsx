import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { supabase } from '@/integrations/supabase/client'

const TOPICS = [
  'Insurance Planning',
  'Investment Planning', 
  'Retirement Planning',
  'Estate Planning',
  'Education Planning',
  'Corporate Solution'
]

const INSTITUTIONS = [
  'Any',
  'AIA',
  'Great Eastern',
  'Prudential', 
  'HSBC Life',
  'Income',
  'Manulife',
  'Singlife',
  'FWD',
  'Tokio Marine Life'
]

interface AdvisorMatchingFormProps {
  isOpen: boolean
  onClose: () => void
}

export default function AdvisorMatchingForm({ isOpen, onClose }: AdvisorMatchingFormProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    topicOfInterest: '',
    preferredFinancialInstitution: 'Any'
  })
  
  const [status, setStatus] = useState<'form' | 'searching' | 'no-advisor' | 'ringing'>('form')
  const [consent, setConsent] = useState(false)
  const [error, setError] = useState('')

  // Reset form when modal closes
  const handleClose = () => {
    setStatus('form')
    setError('')
    setFormData({
      fullName: '',
      phoneNumber: '',
      topicOfInterest: '',
      preferredFinancialInstitution: 'Any'
    })
    setConsent(false)
    onClose()
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.fullName || !formData.phoneNumber || !formData.topicOfInterest) {
      setError('Please fill in all required fields')
      return
    }

    if (!consent) {
      setError('Please give consent for data usage')
      return
    }

    setStatus('searching')
    setError('')

    try {
      const { data, error } = await supabase.rpc('create_instant_match', {
        consumer_data: {
          full_name: formData.fullName,
          phone_number: formData.phoneNumber,
          topic_of_interest: formData.topicOfInterest,
          preferred_financial_institution: formData.preferredFinancialInstitution
        },
        required_specialization: formData.topicOfInterest
      })

      if (error) {
        console.error('Supabase error:', error)
        throw error
      }

      const result = data?.[0]

      if (!result?.call_id || !result?.advisor_id) {
        setStatus('no-advisor')
        return
      }

      setStatus('ringing')
      
    } catch (error) {
      console.error('Matching error:', error)
      setError('Failed to find advisor. Please try again.')
      setStatus('form')
    }
  }

  const resetForm = () => {
    setStatus('form')
    setError('')
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Find Your Financial Advisor</DialogTitle>
        </DialogHeader>

        {status === 'searching' && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <h3 className="text-lg font-semibold">Finding Available Advisor...</h3>
            <p className="text-gray-600">Looking for {formData.topicOfInterest} specialists</p>
          </div>
        )}

        {status === 'ringing' && (
          <div className="text-center py-8">
            <div className="animate-pulse text-green-600 mb-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl">📞</span>
              </div>
            </div>
            <h3 className="text-lg font-semibold">Connecting you to an advisor...</h3>
            <p className="text-gray-600">Please wait while we connect your call</p>
          </div>
        )}

        {status === 'no-advisor' && (
          <div className="text-center py-8">
            <div className="text-gray-400 mb-4">
              <span className="text-4xl">😔</span>
            </div>
            <h3 className="text-lg font-semibold">No Advisors Available</h3>
            <p className="text-gray-600 mb-6">
              Sorry, all {formData.topicOfInterest} advisors are currently busy. 
              Please try again in a few minutes.
            </p>
            <Button onClick={resetForm} variant="outline" className="w-full">
              Try Again
            </Button>
          </div>
        )}

        {status === 'form' && (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div>
              <Label htmlFor="fullName" className="text-sm font-medium text-gray-700">
                Full Name *
              </Label>
              <Input
                id="fullName"
                required
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                className="mt-1"
              />
            </div>

            {/* Phone Number */}
            <div>
              <Label htmlFor="phoneNumber" className="text-sm font-medium text-gray-700">
                Phone Number *
              </Label>
              <Input
                id="phoneNumber"
                type="tel"
                required
                placeholder="+65 9XXX XXXX"
                value={formData.phoneNumber}
                onChange={(e) => setFormData(prev => ({ ...prev, phoneNumber: e.target.value }))}
                className="mt-1"
              />
            </div>

            {/* Topic of Interest */}
            <div>
              <Label className="text-sm font-medium text-gray-700">
                Topic of Interest *
              </Label>
              <Select 
                value={formData.topicOfInterest} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, topicOfInterest: value }))}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select your area of interest" />
                </SelectTrigger>
                <SelectContent>
                  {TOPICS.map((topic) => (
                    <SelectItem key={topic} value={topic}>{topic}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Preferred Financial Institution */}
            <div>
              <Label className="text-sm font-medium text-gray-700">
                Preferred Financial Institution
              </Label>
              <Select 
                value={formData.preferredFinancialInstitution} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, preferredFinancialInstitution: value }))}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {INSTITUTIONS.map((inst) => (
                    <SelectItem key={inst} value={inst}>{inst}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Consent Checkbox */}
            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                id="consent"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-1 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="consent" className="text-sm text-gray-700">
                I consent to the collection and use of my personal data *
                <div className="text-xs text-gray-500 mt-1">
                  By checking this box, you agree to our Personal Data Protection Act (PDPA) policy. 
                  Your information will be used solely for matching you with qualified financial advisors.
                </div>
              </label>
            </div>

            {/* Error Message */}
            {error && (
              <div className="text-red-600 text-sm bg-red-50 p-3 rounded-md">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <Button 
              type="submit" 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md font-medium"
              disabled={!consent}
            >
              Find My Advisor
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}