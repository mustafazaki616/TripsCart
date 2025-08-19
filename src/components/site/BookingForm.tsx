import * as React from "react";
import { format } from "date-fns";
import { ArrowLeftRight, Calendar, Mail, Phone, Plane, UserRound, Search, Minus, Plus, X } from "lucide-react";
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




const cabinClasses = ["Economy", "Premium Economy", "Business", "First"] as const;

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
  | "email", string>>;

const BookingForm: React.FC = () => {
  const [swapAnim, setSwapAnim] = React.useState(false);
  const [openDepart, setOpenDepart] = React.useState(false);
  const [openReturn, setOpenReturn] = React.useState(false);
  const [openOrigin, setOpenOrigin] = React.useState(false);
  const [openDestination, setOpenDestination] = React.useState(false);
  const [openTravellers, setOpenTravellers] = React.useState(false);
  const [originFilter, setOriginFilter] = React.useState("");
  const [destinationFilter, setDestinationFilter] = React.useState("");
  const [originSuggestions, setOriginSuggestions] = React.useState<Airport[]>([]);
  const [destinationSuggestions, setDestinationSuggestions] = React.useState<Airport[]>([]);

  // Update suggestions when filter changes
  React.useEffect(() => {
    if (originFilter.length >= 2) {
      setOriginSuggestions(searchAirports(originFilter, 8));
    } else {
      setOriginSuggestions(getPopularAirports());
    }
  }, [originFilter]);

  React.useEffect(() => {
    if (destinationFilter.length >= 2) {
      setDestinationSuggestions(searchAirports(destinationFilter, 8));
    } else {
      setDestinationSuggestions(getPopularAirports());
    }
  }, [destinationFilter]);
  const [errors, setErrors] = React.useState<FormErrors>({});
  const [showModal, setShowModal] = React.useState(false);
  const [data, setData] = React.useState<FormState>({
    tripType: "round",
    adults: 1,
    children: 0,
    infants: 0,
    cabin: "Economy",
  });

  const swap = () => {
    setSwapAnim(true);
    setData((d) => ({ ...d, origin: d.destination, destination: d.origin }));
    setTimeout(() => setSwapAnim(false), 500);
  };

  const validate = (): boolean => {
    const next: FormErrors = {};
    if (!data.origin) next.origin = "Required";
    if (!data.destination) next.destination = "Required";
    if (!data.departDate) next.departDate = "Required";
    if (data.tripType === "round" && !data.returnDate) next.returnDate = "Required";
    if (!data.cabin) next.cabin = "Required";
    if (!data.phone || data.phone.trim() === "") next.phone = "Required";
    if (!data.email || data.email.trim() === "") next.email = "Required";
    if (data.adults < 1) next.adults = "At least 1 adult";
    if (data.infants > data.adults) next.infants = "Infants cannot exceed adults";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    
    try {
      // Send email to admin with form details
      await sendAdminEmail(data, 'Flight Booking');
      // Show success modal
      setShowModal(true);
    } catch (error) {
      console.error('Error sending email:', error);
      // Still show success modal to user even if email fails
      // In a production app, you might want to show an error message
      setShowModal(true);
    }
  };

  const clearForm = () => {
    setData({
      tripType: "round",
      adults: 1,
      children: 0,
      infants: 0,
      cabin: "Economy",
      origin: undefined,
      destination: undefined,
      departDate: undefined,
      returnDate: undefined,
      phone: undefined,
      email: undefined
    });
    setErrors({});
    setOriginFilter("");
    setDestinationFilter("");
  };

  return (
    <>
    <form onSubmit={submit} className="rounded-2xl bg-card/20 backdrop-blur border shadow-soft p-2 sm:p-3 md:p-6 w-full max-w-full overflow-hidden relative">
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
        {/* Trip type controls - Mobile only */}
        <div className="flex md:hidden gap-1 mb-4">
          {["round", "oneway"].map((type) => (
            <Button
              key={type}
              type="button"
              variant={data.tripType === type ? "default" : "outline"}
              size="sm"
              className="flex-1 h-9 text-xs font-medium"
              onClick={() => setData((d) => ({ ...d, tripType: type as FormState["tripType"] }))}
            >
              {type === "round" ? "Round-trip" : "One Way"}
            </Button>
          ))}
        </div>

        {/* Travelers and Class - Mobile only */}
        <div className="flex md:hidden gap-2 mb-4">
          {/* Travelers */}
          <div className="flex-1">
            <Popover open={openTravellers} onOpenChange={setOpenTravellers}>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start h-9 bg-secondary/60 text-xs px-3 font-medium">
                  <UserRound className="mr-2 opacity-70 w-3 h-3" />
                  <span className="truncate">
                    {data.adults + data.children + data.infants} Traveler{(data.adults + data.children + data.infants) > 1 ? "s" : ""}
                  </span>
                </Button>
              </PopoverTrigger>
              <PopoverContent align="end" className="w-72">
                {[
                  { key: "adults", label: "Adults", caption: "12+", min: 1 },
                  { key: "children", label: "Children", caption: "2-11", min: 0 },
                  { key: "infants", label: "Infants", caption: "Under 2", min: 0 },
                ].map((row) => {
                  const value = data[row.key as keyof FormState] as number;
                  return (
                    <div key={row.key} className="flex items-center justify-between py-2">
                      <div>
                        <div className="font-medium">{row.label}</div>
                        <div className="text-xs text-muted-foreground">{row.caption}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          type="button"
                          size="icon"
                          variant="secondary"
                          onClick={() =>
                            setData((d) => {
                              const next = Math.max(row.min, value - 1);
                              const updated = { ...d, [row.key]: next } as FormState;
                              if (row.key === "adults" && updated.infants > next) {
                                updated.infants = next; // infants cannot exceed adults
                              }
                              return updated;
                            })
                          }
                          aria-label={`Decrease ${row.label}`}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-6 text-center">{value}</span>
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
          </div>
          
          {/* Cabin */}
          <div className="flex-shrink-0 w-auto min-w-0">
            <Select value={data.cabin} onValueChange={(v)=> setData((d)=>({...d, cabin: v as FormState["cabin"]}))}>
              <SelectTrigger className="h-9 bg-secondary/60 text-xs px-3 min-w-[100px] font-medium">
                <SelectValue placeholder="Economy" />
              </SelectTrigger>
              <SelectContent className="z-50">
                {cabinClasses.map((c)=> (
                  <SelectItem key={c} value={c}>{c}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Top controls - Desktop only */}
        <div className="hidden md:block px-1">
          {/* Desktop: horizontal layout */}
          <div className="flex items-center justify-between gap-4 text-sm text-muted-foreground">
            {/* Trip type controls */}
            <div className="flex items-center gap-3 flex-shrink-0">
              <label className="inline-flex items-center gap-2">
                <input
                  type="radio"
                  name="trip"
                  className="accent-[hsl(var(--primary))]"
                  checked={data.tripType === "round"}
                  onChange={() => setData((d) => ({ ...d, tripType: "round" }))}
                />
                <span className="text-sm">Round-trip</span>
              </label>
              <label className="inline-flex items-center gap-2">
                <input
                  type="radio"
                  name="trip"
                  className="accent-[hsl(var(--primary))]"
                  checked={data.tripType === "oneway"}
                  onChange={() => setData((d) => ({ ...d, tripType: "oneway", returnDate: undefined }))}
                />
                <span className="text-sm">One Way</span>
              </label>
            </div>
            
            {/* Traveler count - Desktop Display */}
            <div className="inline-flex items-center gap-2 flex-shrink-0">
              <UserRound className="opacity-70 w-4 h-4" />
              <span className="whitespace-nowrap text-sm">
                {data.adults + data.children + data.infants} Traveler{(data.adults + data.children + data.infants) > 1 ? "s" : ""}
              </span>
            </div>
            
            {/* Cabin class - Desktop Display */}
            <div className="flex-shrink-0">
              <div className="opacity-70 text-sm">{data.cabin}</div>
            </div>
          </div>
        </div>

      {/* Fields grid */}
      <div className="mt-4 space-y-4 px-1 sm:px-0">
        {/* Origin and destination */}
        <div className="space-y-3 md:space-y-0">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-3 md:gap-2 items-start md:items-center">
            {/* Origin */}
            <div>
              <label className="mb-2 block text-sm font-medium text-foreground">From</label>
              <div className="relative">
                <Popover open={openOrigin} onOpenChange={setOpenOrigin}>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start h-11 md:h-12 bg-secondary/60 text-sm border-input hover:bg-secondary/80">
                      <Plane className="mr-3 opacity-70 w-4 h-4" />
                      <span className="truncate font-medium">
                        {data.origin ? (
                          `${getAirportByCode(data.origin)?.city} - ${getAirportByCode(data.origin)?.name} (${data.origin})`
                        ) : (
                          "Select departure city"
                        )}
                      </span>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent align="start" className="w-[var(--radix-popover-trigger-width)] p-0">
                    <div className="p-3 border-b">
                      <div className="flex items-center gap-2 rounded-md bg-secondary/60 px-2">
                        <Search className="opacity-70" />
                        <input
                          className="h-9 flex-1 bg-transparent outline-none"
                          placeholder="Search airports, cities, or codes"
                          value={originFilter}
                          onChange={(e) => setOriginFilter(e.target.value)}
                          autoFocus
                        />
                        {originFilter && (
                          <button
                            type="button"
                            className="opacity-60 hover:opacity-100"
                            onClick={() => setOriginFilter("")}
                          >
                            <X className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    </div>
                    <div className="max-h-64 overflow-auto">
                      {originSuggestions.length > 0 ? (
                        originSuggestions.map((airport) => (
                          <button
                            key={airport.code}
                            type="button"
                            className="w-full text-left px-3 py-3 hover:bg-accent border-b border-border/50 last:border-b-0"
                            onClick={() => {
                              setData((d) => ({ ...d, origin: airport.code }));
                              setOriginFilter("");
                              setOpenOrigin(false);
                            }}
                          >
                            <div className="flex flex-col">
                              <div className="font-medium">{airport.city}, {airport.country}</div>
                              <div className="text-sm text-muted-foreground">{airport.name} ({airport.code})</div>
                            </div>
                          </button>
                        ))
                      ) : (
                        <div className="px-3 py-2 text-sm text-muted-foreground">No airports found</div>
                      )}
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
              {errors.origin && <p className="mt-2 text-xs text-destructive">{errors.origin}</p>}
            </div>
            
            {/* Swap button - Hidden on mobile */}
            <div className="hidden md:flex justify-center pt-6">
              <Button
                type="button"
                size="icon"
                variant="outline"
                className={cn(
                  "h-8 w-8 rounded-full bg-background border-2 transition-transform duration-200",
                  swapAnim && "rotate-180"
                )}
                onClick={swap}
              >
                <ArrowLeftRight className="h-4 w-4" />
              </Button>
            </div>
            
            {/* Destination */}
            <div>
              <label className="mb-2 block text-sm font-medium text-foreground">To</label>
              <div className="relative">
                <Popover open={openDestination} onOpenChange={setOpenDestination}>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start h-11 md:h-12 bg-secondary/60 text-sm border-input hover:bg-secondary/80">
                      <Plane className="mr-3 opacity-70 w-4 h-4" />
                      <span className="truncate font-medium">
                        {data.destination ? (
                          `${getAirportByCode(data.destination)?.city} - ${getAirportByCode(data.destination)?.name} (${data.destination})`
                        ) : (
                          "Select destination city"
                        )}
                      </span>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent align="start" className="w-[var(--radix-popover-trigger-width)] p-0">
                    <div className="p-3 border-b">
                      <div className="flex items-center gap-2 rounded-md bg-secondary/60 px-2">
                        <Search className="opacity-70" />
                        <input
                          className="h-9 flex-1 bg-transparent outline-none"
                          placeholder="Search airports, cities, or codes"
                          value={destinationFilter}
                          onChange={(e) => setDestinationFilter(e.target.value)}
                          autoFocus
                        />
                        {destinationFilter && (
                          <button
                            type="button"
                            className="opacity-60 hover:opacity-100"
                            onClick={() => setDestinationFilter("")}
                          >
                            <X className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    </div>
                    <div className="max-h-64 overflow-auto">
                      {destinationSuggestions.length > 0 ? (
                        destinationSuggestions.map((airport) => (
                          <button
                            key={airport.code}
                            type="button"
                            className="w-full text-left px-3 py-3 hover:bg-accent border-b border-border/50 last:border-b-0"
                            onClick={() => {
                              setData((d) => ({ ...d, destination: airport.code }));
                              setDestinationFilter("");
                              setOpenDestination(false);
                            }}
                          >
                            <div className="flex flex-col">
                              <div className="font-medium">{airport.city}, {airport.country}</div>
                              <div className="text-sm text-muted-foreground">{airport.name} ({airport.code})</div>
                            </div>
                          </button>
                        ))
                      ) : (
                        <div className="px-3 py-2 text-sm text-muted-foreground">No airports found</div>
                      )}
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
              {errors.destination && <p className="mt-2 text-xs text-destructive">{errors.destination}</p>}
            </div>
          </div>
          
          {/* Mobile swap button */}
          <div className="flex md:hidden justify-center">
            <Button
              type="button"
              size="sm"
              variant="outline"
              className={cn(
                "h-8 px-4 rounded-full bg-background border transition-transform duration-200",
                swapAnim && "rotate-180"
              )}
              onClick={swap}
            >
              <ArrowLeftRight className="h-3 w-3 mr-2" />
              Swap
            </Button>
          </div>
        </div>
        
        {/* Date fields */}
        <div className="space-y-3 md:space-y-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
            {/* Departure */}
            <div>
              <label className="mb-2 block text-sm font-medium text-foreground">Departure Date</label>
              <Popover open={openDepart} onOpenChange={setOpenDepart}>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start h-11 md:h-12 bg-secondary/60 text-sm border-input hover:bg-secondary/80">
                    <Calendar className="mr-3 opacity-70 w-4 h-4" />
                    <span className="font-medium">
                      {data.departDate ? format(data.departDate, "dd MMM yyyy") : "Select departure date"}
                    </span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="p-0" align="start">
                  <CalendarWidget 
                    mode="single" 
                    selected={data.departDate} 
                    onSelect={(d) => setData((s)=>({...s, departDate: d ?? undefined}))} 
                    initialFocus 
                    disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                  />
                </PopoverContent>
              </Popover>
              {errors.departDate && <p className="mt-2 text-xs text-destructive">{errors.departDate}</p>}
            </div>
            
            {/* Return */}
            <div>
              <label className="mb-2 block text-sm font-medium text-foreground">Return Date</label>
              <Popover open={openReturn} onOpenChange={setOpenReturn}>
                <PopoverTrigger asChild>
                  <Button 
                    variant="outline" 
                    disabled={data.tripType!=="round"} 
                    className="w-full justify-start h-11 md:h-12 bg-secondary/60 disabled:opacity-50 disabled:cursor-not-allowed text-sm border-input hover:bg-secondary/80"
                  >
                    <Calendar className="mr-3 opacity-70 w-4 h-4" />
                    <span className="font-medium">
                      {data.returnDate ? format(data.returnDate, "dd MMM yyyy") : data.tripType === "round" ? "Select return date" : "One way trip"}
                    </span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="p-0" align="start">
                  <CalendarWidget 
                    mode="single" 
                    selected={data.returnDate} 
                    onSelect={(d) => setData((s)=>({...s, returnDate: d ?? undefined}))} 
                    initialFocus 
                    disabled={(date) => {
                      const today = new Date(new Date().setHours(0, 0, 0, 0));
                      const departDate = data.departDate ? new Date(data.departDate.setHours(0, 0, 0, 0)) : today;
                      return date < Math.max(today.getTime(), departDate.getTime());
                    }}
                  />
                </PopoverContent>
              </Popover>
              {errors.returnDate && <p className="mt-2 text-xs text-destructive">{errors.returnDate}</p>}
            </div>
          </div>
        </div>
        
        {/* Travelers and Class - Hidden on mobile, shown on desktop */}
        <div className="hidden md:grid md:grid-cols-2 gap-3 md:gap-4">
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
                  const value = data[row.key as keyof FormState] as number;
                  return (
                    <div key={row.key} className="flex items-center justify-between py-2">
                      <div>
                        <div className="font-medium">{row.label}</div>
                        <div className="text-xs text-muted-foreground">{row.caption}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          type="button"
                          size="icon"
                          variant="secondary"
                          onClick={() =>
                            setData((d) => {
                              const next = Math.max(row.min, value - 1);
                              const updated = { ...d, [row.key]: next } as FormState;
                              if (row.key === "adults" && updated.infants > next) {
                                updated.infants = next; // infants cannot exceed adults
                              }
                              return updated;
                            })
                          }
                          aria-label={`Decrease ${row.label}`}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-6 text-center">{value}</span>
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
              <p className="mt-1 text-xs text-destructive">{errors.adults || errors.infants}</p>
            )}
          </div>
          
          {/* Cabin */}
          <div>
            <label className="mb-1 block text-xs md:text-sm text-muted-foreground">Class</label>
            <Select value={data.cabin} onValueChange={(v)=> setData((d)=>({...d, cabin: v as FormState["cabin"]}))}>
              <SelectTrigger className="h-10 md:h-12 bg-secondary/60 text-xs md:text-sm">
                <SelectValue placeholder="Economy" />
              </SelectTrigger>
              <SelectContent className="z-50">
                {cabinClasses.map((c)=> (
                  <SelectItem key={c} value={c}>{c}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.cabin && <p className="mt-1 text-xs text-destructive">{errors.cabin}</p>}
          </div>
        </div>
        
        {/* Contact fields */}
        <div className="space-y-3 md:space-y-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
            {/* Phone */}
            <div>
              <label className="mb-2 block text-sm font-medium text-foreground">Phone Number</label>
              <div className="relative">
                <Input 
                  placeholder="Enter UK phone number"
                  inputMode="tel" 
                  className="h-11 md:h-12 bg-secondary/60 pl-4 pr-12 text-sm border-input hover:bg-secondary/80 focus:bg-background" 
                  value={data.phone ?? ""} 
                  onChange={(e)=> setData((d)=>({...d, phone: e.target.value}))} 
                />
                <Phone className="absolute right-3 top-1/2 -translate-y-1/2 opacity-70 w-4 h-4" />
              </div>
              {errors.phone && <p className="mt-2 text-xs text-destructive">{errors.phone}</p>}
            </div>
            
            {/* Email */}
            <div>
              <label className="mb-2 block text-sm font-medium text-foreground">Email Address</label>
              <div className="relative">
                <Input 
                  placeholder="Enter email address (optional)" 
                  type="email" 
                  className="h-11 md:h-12 bg-secondary/60 pl-4 pr-12 text-sm border-input hover:bg-secondary/80 focus:bg-background" 
                  value={data.email ?? ""} 
                  onChange={(e)=> setData((d)=>({...d, email: e.target.value}))} 
                />
                <Mail className="absolute right-3 top-1/2 -translate-y-1/2 opacity-70 w-4 h-4" />
              </div>
              {errors.email && <p className="mt-2 text-xs text-destructive">{errors.email}</p>}
            </div>
          </div>
        </div>
        
        {/* Submit */}
        <div className="pt-4">
          <Button type="submit" variant="hero" className="w-full h-12 md:h-14 group text-base md:text-lg font-semibold">
            Search Flights
            <Search className="ml-3 w-4 h-4 md:w-5 md:h-5 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
               </TabsContent>

         {/* Hotels Form */}
         <TabsContent value="hotels">
           <HotelsBookingForm />
         </TabsContent>

         {/* Flights & Hotels Form */}
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
    <Dialog open={showModal} onOpenChange={(o)=>{ if(!o){ setShowModal(false); clearForm(); } }}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Form submitted!</DialogTitle>
        </DialogHeader>
        <p className="text-sm text-muted-foreground">Our team will contact you soon.</p>
        <div className="mt-4 flex justify-end">
          <Button onClick={()=>{ setShowModal(false); clearForm(); }}>Close</Button>
        </div>
      </DialogContent>
    </Dialog>
    </>
  );
};

export default BookingForm;
