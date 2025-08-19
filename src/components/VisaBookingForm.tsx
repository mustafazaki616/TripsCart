import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Calendar, MapPin, User, Phone, Mail, FileText, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FormState {
  visaType: string;
  destinationCountry: string;
  nationality: string;
  travelDate: string;
  returnDate: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  passportNumber: string;
  phone: string;
  email: string;
  purposeOfVisit: string;
}

interface FormErrors {
  visaType?: string;
  destinationCountry?: string;
  nationality?: string;
  travelDate?: string;
  returnDate?: string;
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string;
  passportNumber?: string;
  phone?: string;
  email?: string;
  purposeOfVisit?: string;
}

export function VisaBookingForm() {
  const [formData, setFormData] = useState<FormState>({
    visaType: '',
    destinationCountry: '',
    nationality: '',
    travelDate: '',
    returnDate: '',
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    passportNumber: '',
    phone: '',
    email: '',
    purposeOfVisit: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.visaType) {
      newErrors.visaType = 'Visa type is required';
    }

    if (!formData.destinationCountry) {
      newErrors.destinationCountry = 'Destination country is required';
    }

    if (!formData.nationality) {
      newErrors.nationality = 'Nationality is required';
    }

    if (!formData.travelDate) {
      newErrors.travelDate = 'Travel date is required';
    }

    if (!formData.returnDate) {
      newErrors.returnDate = 'Return date is required';
    }

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = 'Date of birth is required';
    }

    if (!formData.passportNumber.trim()) {
      newErrors.passportNumber = 'Passport number is required';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.purposeOfVisit) {
      newErrors.purposeOfVisit = 'Purpose of visit is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setShowSuccessModal(true);
    }
  };

  const handleInputChange = (field: keyof FormState, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const visaTypes = [
    'Tourist Visa',
    'Business Visa',
    'Student Visa',
    'Work Visa',
    'Transit Visa',
    'Medical Visa',
    'Conference Visa',
    'Family Visit Visa'
  ];

  const countries = [
    'United States', 'United Kingdom', 'Canada', 'Australia', 'Germany',
    'France', 'Italy', 'Spain', 'Netherlands', 'Switzerland', 'Japan',
    'South Korea', 'Singapore', 'Dubai (UAE)', 'India', 'China', 'Brazil',
    'Mexico', 'South Africa', 'New Zealand'
  ];

  const purposeOptions = [
    'Tourism',
    'Business Meeting',
    'Conference',
    'Education',
    'Employment',
    'Medical Treatment',
    'Family Visit',
    'Transit',
    'Other'
  ];

  if (isMobile) {
    return (
      <>
        <form onSubmit={handleSubmit} className="space-y-4 p-4">
          {/* Visa Type */}
          <div className="space-y-2">
            <Label htmlFor="visa-type" className="flex items-center gap-2 text-sm font-medium">
              <FileText className="h-4 w-4" />
              Visa Type
            </Label>
            <Select value={formData.visaType} onValueChange={(value) => handleInputChange('visaType', value)}>
              <SelectTrigger className={cn(errors.visaType && "border-red-500")}>
                <SelectValue placeholder="Select visa type" />
              </SelectTrigger>
              <SelectContent>
                {visaTypes.map((type) => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.visaType && (
              <p className="text-sm text-red-500">{errors.visaType}</p>
            )}
          </div>

          {/* Destination Country */}
          <div className="space-y-2">
            <Label htmlFor="destination-country" className="flex items-center gap-2 text-sm font-medium">
              <Globe className="h-4 w-4" />
              Destination Country
            </Label>
            <Select value={formData.destinationCountry} onValueChange={(value) => handleInputChange('destinationCountry', value)}>
              <SelectTrigger className={cn(errors.destinationCountry && "border-red-500")}>
                <SelectValue placeholder="Select country" />
              </SelectTrigger>
              <SelectContent>
                {countries.map((country) => (
                  <SelectItem key={country} value={country}>{country}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.destinationCountry && (
              <p className="text-sm text-red-500">{errors.destinationCountry}</p>
            )}
          </div>

          {/* Nationality */}
          <div className="space-y-2">
            <Label htmlFor="nationality" className="flex items-center gap-2 text-sm font-medium">
              <MapPin className="h-4 w-4" />
              Nationality
            </Label>
            <Select value={formData.nationality} onValueChange={(value) => handleInputChange('nationality', value)}>
              <SelectTrigger className={cn(errors.nationality && "border-red-500")}>
                <SelectValue placeholder="Select nationality" />
              </SelectTrigger>
              <SelectContent>
                {countries.map((country) => (
                  <SelectItem key={country} value={country}>{country}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.nationality && (
              <p className="text-sm text-red-500">{errors.nationality}</p>
            )}
          </div>

          {/* Travel Dates */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="travel-date" className="flex items-center gap-2 text-sm font-medium">
                <Calendar className="h-4 w-4" />
                Travel Date
              </Label>
              <Input
                id="travel-date"
                type="date"
                value={formData.travelDate}
                onChange={(e) => handleInputChange('travelDate', e.target.value)}
                className={cn(errors.travelDate && "border-red-500")}
              />
              {errors.travelDate && (
                <p className="text-xs text-red-500">{errors.travelDate}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="return-date" className="flex items-center gap-2 text-sm font-medium">
                <Calendar className="h-4 w-4" />
                Return Date
              </Label>
              <Input
                id="return-date"
                type="date"
                value={formData.returnDate}
                onChange={(e) => handleInputChange('returnDate', e.target.value)}
                className={cn(errors.returnDate && "border-red-500")}
              />
              {errors.returnDate && (
                <p className="text-xs text-red-500">{errors.returnDate}</p>
              )}
            </div>
          </div>

          {/* Personal Information */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="first-name" className="flex items-center gap-2 text-sm font-medium">
                <User className="h-4 w-4" />
                First Name
              </Label>
              <Input
                id="first-name"
                type="text"
                placeholder="First name"
                value={formData.firstName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
                className={cn(errors.firstName && "border-red-500")}
              />
              {errors.firstName && (
                <p className="text-xs text-red-500">{errors.firstName}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="last-name" className="flex items-center gap-2 text-sm font-medium">
                <User className="h-4 w-4" />
                Last Name
              </Label>
              <Input
                id="last-name"
                type="text"
                placeholder="Last name"
                value={formData.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                className={cn(errors.lastName && "border-red-500")}
              />
              {errors.lastName && (
                <p className="text-xs text-red-500">{errors.lastName}</p>
              )}
            </div>
          </div>

          {/* Date of Birth */}
          <div className="space-y-2">
            <Label htmlFor="date-of-birth" className="flex items-center gap-2 text-sm font-medium">
              <Calendar className="h-4 w-4" />
              Date of Birth
            </Label>
            <Input
              id="date-of-birth"
              type="date"
              value={formData.dateOfBirth}
              onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
              className={cn(errors.dateOfBirth && "border-red-500")}
            />
            {errors.dateOfBirth && (
              <p className="text-sm text-red-500">{errors.dateOfBirth}</p>
            )}
          </div>

          {/* Passport Number */}
          <div className="space-y-2">
            <Label htmlFor="passport-number" className="flex items-center gap-2 text-sm font-medium">
              <FileText className="h-4 w-4" />
              Passport Number
            </Label>
            <Input
              id="passport-number"
              type="text"
              placeholder="Enter passport number"
              value={formData.passportNumber}
              onChange={(e) => handleInputChange('passportNumber', e.target.value)}
              className={cn(errors.passportNumber && "border-red-500")}
            />
            {errors.passportNumber && (
              <p className="text-sm text-red-500">{errors.passportNumber}</p>
            )}
          </div>

          {/* Purpose of Visit */}
          <div className="space-y-2">
            <Label htmlFor="purpose-of-visit" className="flex items-center gap-2 text-sm font-medium">
              <FileText className="h-4 w-4" />
              Purpose of Visit
            </Label>
            <Select value={formData.purposeOfVisit} onValueChange={(value) => handleInputChange('purposeOfVisit', value)}>
              <SelectTrigger className={cn(errors.purposeOfVisit && "border-red-500")}>
                <SelectValue placeholder="Select purpose" />
              </SelectTrigger>
              <SelectContent>
                {purposeOptions.map((purpose) => (
                  <SelectItem key={purpose} value={purpose}>{purpose}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.purposeOfVisit && (
              <p className="text-sm text-red-500">{errors.purposeOfVisit}</p>
            )}
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="phone" className="flex items-center gap-2 text-sm font-medium">
                <Phone className="h-4 w-4" />
                Phone Number
              </Label>
              <Input
                id="phone"
                type="tel"
                placeholder="Enter phone number"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className={cn(errors.phone && "border-red-500")}
              />
              {errors.phone && (
                <p className="text-sm text-red-500">{errors.phone}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2 text-sm font-medium">
                <Mail className="h-4 w-4" />
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter email address"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className={cn(errors.email && "border-red-500")}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email}</p>
              )}
            </div>
          </div>

          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
            Submit Visa Application
          </Button>
        </form>

        {/* Success Modal */}
        <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-center text-green-600">
                Visa Application Submitted!
              </DialogTitle>
            </DialogHeader>
            <div className="text-center py-4">
              <p className="text-gray-600 mb-4">
                Your visa application has been submitted successfully. We'll contact you with further instructions.
              </p>
              <Button 
                onClick={() => setShowSuccessModal(false)}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Continue
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </>
    );
  }

  // Desktop Layout
  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6 p-6">
        {/* Visa Details */}
        <div className="grid grid-cols-3 gap-6">
          <div className="space-y-2">
            <Label htmlFor="visa-type-desktop" className="flex items-center gap-2 text-sm font-medium">
              <FileText className="h-4 w-4" />
              Visa Type
            </Label>
            <Select value={formData.visaType} onValueChange={(value) => handleInputChange('visaType', value)}>
              <SelectTrigger className={cn("h-12", errors.visaType && "border-red-500")}>
                <SelectValue placeholder="Select visa type" />
              </SelectTrigger>
              <SelectContent>
                {visaTypes.map((type) => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.visaType && (
              <p className="text-sm text-red-500">{errors.visaType}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="destination-country-desktop" className="flex items-center gap-2 text-sm font-medium">
              <Globe className="h-4 w-4" />
              Destination Country
            </Label>
            <Select value={formData.destinationCountry} onValueChange={(value) => handleInputChange('destinationCountry', value)}>
              <SelectTrigger className={cn("h-12", errors.destinationCountry && "border-red-500")}>
                <SelectValue placeholder="Select country" />
              </SelectTrigger>
              <SelectContent>
                {countries.map((country) => (
                  <SelectItem key={country} value={country}>{country}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.destinationCountry && (
              <p className="text-sm text-red-500">{errors.destinationCountry}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="nationality-desktop" className="flex items-center gap-2 text-sm font-medium">
              <MapPin className="h-4 w-4" />
              Nationality
            </Label>
            <Select value={formData.nationality} onValueChange={(value) => handleInputChange('nationality', value)}>
              <SelectTrigger className={cn("h-12", errors.nationality && "border-red-500")}>
                <SelectValue placeholder="Select nationality" />
              </SelectTrigger>
              <SelectContent>
                {countries.map((country) => (
                  <SelectItem key={country} value={country}>{country}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.nationality && (
              <p className="text-sm text-red-500">{errors.nationality}</p>
            )}
          </div>
        </div>

        {/* Travel Dates */}
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="travel-date-desktop" className="flex items-center gap-2 text-sm font-medium">
              <Calendar className="h-4 w-4" />
              Travel Date
            </Label>
            <Input
              id="travel-date-desktop"
              type="date"
              value={formData.travelDate}
              onChange={(e) => handleInputChange('travelDate', e.target.value)}
              className={cn("h-12", errors.travelDate && "border-red-500")}
            />
            {errors.travelDate && (
              <p className="text-sm text-red-500">{errors.travelDate}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="return-date-desktop" className="flex items-center gap-2 text-sm font-medium">
              <Calendar className="h-4 w-4" />
              Return Date
            </Label>
            <Input
              id="return-date-desktop"
              type="date"
              value={formData.returnDate}
              onChange={(e) => handleInputChange('returnDate', e.target.value)}
              className={cn("h-12", errors.returnDate && "border-red-500")}
            />
            {errors.returnDate && (
              <p className="text-sm text-red-500">{errors.returnDate}</p>
            )}
          </div>
        </div>

        {/* Personal Information */}
        <div className="grid grid-cols-3 gap-6">
          <div className="space-y-2">
            <Label htmlFor="first-name-desktop" className="flex items-center gap-2 text-sm font-medium">
              <User className="h-4 w-4" />
              First Name
            </Label>
            <Input
              id="first-name-desktop"
              type="text"
              placeholder="Enter first name"
              value={formData.firstName}
              onChange={(e) => handleInputChange('firstName', e.target.value)}
              className={cn("h-12", errors.firstName && "border-red-500")}
            />
            {errors.firstName && (
              <p className="text-sm text-red-500">{errors.firstName}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="last-name-desktop" className="flex items-center gap-2 text-sm font-medium">
              <User className="h-4 w-4" />
              Last Name
            </Label>
            <Input
              id="last-name-desktop"
              type="text"
              placeholder="Enter last name"
              value={formData.lastName}
              onChange={(e) => handleInputChange('lastName', e.target.value)}
              className={cn("h-12", errors.lastName && "border-red-500")}
            />
            {errors.lastName && (
              <p className="text-sm text-red-500">{errors.lastName}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="date-of-birth-desktop" className="flex items-center gap-2 text-sm font-medium">
              <Calendar className="h-4 w-4" />
              Date of Birth
            </Label>
            <Input
              id="date-of-birth-desktop"
              type="date"
              value={formData.dateOfBirth}
              onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
              className={cn("h-12", errors.dateOfBirth && "border-red-500")}
            />
            {errors.dateOfBirth && (
              <p className="text-sm text-red-500">{errors.dateOfBirth}</p>
            )}
          </div>
        </div>

        {/* Passport and Purpose */}
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="passport-number-desktop" className="flex items-center gap-2 text-sm font-medium">
              <FileText className="h-4 w-4" />
              Passport Number
            </Label>
            <Input
              id="passport-number-desktop"
              type="text"
              placeholder="Enter passport number"
              value={formData.passportNumber}
              onChange={(e) => handleInputChange('passportNumber', e.target.value)}
              className={cn("h-12", errors.passportNumber && "border-red-500")}
            />
            {errors.passportNumber && (
              <p className="text-sm text-red-500">{errors.passportNumber}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="purpose-of-visit-desktop" className="flex items-center gap-2 text-sm font-medium">
              <FileText className="h-4 w-4" />
              Purpose of Visit
            </Label>
            <Select value={formData.purposeOfVisit} onValueChange={(value) => handleInputChange('purposeOfVisit', value)}>
              <SelectTrigger className={cn("h-12", errors.purposeOfVisit && "border-red-500")}>
                <SelectValue placeholder="Select purpose" />
              </SelectTrigger>
              <SelectContent>
                {purposeOptions.map((purpose) => (
                  <SelectItem key={purpose} value={purpose}>{purpose}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.purposeOfVisit && (
              <p className="text-sm text-red-500">{errors.purposeOfVisit}</p>
            )}
          </div>
        </div>

        {/* Contact Information */}
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="phone-desktop" className="flex items-center gap-2 text-sm font-medium">
              <Phone className="h-4 w-4" />
              Phone Number
            </Label>
            <Input
              id="phone-desktop"
              type="tel"
              placeholder="Enter phone number"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              className={cn("h-12", errors.phone && "border-red-500")}
            />
            {errors.phone && (
              <p className="text-sm text-red-500">{errors.phone}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email-desktop" className="flex items-center gap-2 text-sm font-medium">
              <Mail className="h-4 w-4" />
              Email Address
            </Label>
            <Input
              id="email-desktop"
              type="email"
              placeholder="Enter email address"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className={cn("h-12", errors.email && "border-red-500")}
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email}</p>
            )}
          </div>
        </div>

        <Button type="submit" className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-lg">
          Submit Visa Application
        </Button>
      </form>

      {/* Success Modal */}
      <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-green-600">
              Visa Application Submitted!
            </DialogTitle>
          </DialogHeader>
          <div className="text-center py-4">
            <p className="text-gray-600 mb-4">
              Your visa application has been submitted successfully. We'll contact you with further instructions.
            </p>
            <Button 
              onClick={() => setShowSuccessModal(false)}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Continue
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}