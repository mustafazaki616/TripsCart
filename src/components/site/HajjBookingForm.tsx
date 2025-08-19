import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { sendAdminEmail } from "@/lib/email";

type FormState = {
  name: string;
  passengers: number;
  departure: string;
  days: number;
  visa: "Yes" | "No" | "";
  hotel: "Standard" | "Economy" | "3 Star" | "4 Star" | "5 Star" | "";
  transport: "Yes" | "No" | "";
  phone: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

const HajjBookingForm: React.FC = () => {
  const [data, setData] = React.useState<FormState>({
    name: "",
    passengers: 1,
    departure: "",
    days: 10,
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
      await sendAdminEmail(data, 'Hajj Booking');
      // Show success modal
      setShowModal(true);
    } catch (error) {
      console.error('Error sending email:', error);
      // Still show success modal to user even if email fails
      setShowModal(true);
    }
  };

  const clear = () => {
    setData({ name: "", passengers: 1, departure: "", days: 10, visa: "", hotel: "", transport: "", phone: "" });
    setErrors({});
  };

  return (
    <>
      <form onSubmit={onSubmit} className="rounded-2xl bg-card/90 backdrop-blur border shadow-soft p-4 md:p-6">
        <div className="space-y-4 md:grid md:grid-cols-2 md:gap-4 md:space-y-0">
          <div>
            <label className="mb-2 block text-sm text-muted-foreground font-medium">Name</label>
            <Input value={data.name} onChange={(e)=> setField("name", e.target.value)} placeholder="Your full name" className="h-11 bg-secondary/60 text-sm" />
            {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name}</p>}
          </div>
          <div>
            <label className="mb-2 block text-sm text-muted-foreground font-medium">Contact Number</label>
            <Input type="tel" value={data.phone} onChange={(e)=> setField("phone", e.target.value)} placeholder="e.g., +44 20 1234 5678" className="h-11 bg-secondary/60 text-sm" />
            {errors.phone && <p className="mt-1 text-xs text-destructive">{errors.phone}</p>}
          </div>
          <div>
            <label className="mb-2 block text-sm text-muted-foreground font-medium">Passengers</label>
            <Input type="number" min={1} value={data.passengers} onChange={(e)=> setField("passengers", Math.max(1, Number(e.target.value)))} className="h-11 bg-secondary/60 text-sm" />
            {errors.passengers && <p className="mt-1 text-xs text-destructive">{errors.passengers}</p>}
          </div>
          <div>
            <label className="mb-2 block text-sm text-muted-foreground font-medium">Departure</label>
            <Input type="date" value={data.departure} onChange={(e)=> setField("departure", e.target.value)} className="h-11 bg-secondary/60 text-sm" />
            {errors.departure && <p className="mt-1 text-xs text-destructive">{errors.departure}</p>}
          </div>
          <div>
            <label className="mb-2 block text-sm text-muted-foreground font-medium">Days</label>
            <Input type="number" min={1} value={data.days} onChange={(e)=> setField("days", Math.max(1, Number(e.target.value)))} className="h-11 bg-secondary/60 text-sm" />
            {errors.days && <p className="mt-1 text-xs text-destructive">{errors.days}</p>}
          </div>
          <div>
            <label className="mb-2 block text-sm text-muted-foreground font-medium">Visa</label>
            <Select value={data.visa} onValueChange={(v)=> setField("visa", v as FormState["visa"])}>
              <SelectTrigger className="h-11 bg-secondary/60"><SelectValue placeholder="Select" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Yes">Yes</SelectItem>
                <SelectItem value="No">No</SelectItem>
              </SelectContent>
            </Select>
            {errors.visa && <p className="mt-1 text-xs text-destructive">{errors.visa}</p>}
          </div>
          <div>
            <label className="mb-2 block text-sm text-muted-foreground font-medium">Hotels</label>
            <Select value={data.hotel} onValueChange={(v)=> setField("hotel", v as FormState["hotel"])}>
              <SelectTrigger className="h-11 bg-secondary/60"><SelectValue placeholder="Select" /></SelectTrigger>
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
            <label className="mb-2 block text-sm text-muted-foreground font-medium">Transport</label>
            <Select value={data.transport} onValueChange={(v)=> setField("transport", v as FormState["transport"])}>
              <SelectTrigger className="h-11 bg-secondary/60"><SelectValue placeholder="Select" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Yes">Yes</SelectItem>
                <SelectItem value="No">No</SelectItem>
              </SelectContent>
            </Select>
            {errors.transport && <p className="mt-1 text-xs text-destructive">{errors.transport}</p>}
          </div>
          <div className="md:col-span-2 flex justify-center md:justify-end mt-2">
            <Button type="submit" className="h-12 px-8 text-base" variant="hero">Book Hajj</Button>
          </div>
        </div>
      </form>

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

export default HajjBookingForm;


