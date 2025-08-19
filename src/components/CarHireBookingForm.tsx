import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Calendar, MapPin, Clock, User, Phone, Mail, Car } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FormState {
  pickupLocation: string;
  dropoffLocation: string;
  pickupDate: string;
  dropoffDate: string;
  pickupTime: string;
  dropoffTime: string;
  driverAge: string;
  carType: string;
  phone: string;
  email: string;
}

interface FormErrors {
  pickupLocation?: string;
  dropoffLocation?: string;
  pickupDate?: string;
  dropoffDate?: string;
  pickupTime?: string;
  dropoffTime?: string;
  driverAge?: string;
  carType?: string;
  phone?: string;
  email?: string;
}

export function CarHireBookingForm() {
  const [formData, setFormData] = useState<FormState>({
    pickupLocation: '',
    dropoffLocation: '',
    pickupDate: '',
    dropoffDate: '',
    pickupTime: '',
    dropoffTime: '',
    driverAge: '',
    carType: '',
    phone: '',
    email: ''
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

    if (!formData.pickupLocation.trim()) {
      newErrors.pickupLocation = 'Pickup location is required';
    }

    if (!formData.dropoffLocation.trim()) {
      newErrors.dropoffLocation = 'Drop-off location is required';
    }

    if (!formData.pickupDate) {
      newErrors.pickupDate = 'Pickup date is required';
    }

    if (!formData.dropoffDate) {
      newErrors.dropoffDate = 'Drop-off date is required';
    }

    if (!formData.pickupTime) {
      newErrors.pickupTime = 'Pickup time is required';
    }

    if (!formData.dropoffTime) {
      newErrors.dropoffTime = 'Drop-off time is required';
    }

    if (!formData.driverAge) {
      newErrors.driverAge = 'Driver age is required';
    } else if (parseInt(formData.driverAge) < 18) {
      newErrors.driverAge = 'Driver must be at least 18 years old';
    }

    if (!formData.carType) {
      newErrors.carType = 'Car type is required';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
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

  const carTypes = [
    'Economy',
    'Compact',
    'Mid-size',
    'Full-size',
    'Premium',
    'Luxury',
    'SUV',
    'Minivan'
  ];

  const timeOptions = [
    '00:00', '00:30', '01:00', '01:30', '02:00', '02:30', '03:00', '03:30',
    '04:00', '04:30', '05:00', '05:30', '06:00', '06:30', '07:00', '07:30',
    '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
    '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30',
    '20:00', '20:30', '21:00', '21:30', '22:00', '22:30', '23:00', '23:30'
  ];

  if (isMobile) {
    return (
      <>
        <form onSubmit={handleSubmit} className="space-y-4 p-4">
          {/* Pickup Location */}
          <div className="space-y-2">
            <Label htmlFor="pickup-location" className="flex items-center gap-2 text-sm font-medium">
              <MapPin className="h-4 w-4" />
              Pickup Location
            </Label>
            <Input
              id="pickup-location"
              type="text"
              placeholder="Enter pickup location"
              value={formData.pickupLocation}
              onChange={(e) => handleInputChange('pickupLocation', e.target.value)}
              className={cn(errors.pickupLocation && "border-red-500")}
            />
            {errors.pickupLocation && (
              <p className="text-sm text-red-500">{errors.pickupLocation}</p>
            )}
          </div>

          {/* Drop-off Location */}
          <div className="space-y-2">
            <Label htmlFor="dropoff-location" className="flex items-center gap-2 text-sm font-medium">
              <MapPin className="h-4 w-4" />
              Drop-off Location
            </Label>
            <Input
              id="dropoff-location"
              type="text"
              placeholder="Enter drop-off location"
              value={formData.dropoffLocation}
              onChange={(e) => handleInputChange('dropoffLocation', e.target.value)}
              className={cn(errors.dropoffLocation && "border-red-500")}
            />
            {errors.dropoffLocation && (
              <p className="text-sm text-red-500">{errors.dropoffLocation}</p>
            )}
          </div>

          {/* Pickup Date & Time */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="pickup-date" className="flex items-center gap-2 text-sm font-medium">
                <Calendar className="h-4 w-4" />
                Pickup Date
              </Label>
              <Input
                id="pickup-date"
                type="date"
                value={formData.pickupDate}
                onChange={(e) => handleInputChange('pickupDate', e.target.value)}
                className={cn(errors.pickupDate && "border-red-500")}
              />
              {errors.pickupDate && (
                <p className="text-xs text-red-500">{errors.pickupDate}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="pickup-time" className="flex items-center gap-2 text-sm font-medium">
                <Clock className="h-4 w-4" />
                Time
              </Label>
              <Select value={formData.pickupTime} onValueChange={(value) => handleInputChange('pickupTime', value)}>
                <SelectTrigger className={cn(errors.pickupTime && "border-red-500")}>
                  <SelectValue placeholder="Time" />
                </SelectTrigger>
                <SelectContent>
                  {timeOptions.map((time) => (
                    <SelectItem key={time} value={time}>{time}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.pickupTime && (
                <p className="text-xs text-red-500">{errors.pickupTime}</p>
              )}
            </div>
          </div>

          {/* Drop-off Date & Time */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="dropoff-date" className="flex items-center gap-2 text-sm font-medium">
                <Calendar className="h-4 w-4" />
                Drop-off Date
              </Label>
              <Input
                id="dropoff-date"
                type="date"
                value={formData.dropoffDate}
                onChange={(e) => handleInputChange('dropoffDate', e.target.value)}
                className={cn(errors.dropoffDate && "border-red-500")}
              />
              {errors.dropoffDate && (
                <p className="text-xs text-red-500">{errors.dropoffDate}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="dropoff-time" className="flex items-center gap-2 text-sm font-medium">
                <Clock className="h-4 w-4" />
                Time
              </Label>
              <Select value={formData.dropoffTime} onValueChange={(value) => handleInputChange('dropoffTime', value)}>
                <SelectTrigger className={cn(errors.dropoffTime && "border-red-500")}>
                  <SelectValue placeholder="Time" />
                </SelectTrigger>
                <SelectContent>
                  {timeOptions.map((time) => (
                    <SelectItem key={time} value={time}>{time}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.dropoffTime && (
                <p className="text-xs text-red-500">{errors.dropoffTime}</p>
              )}
            </div>
          </div>

          {/* Driver Age & Car Type */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="driver-age" className="flex items-center gap-2 text-sm font-medium">
                <User className="h-4 w-4" />
                Driver Age
              </Label>
              <Input
                id="driver-age"
                type="number"
                placeholder="Age"
                value={formData.driverAge}
                onChange={(e) => handleInputChange('driverAge', e.target.value)}
                className={cn(errors.driverAge && "border-red-500")}
              />
              {errors.driverAge && (
                <p className="text-xs text-red-500">{errors.driverAge}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="car-type" className="flex items-center gap-2 text-sm font-medium">
                <Car className="h-4 w-4" />
                Car Type
              </Label>
              <Select value={formData.carType} onValueChange={(value) => handleInputChange('carType', value)}>
                <SelectTrigger className={cn(errors.carType && "border-red-500")}>
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  {carTypes.map((type) => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.carType && (
                <p className="text-xs text-red-500">{errors.carType}</p>
              )}
            </div>
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
            Search Car Rentals
          </Button>
        </form>

        {/* Success Modal */}
        <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-center text-green-600">
                Car Hire Search Submitted!
              </DialogTitle>
            </DialogHeader>
            <div className="text-center py-4">
              <p className="text-gray-600 mb-4">
                We're searching for the best car rental deals for you.
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
        {/* Location Fields */}
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="pickup-location-desktop" className="flex items-center gap-2 text-sm font-medium">
              <MapPin className="h-4 w-4" />
              Pickup Location
            </Label>
            <Input
              id="pickup-location-desktop"
              type="text"
              placeholder="Enter pickup location"
              value={formData.pickupLocation}
              onChange={(e) => handleInputChange('pickupLocation', e.target.value)}
              className={cn("h-12", errors.pickupLocation && "border-red-500")}
            />
            {errors.pickupLocation && (
              <p className="text-sm text-red-500">{errors.pickupLocation}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="dropoff-location-desktop" className="flex items-center gap-2 text-sm font-medium">
              <MapPin className="h-4 w-4" />
              Drop-off Location
            </Label>
            <Input
              id="dropoff-location-desktop"
              type="text"
              placeholder="Enter drop-off location"
              value={formData.dropoffLocation}
              onChange={(e) => handleInputChange('dropoffLocation', e.target.value)}
              className={cn("h-12", errors.dropoffLocation && "border-red-500")}
            />
            {errors.dropoffLocation && (
              <p className="text-sm text-red-500">{errors.dropoffLocation}</p>
            )}
          </div>
        </div>

        {/* Date and Time Fields */}
        <div className="grid grid-cols-4 gap-4">
          <div className="space-y-2">
            <Label htmlFor="pickup-date-desktop" className="flex items-center gap-2 text-sm font-medium">
              <Calendar className="h-4 w-4" />
              Pickup Date
            </Label>
            <Input
              id="pickup-date-desktop"
              type="date"
              value={formData.pickupDate}
              onChange={(e) => handleInputChange('pickupDate', e.target.value)}
              className={cn("h-12", errors.pickupDate && "border-red-500")}
            />
            {errors.pickupDate && (
              <p className="text-sm text-red-500">{errors.pickupDate}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="pickup-time-desktop" className="flex items-center gap-2 text-sm font-medium">
              <Clock className="h-4 w-4" />
              Pickup Time
            </Label>
            <Select value={formData.pickupTime} onValueChange={(value) => handleInputChange('pickupTime', value)}>
              <SelectTrigger className={cn("h-12", errors.pickupTime && "border-red-500")}>
                <SelectValue placeholder="Select time" />
              </SelectTrigger>
              <SelectContent>
                {timeOptions.map((time) => (
                  <SelectItem key={time} value={time}>{time}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.pickupTime && (
              <p className="text-sm text-red-500">{errors.pickupTime}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="dropoff-date-desktop" className="flex items-center gap-2 text-sm font-medium">
              <Calendar className="h-4 w-4" />
              Drop-off Date
            </Label>
            <Input
              id="dropoff-date-desktop"
              type="date"
              value={formData.dropoffDate}
              onChange={(e) => handleInputChange('dropoffDate', e.target.value)}
              className={cn("h-12", errors.dropoffDate && "border-red-500")}
            />
            {errors.dropoffDate && (
              <p className="text-sm text-red-500">{errors.dropoffDate}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="dropoff-time-desktop" className="flex items-center gap-2 text-sm font-medium">
              <Clock className="h-4 w-4" />
              Drop-off Time
            </Label>
            <Select value={formData.dropoffTime} onValueChange={(value) => handleInputChange('dropoffTime', value)}>
              <SelectTrigger className={cn("h-12", errors.dropoffTime && "border-red-500")}>
                <SelectValue placeholder="Select time" />
              </SelectTrigger>
              <SelectContent>
                {timeOptions.map((time) => (
                  <SelectItem key={time} value={time}>{time}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.dropoffTime && (
              <p className="text-sm text-red-500">{errors.dropoffTime}</p>
            )}
          </div>
        </div>

        {/* Driver Details */}
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="driver-age-desktop" className="flex items-center gap-2 text-sm font-medium">
              <User className="h-4 w-4" />
              Driver Age
            </Label>
            <Input
              id="driver-age-desktop"
              type="number"
              placeholder="Enter driver age"
              value={formData.driverAge}
              onChange={(e) => handleInputChange('driverAge', e.target.value)}
              className={cn("h-12", errors.driverAge && "border-red-500")}
            />
            {errors.driverAge && (
              <p className="text-sm text-red-500">{errors.driverAge}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="car-type-desktop" className="flex items-center gap-2 text-sm font-medium">
              <Car className="h-4 w-4" />
              Car Type
            </Label>
            <Select value={formData.carType} onValueChange={(value) => handleInputChange('carType', value)}>
              <SelectTrigger className={cn("h-12", errors.carType && "border-red-500")}>
                <SelectValue placeholder="Select car type" />
              </SelectTrigger>
              <SelectContent>
                {carTypes.map((type) => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.carType && (
              <p className="text-sm text-red-500">{errors.carType}</p>
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
          Search Car Rentals
        </Button>
      </form>

      {/* Success Modal */}
      <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-green-600">
              Car Hire Search Submitted!
            </DialogTitle>
          </DialogHeader>
          <div className="text-center py-4">
            <p className="text-gray-600 mb-4">
              We're searching for the best car rental deals for you.
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