import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarWidget } from "@/components/ui/calendar";
import { Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { sendAdminEmail } from "@/lib/email";
import { PassengerModal, type PassengerCounts } from "./PassengerModal";

type FormState = {
  name: string;
  adults: number;
  children: number;
  infants: number;
  departure: Date | undefined;
  days: number;
  visa: "Yes" | "No" | "";
  hotel: "Standard" | "Economy" | "3 Star" | "4 Star" | "5 Star" | "";
  transport: "Yes" | "No" | "";
  phone: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

const UmrahBookingForm: React.FC = () => {
  const [data, setData] = React.useState<FormState>({
    name: "",
    adults: 1,
    children: 0,
    infants: 0,
    departure: undefined,
    days: 7,
    visa: "",
    hotel: "",
    transport: "",
    phone: "",
  });
  const [errors, setErrors] = React.useState<FormErrors>({});
  const [showModal, setShowModal] = React.useState(false);

  const setField = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setErrors((e) => ({ ...e, [key]: undefined }));
    setData((d) => ({ ...d, [key]: value }));
  };

  const validate = (): boolean => {
    const next: FormErrors = {};
    if (!data.name.trim()) next.name = "Required";
    if (!data.passengers || data.passengers < 1) next.passengers = "Min 1";
    if (!data.departure) next.departure = "Required";
    if (!data.days || data.days < 1) next.days = "Min 1";
    if (!data.visa) next.visa = "Required";
    if (!data.hotel) next.hotel = "Required";
    if (!data.transport) next.transport = "Required";
    if (!data.phone.trim()) next.phone = "Required";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    
    try {
      // Send email to admin with form details
      const emailData = {
        name: data.name,
        email: data.email || '',
        phone: data.phone,
        departureDate: data.departDate,
        adults: data.adults,
        children: data.children,
        infants: data.infants,
        message: `Departure: ${data.departure}, Days: ${data.days}, Visa: ${data.visa}, Hotel: ${data.hotel}, Transport: ${data.transport}`
      };
      
      await sendAdminEmail(emailData, 'Umrah Booking');
      // Show success modal
      setShowModal(true);
    } catch (error) {
      console.error('Error sending email:', error);
      // Still show success modal to user even if email fails
      setShowModal(true);
    }
  };

  const clear = () => {
    setData({ name: "", adults: 1, children: 0, infants: 0, departure: "", days: 7, visa: "", hotel: "", transport: "", phone: "", email: "" });
    setErrors({});
  };

  return (
    <>
      <div className="booking-form-container rounded-2xl bg-card/20 backdrop-blur border shadow-soft p-2 md:p-6">
        {/* Mobile Compact Layout */}
        <div className="space-y-2 md:hidden">
          {/* Centered - Passengers */}
          <div className="flex justify-center">
            <div className="w-full max-w-xs">
              <label className="text-xs text-gray-500 mb-0.5 block text-center" htmlFor="passengers-mobile">Passengers</label>
              <PassengerModal
                id="passengers-mobile"
                passengers={{
                  adults: data.adults,
                  children: data.children,
                  infants: data.infants
                }}
                onPassengersChange={(passengers: PassengerCounts) => {
                  setData(prev => ({ ...prev, ...passengers }));
                }}
                className="h-16 w-full px-4 text-sm bg-white rounded-lg border border-gray-200"
              />
            </div>
          </div>

          {/* Two Column Grid - Form Fields */}
          <div className="grid grid-cols-2 gap-1">
            <div>
              <label htmlFor="name-mobile" className="text-xs text-gray-500 mb-0.5 block">Name</label>
              <Input 
                id="name-mobile"
                value={data.name} 
                onChange={(e)=> setField("name", e.target.value)} 
                placeholder="Your full name" 
                className="h-16 w-full px-4 text-sm bg-white rounded-lg border border-gray-200 placeholder:text-xs" 
              />
              {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name}</p>}
            </div>
            <div>
              <label htmlFor="days-mobile" className="text-xs text-gray-500 mb-0.5 block">Days</label>
              <Input 
                id="days-mobile"
                type="number" 
                min={1} 
                value={data.days} 
                onChange={(e)=> setField("days", Math.max(1, Number(e.target.value)))} 
                className="h-12 w-full px-4 text-sm bg-white rounded-lg border border-gray-200" 
              />
              {errors.days && <p className="mt-1 text-xs text-destructive">{errors.days}</p>}
            </div>
            <div>
              <label htmlFor="departure-date-mobile" className="text-xs text-gray-500 mb-0.5 block">Departure Date</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="departure-date-mobile"
                    variant="outline"
                    className={cn(
                      "h-16 w-full px-4 text-sm bg-white rounded-lg border border-gray-200 justify-start text-left font-normal",
                      !data.departure && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {data.departure ? format(data.departure, "dd/MM/yyyy") : "Departure Date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <CalendarWidget
                    mode="single"
                    selected={data.departure}
                    onSelect={(date) => setField("departure", date)}
                    disabled={(date) => date < new Date()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              {errors.departure && <p className="mt-1 text-xs text-destructive">{errors.departure}</p>}
            </div>
            <div>
              <label htmlFor="hotel-mobile" className="text-xs text-gray-500 mb-0.5 block">Hotel Category</label>
              <Select value={data.hotel} onValueChange={(v)=> setField("hotel", v as FormState["hotel"]))}>
                <SelectTrigger className="h-16 w-full px-4 text-sm bg-white rounded-lg border border-gray-200" id="hotel-mobile" name="hotel">
                  <SelectValue placeholder="Select hotel category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Standard">Standard</SelectItem>
                  <SelectItem value="Economy">Economy</SelectItem>
                  <SelectItem value="3 Star">3 Star</SelectItem>
                  <SelectItem value="4 Star">4 Star</SelectItem>
                  <SelectItem value="5 Star">5 Star</SelectItem>
                </SelectContent>
              </Select>
              {errors.hotel && <p className="mt-1 text-xs text-destructive">{errors.hotel}</p>}
            </div>
            <div>
              <label htmlFor="visa-mobile" className="text-xs text-gray-500 mb-0.5 block">Visa</label>
              <Select value={data.visa} onValueChange={(v)=> setField("visa", v as FormState["visa"]))}>
                <SelectTrigger className="h-16 w-full px-4 text-sm bg-white rounded-lg border border-gray-200" id="visa-mobile" name="visa">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Yes">Yes</SelectItem>
                  <SelectItem value="No">No</SelectItem>
                </SelectContent>
              </Select>
              {errors.visa && <p className="mt-1 text-xs text-destructive">{errors.visa}</p>}
            </div>
            <div>
              <label htmlFor="transport-mobile" className="text-xs text-gray-500 mb-0.5 block">Transport</label>
              <Select value={data.transport} onValueChange={(v)=> setField("transport", v as FormState["transport"]))}>
                <SelectTrigger className="h-16 w-full px-4 text-sm bg-white rounded-lg border border-gray-200" id="transport-mobile" name="transport">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Yes">Yes</SelectItem>
                  <SelectItem value="No">No</SelectItem>
                </SelectContent>
              </Select>
              {errors.transport && <p className="mt-1 text-xs text-destructive">{errors.transport}</p>}
            </div>
            <div>
              <label htmlFor="contact-number-mobile" className="text-xs text-gray-500 mb-0.5 block">Contact Number</label>
              <Input 
                id="contact-number-mobile"
                type="tel" 
                value={data.phone} 
                onChange={(e)=> setField("phone", e.target.value)} 
                placeholder="e.g., +44 20 1234 5678" 
                className="h-16 w-full px-4 text-sm bg-white rounded-lg border border-gray-200 placeholder:text-xs" 
              />
              {errors.phone && <p className="mt-1 text-xs text-destructive">{errors.phone}</p>}
            </div>
          </div>

          {/* Full Width - Search Button */}
          <Button 
            type="button" 
            className="h-12 w-full text-base font-bold rounded-lg" 
            variant="hero"
            onClick={(e) => { e.preventDefault(); onSubmit(e as any); }}
          >
            Book Umrah
          </Button>
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:grid md:grid-cols-2 md:gap-2 md:space-y-0">
          <div>
            <label htmlFor="umrah-name" className="mb-2 block text-sm text-muted-foreground font-medium">Name</label>
            <Input id="umrah-name" name="name" autoComplete="name" value={data.name} onChange={(e)=> setField("name", e.target.value)} placeholder="Your full name" className="h-11 bg-secondary/60 text-sm placeholder:text-xs" />
            {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name}</p>}
          </div>
          <div>
            <label htmlFor="umrah-phone" className="mb-2 block text-sm text-muted-foreground font-medium">Contact Number</label>
            <Input id="umrah-phone" name="phone" type="tel" autoComplete="tel" value={data.phone} onChange={(e)=> setField("phone", e.target.value)} placeholder="e.g., +44 20 1234 5678" className="h-11 bg-secondary/60 text-sm placeholder:text-xs" />
            {errors.phone && <p className="mt-1 text-xs text-destructive">{errors.phone}</p>}
          </div>
          <div>
            <label htmlFor="umrah-passengers" className="mb-2 block text-sm text-muted-foreground font-medium">Passengers</label>
            <Input id="umrah-passengers" name="passengers" type="number" min={1} value={data.passengers} onChange={(e)=> setField("passengers", Math.max(1, Number(e.target.value)))} className="h-11 bg-secondary/60 text-sm" />
            {errors.passengers && <p className="mt-1 text-xs text-destructive">{errors.passengers}</p>}
          </div>
          <div>
            <label htmlFor="departure-desktop" className="mb-2 block text-sm text-muted-foreground font-medium">Departure</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="departure-desktop"
                  variant="outline"
                  className={cn(
                    "h-11 w-full justify-start text-left font-normal bg-secondary/60 text-sm",
                    !data.departure && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {data.departure ? format(data.departure, "dd/MM/yyyy") : "Select departure date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <CalendarWidget
                  mode="single"
                  selected={data.departure}
                  onSelect={(date) => setField("departure", date)}
                  disabled={(date) => date < new Date()}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            {errors.departure && <p className="mt-1 text-xs text-destructive">{errors.departure}</p>}
          </div>
          <div>
            <label htmlFor="umrah-days" className="mb-2 block text-sm text-muted-foreground font-medium">Days</label>
            <Input id="umrah-days" name="days" type="number" min={1} value={data.days} onChange={(e)=> setField("days", Math.max(1, Number(e.target.value)))} className="h-11 bg-secondary/60 text-sm" />
            {errors.days && <p className="mt-1 text-xs text-destructive">{errors.days}</p>}
          </div>
          <div>
            <label htmlFor="visa-desktop" className="mb-2 block text-sm text-muted-foreground font-medium">Visa</label>
            <Select value={data.visa} onValueChange={(v)=> setField("visa", v as FormState["visa"]))}>
              <SelectTrigger className="h-11 bg-secondary/60" id="visa-desktop" name="visa"><SelectValue placeholder="Select" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Yes">Yes</SelectItem>
                <SelectItem value="No">No</SelectItem>
              </SelectContent>
            </Select>
            {errors.visa && <p className="mt-1 text-xs text-destructive">{errors.visa}</p>}
          </div>
          <div>
            <label htmlFor="hotel-desktop" className="mb-2 block text-sm text-muted-foreground font-medium">Hotels</label>
            <Select value={data.hotel} onValueChange={(v)=> setField("hotel", v as FormState["hotel"]))}>
              <SelectTrigger className="h-11 bg-secondary/60" id="hotel-desktop" name="hotel"><SelectValue placeholder="Select" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Standard">Standard</SelectItem>
                <SelectItem value="Economy">Economy</SelectItem>
                <SelectItem value="3 Star">3 Star</SelectItem>
                <SelectItem value="4 Star">4 Star</SelectItem>
                <SelectItem value="5 Star">5 Star</SelectItem>
              </SelectContent>
            </Select>
            {errors.hotel && <p className="mt-1 text-xs text-destructive">{errors.hotel}</p>}
          </div>
          <div>
            <label htmlFor="transport-desktop" className="mb-2 block text-sm text-muted-foreground font-medium">Transport</label>
            <Select value={data.transport} onValueChange={(v)=> setField("transport", v as FormState["transport"]))}>
              <SelectTrigger className="h-11 bg-secondary/60" id="transport-desktop" name="transport"><SelectValue placeholder="Select" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Yes">Yes</SelectItem>
                <SelectItem value="No">No</SelectItem>
              </SelectContent>
            </Select>
            {errors.transport && <p className="mt-1 text-xs text-destructive">{errors.transport}</p>}
          </div>
          <div className="md:col-span-2 flex justify-center md:justify-end mt-2">
            <Button type="button" className="h-12 px-8 text-base" variant="hero" onClick={(e) => { e.preventDefault(); onSubmit(e as any); }}>Book Umrah</Button>
          </div>
        </div>
      </div>

      <Dialog open={showModal} onOpenChange={(o)=>{ if(!o){ setShowModal(false); clear(); } }}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Form submitted!</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">Our team will contact you soon.</p>
          <div className="mt-4 flex justify-end">
            <Button onClick={()=>{ setShowModal(false); clear(); }}>Close</Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UmrahBookingForm;


