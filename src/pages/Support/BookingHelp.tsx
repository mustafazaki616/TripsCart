import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plane, Hotel, Car, FileText, CreditCard, Calendar } from "lucide-react";
import { useNavigate } from 'react-router-dom';

const BookingHelp = () => {
  const navigate = useNavigate();
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Booking Help</h1>
          <p className="text-lg text-muted-foreground">
            Step-by-step guidance to help you complete your bookings successfully on flightshop380
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plane className="h-6 w-6 text-yellow-500" />
                Flight Booking
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base mb-4">
                Learn how to search, compare, and book flights with ease.
              </CardDescription>
              <Button variant="outline" className="w-full" onClick={() => window.open('https://wa.me/447304229064', '_blank')}>Flight Guide</Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Hotel className="h-6 w-6 text-yellow-500" />
                Hotel Booking
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base mb-4">
                Find and book the perfect accommodation for your stay.
              </CardDescription>
              <Button variant="outline" className="w-full" onClick={() => window.open('https://wa.me/447304229064', '_blank')}>Hotel Guide</Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Car className="h-6 w-6 text-yellow-500" />
                Car Rental
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base mb-4">
                Rent a car for your trip with our simple booking process.
              </CardDescription>
              <Button variant="outline" className="w-full" onClick={() => window.open('https://wa.me/447304229064', '_blank')}>Car Rental Guide</Button>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-6 w-6 text-yellow-500" />
                Booking Process Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-yellow-500 text-black rounded-full flex items-center justify-center font-semibold">
                    1
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Search for Your Travel</h3>
                    <p className="text-muted-foreground">
                      Enter your travel details including destinations, dates, and number of travelers. 
                      Use our filters to narrow down options based on your preferences.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-yellow-500 text-black rounded-full flex items-center justify-center font-semibold">
                    2
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Compare and Select</h3>
                    <p className="text-muted-foreground">
                      Review available options, compare prices, read reviews, and check amenities or flight details. 
                      Select the option that best fits your needs and budget.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-yellow-500 text-black rounded-full flex items-center justify-center font-semibold">
                    3
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Enter Traveler Information</h3>
                    <p className="text-muted-foreground">
                      Provide accurate traveler details including names (as they appear on ID), contact information, 
                      and any special requirements or preferences.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-yellow-500 text-black rounded-full flex items-center justify-center font-semibold">
                    4
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Review and Pay</h3>
                    <p className="text-muted-foreground">
                      Review your booking details, check the total cost including all fees, and complete 
                      payment using your preferred secure payment method.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-yellow-500 text-black rounded-full flex items-center justify-center font-semibold">
                    5
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Receive Confirmation</h3>
                    <p className="text-muted-foreground">
                      Get instant confirmation via email with your booking reference, vouchers, and important 
                      travel information. Save these for your trip.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-6 w-6 text-yellow-500" />
                  Payment Tips
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Ensure your card has sufficient funds or credit limit</li>
                  <li>• Use the same name on booking as on your payment card</li>
                  <li>• Check if your bank requires travel notifications</li>
                  <li>• Keep your confirmation email and payment receipt</li>
                  <li>• Contact us immediately if payment fails</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-6 w-6 text-yellow-500" />
                  Booking Best Practices
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Double-check all dates and traveler names</li>
                  <li>• Read cancellation and change policies carefully</li>
                  <li>• Book early for better prices and availability</li>
                  <li>• Consider travel insurance for protection</li>
                  <li>• Save confirmation details in multiple places</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Need Additional Help?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                If you're experiencing issues with your booking or need personalized assistance, 
                our support team is ready to help you complete your reservation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="bg-yellow-500 hover:bg-yellow-600 text-black" onClick={() => navigate('/support/contact-us')}>
                  Contact Support
                </Button>
                <Button variant="outline" onClick={() => window.open('https://wa.me/447304229064', '_blank')}>
                  Live Chat
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BookingHelp;