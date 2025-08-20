import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { CalendarIcon, MapPinIcon, UsersIcon } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { sendAdminEmail } from '@/lib/email';

interface HotelsFormData {
  destination?: string;
  checkIn?: Date;
  checkOut?: Date;
  guests?: string;
  rooms?: string;
  name?: string;
  phone?: string;
  email?: string;
}

const HotelsBookingForm: React.FC = () => {
  const [data, setData] = useState<HotelsFormData>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Send email to admin with form details
      await sendAdminEmail(data, 'Hotel Booking');
      setShowModal(true);
    } catch (error) {
      console.error('Error sending email:', error);
      setShowModal(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const clearForm = () => {
    setData({});
  };

  return (
    <>
      {/* Mobile Compact Layout */}
      <div className="block md:hidden space-y-3 p-2 rounded-2xl bg-card/90 backdrop-blur border shadow-soft">
        {/* Destination - Full Width */}
        <div>
          <label className="text-xs text-gray-500 mb-1 block">Destination</label>
          <Input
            id="destination"
            type="text"
            placeholder="Enter destination"
            value={data.destination || ""}
            onChange={(e) => setData((d) => ({ ...d, destination: e.target.value }))}
            className="h-12 w-full px-3 text-sm rounded-md bg-secondary/60 placeholder:text-xs"
          />
        </div>

        {/* Check-in + Check-out Dates - Two Column Grid */}
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="text-xs text-gray-500 mb-1 block">Check-in Date</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "h-12 w-full px-3 text-sm rounded-md bg-secondary/60 justify-start text-left font-normal",
                    !data.checkIn && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {data.checkIn ? format(data.checkIn, "dd/MM/yyyy") : "dd/mm/yyyy"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={data.checkIn}
                  onSelect={(date) => setData((d) => ({ ...d, checkIn: date }))}
                  disabled={(date) => date < new Date()}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          <div>
            <label className="text-xs text-gray-500 mb-1 block">Check-out Date</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "h-12 w-full px-3 text-sm rounded-md bg-secondary/60 justify-start text-left font-normal",
                    !data.checkOut && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {data.checkOut ? format(data.checkOut, "dd/MM/yyyy") : "dd/mm/yyyy"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={data.checkOut}
                  onSelect={(date) => setData((d) => ({ ...d, checkOut: date }))}
                  disabled={(date) => date < new Date() || (data.checkIn && date <= data.checkIn)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* Guests + Rooms - Two Column Grid */}
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="text-xs text-gray-500 mb-1 block">Guests</label>
            <Select value={data.guests} onValueChange={(value) => setData((d) => ({ ...d, guests: value }))}>
              <SelectTrigger className="h-12 w-full px-3 text-sm rounded-md bg-secondary/60">
                <SelectValue placeholder="Guests" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1 Guest</SelectItem>
                <SelectItem value="2">2 Guests</SelectItem>
                <SelectItem value="3">3 Guests</SelectItem>
                <SelectItem value="4">4 Guests</SelectItem>
                <SelectItem value="5">5 Guests</SelectItem>
                <SelectItem value="6+">6+ Guests</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-xs text-gray-500 mb-1 block">Rooms</label>
            <Select value={data.rooms} onValueChange={(value) => setData((d) => ({ ...d, rooms: value }))}>
              <SelectTrigger className="h-12 w-full px-3 text-sm rounded-md bg-secondary/60">
                <SelectValue placeholder="Rooms" />
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

        {/* Full Name - Full Width */}
        <div>
          <label className="text-xs text-gray-500 mb-1 block">Full Name</label>
          <Input
            id="name"
            type="text"
            placeholder="Enter your full name"
            value={data.name || ""}
            onChange={(e) => setData((d) => ({ ...d, name: e.target.value }))}
            className="h-12 w-full px-3 text-sm rounded-md bg-secondary/60 placeholder:text-xs"
          />
        </div>

        {/* Phone + Email - Two Column Grid */}
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="text-xs text-gray-500 mb-1 block">Phone Number</label>
            <Input
              id="phone"
              type="tel"
              placeholder="UK Numbers Only"
              value={data.phone || ""}
              onChange={(e) => setData((d) => ({ ...d, phone: e.target.value }))}
              className="h-12 w-full px-3 text-sm rounded-md bg-secondary/60 placeholder:text-xs"
            />
          </div>
          <div>
            <label className="text-xs text-gray-500 mb-1 block">Email Address</label>
            <Input
              id="email"
              type="email"
              placeholder="Email (Optional)"
              value={data.email || ""}
              onChange={(e) => setData((d) => ({ ...d, email: e.target.value }))}
              className="h-12 w-full px-3 text-sm rounded-md bg-secondary/60 placeholder:text-xs"
            />
          </div>
        </div>
        
        {/* Search Button - Full Width */}
        <Button 
          type="submit" 
          disabled={isSubmitting} 
          className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground text-base font-semibold"
          onClick={handleSubmit}
        >
          {isSubmitting ? "Searching Hotels..." : "Search Hotels"}
        </Button>
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:block space-y-6 p-6 rounded-2xl bg-card/90 backdrop-blur border shadow-soft">
        {/* Main booking fields */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Destination */}
          <div className="space-y-2">
            <Label htmlFor="destination-desktop" className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <MapPinIcon className="h-4 w-4" />
              Destination
            </Label>
            <Input
              id="destination-desktop"
              type="text"
              placeholder="Enter destination"
              value={data.destination || ""}
              onChange={(e) => setData((d) => ({ ...d, destination: e.target.value }))}
              className="h-12 bg-secondary/60"
            />
          </div>

          {/* Check-in Date */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">Check-in Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full h-12 justify-start text-left font-normal bg-secondary/60",
                    !data.checkIn && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {data.checkIn ? format(data.checkIn, "PPP") : "Select check-in date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={data.checkIn}
                  onSelect={(date) => setData((d) => ({ ...d, checkIn: date }))}
                  disabled={(date) => date < new Date()}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Check-out Date */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">Check-out Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full h-12 justify-start text-left font-normal bg-secondary/60",
                    !data.checkOut && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {data.checkOut ? format(data.checkOut, "PPP") : "Select check-out date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={data.checkOut}
                  onSelect={(date) => setData((d) => ({ ...d, checkOut: date }))}
                  disabled={(date) => date < new Date() || (data.checkIn && date <= data.checkIn)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Guests & Rooms */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <UsersIcon className="h-4 w-4" />
              Guests & Rooms
            </Label>
            <div className="grid grid-cols-2 gap-2">
              <Select value={data.guests} onValueChange={(value) => setData((d) => ({ ...d, guests: value }))}>
                <SelectTrigger className="h-12 bg-secondary/60">
                  <SelectValue placeholder="Guests" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 Guest</SelectItem>
                  <SelectItem value="2">2 Guests</SelectItem>
                  <SelectItem value="3">3 Guests</SelectItem>
                  <SelectItem value="4">4 Guests</SelectItem>
                  <SelectItem value="5">5 Guests</SelectItem>
                  <SelectItem value="6+">6+ Guests</SelectItem>
                </SelectContent>
              </Select>
              <Select value={data.rooms} onValueChange={(value) => setData((d) => ({ ...d, rooms: value }))}>
                <SelectTrigger className="h-12 bg-secondary/60">
                  <SelectValue placeholder="Rooms" />
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

        {/* Contact Information */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name-desktop" className="text-sm font-medium text-gray-700">Full Name</Label>
            <Input
              id="name-desktop"
              type="text"
              placeholder="Enter your full name"
              value={data.name || ""}
              onChange={(e) => setData((d) => ({ ...d, name: e.target.value }))}
              className="h-12 bg-secondary/60"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone-desktop" className="text-sm font-medium text-gray-700">Phone Number</Label>
            <Input
              id="phone-desktop"
              type="tel"
              placeholder="Enter phone number"
              value={data.phone || ""}
              onChange={(e) => setData((d) => ({ ...d, phone: e.target.value }))}
              className="h-12 bg-secondary/60"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email-desktop" className="text-sm font-medium text-gray-700">Email Address</Label>
            <Input
              id="email-desktop"
              type="email"
              placeholder="Enter email address"
              value={data.email || ""}
              onChange={(e) => setData((d) => ({ ...d, email: e.target.value }))}
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
          {isSubmitting ? "Searching Hotels..." : "Search Hotels"}
        </Button>
      </div>

      {/* Success Modal */}
      <Dialog open={showModal} onOpenChange={(open) => { if (!open) { setShowModal(false); clearForm(); } }}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Hotel Booking Request Submitted!</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">Thank you for your hotel booking request. Our travel experts will review your requirements and contact you within 24 hours with personalized options and pricing.</p>
          <div className="mt-4 flex justify-end">
            <Button onClick={() => { setShowModal(false); clearForm(); }}>Close</Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default HotelsBookingForm;
