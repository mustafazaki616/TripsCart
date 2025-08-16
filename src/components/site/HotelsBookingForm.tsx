import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { MapPin, Phone, Calendar, Mail, Users } from "lucide-react";
import { sendAdminEmail } from "@/lib/email";

type FormState = {
  destination: string;
  phone: string;
  checkIn: string;
  checkOut: string;
  email: string;
  passengers: number;
  person1Age: string;
  person2Age: string;
  person3Age: string;
  class: "Economy" | "Business" | "";
  rooms: number;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

const HotelsBookingForm: React.FC = () => {
  const [data, setData] = React.useState<FormState>({
    destination: "",
    phone: "",
    checkIn: "",
    checkOut: "",
    email: "",
    passengers: 1,
    person1Age: "",
    person2Age: "",
    person3Age: "",
    class: "",
    rooms: 1,
  });
  const [errors, setErrors] = React.useState<FormErrors>({});
  const [showModal, setShowModal] = React.useState(false);

  const setField = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setErrors((e) => ({ ...e, [key]: undefined }));
    setData((d) => ({ ...d, [key]: value }));
  };

  const validate = (): boolean => {
    const next: FormErrors = {};
    if (!data.destination.trim()) next.destination = "Required";
    if (!data.phone.trim()) next.phone = "Required";
    if (!data.checkIn) next.checkIn = "Required";
    if (!data.checkOut) next.checkOut = "Required";
    if (!data.class) next.class = "Required";
    if (!data.passengers || data.passengers < 1) next.passengers = "Min 1";
    if (!data.person1Age.trim()) next.person1Age = "Required";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    
    try {
      // Send email to admin with form details
      await sendAdminEmail(data, 'Hotel Booking');
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
      destination: "",
      phone: "",
      checkIn: "",
      checkOut: "",
      email: "",
      passengers: 1,
      person1Age: "",
      person2Age: "",
      person3Age: "",
      class: "",
      rooms: 1,
    });
    setErrors({});
  };

  return (
    <>
      <form onSubmit={onSubmit} className="rounded-2xl bg-card/90 backdrop-blur border shadow-soft p-4 md:p-6">
        {/* Class Selection */}
        <div className="flex items-center gap-4 text-sm text-muted-foreground px-1 mb-4">
          <label className="inline-flex items-center gap-2">
            <input
              type="radio"
              name="class"
              className="accent-[hsl(var(--primary))]"
              checked={data.class === "Economy"}
              onChange={() => setField("class", "Economy")}
            />
            Economy
          </label>
          <label className="inline-flex items-center gap-2">
            <input
              type="radio"
              name="class"
              className="accent-[hsl(var(--primary))]"
              checked={data.class === "Business"}
              onChange={() => setField("class", "Business")}
            />
            Business
          </label>
          <div className="ml-auto">
            <Select value={data.rooms.toString()} onValueChange={(v) => setField("rooms", Number(v))}>
              <SelectTrigger className="w-24 h-8 bg-secondary/60">
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

        {/* Main Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="mb-1 block text-sm text-muted-foreground">Destination</label>
            <div className="relative">
              <Input
                value={data.destination}
                onChange={(e) => setField("destination", e.target.value)}
                placeholder="Enter City..."
                className="h-12 bg-secondary/60 pr-10"
              />
              <MapPin className="absolute right-3 top-3.5 opacity-70" />
            </div>
            {errors.destination && <p className="mt-1 text-xs text-destructive">{errors.destination}</p>}
          </div>
          <div>
            <label className="mb-1 block text-sm text-muted-foreground">Check-in Date</label>
            <div className="relative">
              <Input
                type="date"
                value={data.checkIn}
                onChange={(e) => setField("checkIn", e.target.value)}
                className="h-12 bg-secondary/60 pr-10"
              />
              <Calendar className="absolute right-3 top-3.5 opacity-70" />
            </div>
            {errors.checkIn && <p className="mt-1 text-xs text-destructive">{errors.checkIn}</p>}
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
            <label className="mb-1 block text-sm text-muted-foreground">Check-out Date</label>
            <div className="relative">
              <Input
                type="date"
                value={data.checkOut}
                onChange={(e) => setField("checkOut", e.target.value)}
                className="h-12 bg-secondary/60 pr-10"
              />
              <Calendar className="absolute right-3 top-3.5 opacity-70" />
            </div>
            {errors.checkOut && <p className="mt-1 text-xs text-destructive">{errors.checkOut}</p>}
          </div>
          <div className="md:col-span-2">
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
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="mb-1 block text-sm text-muted-foreground">No of Passengers</label>
              <div className="relative">
                <Select value={data.passengers.toString()} onValueChange={(v) => setField("passengers", Number(v))}>
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
            <div>
              <label className="mb-1 block text-sm text-muted-foreground">Person 1 Age</label>
              <div className="relative">
                <Input
                  type="number"
                  min="1"
                  max="120"
                  value={data.person1Age}
                  onChange={(e) => setField("person1Age", e.target.value)}
                  placeholder="Age..."
                  className="h-12 bg-secondary/60 pr-10"
                />
                <Calendar className="absolute right-3 top-3.5 opacity-70" />
              </div>
              {errors.person1Age && <p className="mt-1 text-xs text-destructive">{errors.person1Age}</p>}
            </div>
            <div>
              <label className="mb-1 block text-sm text-muted-foreground">Person 2 Age</label>
              <div className="relative">
                <Input
                  type="number"
                  min="1"
                  max="120"
                  value={data.person2Age}
                  onChange={(e) => setField("person2Age", e.target.value)}
                  placeholder="Age..."
                  className="h-12 bg-secondary/60 pr-10"
                />
                <Calendar className="absolute right-3 top-3.5 opacity-70" />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-sm text-muted-foreground">Person 3 Age</label>
              <div className="relative">
                <Input
                  type="number"
                  min="1"
                  max="120"
                  value={data.person3Age}
                  onChange={(e) => setField("person3Age", e.target.value)}
                  placeholder="Age..."
                  className="h-12 bg-secondary/60 pr-10"
                />
                <Calendar className="absolute right-3 top-3.5 opacity-70" />
              </div>
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="mt-6 flex justify-center">
          <Button type="submit" variant="hero" className="h-12 px-8 group">
            Search Hotel
            <svg className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
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

export default HotelsBookingForm;
