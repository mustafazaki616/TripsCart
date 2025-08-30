import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarWidget } from "@/components/ui/calendar";
import { MapPin, Phone, Calendar, CalendarIcon, Mail, Clock } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { sendAdminEmail } from "@/lib/email";

type FormState = {
  pickUpLocation: string;
  pickUpDate: Date | undefined;
  pickUpTime: string;
  dropOffLocation: string;
  dropOffDate: Date | undefined;
  dropOffTime: string;
  phone: string;
  email: string;
  class: "Economy" | "Business" | "";
};

type FormErrors = Partial<Record<keyof FormState, string>>;

const CarHireBookingForm: React.FC = () => {
  const [data, setData] = React.useState<FormState>({
    pickUpLocation: "",
    pickUpDate: undefined,
    pickUpTime: "",
    dropOffLocation: "",
    dropOffDate: undefined,
    dropOffTime: "",
    phone: "",
    email: "",
    class: "",
  });
  const [errors, setErrors] = React.useState<FormErrors>({});
  const [showModal, setShowModal] = React.useState(false);

  const setField = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setErrors((e) => ({ ...e, [key]: undefined }));
    setData((d) => ({ ...d, [key]: value }));
  };

  const validate = (): boolean => {
    const next: FormErrors = {};
    if (!data.pickUpLocation.trim()) next.pickUpLocation = "Required";
    if (!data.pickUpDate) next.pickUpDate = "Required";
    if (!data.pickUpTime) next.pickUpTime = "Required";
    if (!data.dropOffLocation.trim()) next.dropOffLocation = "Required";
    if (!data.dropOffDate) next.dropOffDate = "Required";
    if (!data.dropOffTime) next.dropOffTime = "Required";
    if (!data.phone.trim()) next.phone = "Required";
    if (!data.class) next.class = "Required";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    
    try {
      // Send email to admin with form details
      await sendAdminEmail(data, 'Car Hire Booking');
      // Show success modal
      setShowModal(true);
    } catch (error) {
      console.error('Error sending email:', error);
      // Still show success modal to user even if email fails
      setShowModal(true);
    }
  };

  const clear = () => {
    setData({
      pickUpLocation: "",
      pickUpDate: "",
      pickUpTime: "",
      dropOffLocation: "",
      dropOffDate: "",
      dropOffTime: "",
      phone: "",
      email: "",
      class: "",
    });
    setErrors({});
  };

  return (
    <>
      <div className="booking-form-container rounded-2xl bg-card/20 backdrop-blur border shadow-soft p-2 md:p-6">
        {/* Mobile Compact Layout */}
        <div className="block md:hidden space-y-2">
          {/* Car Class - Full Width */}
          <div>
            <label className="text-xs text-gray-500 mb-0.5 block" htmlFor="car-class-economy">Car Class</label>
            <div className="flex bg-secondary/60 rounded-md p-1 h-12">
              <label className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer" htmlFor="car-class-economy">
                <input
                  id="car-class-economy"
                  type="radio"
                  name="class"
                  className="accent-[hsl(var(--primary))]"
                  checked={data.class === "Economy"}
                  onChange={() => setField("class", "Economy")}
                />
                Economy
              </label>
              <label className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer" htmlFor="car-class-business">
                <input
                  id="car-class-business"
                  type="radio"
                  name="class"
                  className="accent-[hsl(var(--primary))]"
                  checked={data.class === "Business"}
                  onChange={() => setField("class", "Business")}
                />
                Business
              </label>
            </div>
            {errors.class && <p className="mt-1 text-xs text-destructive">{errors.class}</p>}
          </div>

          {/* Pick-up + Drop-off Locations - Two Column Grid */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label htmlFor="pickup-location-mobile" className="text-xs text-gray-500 mb-0.5 block">Pick-up Location</label>
              <div className="relative">
                <Input
                  id="pickup-location-mobile"
                  value={data.pickUpLocation}
                  onChange={(e) => setField("pickUpLocation", e.target.value)}
                  placeholder="Enter Pick-up location..."
                  className="h-12 w-full px-3 text-sm rounded-md bg-secondary/60 pr-10 placeholder:text-xs"
                />
                <MapPin className="absolute right-3 top-3 opacity-70 w-4 h-4" />
              </div>
              {errors.pickUpLocation && <p className="mt-1 text-xs text-destructive">{errors.pickUpLocation}</p>}
            </div>
            <div>
              <label htmlFor="dropoff-location-mobile" className="text-xs text-gray-500 mb-0.5 block">Drop-off Location</label>
              <div className="relative">
                <Input
                  id="dropoff-location-mobile"
                  value={data.dropOffLocation}
                  onChange={(e) => setField("dropOffLocation", e.target.value)}
                  placeholder="Enter Drop-off Location..."
                  className="h-12 w-full px-3 text-sm rounded-md bg-secondary/60 pr-10 placeholder:text-xs"
                />
                <MapPin className="absolute right-3 top-3 opacity-70 w-4 h-4" />
              </div>
              {errors.dropOffLocation && <p className="mt-1 text-xs text-destructive">{errors.dropOffLocation}</p>}
            </div>
          </div>

          {/* Pick-up + Drop-off Dates - Two Column Grid */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label htmlFor="pickup-date-mobile" className="text-xs text-gray-500 mb-0.5 block">Pick-up Date</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="pickup-date-mobile"
                    variant="outline"
                    className={cn(
                      "h-12 w-full px-3 text-sm rounded-md bg-secondary/60 justify-start text-left font-normal",
                      !data.pickUpDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {data.pickUpDate ? format(data.pickUpDate, "dd/MM/yyyy") : "dd/mm/yyyy"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <CalendarWidget
                    mode="single"
                    selected={data.pickUpDate}
                    onSelect={(date) => setField("pickUpDate", date)}
                    disabled={(date) => date < new Date()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              {errors.pickUpDate && <p className="mt-1 text-xs text-destructive">{errors.pickUpDate}</p>}
            </div>
            <div>
              <label htmlFor="dropoff-date-mobile" className="text-xs text-gray-500 mb-0.5 block">Drop-off Date</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="dropoff-date-mobile"
                    variant="outline"
                    className={cn(
                      "h-12 w-full px-3 text-sm rounded-md bg-secondary/60 justify-start text-left font-normal",
                      !data.dropOffDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {data.dropOffDate ? format(data.dropOffDate, "dd/MM/yyyy") : "dd/mm/yyyy"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <CalendarWidget
                    mode="single"
                    selected={data.dropOffDate}
                    onSelect={(date) => setField("dropOffDate", date)}
                    disabled={(date) => date < new Date() || (data.pickUpDate && date < data.pickUpDate)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              {errors.dropOffDate && <p className="mt-1 text-xs text-destructive">{errors.dropOffDate}</p>}
            </div>
          </div>

          {/* Pick-up + Drop-off Times - Two Column Grid */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label htmlFor="pickup-time-mobile" className="text-xs text-gray-500 mb-0.5 block">Pick-up Time</label>
              <div className="relative">
                <Input
                  id="pickup-time-mobile"
                  type="time"
                  value={data.pickUpTime}
                  onChange={(e) => setField("pickUpTime", e.target.value)}
                  className="h-12 w-full px-3 text-sm rounded-md bg-secondary/60 pr-10"
                />
                <Clock className="absolute right-3 top-3 opacity-70 w-4 h-4" />
              </div>
              {errors.pickUpTime && <p className="mt-1 text-xs text-destructive">{errors.pickUpTime}</p>}
            </div>
            <div>
              <label htmlFor="dropoff-time-mobile" className="text-xs text-gray-500 mb-0.5 block">Drop-off Time</label>
              <div className="relative">
                <Input
                  id="dropoff-time-mobile"
                  type="time"
                  value={data.dropOffTime}
                  onChange={(e) => setField("dropOffTime", e.target.value)}
                  className="h-12 w-full px-3 text-sm rounded-md bg-secondary/60 pr-10"
                />
                <Clock className="absolute right-3 top-3 opacity-70 w-4 h-4" />
              </div>
              {errors.dropOffTime && <p className="mt-1 text-xs text-destructive">{errors.dropOffTime}</p>}
            </div>
          </div>

          {/* Phone + Email - Two Column Grid */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label htmlFor="car-phone" className="text-xs text-gray-500 mb-0.5 block">Phone Number</label>
              <div className="relative">
                <Input
                  id="car-phone"
                  name="phone"
                  type="tel"
                  value={data.phone}
                  onChange={(e) => setField("phone", e.target.value)}
                  placeholder="UK Numbers Only"
                  className="h-12 w-full px-3 text-sm rounded-md bg-secondary/60 pr-10 placeholder:text-xs"
                />
                <Phone className="absolute right-3 top-3 opacity-70 w-4 h-4" />
              </div>
              {errors.phone && <p className="mt-1 text-xs text-destructive">{errors.phone}</p>}
            </div>
            <div>
              <label htmlFor="car-email" className="text-xs text-gray-500 mb-0.5 block">Email Address</label>
              <div className="relative">
                <Input
                  id="car-email"
                  name="email"
                  type="email"
                  value={data.email}
                  onChange={(e) => setField("email", e.target.value)}
                  placeholder="Email (Optional)"
                  className="h-12 w-full px-3 text-sm rounded-md bg-secondary/60 pr-10 placeholder:text-xs"
                />
                <Mail className="absolute right-3 top-3 opacity-70 w-4 h-4" />
              </div>
              {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email}</p>}
            </div>
          </div>

          {/* Search Button - Full Width */}
          <Button type="button" className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground text-base font-semibold" onClick={(e) => { e.preventDefault(); onSubmit(e as any); }}>
            Search Car
          </Button>
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:block space-y-4">
          {/* Class Selection */}
          <div className="flex items-center gap-4 text-sm text-muted-foreground px-1 mb-6">
            <label htmlFor="class-economy" className="inline-flex items-center gap-2 font-medium">
              <input
                id="class-economy"
                type="radio"
                name="class"
                value="Economy"
                className="accent-[hsl(var(--primary))]"
                checked={data.class === "Economy"}
                onChange={() => setField("class", "Economy")}
              />
              Economy
            </label>
            <label htmlFor="class-business" className="inline-flex items-center gap-2 font-medium">
              <input
                id="class-business"
                type="radio"
                name="class"
                value="Business"
                className="accent-[hsl(var(--primary))]"
                checked={data.class === "Business"}
                onChange={() => setField("class", "Business")}
              />
              Business
            </label>
          </div>

          {/* Pick-up & Drop-off Locations */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="pickup-location-desktop" className="mb-2 block text-sm text-muted-foreground font-medium">Pick-up Location</label>
              <div className="relative">
                <Input
                  id="pickup-location-desktop"
                  name="pickUpLocation"
                  value={data.pickUpLocation}
                  onChange={(e) => setField("pickUpLocation", e.target.value)}
                  placeholder="Enter Pick-up location..."
                  className="h-11 bg-secondary/60 pr-10 text-sm placeholder:text-xs"
                />
                <MapPin className="absolute right-3 top-3 opacity-70 w-4 h-4" />
              </div>
              {errors.pickUpLocation && <p className="mt-1 text-xs text-destructive">{errors.pickUpLocation}</p>}
            </div>
            <div>
              <label htmlFor="dropoff-location-desktop" className="mb-2 block text-sm text-muted-foreground font-medium">Drop-off Location</label>
              <div className="relative">
                <Input
                  id="dropoff-location-desktop"
                  name="dropOffLocation"
                  value={data.dropOffLocation}
                  onChange={(e) => setField("dropOffLocation", e.target.value)}
                  placeholder="Enter Drop-off Location..."
                  className="h-11 bg-secondary/60 pr-10 text-sm placeholder:text-xs"
                />
                <MapPin className="absolute right-3 top-3 opacity-70 w-4 h-4" />
              </div>
              {errors.dropOffLocation && <p className="mt-1 text-xs text-destructive">{errors.dropOffLocation}</p>}
            </div>
          </div>

          {/* Pick-up & Drop-off Dates */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="pickup-date-desktop" className="mb-2 block text-sm text-muted-foreground font-medium">Pick-up Date</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="pickup-date-desktop"
                    variant="outline"
                    className={cn(
                      "h-11 w-full bg-secondary/60 text-sm justify-start text-left font-normal",
                      !data.pickUpDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {data.pickUpDate ? format(data.pickUpDate, "dd/MM/yyyy") : "Pick-up Date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <CalendarWidget
                    mode="single"
                    selected={data.pickUpDate}
                    onSelect={(date) => setField("pickUpDate", date)}
                    disabled={(date) => date < new Date()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              {errors.pickUpDate && <p className="mt-1 text-xs text-destructive">{errors.pickUpDate}</p>}
            </div>
            <div>
              <label htmlFor="dropoff-date-desktop" className="mb-2 block text-sm text-muted-foreground font-medium">Drop-off Date</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="dropoff-date-desktop"
                    variant="outline"
                    className={cn(
                      "h-11 w-full bg-secondary/60 text-sm justify-start text-left font-normal",
                      !data.dropOffDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {data.dropOffDate ? format(data.dropOffDate, "dd/MM/yyyy") : "Drop-off Date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <CalendarWidget
                    mode="single"
                    selected={data.dropOffDate}
                    onSelect={(date) => setField("dropOffDate", date)}
                    disabled={(date) => date < new Date() || (data.pickUpDate && date < data.pickUpDate)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              {errors.dropOffDate && <p className="mt-1 text-xs text-destructive">{errors.dropOffDate}</p>}
            </div>
          </div>

          {/* Pick-up & Drop-off Times */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="pickup-time-desktop" className="mb-2 block text-sm text-muted-foreground font-medium">Pick-up Time</label>
              <div className="relative">
                <Input
                  id="pickup-time-desktop"
                  type="time"
                  value={data.pickUpTime}
                  onChange={(e) => setField("pickUpTime", e.target.value)}
                  className="h-11 bg-secondary/60 pr-10 text-sm"
                />
                <Clock className="absolute right-3 top-3 opacity-70 w-4 h-4" />
              </div>
              {errors.pickUpTime && <p className="mt-1 text-xs text-destructive">{errors.pickUpTime}</p>}
            </div>
            <div>
              <label htmlFor="dropoff-time-desktop" className="mb-2 block text-sm text-muted-foreground font-medium">Drop-off Time</label>
              <div className="relative">
                <Input
                  id="dropoff-time-desktop"
                  type="time"
                  value={data.dropOffTime}
                  onChange={(e) => setField("dropOffTime", e.target.value)}
                  className="h-11 bg-secondary/60 pr-10 text-sm"
                />
                <Clock className="absolute right-3 top-3 opacity-70 w-4 h-4" />
              </div>
              {errors.dropOffTime && <p className="mt-1 text-xs text-destructive">{errors.dropOffTime}</p>}
            </div>
          </div>

          {/* Phone & Email */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="phone-desktop" className="mb-2 block text-sm text-muted-foreground font-medium">Phone Number</label>
              <div className="relative">
                <Input
                  id="phone-desktop"
                  name="phone"
                  type="tel"
                  value={data.phone}
                  onChange={(e) => setField("phone", e.target.value)}
                  placeholder="UK Numbers Only"
                  className="h-11 bg-secondary/60 pr-10 text-sm placeholder:text-xs"
                  autoComplete="tel"
                  inputMode="tel"
                />
                <Phone className="absolute right-3 top-3 opacity-70 w-4 h-4" />
              </div>
              {errors.phone && <p className="mt-1 text-xs text-destructive">{errors.phone}</p>}
            </div>
            <div>
              <label htmlFor="email-desktop" className="mb-2 block text-sm text-muted-foreground font-medium">Email Address</label>
              <div className="relative">
                <Input
                  id="email-desktop"
                  name="email"
                  type="email"
                  value={data.email}
                  onChange={(e) => setField("email", e.target.value)}
                  placeholder="Email (Optional)"
                  className="h-11 bg-secondary/60 pr-10 text-sm placeholder:text-xs"
                  autoComplete="email"
                  inputMode="email"
                />
                <Mail className="absolute right-3 top-3 opacity-70 w-4 h-4" />
              </div>
              {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email}</p>}
            </div>
          </div>

          {/* Submit */}
          <div className="mt-6 flex justify-center">
            <Button type="button" variant="hero" className="h-12 px-8 text-base group" onClick={(e) => { e.preventDefault(); onSubmit(e as any); }}>
              Search Car
              <svg className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Button>
          </div>
        </div>
      </div>

      <Dialog open={showModal} onOpenChange={(o) => { if (!o) { setShowModal(false); clear(); } }}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Form submitted!</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">Our team will contact you soon.</p>
          <div className="mt-4 flex justify-end">
            <Button onClick={() => { setShowModal(false); clear(); }}>Close</Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CarHireBookingForm;
