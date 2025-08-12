import * as React from "react";
import { format } from "date-fns";
import { ArrowLeftRight, Calendar, Mail, Phone, Plane, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarWidget } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const cities = [
  { code: "KUL", name: "Kuala Lumpur" },
  { code: "BKK", name: "Bangkok" },
  { code: "LHR", name: "London" },
  { code: "DXB", name: "Dubai" },
  { code: "DPS", name: "Bali (Denpasar)" },
  { code: "IST", name: "Istanbul" },
];

const cabinClasses = ["Economy", "Premium Economy", "Business", "First"] as const;

type FormState = {
  tripType: "round" | "oneway";
  origin?: string;
  destination?: string;
  departDate?: Date;
  returnDate?: Date;
  passengers: number;
  cabin: typeof cabinClasses[number];
  phone?: string;
  email?: string;
};

const BookingForm: React.FC = () => {
  const [swapAnim, setSwapAnim] = React.useState(false);
  const [openDepart, setOpenDepart] = React.useState(false);
  const [openReturn, setOpenReturn] = React.useState(false);
  const [data, setData] = React.useState<FormState>({
    tripType: "round",
    passengers: 1,
    cabin: "Economy",
  });

  const swap = () => {
    setSwapAnim(true);
    setData((d) => ({ ...d, origin: d.destination, destination: d.origin }));
    setTimeout(() => setSwapAnim(false), 500);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    toast("Searching tickets", {
      description: `${data.origin ?? "-"} → ${data.destination ?? "-"} • ${data.passengers} pax • ${data.cabin}`,
    });
  };

  return (
    <form onSubmit={submit} className="rounded-2xl bg-card/90 backdrop-blur border shadow-soft p-4 md:p-6">
      {/* Category tabs */}
      <Tabs defaultValue="flight" className="w-full">
        <TabsList className="justify-start bg-transparent p-0 h-auto gap-6">
          <TabsTrigger value="flight" className="data-[state=active]:text-primary data-[state=active]:font-semibold">Flight</TabsTrigger>
          <TabsTrigger value="hotels" disabled>Hotels</TabsTrigger>
          <TabsTrigger value="flighthotel" disabled>Flights & Hotels</TabsTrigger>
          <TabsTrigger value="car" disabled>Car Hire</TabsTrigger>
          <TabsTrigger value="visa" disabled>Visa</TabsTrigger>
        </TabsList>
      </Tabs>
      <div className="relative mt-2">
        <div className="h-px bg-border" />
        <span className="absolute left-0 -top-px h-[2px] w-28 bg-primary rounded-full" aria-hidden="true" />
      </div>

      {/* Top controls */}
      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground px-1">
        <div className="flex items-center gap-3">
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
        <div className="flex items-center gap-3 ml-auto">
          <div className="inline-flex items-center gap-2"><UserRound className="opacity-70" /> {data.passengers} Traveler{data.passengers>1?"s":""}</div>
          <div className="opacity-70">{data.cabin}</div>
        </div>
      </div>

      {/* Fields grid */}
      <div className="mt-4 grid grid-cols-1 md:grid-cols-6 gap-3 md:gap-4">
        {/* Origin */}
        <div className="md:col-span-2">
          <label className="mb-1 block text-sm text-muted-foreground">Fly From</label>
          <div className="relative">
            <Select value={data.origin} onValueChange={(v) => setData((d) => ({ ...d, origin: v }))}>
              <SelectTrigger className="h-12 bg-secondary/60">
                <SelectValue placeholder="Country / City" />
              </SelectTrigger>
              <SelectContent className="z-50">
                {cities.map((c) => (
                  <SelectItem key={c.code} value={c.code}>{c.name} ({c.code})</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Plane className="absolute right-3 top-3.5 opacity-60" />
          </div>
        </div>
        {/* Swap button */}
        <div className="hidden md:flex items-end justify-center">
          <Button type="button" variant="secondary" size="icon" onClick={swap} aria-label="Swap origin and destination" className={cn("rounded-full", swapAnim && "animate-spin") }>
            <ArrowLeftRight />
          </Button>
        </div>
        {/* Destination */}
        <div className="md:col-span-2">
          <label className="mb-1 block text-sm text-muted-foreground">Fly To</label>
          <div className="relative">
            <Select value={data.destination} onValueChange={(v) => setData((d) => ({ ...d, destination: v }))}>
              <SelectTrigger className="h-12 bg-secondary/60">
                <SelectValue placeholder="Country / City" />
              </SelectTrigger>
              <SelectContent className="z-50">
                {cities.map((c) => (
                  <SelectItem key={c.code} value={c.code}>{c.name} ({c.code})</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Plane className="absolute right-3 top-3.5 opacity-60 rotate-180" />
          </div>
        </div>
        {/* Departure */}
        <div className="md:col-span-2">
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
        </div>
        {/* Passengers */}
        <div className="md:col-span-1">
          <label className="mb-1 block text-sm text-muted-foreground">Passengers</label>
          <div className="flex items-center gap-2 h-12 bg-secondary/60 rounded-md px-3">
            <Button type="button" variant="secondary" size="icon" onClick={()=>setData((d)=>({...d, passengers: Math.max(1, d.passengers-1)}))} aria-label="Decrease passengers">-</Button>
            <span className="flex-1 text-center">{data.passengers}</span>
            <Button type="button" variant="secondary" size="icon" onClick={()=>setData((d)=>({...d, passengers: d.passengers+1}))} aria-label="Increase passengers">+</Button>
          </div>
        </div>
        {/* Cabin */}
        <div className="md:col-span-1">
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
        </div>
        {/* Phone */}
        <div className="md:col-span-2">
          <label className="mb-1 block text-sm text-muted-foreground">Phone Number</label>
          <div className="relative">
            <Input placeholder="e.g., +44 20 1234 5678" inputMode="tel" className="h-12 bg-secondary/60 pr-10" value={data.phone ?? ""} onChange={(e)=> setData((d)=>({...d, phone: e.target.value}))} />
            <Phone className="absolute right-3 top-3.5 opacity-70" />
          </div>
        </div>
        {/* Email */}
        <div className="md:col-span-2">
          <label className="mb-1 block text-sm text-muted-foreground">Email Address</label>
          <div className="relative">
            <Input placeholder="Email (optional)" type="email" className="h-12 bg-secondary/60 pr-10" value={data.email ?? ""} onChange={(e)=> setData((d)=>({...d, email: e.target.value}))} />
            <Mail className="absolute right-3 top-3.5 opacity-70" />
          </div>
        </div>
        {/* Submit */}
        <div className="md:col-span-2 flex items-end">
          <Button type="submit" variant="hero" className="w-full h-12 group">
            Search Ticket
            <ArrowLeftRight className="transition-transform group-hover:translate-x-0.5" />
          </Button>
        </div>
      </div>
    </form>
  );
};

export default BookingForm;
