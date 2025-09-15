import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Plane, Clock, Shield, CreditCard } from "lucide-react";

const FlightBooking = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Flight Booking Services</h1>
          <p className="text-lg text-muted-foreground">
            Book your flights with confidence through flightshop380's comprehensive flight booking platform
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plane className="h-6 w-6 text-yellow-500" />
                Extensive Flight Network
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                Access thousands of flights from major airlines worldwide. Compare prices, schedules, and find the perfect flight for your journey.
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-6 w-6 text-yellow-500" />
                Real-time Availability
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                Get up-to-date flight information, pricing, and seat availability. Our system updates in real-time to ensure accurate bookings.
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-6 w-6 text-yellow-500" />
                Secure Booking Process
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                Your personal and payment information is protected with industry-standard encryption and security measures.
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-6 w-6 text-yellow-500" />
                Flexible Payment Options
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                Pay with your preferred method - credit cards, debit cards, and other secure payment options available.
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        <div className="bg-muted/50 rounded-lg p-8">
          <h2 className="text-2xl font-semibold mb-4">Why Choose flightshop380 for Flight Booking?</h2>
          <div className="space-y-4 text-muted-foreground">
            <p>
               flightshop380 offers a seamless flight booking experience with competitive prices and comprehensive search options. 
              Our platform connects you with trusted airlines and provides transparent pricing with no hidden fees.
            </p>
            <p>
              Whether you're planning a business trip, family vacation, or solo adventure, our flight booking service 
              ensures you find the best deals and most convenient flight options for your travel needs.
            </p>
            <p>
              With 24/7 customer support and ATOL protection on selected bookings, you can book with confidence 
              knowing that your travel plans are in safe hands.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightBooking;