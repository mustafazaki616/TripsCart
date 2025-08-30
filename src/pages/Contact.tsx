
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Mail, Phone, MapPin, Clock, MessageSquare, Send, CheckCircle } from "lucide-react";
import * as React from "react";

type ContactFormData = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

type FormErrors = Partial<Record<keyof ContactFormData, string>>;

const Contact = () => {
  const [formData, setFormData] = React.useState<ContactFormData>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = React.useState<FormErrors>({});
  const [showModal, setShowModal] = React.useState(false);

  const setField = (key: keyof ContactFormData, value: string) => {
    setErrors((e) => ({ ...e, [key]: undefined }));
    setFormData((d) => ({ ...d, [key]: value }));
  };

  const validate = (): boolean => {
    const next: FormErrors = {};
    if (!formData.name.trim()) next.name = "Required";
    if (!formData.email.trim()) next.email = "Required";
    if (!formData.subject.trim()) next.subject = "Required";
    if (!formData.message.trim()) next.message = "Required";
    
    // Email validation
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      next.email = "Invalid email format";
    }
    
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setShowModal(true);
  };

  const clearForm = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });
    setErrors({});
  };

  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-2 mb-6">
              <MessageSquare className="text-primary w-8 h-8" />
              <h1 className="text-4xl md:text-5xl font-bold">Contact Us</h1>
            </div>
            <p className="text-xl text-muted-foreground mb-8">
              Get in touch with our team. We're here to help you plan your perfect journey.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {/* Office Location */}
            <div className="bg-card rounded-xl p-8 border text-center">
              <div className="w-16 h-16 bg-primary/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                <MapPin className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Visit Our Office</h3>
              <p className="text-muted-foreground mb-4">
                123 Travel Street<br />
                London, UK<br />
                SW1A 1AA
              </p>
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span>Mon-Sun: 9:00 AM - 9:00 PM</span>
              </div>
            </div>

            {/* Phone Contact */}
            <div className="bg-card rounded-xl p-8 border text-center">
              <div className="w-16 h-16 bg-primary/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Phone className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Call Us</h3>
              <p className="text-muted-foreground mb-4">
                <a href="tel:+442012345678" className="text-primary hover:underline">
                  019-315-87001
                </a>
              </p>
              <p className="text-sm text-muted-foreground">
                Emergency: 24/7 Support Available
              </p>
            </div>

            {/* Email Contact */}
            <div className="bg-card rounded-xl p-8 border text-center">
              <div className="w-16 h-16 bg-primary/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Mail className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Email Us</h3>
              <p className="text-muted-foreground mb-4">
                <a href="mailto:info@tripscart.com" className="text-primary hover:underline">
                  info@tripscart.co.uk
                </a>
              </p>
              <p className="text-sm text-muted-foreground">
                Support: info@tripcart.co.uk
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-card rounded-xl p-8 border">
              <h2 className="text-2xl font-bold mb-6 text-center">Send Us a Message</h2>
              <form onSubmit={onSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="contact-name" className="mb-2 block text-sm font-medium">Full Name *</label>
                    <Input
                      id="contact-name"
                      name="name"
                      value={formData.name}
                      onChange={(e) => setField("name", e.target.value)}
                      placeholder="Your full name"
                      className="h-12"
                      autoComplete="name"
                    />
                    {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name}</p>}
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="mb-2 block text-sm font-medium">Email Address *</label>
                    <Input
                      id="contact-email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setField("email", e.target.value)}
                      placeholder="your.email@example.com"
                      className="h-12"
                      autoComplete="email"
                      inputMode="email"
                    />
                    {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="contact-phone" className="mb-2 block text-sm font-medium">Phone Number</label>
                    <Input
                      id="contact-phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setField("phone", e.target.value)}
                      placeholder="019-315-87001"
                      className="h-12"
                      autoComplete="tel"
                      inputMode="tel"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium" htmlFor="contact-subject">Subject *</label>
                    <Select value={formData.subject} onValueChange={(v) => setField("subject", v)}>
                      <SelectTrigger className="h-12" id="contact-subject" name="subject" autoComplete="off">
                        <SelectValue placeholder="Select a subject" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="General Inquiry">General Inquiry</SelectItem>
                        <SelectItem value="Flight Booking">Flight Booking</SelectItem>
                        <SelectItem value="Umrah Package">Umrah Package</SelectItem>
                        <SelectItem value="Hajj Package">Hajj Package</SelectItem>
                        <SelectItem value="Hotel Booking">Hotel Booking</SelectItem>
                        <SelectItem value="Visa Services">Visa Services</SelectItem>
                        <SelectItem value="Support">Support</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.subject && <p className="mt-1 text-xs text-destructive">{errors.subject}</p>}
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-message" className="mb-2 block text-sm font-medium">Message *</label>
                  <Textarea
                    id="contact-message"
                    name="message"
                    value={formData.message}
                    onChange={(e) => setField("message", e.target.value)}
                    placeholder="Tell us about your travel plans or any questions you have..."
                    className="min-h-32 resize-none"
                    autoComplete="off"
                  />
                  {errors.message && <p className="mt-1 text-xs text-destructive">{errors.message}</p>}
                </div>

                <div className="text-center">
                  <Button type="submit" variant="hero" className="h-12 px-8 group">
                    Send Message
                    <Send className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-0.5" />
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-secondary/20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="bg-card rounded-xl p-6 border">
              <h3 className="text-lg font-semibold mb-3">How do I book a flight?</h3>
              <p className="text-muted-foreground">
                You can book flights through our website, by calling our office, or visiting us in person. Our booking form allows you to search for flights and compare prices easily.
              </p>
            </div>
            <div className="bg-card rounded-xl p-6 border">
              <h3 className="text-lg font-semibold mb-3">What documents do I need for Umrah?</h3>
              <p className="text-muted-foreground">
                You'll need a valid passport with at least 6 months validity, Umrah visa, proof of vaccination, and other documents. We'll guide you through the entire process.
              </p>
            </div>
            <div className="bg-card rounded-xl p-6 border">
              <h3 className="text-lg font-semibold mb-3">Can I cancel my booking?</h3>
              <p className="text-muted-foreground">
                Yes, you can cancel your booking subject to our cancellation policy. Please refer to our Booking Terms for detailed information about cancellation charges.
              </p>
            </div>
            <div className="bg-card rounded-xl p-6 border">
              <h3 className="text-lg font-semibold mb-3">Do you offer travel insurance?</h3>
              <p className="text-muted-foreground">
                We strongly recommend comprehensive travel insurance for all bookings. We can help you arrange suitable coverage for your trip.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Find Our Office</h2>
          <div className="max-w-4xl mx-auto">
            <div className="bg-card rounded-xl p-8 border">
              <div className="aspect-video bg-secondary/20 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-16 h-16 text-primary mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    Interactive map would be embedded here<br />
                    Showing our office location at 123 Travel Street, London
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Modal */}
      <Dialog open={showModal} onOpenChange={(o) => { if (!o) { setShowModal(false); clearForm(); } }}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CheckCircle className="text-green-500" />
              Message Sent Successfully!
            </DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            Thank you for contacting us. We'll get back to you within 24 hours with a response to your inquiry.
          </p>
          <div className="mt-4 flex justify-end">
            <Button onClick={() => { setShowModal(false); clearForm(); }}>Close</Button>
          </div>
        </DialogContent>
      </Dialog>

    </div>
  );
};

export default Contact;
