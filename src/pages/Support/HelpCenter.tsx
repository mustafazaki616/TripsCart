import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Book, CreditCard, Phone, Mail, MessageCircle } from "lucide-react";

const HelpCenter = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Help Center</h1>
          <p className="text-lg text-muted-foreground">
            Find answers to common questions and get the support you need for your TripsCart experience
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-6 w-6 text-yellow-500" />
                Search & Booking
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                Learn how to search for flights, hotels, and cars, compare options, and complete your booking.
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-6 w-6 text-yellow-500" />
                Payment & Pricing
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                Understand our pricing, payment methods, fees, and refund policies for all services.
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Book className="h-6 w-6 text-yellow-500" />
                Managing Bookings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                Find out how to view, modify, or cancel your bookings and what options are available.
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        <div className="bg-muted/50 rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold mb-2">How do I cancel my booking?</h3>
              <p className="text-muted-foreground">
                You can cancel most bookings through your account dashboard. Cancellation policies vary by provider, 
                so please check the specific terms for your booking.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">What payment methods do you accept?</h3>
              <p className="text-muted-foreground">
                We accept major credit cards, debit cards, and other secure payment methods. All transactions 
                are processed securely through our encrypted payment system.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">How do I get my booking confirmation?</h3>
              <p className="text-muted-foreground">
                Booking confirmations are sent immediately to your registered email address. You can also 
                view and download confirmations from your account dashboard.
              </p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="h-6 w-6 text-yellow-500" />
                Phone Support
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                Call our support team for immediate assistance with urgent booking issues.
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-6 w-6 text-yellow-500" />
                Email Support
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                Send us an email for detailed inquiries and we'll respond within 24 hours.
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="h-6 w-6 text-yellow-500" />
                Live Chat
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                Chat with our support agents in real-time for quick answers to your questions.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default HelpCenter;