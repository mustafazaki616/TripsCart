import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { CalendarIcon, MapPinIcon, UsersIcon, PlaneIcon, HotelIcon, ArrowLeftRightIcon } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { sendAdminEmail } from '@/lib/email';
import { searchAirports, getAirportByCode, getPopularAirports } from '@/data/airports';

interface FlightsHotelsFormData {
  tripType?: 'round' | 'oneway';
  origin?: string;
  destination?: string;
  departDate?: Date;
  returnDate?: Date;
  passengers?: string;
  cabin?: string;
  rooms?: string;
  phone?: string;
  email?: string;
}

const FlightsHotelsBookingForm: React.FC = () => {
  const [data, setData] = useState<FlightsHotelsFormData>({
    tripType: 'round',
    cabin: 'Economy',
    passengers: '1',
    rooms: '1'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const originAirport = data.origin ? getAirportByCode(data.origin) : null;
      const destinationAirport = data.destination ? getAirportByCode(data.destination) : null;
      
      await sendAdminEmail({
        ...data,
        originCity: originAirport?.city,
        destinationCity: destinationAirport?.city
      }, 'Flights & Hotels Booking');
      setShowModal(true);
    } catch (error) {
      console.error('Error sending email:', error);
      setShowModal(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const clearForm = () => {
    setData({
      tripType: 'round',
      cabin: 'Economy',
      passengers: '1',
      rooms: '1'
    });
  };

  const swapLocations = () => {
    setData(prev => ({
      ...prev,
      origin: prev.destination,
      destination: prev.origin
    }));
  };

  const popularAirports = getPopularAirports();

  return (
    <>
      {/* Mobile Compact Layout */}
      <div className="block md:hidden space-y-4 p-4 rounded-2xl bg-card/90 backdrop-blur border shadow-soft">
        {/* Trip Type */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-700">Trip Type</Label>
          <div className="flex bg-secondary/60 rounded-lg p-1">
            <button
              type="button"
              onClick={() => setData(prev => ({ ...prev, tripType: 'round' }))}
              className={cn(
                "flex-1 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                data.tripType === 'round'
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              Round-trip
            </button>
            <button
              type="button"
              onClick={() => setData(prev => ({ ...prev, tripType: 'oneway' }))}
              className={cn(
                "flex-1 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                data.tripType === 'oneway'
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              One Way
            </button>
          </div>
        </div>

        <div className="space-y-3">
          {/* Origin & Destination */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <PlaneIcon className="h-4 w-4" />
                From
              </Label>
              <Select value={data.origin} onValueChange={(value) => setData(prev => ({ ...prev, origin: value }))}>
                <SelectTrigger className="h-10 bg-secondary/60">
                  <SelectValue placeholder="Select origin city" />
                </SelectTrigger>
                <SelectContent>
                  {popularAirports.map((airport) => (
                    <SelectItem key={airport.code} value={airport.code}>
                      {airport.city}, {airport.country} ({airport.code})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <PlaneIcon className="h-4 w-4" />
                To
              </Label>
              <Select value={data.destination} onValueChange={(value) => setData(prev => ({ ...prev, destination: value }))}>
                <SelectTrigger className="h-10 bg-secondary/60">
                  <SelectValue placeholder="Select destination city" />
                </SelectTrigger>
                <SelectContent>
                  {popularAirports.map((airport) => (
                    <SelectItem key={airport.code} value={airport.code}>
                      {airport.city}, {airport.country} ({airport.code})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Flight Dates */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">Departure Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full h-10 justify-start text-left font-normal bg-secondary/60",
                      !data.departDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {data.departDate ? format(data.departDate, "PPP") : "Select departure date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={data.departDate}
                    onSelect={(date) => setData(prev => ({ ...prev, departDate: date }))}
                    disabled={(date) => date < new Date()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            {data.tripType === 'round' && (
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">Return Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full h-10 justify-start text-left font-normal bg-secondary/60",
                        !data.returnDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {data.returnDate ? format(data.returnDate, "PPP") : "Select return date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={data.returnDate}
                      onSelect={(date) => setData(prev => ({ ...prev, returnDate: date }))}
                      disabled={(date) => date < new Date() || (data.departDate && date <= data.departDate)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            )}
          </div>



          {/* Passengers, Cabin & Rooms */}
          <div className="grid grid-cols-3 gap-3">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <UsersIcon className="h-4 w-4" />
                Passengers
              </Label>
              <Select value={data.passengers} onValueChange={(value) => setData(prev => ({ ...prev, passengers: value }))}>
                <SelectTrigger className="h-10 bg-secondary/60">
                  <SelectValue placeholder="1" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1</SelectItem>
                  <SelectItem value="2">2</SelectItem>
                  <SelectItem value="3">3</SelectItem>
                  <SelectItem value="4">4</SelectItem>
                  <SelectItem value="5">5</SelectItem>
                  <SelectItem value="6+">6+</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">Cabin</Label>
              <Select value={data.cabin} onValueChange={(value) => setData(prev => ({ ...prev, cabin: value }))}>
                <SelectTrigger className="h-10 bg-secondary/60">
                  <SelectValue placeholder="Economy" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Economy">Economy</SelectItem>
                  <SelectItem value="Premium Economy">Premium</SelectItem>
                  <SelectItem value="Business">Business</SelectItem>
                  <SelectItem value="First">First</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">Rooms</Label>
              <Select value={data.rooms} onValueChange={(value) => setData(prev => ({ ...prev, rooms: value }))}>
                <SelectTrigger className="h-10 bg-secondary/60">
                  <SelectValue placeholder="1" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1</SelectItem>
                  <SelectItem value="2">2</SelectItem>
                  <SelectItem value="3">3</SelectItem>
                  <SelectItem value="4">4</SelectItem>
                  <SelectItem value="5+">5+</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Contact Information */}
          <div className="grid grid-cols-2 gap-3 pt-2 border-t">
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-sm font-medium text-gray-700">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="UK Numbers Only"
                value={data.phone || ""}
                onChange={(e) => setData(prev => ({ ...prev, phone: e.target.value }))}
                className="h-10 bg-secondary/60"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-gray-700">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="Email (Optional)"
                value={data.email || ""}
                onChange={(e) => setData(prev => ({ ...prev, email: e.target.value }))}
                className="h-10 bg-secondary/60"
              />
            </div>
          </div>
        </div>
        
        {/* Search button - Mobile */}
        <Button 
          type="submit" 
          disabled={isSubmitting} 
          className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
          onClick={handleSubmit}
        >
          {isSubmitting ? "Searching Flights & Hotels..." : "Search Flights & Hotels"}
        </Button>
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:block space-y-6 p-6 rounded-2xl bg-card/90 backdrop-blur border shadow-soft">
        {/* Trip Type */}
        <div className="flex items-center justify-between">
          <div className="flex bg-secondary/60 rounded-lg p-1">
            <button
              type="button"
              onClick={() => setData(prev => ({ ...prev, tripType: 'round' }))}
              className={cn(
                "px-4 py-2 rounded-md text-sm font-medium transition-colors",
                data.tripType === 'round'
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              Round-trip
            </button>
            <button
              type="button"
              onClick={() => setData(prev => ({ ...prev, tripType: 'oneway' }))}
              className={cn(
                "px-4 py-2 rounded-md text-sm font-medium transition-colors",
                data.tripType === 'oneway'
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              One Way
            </button>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <UsersIcon className="h-4 w-4" />
                Passengers
              </Label>
              <Select value={data.passengers} onValueChange={(value) => setData(prev => ({ ...prev, passengers: value }))}>
                <SelectTrigger className="w-24 h-10 bg-secondary/60">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1</SelectItem>
                  <SelectItem value="2">2</SelectItem>
                  <SelectItem value="3">3</SelectItem>
                  <SelectItem value="4">4</SelectItem>
                  <SelectItem value="5">5</SelectItem>
                  <SelectItem value="6+">6+</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center gap-2">
              <Label className="text-sm font-medium text-gray-700">Cabin</Label>
              <Select value={data.cabin} onValueChange={(value) => setData(prev => ({ ...prev, cabin: value }))}>
                <SelectTrigger className="w-32 h-10 bg-secondary/60">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Economy">Economy</SelectItem>
                  <SelectItem value="Premium Economy">Premium</SelectItem>
                  <SelectItem value="Business">Business</SelectItem>
                  <SelectItem value="First">First</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center gap-2">
              <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <HotelIcon className="h-4 w-4" />
                Rooms
              </Label>
              <Select value={data.rooms} onValueChange={(value) => setData(prev => ({ ...prev, rooms: value }))}>
                <SelectTrigger className="w-20 h-10 bg-secondary/60">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1</SelectItem>
                  <SelectItem value="2">2</SelectItem>
                  <SelectItem value="3">3</SelectItem>
                  <SelectItem value="4">4</SelectItem>
                  <SelectItem value="5+">5+</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Flight booking fields */}
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Origin */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <PlaneIcon className="h-4 w-4" />
                From
              </Label>
              <Select value={data.origin} onValueChange={(value) => setData(prev => ({ ...prev, origin: value }))}>
                <SelectTrigger className="h-12 bg-secondary/60">
                  <SelectValue placeholder="Select origin city" />
                </SelectTrigger>
                <SelectContent>
                  {popularAirports.map((airport) => (
                    <SelectItem key={airport.code} value={airport.code}>
                      {airport.city}, {airport.country} ({airport.code})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Destination */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <PlaneIcon className="h-4 w-4" />
                To
              </Label>
              <Select value={data.destination} onValueChange={(value) => setData(prev => ({ ...prev, destination: value }))}>
                <SelectTrigger className="h-12 bg-secondary/60">
                  <SelectValue placeholder="Select destination city" />
                </SelectTrigger>
                <SelectContent>
                  {popularAirports.map((airport) => (
                    <SelectItem key={airport.code} value={airport.code}>
                      {airport.city}, {airport.country} ({airport.code})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Swap Button */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-full bg-background border-2"
              onClick={swapLocations}
            >
              <ArrowLeftRightIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Date fields */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Departure Date */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">Departure Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full h-12 justify-start text-left font-normal bg-secondary/60",
                    !data.departDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {data.departDate ? format(data.departDate, "PPP") : "Select departure date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={data.departDate}
                  onSelect={(date) => setData(prev => ({ ...prev, departDate: date }))}
                  disabled={(date) => date < new Date()}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Return Date */}
          {data.tripType === 'round' && (
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">Return Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full h-12 justify-start text-left font-normal bg-secondary/60",
                      !data.returnDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {data.returnDate ? format(data.returnDate, "PPP") : "Select return date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={data.returnDate}
                    onSelect={(date) => setData(prev => ({ ...prev, returnDate: date }))}
                    disabled={(date) => date < new Date() || (data.departDate && date <= data.departDate)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          )}


        </div>

        {/* Contact Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="phone-desktop" className="text-sm font-medium text-gray-700">Phone Number</Label>
            <Input
              id="phone-desktop"
              type="tel"
              placeholder="UK Numbers Only"
              value={data.phone || ""}
              onChange={(e) => setData(prev => ({ ...prev, phone: e.target.value }))}
              className="h-12 bg-secondary/60"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email-desktop" className="text-sm font-medium text-gray-700">Email Address</Label>
            <Input
              id="email-desktop"
              type="email"
              placeholder="Email (Optional)"
              value={data.email || ""}
              onChange={(e) => setData(prev => ({ ...prev, email: e.target.value }))}
              className="h-12 bg-secondary/60"
            />
          </div>
        </div>
        
        {/* Search button - Desktop */}
        <Button 
          type="submit" 
          disabled={isSubmitting} 
          className="w-full h-14 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-base"
          onClick={handleSubmit}
        >
          {isSubmitting ? "Searching Flights & Hotels..." : "Search Flights & Hotels"}
        </Button>
      </div>

      {/* Success Modal */}
      <Dialog open={showModal} onOpenChange={(open) => { if (!open) { setShowModal(false); clearForm(); } }}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Flights & Hotels Request Submitted!</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">Thank you for your flights and hotels booking request. Our travel experts will review your requirements and contact you within 24 hours with personalized options and pricing.</p>
          <div className="mt-4 flex justify-end">
            <Button onClick={() => { setShowModal(false); clearForm(); }}>Close</Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default FlightsHotelsBookingForm;
