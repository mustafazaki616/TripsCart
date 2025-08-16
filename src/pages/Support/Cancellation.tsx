import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle, RefreshCw, Clock, Shield, Phone, Mail } from "lucide-react";

const Cancellation = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Cancellation Policy & Help</h1>
          <p className="text-lg text-muted-foreground">
            Understand your cancellation options and learn how to cancel or modify your TripsCart bookings
          </p>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-6 w-6 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-yellow-800 mb-2">Important Notice</h3>
              <p className="text-yellow-700">
                Cancellation policies vary by provider and booking type. Always review the specific terms 
                and conditions for your booking before cancelling. Some bookings may be non-refundable.
              </p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <RefreshCw className="h-6 w-6 text-yellow-500" />
                How to Cancel
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-yellow-500 text-black rounded-full flex items-center justify-center text-sm font-semibold">
                    1
                  </div>
                  <p className="text-sm">Log into your TripsCart account</p>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-yellow-500 text-black rounded-full flex items-center justify-center text-sm font-semibold">
                    2
                  </div>
                  <p className="text-sm">Go to "My Bookings" section</p>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-yellow-500 text-black rounded-full flex items-center justify-center text-sm font-semibold">
                    3
                  </div>
                  <p className="text-sm">Find your booking and click "Cancel"</p>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-yellow-500 text-black rounded-full flex items-center justify-center text-sm font-semibold">
                    4
                  </div>
                  <p className="text-sm">Review cancellation terms and confirm</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-6 w-6 text-yellow-500" />
                Cancellation Timeframes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold text-sm">Flights</h4>
                  <p className="text-sm text-muted-foreground">Usually 24 hours for full refund, varies by airline</p>
                </div>
                <div>
                  <h4 className="font-semibold text-sm">Hotels</h4>
                  <p className="text-sm text-muted-foreground">Typically 24-48 hours before check-in</p>
                </div>
                <div>
                  <h4 className="font-semibold text-sm">Car Rentals</h4>
                  <p className="text-sm text-muted-foreground">Usually up to pickup time, some restrictions apply</p>
                </div>
                <div>
                  <h4 className="font-semibold text-sm">Packages</h4>
                  <p className="text-sm text-muted-foreground">Varies by components, check individual terms</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Cancellation Policy Types</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-4 border rounded-lg">
                  <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Shield className="h-6 w-6" />
                  </div>
                  <h3 className="font-semibold mb-2">Free Cancellation</h3>
                  <p className="text-sm text-muted-foreground">
                    Cancel within the specified timeframe for a full refund with no penalties.
                  </p>
                </div>
                
                <div className="text-center p-4 border rounded-lg">
                  <div className="w-12 h-12 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Clock className="h-6 w-6" />
                  </div>
                  <h3 className="font-semibold mb-2">Partial Refund</h3>
                  <p className="text-sm text-muted-foreground">
                    Cancellation fees apply, but you'll receive a partial refund of your booking cost.
                  </p>
                </div>
                
                <div className="text-center p-4 border rounded-lg">
                  <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-3">
                    <AlertTriangle className="h-6 w-6" />
                  </div>
                  <h3 className="font-semibold mb-2">Non-Refundable</h3>
                  <p className="text-sm text-muted-foreground">
                    No refund available, but you may be able to modify dates for a fee.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Refund Processing</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-2">Processing Time</h3>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Credit cards: 5-10 business days</li>
                      <li>• Debit cards: 5-10 business days</li>
                      <li>• PayPal: 3-5 business days</li>
                      <li>• Bank transfers: 7-14 business days</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">What to Expect</h3>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Email confirmation of cancellation</li>
                      <li>• Refund amount breakdown</li>
                      <li>• Processing timeline notification</li>
                      <li>• Final refund confirmation</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Need Help with Cancellation?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-6">
                If you're unable to cancel online or have questions about your cancellation policy, 
                our support team is here to assist you.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Phone className="h-5 w-5 text-yellow-500" />
                      Phone Support
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-3">
                      Call us for immediate assistance with urgent cancellations
                    </p>
                    <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-black">
                      Call Now
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Mail className="h-5 w-5 text-yellow-500" />
                      Email Support
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-3">
                      Send us your cancellation request with booking details
                    </p>
                    <Button variant="outline" className="w-full">
                      Send Email
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Cancellation;