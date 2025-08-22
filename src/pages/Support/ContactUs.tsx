import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

const ContactUs = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-lg text-muted-foreground">
            Get in touch with our support team - we're here to help with all your travel needs
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-semibold mb-6">Send us a Message</h2>
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">First Name</label>
                  <Input placeholder="Enter your first name" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Last Name</label>
                  <Input placeholder="Enter your last name" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email Address</label>
                <Input type="email" placeholder="Enter your email address" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Subject</label>
                <Input placeholder="What is this regarding?" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Message</label>
                <Textarea 
                  placeholder="Please describe your inquiry in detail..." 
                  className="min-h-[120px]"
                />
              </div>
              <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-black">
                Send Message
              </Button>
            </form>
          </div>

          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-semibold mb-6">Get in Touch</h2>
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <Phone className="h-5 w-5 text-yellow-500" />
                      Phone Support
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      <div className="space-y-1">
                        <p>UK: +44 20 1234 5678</p>
                        {/* <p>US: +1 555 123 4567</p> */}
                        <p>Available 24/7 for urgent matters</p>
                      </div>
                    </CardDescription>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-yellow-500" />
                      Email Support
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      <div className="space-y-1">
                        <p>General: support@tripscart.com</p>
                        <p>Bookings: bookings@tripscart.com</p>
                        <p>Response within 24 hours</p>
                      </div>
                    </CardDescription>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <MapPin className="h-5 w-5 text-yellow-500" />
                      Office Address
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      <div className="space-y-1">
                        <p>TripsCart Ltd.</p>
                        <p>123 Travel Street</p>
                        <p>London, UK EC1A 1BB</p>
                      </div>
                    </CardDescription>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <Clock className="h-5 w-5 text-yellow-500" />
                      Business Hours
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      <div className="space-y-1">
                        <p>Monday - Friday: 9:00 AM - 6:00 PM GMT</p>
                        <p>Saturday: 10:00 AM - 4:00 PM GMT</p>
                        <p>Sunday: Closed</p>
                        <p className="text-yellow-600 font-medium">Emergency support available 24/7</p>
                      </div>
                    </CardDescription>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;