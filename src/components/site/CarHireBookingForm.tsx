import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { MapPin, Phone, Calendar, Mail, Clock } from "lucide-react";
import { sendAdminEmail } from "@/lib/email";

type FormState = {
  pickUpLocation: string;
  pickUpDate: string;
  pickUpTime: string;
  dropOffLocation: string;
  dropOffDate: string;
  dropOffTime: string;
  phone: string;
  email: string;
  class: "Economy" | "Business" | "";
};

type FormErrors = Partial<Record<keyof FormState, string>>;

const CarHireBookingForm: React.FC = () => {
  const [data, setData] = React.useState<FormState>({
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
      <form onSubmit={onSubmit} className="rounded-2xl bg-card/90 backdrop-blur border shadow-soft p-4 md:p-6">
        {/* Class Selection */}
        <div className="flex items-center gap-4 text-sm text-muted-foreground px-1 mb-6">
          <label className="inline-flex items-center gap-2 font-medium">
            <input
              type="radio"
              name="class"
              className="accent-[hsl(var(--primary))]"
              checked={data.class === "Economy"}
              onChange={() => setField("class", "Economy")}
            />
            Economy
          </label>
          <label className="inline-flex items-center gap-2 font-medium">
            <input
              type="radio"
              name="class"
              className="accent-[hsl(var(--primary))]"
              checked={data.class === "Business"}
              onChange={() => setField("class", "Business")}
            />
            Business
          </label>
        </div>

        {/* Main Fields */}
        <div className="space-y-4">
          {/* Pick-up & Drop-off Locations */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="mb-2 block text-sm text-muted-foreground font-medium">Pick-up Location</label>
              <div className="relative">
                <Input
                  value={data.pickUpLocation}
                  onChange={(e) => setField("pickUpLocation", e.target.value)}
                  placeholder="Enter Pick-up location..."
                  className="h-11 bg-secondary/60 pr-10 text-sm"
                />
                <MapPin className="absolute right-3 top-3 opacity-70 w-4 h-4" />
              </div>
              {errors.pickUpLocation && <p className="mt-1 text-xs text-destructive">{errors.pickUpLocation}</p>}
            </div>
            <div>
              <label className="mb-2 block text-sm text-muted-foreground font-medium">Drop-off Location</label>
              <div className="relative">
                <Input
                  value={data.dropOffLocation}
                  onChange={(e) => setField("dropOffLocation", e.target.value)}
                  placeholder="Enter Drop-off Location..."
                  className="h-11 bg-secondary/60 pr-10 text-sm"
                />
                <MapPin className="absolute right-3 top-3 opacity-70 w-4 h-4" />
              </div>
              {errors.dropOffLocation && <p className="mt-1 text-xs text-destructive">{errors.dropOffLocation}</p>}
            </div>
          </div>

          {/* Pick-up & Drop-off Dates */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="mb-2 block text-sm text-muted-foreground font-medium">Pick-up Date</label>
              <div className="relative">
                <Input
                  type="date"
                  value={data.pickUpDate}
                  onChange={(e) => setField("pickUpDate", e.target.value)}
                  className="h-11 bg-secondary/60 pr-10 text-sm"
                />
                <Calendar className="absolute right-3 top-3 opacity-70 w-4 h-4" />
              </div>
              {errors.pickUpDate && <p className="mt-1 text-xs text-destructive">{errors.pickUpDate}</p>}
            </div>
            <div>
              <label className="mb-2 block text-sm text-muted-foreground font-medium">Drop-off Date</label>
              <div className="relative">
                <Input
                  type="date"
                  value={data.dropOffDate}
                  onChange={(e) => setField("dropOffDate", e.target.value)}
                  className="h-11 bg-secondary/60 pr-10 text-sm"
                />
                <Calendar className="absolute right-3 top-3 opacity-70 w-4 h-4" />
              </div>
              {errors.dropOffDate && <p className="mt-1 text-xs text-destructive">{errors.dropOffDate}</p>}
            </div>
          </div>

          {/* Pick-up & Drop-off Times */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="mb-2 block text-sm text-muted-foreground font-medium">Pick-up Time</label>
              <div className="relative">
                <Input
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
              <label className="mb-2 block text-sm text-muted-foreground font-medium">Drop-off Time</label>
              <div className="relative">
                <Input
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="mb-2 block text-sm text-muted-foreground font-medium">Phone Number</label>
              <div className="relative">
                <Input
                  type="tel"
                  value={data.phone}
                  onChange={(e) => setField("phone", e.target.value)}
                  placeholder="UK Numbers Only"
                  className="h-11 bg-secondary/60 pr-10 text-sm"
                />
                <Phone className="absolute right-3 top-3 opacity-70 w-4 h-4" />
              </div>
              {errors.phone && <p className="mt-1 text-xs text-destructive">{errors.phone}</p>}
            </div>
            <div>
              <label className="mb-2 block text-sm text-muted-foreground font-medium">Email Address</label>
              <div className="relative">
                <Input
                  type="email"
                  value={data.email}
                  onChange={(e) => setField("email", e.target.value)}
                  placeholder="Email (Optional)"
                  className="h-11 bg-secondary/60 pr-10 text-sm"
                />
                <Mail className="absolute right-3 top-3 opacity-70 w-4 h-4" />
              </div>
              {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email}</p>}
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="mt-6 flex justify-center">
          <Button type="submit" variant="hero" className="h-12 px-8 text-base group">
            Search Car
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

export default CarHireBookingForm;
