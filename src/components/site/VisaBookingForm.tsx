import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { MapPin, Phone, Calendar, Mail, User, FileText } from "lucide-react";
import { sendAdminEmail } from "@/lib/email";

type FormState = {
  visaType: string;
  destination: string;
  travelDate: string;
  returnDate: string;
  firstName: string;
  lastName: string;
  passportNumber: string;
  phone: string;
  email: string;
  purpose: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

const VisaBookingForm: React.FC = () => {
  const [data, setData] = React.useState<FormState>({
    visaType: "",
    destination: "",
    travelDate: "",
    returnDate: "",
    firstName: "",
    lastName: "",
    passportNumber: "",
    phone: "",
    email: "",
    purpose: "",
  });
  const [errors, setErrors] = React.useState<FormErrors>({});
  const [showModal, setShowModal] = React.useState(false);

  const setField = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setErrors((e) => ({ ...e, [key]: undefined }));
    setData((d) => ({ ...d, [key]: value }));
  };

  const validate = (): boolean => {
    const next: FormErrors = {};
    if (!data.visaType) next.visaType = "Required";
    if (!data.destination.trim()) next.destination = "Required";
    if (!data.travelDate) next.travelDate = "Required";
    if (!data.returnDate) next.returnDate = "Required";
    if (!data.firstName.trim()) next.firstName = "Required";
    if (!data.lastName.trim()) next.lastName = "Required";
    if (!data.passportNumber.trim()) next.passportNumber = "Required";
    if (!data.phone.trim()) next.phone = "Required";
    if (!data.purpose.trim()) next.purpose = "Required";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    
    try {
      // Send email to admin with form details
      await sendAdminEmail(data, 'Visa Booking');
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
      visaType: "",
      destination: "",
      travelDate: "",
      returnDate: "",
      firstName: "",
      lastName: "",
      passportNumber: "",
      phone: "",
      email: "",
      purpose: "",
    });
    setErrors({});
  };

  return (
    <>
      <form onSubmit={onSubmit} className="rounded-2xl bg-card/90 backdrop-blur border shadow-soft p-4 md:p-6">
        {/* Main Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="mb-1 block text-sm text-muted-foreground">Visa Type</label>
            <Select value={data.visaType} onValueChange={(v) => setField("visaType", v)}>
              <SelectTrigger className="h-12 bg-secondary/60">
                <SelectValue placeholder="Select visa type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Tourist">Tourist Visa</SelectItem>
                <SelectItem value="Business">Business Visa</SelectItem>
                <SelectItem value="Student">Student Visa</SelectItem>
                <SelectItem value="Work">Work Visa</SelectItem>
                <SelectItem value="Transit">Transit Visa</SelectItem>
              </SelectContent>
            </Select>
            {errors.visaType && <p className="mt-1 text-xs text-destructive">{errors.visaType}</p>}
          </div>
          <div>
            <label className="mb-1 block text-sm text-muted-foreground">Destination</label>
            <div className="relative">
              <Input
                value={data.destination}
                onChange={(e) => setField("destination", e.target.value)}
                placeholder="Enter destination country..."
                className="h-12 bg-secondary/60 pr-10"
              />
              <MapPin className="absolute right-3 top-3.5 opacity-70" />
            </div>
            {errors.destination && <p className="mt-1 text-xs text-destructive">{errors.destination}</p>}
          </div>
          <div>
            <label className="mb-1 block text-sm text-muted-foreground">Travel Date</label>
            <div className="relative">
              <Input
                type="date"
                value={data.travelDate}
                onChange={(e) => setField("travelDate", e.target.value)}
                className="h-12 bg-secondary/60 pr-10"
              />
              <Calendar className="absolute right-3 top-3.5 opacity-70" />
            </div>
            {errors.travelDate && <p className="mt-1 text-xs text-destructive">{errors.travelDate}</p>}
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
            <label className="mb-1 block text-sm text-muted-foreground">First Name</label>
            <div className="relative">
              <Input
                value={data.firstName}
                onChange={(e) => setField("firstName", e.target.value)}
                placeholder="Enter first name"
                className="h-12 bg-secondary/60 pr-10"
              />
              <User className="absolute right-3 top-3.5 opacity-70" />
            </div>
            {errors.firstName && <p className="mt-1 text-xs text-destructive">{errors.firstName}</p>}
          </div>
          <div>
            <label className="mb-1 block text-sm text-muted-foreground">Last Name</label>
            <div className="relative">
              <Input
                value={data.lastName}
                onChange={(e) => setField("lastName", e.target.value)}
                placeholder="Enter last name"
                className="h-12 bg-secondary/60 pr-10"
              />
              <User className="absolute right-3 top-3.5 opacity-70" />
            </div>
            {errors.lastName && <p className="mt-1 text-xs text-destructive">{errors.lastName}</p>}
          </div>
          <div>
            <label className="mb-1 block text-sm text-muted-foreground">Passport Number</label>
            <div className="relative">
              <Input
                value={data.passportNumber}
                onChange={(e) => setField("passportNumber", e.target.value)}
                placeholder="Enter passport number"
                className="h-12 bg-secondary/60 pr-10"
              />
              <FileText className="absolute right-3 top-3.5 opacity-70" />
            </div>
            {errors.passportNumber && <p className="mt-1 text-xs text-destructive">{errors.passportNumber}</p>}
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
          <div className="md:col-span-2">
            <label className="mb-1 block text-sm text-muted-foreground">Purpose of Travel</label>
            <div className="relative">
              <Input
                value={data.purpose}
                onChange={(e) => setField("purpose", e.target.value)}
                placeholder="Brief description of travel purpose..."
                className="h-12 bg-secondary/60 pr-10"
              />
              <FileText className="absolute right-3 top-3.5 opacity-70" />
            </div>
            {errors.purpose && <p className="mt-1 text-xs text-destructive">{errors.purpose}</p>}
          </div>
        </div>

        {/* Submit */}
        <div className="mt-6 flex justify-center">
          <Button type="submit" variant="hero" className="h-12 px-8 group">
            Apply for Visa
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

export default VisaBookingForm;
