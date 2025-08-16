import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Plane, Phone, Calendar, Mail, Users, ArrowLeftRight, Search, X } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
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

type FormState = {
  origin: string;
  destination: string;
  departDate: string;
  returnDate: string;
  phone: string;
  email: string;
  passengers: number;
  cabin: "Economy" | "Business" | "";
  rooms: number;
  personAges: string[];
};

type FormErrors = Partial<Record<keyof FormState, string>>;

const FlightsHotelsBookingForm: React.FC = () => {
  const [openOrigin, setOpenOrigin] = React.useState(false);
  const [openDestination, setOpenDestination] = React.useState(false);
  const [originFilter, setOriginFilter] = React.useState("");
  const [destinationFilter, setDestinationFilter] = React.useState("");
  const [data, setData] = React.useState<FormState>({
    origin: "",
    destination: "",
    departDate: "",
    returnDate: "",
    phone: "",
    email: "",
    passengers: 1,
    cabin: "",
    rooms: 1,
    personAges: [""],
  });
  const [errors, setErrors] = React.useState<FormErrors>({});
  const [showModal, setShowModal] = React.useState(false);

  const setField = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setErrors((e) => ({ ...e, [key]: undefined }));
    setData((d) => ({ ...d, [key]: value }));
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
    setData((d) => {
      const currentAges = [...d.personAges];
      if (newPassengerCount > currentAges.length) {
        // Add more age fields
        while (currentAges.length < newPassengerCount) {
          currentAges.push("");
        }
      } else if (newPassengerCount < currentAges.length) {
        // Remove excess age fields
        currentAges.splice(newPassengerCount);
      }
      return { ...d, passengers: newPassengerCount, personAges: currentAges };
    });
  };

  const validate = (): boolean => {
    const next: FormErrors = {};
    if (!data.origin.trim()) next.origin = "Required";
    if (!data.destination.trim()) next.destination = "Required";
    if (!data.departDate) next.departDate = "Required";
    if (!data.returnDate) next.returnDate = "Required";
    if (!data.phone.trim()) next.phone = "Required";
    if (!data.cabin) next.cabin = "Required";
    if (!data.passengers || data.passengers < 1) next.passengers = "Min 1";
    
    // Validate that all person ages are filled
    for (let i = 0; i < data.passengers; i++) {
      if (!data.personAges[i] || !data.personAges[i].trim()) {
        next[`personAge${i + 1}` as keyof FormErrors] = "Required";
      }
    }
    
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    
    try {
      // Send email to admin with form details
      await sendAdminEmail(data, 'Flights & Hotels Booking');
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
      origin: "",
      destination: "",
      departDate: "",
      returnDate: "",
      phone: "",
      email: "",
      passengers: 1,
      cabin: "",
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
        {/* Booking Options */}
        <div className="flex items-center gap-4 text-sm text-muted-foreground px-1 mb-4">
          <label className="inline-flex items-center gap-2">
            <input
              type="radio"
              name="cabin"
              className="accent-[hsl(var(--primary))]"
              checked={data.cabin === "Economy"}
              onChange={() => setField("cabin", "Economy")}
            />
            Economy
          </label>
          <label className="inline-flex items-center gap-2">
            <input
              type="radio"
              name="cabin"
              className="accent-[hsl(var(--primary))]"
              checked={data.cabin === "Business"}
              onChange={() => setField("cabin", "Business")}
            />
            Business
          </label>
          <div className="ml-auto flex items-center gap-2">
            <Select value={data.passengers.toString()} onValueChange={(v) => updatePassengers(Number(v))}>
              <SelectTrigger className="w-24 h-8 bg-secondary/60">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 4, 5, 6].map((num) => (
                  <SelectItem key={num} value={num.toString()}>
                    {num} Traveler{num > 1 ? "s" : ""}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={data.cabin} onValueChange={(v) => setField("cabin", v as FormState["cabin"])}>
              <SelectTrigger className="w-24 h-8 bg-secondary/60">
                <SelectValue placeholder="Class" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Economy">Economy</SelectItem>
                <SelectItem value="Business">Business</SelectItem>
              </SelectContent>
            </Select>
            <Select value={data.rooms.toString()} onValueChange={(v) => setField("rooms", Number(v))}>
              <SelectTrigger className="w-20 h-8 bg-secondary/60">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 4, 5].map((num) => (
                  <SelectItem key={num} value={num.toString()}>
                    {num} Room{num > 1 ? "s" : ""}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Flight Fields */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="mb-1 block text-sm text-muted-foreground">Fly From</label>
            <Popover open={openOrigin} onOpenChange={setOpenOrigin}>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start h-12 bg-secondary/60">
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
                          setField("origin", c.code);
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
          </div>
          <div>
            <label className="mb-1 block text-sm text-muted-foreground">Fly To</label>
            <Popover open={openDestination} onOpenChange={setOpenDestination}>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start h-12 bg-secondary/60">
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
                          setField("destination", c.code);
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
          </div>
          <div>
            <label className="mb-1 block text-sm text-muted-foreground">Departure Date</label>
            <div className="relative">
              <Input
                type="date"
                value={data.departDate}
                onChange={(e) => setField("departDate", e.target.value)}
                className="h-12 bg-secondary/60 pr-10"
              />
              <Calendar className="absolute right-3 top-3.5 opacity-70" />
            </div>
            {errors.departDate && <p className="mt-1 text-xs text-destructive">{errors.departDate}</p>}
          </div>
          <div>
            <label className="mb-1 block text-sm text-muted-foreground">Return Date</label>
            <div className="relative">
              <Input
                type="date"
                value={data.returnDate}
                onChange={(e) => setField("returnDate", e.target.value)}
                className="h-12 bg-secondary/60 pr-10"
              />
              <Calendar className="absolute right-3 top-3.5 opacity-70" />
            </div>
            {errors.returnDate && <p className="mt-1 text-xs text-destructive">{errors.returnDate}</p>}
          </div>
          <div>
            <label className="mb-1 block text-sm text-muted-foreground">Phone Number</label>
            <div className="relative">
              <Input
                type="tel"
                value={data.phone}
                onChange={(e) => setField("phone", e.target.value)}
                placeholder="UK Numbers Only"
                className="h-12 bg-secondary/60 pr-10"
              />
              <Phone className="absolute right-3 top-3.5 opacity-70" />
            </div>
            {errors.phone && <p className="mt-1 text-xs text-destructive">{errors.phone}</p>}
          </div>
          <div>
            <label className="mb-1 block text-sm text-muted-foreground">Email Address</label>
            <div className="relative">
              <Input
                type="email"
                value={data.email}
                onChange={(e) => setField("email", e.target.value)}
                placeholder="Email (Optional)"
                className="h-12 bg-secondary/60 pr-10"
              />
              <Mail className="absolute right-3 top-3.5 opacity-70" />
            </div>
            {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email}</p>}
          </div>
        </div>

        {/* Room Details */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-4">Room 1</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="mb-1 block text-sm text-muted-foreground">No of Passengers</label>
              <div className="relative">
                <Select value={data.passengers.toString()} onValueChange={(v) => updatePassengers(Number(v))}>
                  <SelectTrigger className="h-12 bg-secondary/60 pr-10">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5, 6].map((num) => (
                      <SelectItem key={num} value={num.toString()}>
                        {num}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Users className="absolute right-3 top-3.5 opacity-70" />
              </div>
              {errors.passengers && <p className="mt-1 text-xs text-destructive">{errors.passengers}</p>}
            </div>
          </div>
          
          {/* Dynamic Age Fields */}
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            {data.personAges.map((age, index) => (
              <div key={index}>
                <label className="mb-1 block text-sm text-muted-foreground">Person {index + 1} Age</label>
                <div className="relative">
                  <Input
                    type="number"
                    min="1"
                    max="120"
                    value={age}
                    onChange={(e) => setPersonAge(index, e.target.value)}
                    placeholder="Age..."
                    className="h-12 bg-secondary/60 pr-10"
                  />
                  <Calendar className="absolute right-3 top-3.5 opacity-70" />
                </div>
                {errors[`personAge${index + 1}` as keyof FormErrors] && (
                  <p className="mt-1 text-xs text-destructive">{errors[`personAge${index + 1}` as keyof FormErrors]}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Submit */}
        <div className="mt-6 flex justify-center">
          <Button type="submit" variant="hero" className="h-12 px-8 group">
            Search Flight
            <ArrowLeftRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-0.5" />
          </Button>
        </div>
      </form>

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

export default FlightsHotelsBookingForm;
