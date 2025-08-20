import * as React from "react";
import { format } from "date-fns";
import { ArrowLeftRight, Calendar, CalendarIcon, Mail, Phone, Plane, UserRound, Search, Minus, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarWidget } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import HotelsBookingForm from "./HotelsBookingForm";
import FlightsHotelsBookingForm from "./FlightsHotelsBookingForm";
import CarHireBookingForm from "./CarHireBookingForm";
import VisaBookingForm from "./VisaBookingForm";
import { sendAdminEmail } from "@/lib/email";
import { searchAirports, getAirportByCode, getPopularAirports, type Airport } from "@/data/airports";
import { PassengerModal, type PassengerCounts } from "./PassengerModal";

const cabinClasses = ["Economy", "Premium Economy", "Business", "First"] as const;

// Helper function to generate date options for the next 365 days
const getDateOptions = (startDate?: Date) => {
  const options = [];
  const start = startDate || new Date();
  
  for (let i = 0; i < 365; i++) {
    const date = new Date(start);
    date.setDate(start.getDate() + i);
    options.push({
      value: date.toISOString(),
      label: format(date, "EEE, dd MMM yyyy"),
      shortLabel: format(date, "dd MMM")
    });
  }
  
  return options;
};

type FormState = {
  tripType: "round" | "oneway";
  origin?: string;
  destination?: string;
  departDate?: Date;
  returnDate?: Date;
  adults: number;
  children: number;
  infants: number;
  cabin: typeof cabinClasses[number];
  phone?: string;
  email?: string;
};

type FormErrors = Partial<Record<
  | "origin"
  | "destination"
  | "departDate"
  | "returnDate"
  | "adults"
  | "infants"
  | "cabin"
  | "phone"
  | "email",
  string
>>;

const BookingForm: React.FC = () => {
  const [data, setData] = React.useState<FormState>({
    tripType: "round",
    adults: 1,
    children: 0,
    infants: 0,
    cabin: "Economy",
  });

  const [errors, setErrors] = React.useState<FormErrors>({});
  const [showModal, setShowModal] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  // Popover state for travelers dropdown only
  const [openTravellers, setOpenTravellers] = React.useState(false);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!data.origin) newErrors.origin = "Please select departure city";
    if (!data.destination) newErrors.destination = "Please select destination city";
    if (!data.departDate) newErrors.departDate = "Please select departure date";
    if (data.tripType === "round" && !data.returnDate) newErrors.returnDate = "Please select return date";
    if (data.adults < 1) newErrors.adults = "At least 1 adult required";
    if (data.infants > data.adults) newErrors.infants = "Infants cannot exceed adults";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const originAirport = getAirportByCode(data.origin!);
      const destinationAirport = getAirportByCode(data.destination!);
      
      const emailData = {
        name: '', // Will be handled by the email template
        email: data.email || '',
        phone: data.phone || '',
        departureDate: data.departDate,
        returnDate: data.returnDate,
        departureCity: `${originAirport?.city}, ${originAirport?.country} (${data.origin})`,
        destinationCity: `${destinationAirport?.city}, ${destinationAirport?.country} (${data.destination})`,
        adults: data.adults,
        children: data.children,
        infants: data.infants,
        class: data.cabin,
        message: `Trip Type: ${data.tripType}`
      };

      await sendAdminEmail(emailData, 'Flight Booking');
      setShowModal(true);
    } catch (error) {
      console.error('Failed to send booking request:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const clearForm = () => {
    setData({
      tripType: "round",
      adults: 1,
      children: 0,
      infants: 0,
      cabin: "Economy",
    });
    setErrors({});
    setOriginFilter("");
    setDestinationFilter("");
  };

  return (
    <>
    <form onSubmit={submit} className="rounded-2xl bg-card/20 backdrop-blur border shadow-soft p-4 sm:p-3 md:p-6 w-full max-w-full overflow-hidden relative">
      {/* Category tabs */}
      <Tabs defaultValue="flight" className="w-full">
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-5 h-auto sm:h-14 rounded-t-lg bg-secondary/80 p-1 flex-wrap gap-1 text-xs sm:text-sm">
          <TabsTrigger value="flight" className="data-[state=active]:text-primary data-[state=active]:font-semibold">Flight</TabsTrigger>
          <TabsTrigger value="hotels" className="data-[state=active]:text-primary data-[state=active]:font-semibold">Hotels</TabsTrigger>
          <TabsTrigger value="flighthotel" className="data-[state=active]:text-primary data-[state=active]:font-semibold">Flights & Hotels</TabsTrigger>
          <TabsTrigger value="car" className="data-[state=active]:text-primary data-[state=active]:font-semibold">Car Hire</TabsTrigger>
          <TabsTrigger value="visa" className="data-[state=active]:text-primary data-[state=active]:font-semibold">Visa</TabsTrigger>
        </TabsList>
        
        <div className="relative mt-2">
          <div className="h-px bg-border" />
          <span className="absolute left-0 -top-px h-[2px] w-28 bg-primary rounded-full" aria-hidden="true" />
        </div>

        {/* Flight Form */}
        <TabsContent value="flight">
        {/* Mobile Compact Layout */}
        <div className="md:hidden space-y-2 mb-3">
          {/* Trip Type - Full Width */}
          <div>
            <label className="text-xs text-gray-500 mb-0.5 block">Trip Type</label>
            <Select value={data.tripType} onValueChange={(v) => setData((d) => ({ ...d, tripType: v as FormState["tripType"] }))}>
              <SelectTrigger className="h-12 w-full px-3 text-sm rounded-md bg-secondary/60">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="round">Round-trip</SelectItem>
                <SelectItem value="oneway">One Way</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {/* From + To - Two Column Grid */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-xs text-gray-500 mb-0.5 block">From</label>
              <Select value={data.origin} onValueChange={(value) => setData((d) => ({ ...d, origin: value }))}>
                <SelectTrigger className="h-12 w-full px-3 text-sm rounded-md bg-secondary/60">
                  <SelectValue placeholder="Select departure city" />
                </SelectTrigger>
                <SelectContent>
                  {getPopularAirports().map((airport) => (
                    <SelectItem key={airport.code} value={airport.code}>
                      {airport.city}, {airport.country} ({airport.code})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.origin && <p className="mt-1 text-xs text-destructive">{errors.origin}</p>}
            </div>
            
            <div>
              <label className="text-xs text-gray-500 mb-0.5 block">To</label>
              <Select value={data.destination} onValueChange={(value) => setData((d) => ({ ...d, destination: value }))}>
                <SelectTrigger className="h-12 w-full px-3 text-sm rounded-md bg-secondary/60">
                  <SelectValue placeholder="Select destination city" />
                </SelectTrigger>
                <SelectContent>
                  {getPopularAirports().map((airport) => (
                    <SelectItem key={airport.code} value={airport.code}>
                      {airport.city}, {airport.country} ({airport.code})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.destination && <p className="mt-1 text-xs text-destructive">{errors.destination}</p>}
            </div>
          </div>
          
          {/* Departure Date + Return Date - Two Column Grid */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-xs text-gray-500 mb-0.5 block">Departure Date</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "h-12 w-full px-3 text-sm rounded-md bg-secondary/60 justify-start text-left font-normal",
                      !data.departDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {data.departDate ? format(data.departDate, "dd/MM/yyyy") : "dd/mm/yyyy"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <CalendarWidget
                    mode="single"
                    selected={data.departDate}
                    onSelect={(date) => setData((d) => ({ ...d, departDate: date }))}
                    disabled={(date) => date < new Date()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              {errors.departDate && <p className="mt-1 text-xs text-destructive">{errors.departDate}</p>}
            </div>
            
            {data.tripType === "round" ? (
              <div>
                <label className="text-xs text-gray-500 mb-0.5 block">Return Date</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "h-12 w-full px-3 text-sm rounded-md bg-secondary/60 justify-start text-left font-normal",
                        !data.returnDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {data.returnDate ? format(data.returnDate, "dd/MM/yyyy") : "dd/mm/yyyy"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <CalendarWidget
                      mode="single"
                      selected={data.returnDate}
                      onSelect={(date) => setData((d) => ({ ...d, returnDate: date }))}
                      disabled={(date) => date < new Date() || (data.departDate && date <= data.departDate)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                {errors.returnDate && <p className="mt-1 text-xs text-destructive">{errors.returnDate}</p>}
              </div>
            ) : (
              <div></div>
            )}
          </div>
          
          {/* Passengers + Cabin Class - Two Column Grid */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-xs text-gray-500 mb-0.5 block">Passengers</label>
              <PassengerModal
                passengers={{
                  adults: data.adults,
                  children: data.children,
                  infants: data.infants
                }}
                onPassengersChange={(passengers: PassengerCounts) => {
                  setData(d => ({ ...d, ...passengers }));
                }}
                className="h-12 w-full px-3 text-sm rounded-md bg-secondary/60"
              />
            </div>
            
            <div>
              <label className="text-xs text-gray-500 mb-0.5 block">Cabin Class</label>
              <Select value={data.cabin} onValueChange={(v) => setData((d) => ({ ...d, cabin: v as FormState["cabin"] }))}>
                <SelectTrigger className="h-12 w-full px-3 text-sm rounded-md bg-secondary/60">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {cabinClasses.map((c) => (
                    <SelectItem key={c} value={c}>{c}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {/* Phone Number - Full Width */}
          <div>
            <label className="text-xs text-gray-500 mb-0.5 block">Phone Number</label>
            <Input
              type="tel"
              placeholder="Phone number"
              value={data.phone || ""}
              onChange={(e) => setData((d) => ({ ...d, phone: e.target.value }))}
              className="h-12 w-full px-3 text-sm rounded-md bg-secondary/60"
            />
          </div>
          
          {/* Email Address - Full Width */}
          <div>
            <label className="text-xs text-gray-500 mb-0.5 block">Email Address</label>
            <Input
              type="email"
              placeholder="Email address"
              value={data.email || ""}
              onChange={(e) => setData((d) => ({ ...d, email: e.target.value }))}
              className="h-12 w-full px-3 text-sm rounded-md bg-secondary/60"
            />
          </div>
          
          {/* Search Button - Full Width */}
          <Button type="submit" disabled={isSubmitting} className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground text-base font-semibold">
            {isSubmitting ? "Searching..." : "Search Flights"}
          </Button>
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:block space-y-3">
          {/* Trip type selector */}
          <div className="flex gap-2">
            <Button
              type="button"
              variant={data.tripType === "round" ? "default" : "outline"}
              size="sm"
              onClick={() => setData((d) => ({ ...d, tripType: "round" }))}
              className="text-xs"
            >
              Round-trip
            </Button>
            <Button
              type="button"
              variant={data.tripType === "oneway" ? "default" : "outline"}
              size="sm"
              onClick={() => setData((d) => ({ ...d, tripType: "oneway" }))}
              className="text-xs"
            >
              One Way
            </Button>
          </div>

          {/* Origin and Destination fields */}
          <div className="space-y-2 md:space-y-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3">
              {/* Origin */}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-foreground">From</label>
                <Select value={data.origin} onValueChange={(value) => setData((d) => ({ ...d, origin: value }))}>
                  <SelectTrigger className="h-11 md:h-12 bg-secondary/60">
                    <div className="flex items-center">
                      <Plane className="mr-3 opacity-70 w-4 h-4" />
                      <SelectValue placeholder="Select departure city" />
                    </div>
                  </SelectTrigger>
                  <SelectContent className="max-h-64">
                    {getPopularAirports().map((airport) => (
                      <SelectItem key={airport.code} value={airport.code}>
                        {airport.city}, {airport.country} ({airport.code})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.origin && <p className="mt-2 text-xs text-destructive">{errors.origin}</p>}
              </div>

              {/* Destination */}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-foreground">To</label>
                <Select value={data.destination} onValueChange={(value) => setData((d) => ({ ...d, destination: value }))}>
                  <SelectTrigger className="h-11 md:h-12 bg-secondary/60">
                    <div className="flex items-center">
                      <ArrowLeftRight className="mr-3 opacity-70 w-4 h-4" />
                      <SelectValue placeholder="Select destination city" />
                    </div>
                  </SelectTrigger>
                  <SelectContent className="max-h-64">
                    {getPopularAirports().map((airport) => (
                      <SelectItem key={airport.code} value={airport.code}>
                        {airport.city}, {airport.country} ({airport.code})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.destination && <p className="mt-2 text-xs text-destructive">{errors.destination}</p>}
              </div>
            </div>
          </div>
          
          {/* Date fields */}
          <div className="space-y-3 md:space-y-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
              {/* Departure */}
              <div>
                <label className="mb-2 block text-sm font-medium text-foreground">Departure Date</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full h-11 md:h-12 bg-secondary/60 text-sm border-input justify-start text-left font-normal",
                        !data.departDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-3 opacity-70 w-4 h-4" />
                      {data.departDate ? format(data.departDate, "dd/MM/yyyy") : "Departure"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <CalendarWidget
                      mode="single"
                      selected={data.departDate}
                      onSelect={(date) => setData((d) => ({ ...d, departDate: date }))}
                      disabled={(date) => date < new Date()}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                {errors.departDate && <p className="mt-2 text-xs text-destructive">{errors.departDate}</p>}
              </div>

              {/* Return */}
              {data.tripType === "round" && (
                <div>
                  <label className="mb-2 block text-sm font-medium text-foreground">Return Date</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full h-11 md:h-12 bg-secondary/60 text-sm border-input justify-start text-left font-normal",
                          !data.returnDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-3 opacity-70 w-4 h-4" />
                        {data.returnDate ? format(data.returnDate, "dd/MM/yyyy") : "Return"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <CalendarWidget
                        mode="single"
                        selected={data.returnDate}
                        onSelect={(date) => setData((d) => ({ ...d, returnDate: date }))}
                        disabled={(date) => date < new Date() || (data.departDate && date <= data.departDate)}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  {errors.returnDate && <p className="mt-2 text-xs text-destructive">{errors.returnDate}</p>}
                </div>
              )}
            </div>
          </div>
          
          {/* Travelers and Class - Desktop */}
          <div className="grid grid-cols-2 gap-3 md:gap-4">
            {/* Travelers dropdown */}
            <div>
              <label className="mb-1 block text-xs md:text-sm text-muted-foreground">Passengers</label>
              <Popover open={openTravellers} onOpenChange={setOpenTravellers}>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start h-10 md:h-12 bg-secondary/60 text-left text-xs md:text-sm">
                    <span className="truncate">
                      {data.adults + data.children + data.infants} Passenger{(data.adults + data.children + data.infants) > 1 ? "s" : ""}
                    </span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent align="end" className="w-72">
                  {[
                    { key: "adults", label: "Adults", caption: "12+", min: 1 },
                    { key: "children", label: "Children", caption: "2-11", min: 0 },
                    { key: "infants", label: "Infants", caption: "Under 2", min: 0 },
                  ].map((row) => {
                    const value = data[row.key as keyof Pick<FormState, "adults" | "children" | "infants">] as number;
                    return (
                      <div key={row.key} className="flex items-center justify-between py-2">
                        <div>
                          <div className="text-sm font-medium">{row.label}</div>
                          <div className="text-xs text-muted-foreground">{row.caption}</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            type="button"
                            size="icon"
                            variant="secondary"
                            disabled={value <= row.min}
                            onClick={() =>
                              setData((d) => {
                                const updated = { ...d, [row.key]: Math.max(row.min, value - 1) } as FormState;
                                if (row.key === "adults" && updated.infants > updated.adults) {
                                  updated.infants = updated.adults;
                                }
                                return updated;
                              })
                            }
                            aria-label={`Decrease ${row.label}`}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="w-8 text-center text-sm">{value}</span>
                          <Button
                            type="button"
                            size="icon"
                            variant="secondary"
                            onClick={() =>
                              setData((d) => {
                                const cap = 9; // typical cap
                                const total = d.adults + d.children + d.infants;
                                if (total >= cap) return d;
                                const updated = { ...d, [row.key]: value + 1 } as FormState;
                                if (row.key === "infants" && updated.infants > updated.adults) {
                                  // infants cannot exceed adults
                                  return d;
                                }
                                return updated;
                              })
                            }
                            aria-label={`Increase ${row.label}`}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                  <div className="mt-3 flex justify-end">
                    <Button type="button" onClick={() => setOpenTravellers(false)}>Done</Button>
                  </div>
                </PopoverContent>
              </Popover>
              {(errors.adults || errors.infants) && (
                <p className="mt-1 text-xs text-destructive">
                  {errors.adults || errors.infants}
                </p>
              )}
            </div>

            {/* Cabin class */}
            <div>
              <label className="mb-1 block text-xs md:text-sm text-muted-foreground">Cabin Class</label>
              <Select value={data.cabin} onValueChange={(v) => setData((d) => ({ ...d, cabin: v as FormState["cabin"] }))}>
                <SelectTrigger className="h-10 md:h-12 bg-secondary/60 text-xs md:text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {cabinClasses.map((c) => (
                    <SelectItem key={c} value={c}>{c}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {/* Contact Information - Desktop */}
          <div className="grid grid-cols-2 gap-3 md:gap-4">
            <div>
              <label className="mb-1 block text-xs md:text-sm text-muted-foreground">Phone Number</label>
              <Input
                type="tel"
                placeholder="Enter phone number"
                value={data.phone || ""}
                onChange={(e) => setData((d) => ({ ...d, phone: e.target.value }))}
                className="h-10 md:h-12 bg-secondary/60"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs md:text-sm text-muted-foreground">Email Address</label>
              <Input
                type="email"
                placeholder="Enter email address"
                value={data.email || ""}
                onChange={(e) => setData((d) => ({ ...d, email: e.target.value }))}
                className="h-10 md:h-12 bg-secondary/60"
              />
            </div>
          </div>
          
          {/* Search button - Desktop */}
          <Button type="submit" disabled={isSubmitting} className="w-full h-12 md:h-14 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-sm md:text-base">
            {isSubmitting ? "Searching Flights..." : "Search Flights"}
          </Button>
        </div>
        </TabsContent>

        {/* Hotels Form */}
        <TabsContent value="hotels">
          <HotelsBookingForm />
        </TabsContent>

        {/* Flights + Hotels Form */}
        <TabsContent value="flighthotel">
          <FlightsHotelsBookingForm />
        </TabsContent>

        {/* Car Hire Form */}
        <TabsContent value="car">
          <CarHireBookingForm />
        </TabsContent>

        {/* Visa Form */}
        <TabsContent value="visa">
          <VisaBookingForm />
        </TabsContent>
      </Tabs>
    </form>

    {/* Success modal */}
    <Dialog open={showModal} onOpenChange={(open) => { if (!open) { setShowModal(false); clearForm(); } }}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Booking Request Submitted!</DialogTitle>
        </DialogHeader>
        <p className="text-sm text-muted-foreground">Thank you for your booking request. Our travel experts will review your requirements and contact you within 24 hours with personalized options and pricing.</p>
        <div className="mt-4 flex justify-end">
          <Button onClick={() => { setShowModal(false); clearForm(); }}>Close</Button>
        </div>
      </DialogContent>
    </Dialog>
    </>
  );
};

export default BookingForm;
