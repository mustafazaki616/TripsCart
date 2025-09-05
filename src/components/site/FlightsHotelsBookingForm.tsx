import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { CalendarIcon, MapPinIcon, UsersIcon, PlaneIcon, HotelIcon, ArrowLeftRightIcon, X } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { sendAdminEmail } from '@/lib/email';
import { searchAirports, getAirportByCode, type Airport } from '@/data/airports';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
 import { PassengerModal, type PassengerCounts } from './PassengerModal';

interface FlightsHotelsFormData {
  tripType?: 'round' | 'oneway';
  origin?: string;
  destination?: string;
  departDate?: Date;
  returnDate?: Date;
  adults: number;
  children: number;
  infants: number;
  cabin?: string;
  rooms?: string;
  phone?: string;
  email?: string;
}

// Airport Autocomplete Component (consistent with BookingForm)
interface AirportAutocompleteProps {
  value?: string;
  onValueChange: (value: string) => void;
  placeholder: string;
  icon: React.ReactNode;
  label?: string;
  id: string;
  name?: string;
  autoComplete?: string;
}

const AirportAutocomplete: React.FC<AirportAutocompleteProps> = ({ value, onValueChange, placeholder, icon, label, id, name, autoComplete }) => {
  const [open, setOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [filteredAirports, setFilteredAirports] = React.useState<Airport[]>([]);

  const selectedAirport = value ? getAirportByCode(value) : null;
  const displayText = selectedAirport ? `${selectedAirport.code} - ${selectedAirport.name}` : '';

  React.useEffect(() => {
    if (searchQuery.length > 0) {
      const results = searchAirports(searchQuery).slice(0, 10);
      setFilteredAirports(results);
    } else {
      setFilteredAirports([]);
    }
  }, [searchQuery]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <div className="relative">
        <PopoverTrigger asChild>
          <Input
            id={id}
            readOnly
            value={displayText}
            placeholder={placeholder}
            autoComplete={autoComplete ?? 'off'}
            role="combobox"
            aria-expanded={open}
            aria-haspopup="listbox"
            aria-controls={`${id}-list`}
            className="h-16 md:h-12 w-full px-3 pl-8 text-sm rounded-md bg-secondary/60 border-input text-left"
          />
        </PopoverTrigger>
        <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2">
          {icon}
        </div>
      </div>
      <PopoverContent className="w-[340px] p-0" align="start">
        {label && (
          <div className="flex items-center justify-between px-3 py-2 border-b bg-background">
            <span className="text-xs text-muted-foreground">{label}</span>
            <button type="button" aria-label="Close" onClick={() => setOpen(false)} className="p-1 hover:opacity-80">
              <X className="h-3.5 w-3.5 opacity-60" />
            </button>
          </div>
        )}
        <Command shouldFilter={false}>
          <CommandInput
            id={`${id}-input`}
            placeholder="Search city or airport..."
            value={searchQuery}
            onValueChange={setSearchQuery}
            autoComplete={autoComplete ?? 'off'}
            aria-controls={`${id}-list`}
          />
          <CommandList id={`${id}-list`}>
            {searchQuery.length === 0 ? (
              <div className="p-4 text-sm text-muted-foreground text-center">
                Start typing to search airports...
              </div>
            ) : filteredAirports.length === 0 ? (
              <CommandEmpty>No airports found.</CommandEmpty>
            ) : (
              <CommandGroup>
                {filteredAirports.map((airport) => (
                  <CommandItem
                    key={airport.code}
                    value={`${airport.code} ${airport.city} ${airport.country} ${airport.name}`}
                    onSelect={() => {
                      onValueChange(airport.code);
                      setOpen(false);
                      setSearchQuery('');
                    }}
                    className="cursor-pointer"
                  >
                    <div className="flex flex-col">
                      <div className="text-sm"><span className="font-semibold">{airport.code}</span> - {airport.name}</div>
                      <div className="text-xs text-muted-foreground">{airport.city}, {airport.country.toUpperCase()}</div>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
        <input type="hidden" id={`${id}-value`} name={name} autoComplete={autoComplete ?? 'off'} value={value ?? ''} />
      </PopoverContent>
    </Popover>
  );
};

const FlightsHotelsBookingForm: React.FC = () => {
  const [data, setData] = useState<FlightsHotelsFormData>({
    tripType: 'round',
    cabin: 'Economy',
    adults: 1,
    children: 0,
    infants: 0,
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
      
      const emailData = {
        name: '', // Will be handled by the email template
        email: data.email || '',
        phone: data.phone || '',
        departureDate: data.departDate,
        returnDate: data.returnDate,
        departureCity: originAirport ? `${originAirport.city}, ${originAirport.country} (${data.origin})` : data.origin || '',
        destinationCity: destinationAirport ? `${destinationAirport.city}, ${destinationAirport.country} (${data.destination})` : data.destination || '',
        adults: data.adults,
        children: data.children,
        infants: data.infants,
        class: data.cabin,
        message: `Trip Type: ${data.tripType}, Rooms: ${data.rooms}`
      };
      
      await sendAdminEmail(emailData, 'Flights & Hotels Booking');
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
      adults: 1,
      children: 0,
      infants: 0,
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

  // const popularAirports = getPopularAirports(); // removed in favor of typeahead search

  return (
    <>
      {/* Mobile Layout - Matching desired.html structure */}
      <div className="block md:hidden">
        {/* Trip Type Radio Buttons */}
        <div className="py-2">
          <div className="flex gap-4 justify-center">
            <label className="flex items-center gap-2" htmlFor="tripType-round">
              <input 
                id="tripType-round"
                type="radio" 
                name="tripType" 
                value="round" 
                checked={data.tripType === "round"}
                onChange={(e) => setData(prev => ({ ...prev, tripType: e.target.value as 'round' | 'oneway' }))}
                className="w-4 h-4"
              />
              <span className="text-sm">Round-trip</span>
            </label>
            <label className="flex items-center gap-2" htmlFor="tripType-oneway">
              <input 
                id="tripType-oneway"
                type="radio" 
                name="tripType" 
                value="oneway" 
                checked={data.tripType === "oneway"}
                onChange={(e) => setData(prev => ({ ...prev, tripType: e.target.value as 'round' | 'oneway' }))}
                className="w-4 h-4"
              />
              <span className="text-sm">One Way</span>
            </label>
          </div>
        </div>

        {/* Travelers, Cabin Class and Rooms Dropdowns */}
        <div className="py-2">
          <div className="flex gap-2 justify-center flex-wrap">
            <div className="min-w-[120px]">
              <PassengerModal
                passengers={{
                  adults: data.adults,
                  children: data.children,
                  infants: data.infants
                }}
                onPassengersChange={(passengers: PassengerCounts) => {
                  setData(prev => ({ ...prev, ...passengers }));
                }}
                className="h-16 px-3 text-sm rounded-md bg-secondary/60"
              />
            </div>
            <div className="min-w-[100px]">
              <Select value={data.cabin} onValueChange={(value) => setData(prev => ({ ...prev, cabin: value }))}>
                <SelectTrigger className="h-16 px-3 text-sm rounded-md bg-secondary/60" id="cabin-class" name="cabin">
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
            <div className="min-w-[90px]">
              <Select value={data.rooms} onValueChange={(value) => setData(prev => ({ ...prev, rooms: value }))}>
                <SelectTrigger className="h-16 px-3 text-sm rounded-md bg-secondary/60" id="hotel-rooms" name="rooms">
                  <SelectValue placeholder="1" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 Room</SelectItem>
                  <SelectItem value="2">2 Rooms</SelectItem>
                  <SelectItem value="3">3 Rooms</SelectItem>
                  <SelectItem value="4">4 Rooms</SelectItem>
                  <SelectItem value="5+">5+ Rooms</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Form Fields Grid - Using desired.html structure */}
        <div className="py-2">
          <div className="grid grid-cols-2 gap-1">
            {/* Fly From */}
            <div className="p-1">
              <div className="relative">
                <label className="text-xs text-gray-500 mb-1 block" htmlFor="flight-origin">Fly From</label>
                <AirportAutocomplete
                  id="flight-origin"
                  name="origin"
                  autoComplete="off"
                  value={data.origin}
                  onValueChange={(value) => setData(prev => ({ ...prev, origin: value }))}
                  placeholder="Enter city or airport..."
                  icon={<PlaneIcon className="mr-2 h-4 w-4 opacity-70" />}
                  label="Fly From"
                />
              </div>
            </div>

            {/* Fly To */}
            <div className="p-1">
              <div className="relative">
                <label className="text-xs text-gray-500 mb-1 block" htmlFor="flight-destination">Fly To</label>
                <AirportAutocomplete
                  id="flight-destination"
                  name="destination"
                  autoComplete="off"
                  value={data.destination}
                  onValueChange={(value) => setData(prev => ({ ...prev, destination: value }))}
                  placeholder="Enter city or airport..."
                  icon={<ArrowLeftRightIcon className="mr-2 h-4 w-4 opacity-70" />}
                  label="Fly To"
                />
              </div>
            </div>

            {/* Departure Date */}
            <div className="p-1">
              <div className="relative">
                <label className="text-xs text-gray-500 mb-1 block" htmlFor="departure-date-mobile">Departure Date</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      id="departure-date-mobile"
                      variant="outline"
                      className={cn(
                        "h-16 w-full px-3 text-sm rounded-md bg-secondary/60 justify-start text-left font-normal",
                        !data.departDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {data.departDate ? format(data.departDate, "dd/MM/yyyy") : "Departure"}
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
            </div>

            {/* Return Date */}
            {data.tripType === "round" && (
              <div className="p-1">
                <div className="relative">
                  <label className="text-xs text-gray-500 mb-1 block" htmlFor="return-date-mobile">Return Date</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        id="return-date-mobile"
                        variant="outline"
                        className={cn(
                          "h-16 w-full px-3 text-sm rounded-md bg-secondary/60 justify-start text-left font-normal",
                          !data.returnDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {data.returnDate ? format(data.returnDate, "dd/MM/yyyy") : "Returning"}
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
              </div>
            )}

            {/* Phone Number */}
            <div className="p-1">
              <div className="relative">
                <label className="text-xs text-gray-500 mb-1 block" htmlFor="phone">Phone Number</label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="UK Number Only"
                  value={data.phone || ""}
                  onChange={(e) => setData(prev => ({ ...prev, phone: e.target.value }))}
                  className="h-12 w-full px-3 text-sm rounded-md bg-secondary/60"
                  autoComplete="tel"
                  inputMode="tel"
                />
              </div>
            </div>

            {/* Email Address */}
            <div className="p-1">
              <div className="relative">
                <label className="text-xs text-gray-500 mb-1 block" htmlFor="email">Email Address</label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Email (Optional)"
                  value={data.email || ""}
                  onChange={(e) => setData(prev => ({ ...prev, email: e.target.value }))}
                  className="h-12 w-full px-3 text-sm rounded-md bg-secondary/60"
                  autoComplete="email"
                  inputMode="email"
                />
              </div>
            </div>
          </div>
        </div>
        {/* Search Button */}
        <div className="flex pt-4 justify-center">
          <Button 
            type="submit" 
            disabled={isSubmitting} 
            className="px-8 h-12 bg-primary hover:bg-primary/90 text-primary-foreground text-base font-semibold"
            onClick={handleSubmit}
          >
            {isSubmitting ? "Searching..." : "Search Flights & Hotels"}
          </Button>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:block space-y-6">
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
              <Label className="text-sm font-medium text-gray-700 flex items-center gap-2" htmlFor="passengers-desktop">
                <UsersIcon className="h-4 w-4" />
                Passengers
              </Label>
              <Select value={data.passengers} onValueChange={(value) => setData(prev => ({ ...prev, passengers: value }))}>
                <SelectTrigger className="w-24 h-10 bg-secondary/60" id="passengers-desktop" name="passengers">
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
              <Label className="text-sm font-medium text-gray-700" htmlFor="cabin-desktop">Cabin</Label>
              <Select value={data.cabin} onValueChange={(value) => setData(prev => ({ ...prev, cabin: value }))}>
                <SelectTrigger className="w-32 h-10 bg-secondary/60" id="cabin-desktop" name="cabin">
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
              <Label className="text-sm font-medium text-gray-700 flex items-center gap-2" htmlFor="rooms-desktop">
                <HotelIcon className="h-4 w-4" />
                Rooms
              </Label>
              <Select value={data.rooms} onValueChange={(value) => setData(prev => ({ ...prev, rooms: value }))}>
                <SelectTrigger className="w-20 h-10 bg-secondary/60" id="rooms-desktop" name="rooms">
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-3 lg:gap-4">
            {/* Origin */}
            <div className="space-y-2 lg:col-span-6">
              <Label className="text-sm font-medium text-gray-700 flex items-center gap-2" htmlFor="origin-desktop">
                <PlaneIcon className="h-4 w-4" />
                From
              </Label>
              <AirportAutocomplete
                id="origin-desktop"
                name="origin"
                autoComplete="off"
                value={data.origin}
                onValueChange={(value) => setData(prev => ({ ...prev, origin: value }))}
                placeholder="Enter city or airport..."
                icon={<PlaneIcon className="mr-2 h-4 w-4 opacity-70" />}
                label="From"
              />
            </div>
            {/* Destination */}
            <div className="space-y-2 lg:col-span-6">
              <Label className="text-sm font-medium text-gray-700 flex items-center gap-2" htmlFor="destination-desktop">
                <PlaneIcon className="h-4 w-4" />
                To
              </Label>
              <AirportAutocomplete
                id="destination-desktop"
                name="destination"
                autoComplete="off"
                value={data.destination}
                onValueChange={(value) => setData(prev => ({ ...prev, destination: value }))}
                placeholder="Enter city or airport..."
                icon={<ArrowLeftRightIcon className="mr-2 h-4 w-4 opacity-70" />}
                label="To"
              />
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-3 lg:gap-4">
          {/* Departure Date */}
          <div className="space-y-2 lg:col-span-6">
            <Label className="text-sm font-medium text-gray-700" htmlFor="departure-date-desktop">Departure Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="departure-date-desktop"
                  variant="outline"
                  className={cn(
                    "w-full h-12 justify-start text-left font-normal bg-secondary/60",
                    !data.departDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {data.departDate ? format(data.departDate, "PPP") : "Departure"}
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
            <div className="space-y-2 lg:col-span-6">
              <Label className="text-sm font-medium text-gray-700" htmlFor="return-date-desktop">Return Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="return-date-desktop"
                    variant="outline"
                    className={cn(
                      "w-full h-12 justify-start text-left font-normal bg-secondary/60",
                      !data.returnDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {data.returnDate ? format(data.returnDate, "PPP") : "Return"}
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-3 lg:gap-4">
          <div className="space-y-2 lg:col-span-6">
            <Label htmlFor="phone-desktop" className="text-sm font-medium text-gray-700">Phone Number</Label>
            <Input
              id="phone-desktop"
              name="phone"
              type="tel"
              placeholder="UK Numbers Only"
              value={data.phone || ""}
              onChange={(e) => setData(prev => ({ ...prev, phone: e.target.value }))}
              className="h-12 bg-secondary/60"
              autoComplete="tel"
              inputMode="tel"
            />
          </div>
          <div className="space-y-2 lg:col-span-6">
            <Label htmlFor="email-desktop" className="text-sm font-medium text-gray-700">Email Address</Label>
            <Input
              id="email-desktop"
              name="email"
              type="email"
              placeholder="Email (Optional)"
              value={data.email || ""}
              onChange={(e) => setData(prev => ({ ...prev, email: e.target.value }))}
              className="h-12 bg-secondary/60"
              autoComplete="email"
              inputMode="email"
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
