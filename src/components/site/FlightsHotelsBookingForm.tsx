import * as React from "react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Plane, Phone, Calendar, Mail, Users, ArrowLeftRight, Search, X, UserRound, Hotel } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarWidget } from "@/components/ui/calendar";
import { sendAdminEmail } from "@/lib/email";
import { searchAirports, getAirportByCode, getPopularAirports, type Airport } from "@/data/airports";
import { cn } from "@/lib/utils";



const cabinClasses = ["Economy", "Premium Economy", "Business", "First"] as const;

type FormState = {
  tripType: "round" | "oneway";
  origin?: string;
  destination?: string;
  departDate?: Date;
  returnDate?: Date;
  checkIn?: Date;
  checkOut?: Date;
  phone?: string;
  email?: string;
  adults: number;
  children: number;
  infants: number;
  cabin: typeof cabinClasses[number];
  rooms: number;
  personAges: string[];
};

type FormErrors = Partial<Record<
  | "origin"
  | "destination"
  | "departDate"
  | "returnDate"
  | "checkIn"
  | "checkOut"
  | "adults"
  | "infants"
  | "cabin"
  | "phone"
  | "email"
  | "rooms", string>>;

const FlightsHotelsBookingForm: React.FC = () => {
  const [openOrigin, setOpenOrigin] = React.useState(false);
  const [openDestination, setOpenDestination] = React.useState(false);
  const [openDepart, setOpenDepart] = React.useState(false);
  const [openReturn, setOpenReturn] = React.useState(false);
  const [openCheckIn, setOpenCheckIn] = React.useState(false);
  const [openCheckOut, setOpenCheckOut] = React.useState(false);
  const [originFilter, setOriginFilter] = React.useState("");
  const [destinationFilter, setDestinationFilter] = React.useState("");
  const [swapAnim, setSwapAnim] = React.useState(false);
  const [data, setData] = React.useState<FormState>({
    tripType: "round",
    adults: 1,
    children: 0,
    infants: 0,
    cabin: "Economy",
    rooms: 1,
    personAges: [""],
  });
  const [errors, setErrors] = React.useState<FormErrors>({});
  const [showModal, setShowModal] = React.useState(false);

  const setField = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setData((d) => ({ ...d, [key]: value }));
    if (errors[key as keyof FormErrors]) {
      setErrors((e) => ({ ...e, [key as keyof FormErrors]: undefined }));
    }
  };

  const setPersonAge = (index: number, value: string) => {
    setErrors((e) => ({ ...e, [`personAge${index + 1}`]: undefined }));
    setData((d) => {
      const newAges = [...d.personAges];
      newAges[index] = value;
      return { ...d, personAges: newAges };
    });
  };

  const updatePassengers = (newPassengerCount: number) => {
    const totalPassengers = data.adults + data.children + data.infants;
    setData((d) => {
      const currentAges = [...d.personAges];
      if (newPassengerCount > currentAges.length) {
        while (currentAges.length < newPassengerCount) {
          currentAges.push("");
        }
      } else if (newPassengerCount < currentAges.length) {
        currentAges.splice(newPassengerCount);
      }
      return { ...d, personAges: currentAges };
    });
  };

  const swap = () => {
    if (!data.origin && !data.destination) return;
    setSwapAnim(true);
    setTimeout(() => setSwapAnim(false), 200);
    setData((d) => ({ ...d, origin: d.destination, destination: d.origin }));
  };

  const validate = (): boolean => {
    const next: FormErrors = {};
    if (!data.origin) next.origin = "Origin is required";
    if (!data.destination) next.destination = "Destination is required";
    if (!data.departDate) next.departDate = "Departure date is required";
    if (data.tripType === "round" && !data.returnDate) next.returnDate = "Return date is required";
    if (!data.checkIn) next.checkIn = "Check-in date is required";
    if (!data.checkOut) next.checkOut = "Check-out date is required";
    if (data.adults < 1) next.adults = "At least 1 adult is required";
    if (data.infants > data.adults) next.infants = "Infants cannot exceed adults";
    if (!data.phone) next.phone = "Phone is required";
    if (!data.email) next.email = "Email is required";
    if (!data.rooms || data.rooms < 1) next.rooms = "At least 1 room is required";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    
    try {
      const originAirport = data.origin ? getAirportByCode(data.origin) : null;
      const destinationAirport = data.destination ? getAirportByCode(data.destination) : null;
      
      await sendAdminEmail({
        subject: "New Flights & Hotels Booking Request",
        message: `
          Trip Type: ${data.tripType === "round" ? "Round-trip" : "One Way"}
          Origin: ${originAirport ? `${originAirport.city}, ${originAirport.country} (${data.origin})` : data.origin || "N/A"}
          Destination: ${destinationAirport ? `${destinationAirport.city}, ${destinationAirport.country} (${data.destination})` : data.destination || "N/A"}
          Departure: ${data.departDate ? format(data.departDate, "PPP") : "N/A"}
          Return: ${data.returnDate ? format(data.returnDate, "PPP") : "N/A"}
          Check-in: ${data.checkIn ? format(data.checkIn, "PPP") : "N/A"}
          Check-out: ${data.checkOut ? format(data.checkOut, "PPP") : "N/A"}
          Adults: ${data.adults}
          Children: ${data.children}
          Infants: ${data.infants}
          Cabin: ${data.cabin}
          Rooms: ${data.rooms}
          Person Ages: ${data.personAges.join(", ")}
          Phone: ${data.phone || "N/A"}
          Email: ${data.email || "N/A"}
        `,
      });
      setShowModal(true);
    } catch (error) {
      console.error("Failed to send email:", error);
      setShowModal(true);
    }
  };

  const clear = () => {
    setData({
      tripType: "round",
      origin: undefined,
      destination: undefined,
      departDate: undefined,
      returnDate: undefined,
      checkIn: undefined,
      checkOut: undefined,
      phone: undefined,
      email: undefined,
      adults: 1,
      children: 0,
      infants: 0,
      cabin: "Economy",
      rooms: 1,
      personAges: [""],
    });
    setErrors({});
    setOriginFilter("");
    setDestinationFilter("");
  };

  return (
    <>
      <form onSubmit={onSubmit} className="rounded-2xl bg-card/90 backdrop-blur border shadow-soft p-4 md:p-6">
        {/* Trip Type and Booking Options */}
        <div className="flex gap-2 text-sm mb-4">
          {/* Trip Type */}
          <div className="flex-shrink-0">
            <div className="flex bg-secondary/60 rounded-lg p-1">
              <button
                type="button"
                onClick={() => setField("tripType", "round")}
                className={cn(
                  "px-3 py-1 rounded-md text-sm font-medium transition-colors",
                  data.tripType === "round"
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                Round-trip
              </button>
              <button
                type="button"
                onClick={() => setField("tripType", "oneway")}
                className={cn(
                  "px-3 py-1 rounded-md text-sm font-medium transition-colors",
                  data.tripType === "oneway"
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                One Way
              </button>
            </div>
          </div>

          {/* Travelers */}
          <div className="flex-shrink-0">
            <Select
              value={`${data.adults + data.children + data.infants}`}
              onValueChange={(value) => {
                const total = parseInt(value);
                setField("adults", Math.max(1, total));
                setField("children", 0);
                setField("infants", 0);
                updatePassengers(total);
              }}
            >
              <SelectTrigger className="w-auto min-w-0 px-3 py-1 h-8 text-sm bg-secondary/60">
                <UserRound className="w-4 h-4 mr-1" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                  <SelectItem key={num} value={num.toString()}>
                    {num} {num === 1 ? "Traveler" : "Travelers"}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Cabin Class */}
          <div className="flex-shrink-0">
            <Select value={data.cabin} onValueChange={(v) => setField("cabin", v as FormState["cabin"])}>
              <SelectTrigger className="w-auto min-w-0 px-3 py-1 h-8 text-sm bg-secondary/60">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Economy">Economy</SelectItem>
                <SelectItem value="Premium Economy">Premium Economy</SelectItem>
                <SelectItem value="Business">Business</SelectItem>
                <SelectItem value="First">First</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Rooms */}
          <div className="flex-shrink-0">
            <Select value={data.rooms.toString()} onValueChange={(v) => setField("rooms", Number(v))}>
              <SelectTrigger className="w-auto min-w-0 px-3 py-1 h-8 text-sm bg-secondary/60">
                <Hotel className="w-4 h-4 mr-1" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                  <SelectItem key={num} value={num.toString()}>
                    {num} {num === 1 ? "Room" : "Rooms"}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Flight Fields */}
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-sm text-muted-foreground">Fly From</label>
              <Popover open={openOrigin} onOpenChange={setOpenOrigin}>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start h-12 bg-secondary/60">
                    <Plane className="mr-2 h-4 w-4" />
                    <div className="flex flex-col items-start">
                      <span className="text-xs text-muted-foreground">From</span>
                      <span className="text-sm">
                        {data.origin ? getAirportByCode(data.origin)?.city || data.origin : "Select origin"}
                      </span>
                    </div>
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
                    {(originFilter ? searchAirports(originFilter) : getPopularAirports())
                      .map((airport) => (
                        <button
                          key={airport.code}
                          type="button"
                          className="w-full text-left px-3 py-2 hover:bg-accent"
                          onClick={() => {
                            setField("origin", airport.code);
                            setOpenOrigin(false);
                          }}
                        >
                          <div className="font-medium">{airport.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {airport.city}, {airport.country} ({airport.code})
                          </div>
                        </button>
                      ))}
                  </div>
                </PopoverContent>
              </Popover>
              {errors.origin && <p className="mt-1 text-xs text-destructive">{errors.origin}</p>}
            </div>
            <div>
              <label className="mb-1 block text-sm text-muted-foreground">Fly To</label>
              <Popover open={openDestination} onOpenChange={setOpenDestination}>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start h-12 bg-secondary/60">
                    <Plane className="mr-2 h-4 w-4" />
                    <div className="flex flex-col items-start">
                      <span className="text-xs text-muted-foreground">To</span>
                      <span className="text-sm">
                        {data.destination ? getAirportByCode(data.destination)?.city || data.destination : "Select destination"}
                      </span>
                    </div>
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
                    {(destinationFilter ? searchAirports(destinationFilter) : getPopularAirports())
                      .map((airport) => (
                        <button
                          key={airport.code}
                          type="button"
                          className="w-full text-left px-3 py-2 hover:bg-accent"
                          onClick={() => {
                            setField("destination", airport.code);
                            setOpenDestination(false);
                          }}
                        >
                          <div className="font-medium">{airport.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {airport.city}, {airport.country} ({airport.code})
                          </div>
                        </button>
                      ))}
                  </div>
                </PopoverContent>
              </Popover>
              {errors.destination && <p className="mt-1 text-xs text-destructive">{errors.destination}</p>}
            </div>
          </div>

          {/* Swap Button */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 hidden md:block">
            <Button
              type="button"
              variant="outline"
              size="icon"
              className={cn(
                "h-8 w-8 rounded-full bg-background border-2 transition-transform duration-200",
                swapAnim && "rotate-180"
              )}
              onClick={swap}
            >
              <ArrowLeftRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Date Fields */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          {/* Departure Date */}
          <div>
            <Popover open={openDepart} onOpenChange={setOpenDepart}>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start h-12 px-4 bg-secondary/60">
                  <Calendar className="mr-2 h-4 w-4" />
                  <div className="flex flex-col items-start">
                    <span className="text-xs text-muted-foreground">Departure</span>
                    <span className="text-sm">
                      {data.departDate ? format(data.departDate, "MMM dd") : "Select"}
                    </span>
                  </div>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <CalendarWidget
                  mode="single"
                  selected={data.departDate}
                  onSelect={(date) => {
                    setField("departDate", date);
                    setOpenDepart(false);
                  }}
                  disabled={(date) => date < new Date()}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            {errors.departDate && <p className="mt-1 text-xs text-destructive">{errors.departDate}</p>}
          </div>

          {/* Return Date */}
          {data.tripType === "round" && (
            <div>
              <Popover open={openReturn} onOpenChange={setOpenReturn}>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start h-12 px-4 bg-secondary/60">
                    <Calendar className="mr-2 h-4 w-4" />
                    <div className="flex flex-col items-start">
                      <span className="text-xs text-muted-foreground">Return</span>
                      <span className="text-sm">
                        {data.returnDate ? format(data.returnDate, "MMM dd") : "Select"}
                      </span>
                    </div>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <CalendarWidget
                    mode="single"
                    selected={data.returnDate}
                    onSelect={(date) => {
                      setField("returnDate", date);
                      setOpenReturn(false);
                    }}
                    disabled={(date) => date < (data.departDate || new Date())}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              {errors.returnDate && <p className="mt-1 text-xs text-destructive">{errors.returnDate}</p>}
            </div>
          )}

          {/* Check-in Date */}
          <div>
            <Popover open={openCheckIn} onOpenChange={setOpenCheckIn}>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start h-12 px-4 bg-secondary/60">
                  <Calendar className="mr-2 h-4 w-4" />
                  <div className="flex flex-col items-start">
                    <span className="text-xs text-muted-foreground">Check-in</span>
                    <span className="text-sm">
                      {data.checkIn ? format(data.checkIn, "MMM dd") : "Select"}
                    </span>
                  </div>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <CalendarWidget
                  mode="single"
                  selected={data.checkIn}
                  onSelect={(date) => {
                    setField("checkIn", date);
                    setOpenCheckIn(false);
                  }}
                  disabled={(date) => date < new Date()}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            {errors.checkIn && <p className="mt-1 text-xs text-destructive">{errors.checkIn}</p>}
          </div>

          {/* Check-out Date */}
          <div>
            <Popover open={openCheckOut} onOpenChange={setOpenCheckOut}>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start h-12 px-4 bg-secondary/60">
                  <Calendar className="mr-2 h-4 w-4" />
                  <div className="flex flex-col items-start">
                    <span className="text-xs text-muted-foreground">Check-out</span>
                    <span className="text-sm">
                      {data.checkOut ? format(data.checkOut, "MMM dd") : "Select"}
                    </span>
                  </div>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <CalendarWidget
                  mode="single"
                  selected={data.checkOut}
                  onSelect={(date) => {
                    setField("checkOut", date);
                    setOpenCheckOut(false);
                  }}
                  disabled={(date) => date < (data.checkIn || new Date())}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            {errors.checkOut && <p className="mt-1 text-xs text-destructive">{errors.checkOut}</p>}
          </div>
        </div>

        {/* Contact Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div className="relative">
            <Input
              type="tel"
              value={data.phone || ""}
              onChange={(e) => setField("phone", e.target.value)}
              className="h-12 pl-3 bg-secondary/60"
              placeholder="UK Number Only"
            />
            {errors.phone && <p className="mt-1 text-xs text-destructive">{errors.phone}</p>}
          </div>
          <div className="relative">
            <Input
              type="email"
              value={data.email || ""}
              onChange={(e) => setField("email", e.target.value)}
              className="h-12 pl-3 bg-secondary/60"
              placeholder="Enter your email"
            />
            {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email}</p>}
          </div>
        </div>

        {/* Room Details */}
        {data.personAges.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-4">Person Ages</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {data.personAges.map((age, index) => (
                <div key={index}>
                  <Input
                    type="number"
                    value={age}
                    onChange={(e) => {
                      const newAges = [...data.personAges];
                      newAges[index] = e.target.value;
                      setField("personAges", newAges);
                    }}
                    className="h-10 bg-secondary/60"
                    placeholder={`Person ${index + 1}`}
                    min="1"
                    max="99"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Submit */}
        <div className="mt-6 flex justify-center">
          <Button type="submit" className="w-full h-12 text-base font-medium bg-primary hover:bg-primary/90">
            Search Flights & Hotels
          </Button>
        </div>
      </form>

      {/* Success Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-background rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold mb-2">Request Submitted!</h3>
            <p className="text-muted-foreground mb-4">
              Thank you for your booking request. We'll get back to you soon with the best deals for flights and hotels.
            </p>
            <div className="flex gap-2">
              <Button onClick={() => setShowModal(false)} className="flex-1">
                Close
              </Button>
              <Button onClick={() => { setShowModal(false); clear(); }} variant="outline" className="flex-1">
                New Search
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FlightsHotelsBookingForm;
