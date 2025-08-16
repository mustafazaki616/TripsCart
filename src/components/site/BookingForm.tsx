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

// Extended list of airports/cities
const cities = [
  { code: "KUL", name: "Kuala Lumpur" },
  { code: "BKK", name: "Bangkok" },
  { code: "LHR", name: "London" },
  { code: "DXB", name: "Dubai" },
  { code: "DPS", name: "Bali (Denpasar)" },
  { code: "IST", name: "Istanbul" },
  { code: "JFK", name: "New York" },
  { code: "CDG", name: "Paris" },
  { code: "SIN", name: "Singapore" },
  { code: "HKG", name: "Hong Kong" },
  { code: "SYD", name: "Sydney" },
  { code: "FCO", name: "Rome" },
  { code: "MAD", name: "Madrid" },
  { code: "AMS", name: "Amsterdam" },
  { code: "FRA", name: "Frankfurt" },
  { code: "BCN", name: "Barcelona" },
  { code: "DEL", name: "Delhi" },
  { code: "BOM", name: "Mumbai" },
  { code: "YYZ", name: "Toronto" },
  { code: "LAX", name: "Los Angeles" },
  { code: "ORD", name: "Chicago" },
  { code: "PEK", name: "Beijing" },
  { code: "PVG", name: "Shanghai" },
  { code: "NRT", name: "Tokyo" },
  { code: "ICN", name: "Seoul" },
  { code: "MEX", name: "Mexico City" },
  { code: "GRU", name: "São Paulo" },
  { code: "JNB", name: "Johannesburg" },
  { code: "CPT", name: "Cape Town" },
  { code: "CAI", name: "Cairo" },
  { code: "DOH", name: "Doha" },
  { code: "AUH", name: "Abu Dhabi" },
  { code: "ISB", name: "Islamabad" },
  { code: "KHI", name: "Karachi" },
  { code: "LHE", name: "Lahore" },
  { code: "MAN", name: "Manchester" },
  { code: "BHX", name: "Birmingham" },
  { code: "EDI", name: "Edinburgh" },
  { code: "GLA", name: "Glasgow" },
];


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
    <form onSubmit={submit} className="rounded-2xl bg-card/90 backdrop-blur border shadow-soft p-3 sm:p-4 md:p-6 w-full max-w-full overflow-hidden relative">
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
        {/* Top controls */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-muted-foreground px-1">
        <div className="flex items-center gap-2 sm:gap-3">
          <label className="inline-flex items-center gap-2">
            <input
              type="radio"
              name="trip"
              className="accent-[hsl(var(--primary))]"
              checked={data.tripType === "round"}
              onChange={() => setData((d) => ({ ...d, tripType: "round" }))}
            />
            Round-trip
          </label>
          <label className="inline-flex items-center gap-2">
            <input
              type="radio"
              name="trip"
              className="accent-[hsl(var(--primary))]"
              checked={data.tripType === "oneway"}
              onChange={() => setData((d) => ({ ...d, tripType: "oneway", returnDate: undefined }))}
            />
            One Way
          </label>
        </div>
        <div className="flex items-center gap-2 sm:gap-3 ml-auto">
          <div className="inline-flex items-center gap-2 text-sm">
            <UserRound className="opacity-70 w-4 h-4" />
            <span className="whitespace-nowrap">
              {data.adults + data.children + data.infants} Traveler{(data.adults + data.children + data.infants) > 1 ? "s" : ""}
            </span>
          </div>
          <div className="opacity-70 text-sm">{data.cabin}</div>
        </div>
      </div>

      {/* Fields grid */}
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-6 gap-3 md:gap-4 px-1 sm:px-0">
        {/* Origin */}
        <div className="col-span-full sm:col-span-1 md:col-span-2">
          <label className="mb-1 block text-sm text-muted-foreground">Fly From</label>
          <Popover open={openOrigin} onOpenChange={setOpenOrigin}>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-start h-12 bg-secondary/60 text-left">
                {data.origin ? (
                  <span>
                    {cities.find((c) => c.code === data.origin)?.name} ({data.origin})
                  </span>
                ) : (
                  <span className="text-muted-foreground">Country / City</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-[var(--radix-popover-trigger-width)] p-0">
              <div className="p-2 border-b">
                <div className="flex items-center gap-2 rounded-md bg-secondary/60 px-2">
                  <Search className="opacity-70" />
                  <input
                    className="h-9 flex-1 bg-transparent outline-none"
                    placeholder="Search city or code"
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
                {cities
                  .filter((c) =>
                    (c.name + c.code).toLowerCase().includes(originFilter.toLowerCase())
                  )
                  .map((c) => (
                    <button
                      key={c.code}
                      type="button"
                      className="w-full text-left px-3 py-2 hover:bg-accent"
                      onClick={() => {
                        setData((d) => ({ ...d, origin: c.code }));
                        setOpenOrigin(false);
                      }}
                    >
                      {c.name} ({c.code})
                    </button>
                  ))}
              </div>
            </PopoverContent>
          </Popover>
          {errors.origin && <p className="mt-1 text-xs text-destructive">{errors.origin}</p>}
          <Plane className="absolute right-3 top-3.5 opacity-60 pointer-events-none hidden md:block" />
        </div>
        {/* Swap button */}
        <div className="hidden md:flex items-end justify-center">
          <Button type="button" variant="secondary" size="icon" onClick={swap} aria-label="Swap origin and destination" className={cn("rounded-full", swapAnim && "animate-spin") }>
            <ArrowLeftRight />
          </Button>
        </div>
        {/* Destination */}
        <div className="col-span-full sm:col-span-1 md:col-span-2">
          <label className="mb-1 block text-sm text-muted-foreground">Fly To</label>
          <Popover open={openDestination} onOpenChange={setOpenDestination}>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-start h-12 bg-secondary/60 text-left">
                {data.destination ? (
                  <span>
                    {cities.find((c) => c.code === data.destination)?.name} ({data.destination})
                  </span>
                ) : (
                  <span className="text-muted-foreground">Country / City</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-[var(--radix-popover-trigger-width)] p-0">
              <div className="p-2 border-b">
                <div className="flex items-center gap-2 rounded-md bg-secondary/60 px-2">
                  <Search className="opacity-70" />
                  <input
                    className="h-9 flex-1 bg-transparent outline-none"
                    placeholder="Search city or code"
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
                {cities
                  .filter((c) =>
                    (c.name + c.code).toLowerCase().includes(destinationFilter.toLowerCase())
                  )
                  .map((c) => (
                    <button
                      key={c.code}
                      type="button"
                      className="w-full text-left px-3 py-2 hover:bg-accent"
                      onClick={() => {
                        setData((d) => ({ ...d, destination: c.code }));
                        setOpenDestination(false);
                      }}
                    >
                      {c.name} ({c.code})
                    </button>
                  ))}
              </div>
            </PopoverContent>
          </Popover>
          {errors.destination && <p className="mt-1 text-xs text-destructive">{errors.destination}</p>}
          <Plane className="absolute right-3 top-3.5 opacity-60 rotate-180 pointer-events-none hidden md:block" />
        </div>
        {/* Departure */}
        <div className="col-span-full sm:col-span-1 md:col-span-2">
          <label className="mb-1 block text-sm text-muted-foreground">Departure Date</label>
          <Popover open={openDepart} onOpenChange={setOpenDepart}>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-start h-12 bg-secondary/60">
                <Calendar className="mr-2 opacity-70" />
                {data.departDate ? format(data.departDate, "EEE, dd MMM") : "Select date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0" align="start">
              <CalendarWidget mode="single" selected={data.departDate} onSelect={(d) => setData((s)=>({...s, departDate: d ?? undefined}))} initialFocus />
            </PopoverContent>
          </Popover>
          {errors.departDate && <p className="mt-1 text-xs text-destructive">{errors.departDate}</p>}
        </div>
        {/* Return */}
        <div className="md:col-span-2">
          <label className="mb-1 block text-sm text-muted-foreground">Return Date</label>
          <Popover open={openReturn} onOpenChange={setOpenReturn}>
            <PopoverTrigger asChild>
              <Button variant="outline" disabled={data.tripType!=="round"} className="w-full justify-start h-12 bg-secondary/60 disabled:opacity-70">
                <Calendar className="mr-2 opacity-70" />
                {data.returnDate ? format(data.returnDate, "EEE, dd MMM") : "Returning"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0" align="start">
              <CalendarWidget mode="single" selected={data.returnDate} onSelect={(d) => setData((s)=>({...s, returnDate: d ?? undefined}))} initialFocus />
            </PopoverContent>
          </Popover>
          {errors.returnDate && <p className="mt-1 text-xs text-destructive">{errors.returnDate}</p>}
        </div>
        {/* Travelers dropdown matching original style */}
        <div className="col-span-full sm:col-span-1">
          <label className="mb-1 block text-sm text-muted-foreground">Passengers</label>
          <Popover open={openTravellers} onOpenChange={setOpenTravellers}>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-start h-12 bg-secondary/60 text-left">
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
        <div className="col-span-full sm:col-span-1">
          <label className="mb-1 block text-sm text-muted-foreground">Class</label>
          <Select value={data.cabin} onValueChange={(v)=> setData((d)=>({...d, cabin: v as FormState["cabin"]}))}>
            <SelectTrigger className="h-12 bg-secondary/60">
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
        {/* Phone */}
        <div className="col-span-full sm:col-span-1 md:col-span-2">
          <label className="mb-1 block text-sm text-muted-foreground">Phone Number</label>
          <div className="relative">
            <Input placeholder="e.g., +44 20 1234 5678" inputMode="tel" className="h-12 bg-secondary/60 pr-10" value={data.phone ?? ""} onChange={(e)=> setData((d)=>({...d, phone: e.target.value}))} />
            <Phone className="absolute right-3 top-3.5 opacity-70" />
          </div>
          {errors.phone && <p className="mt-1 text-xs text-destructive">{errors.phone}</p>}
        </div>
        {/* Email */}
        <div className="col-span-full sm:col-span-1 md:col-span-2">
          <label className="mb-1 block text-sm text-muted-foreground">Email Address</label>
          <div className="relative">
            <Input placeholder="Email (optional)" type="email" className="h-12 bg-secondary/60 pr-10" value={data.email ?? ""} onChange={(e)=> setData((d)=>({...d, email: e.target.value}))} />
            <Mail className="absolute right-3 top-3.5 opacity-70" />
          </div>
          {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email}</p>}
        </div>
        {/* Submit */}
        <div className="md:col-span-2 flex items-end col-span-full">
          <Button type="submit" variant="hero" className="w-full h-12 group text-base">
            Search Flights
            <ArrowLeftRight className="transition-transform group-hover:translate-x-0.5" />
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
