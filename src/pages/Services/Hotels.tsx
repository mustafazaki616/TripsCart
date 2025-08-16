import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Building, MapPin, Star, Wifi } from "lucide-react";

const Hotels = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Hotel Booking Services</h1>
          <p className="text-lg text-muted-foreground">
            Discover and book the perfect accommodation for your stay with TripsCart's extensive hotel network
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="h-6 w-6 text-yellow-500" />
                Wide Selection of Hotels
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                From luxury resorts to budget-friendly accommodations, find the perfect hotel that matches your preferences and budget.
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-6 w-6 text-yellow-500" />
                Prime Locations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                Choose from hotels in city centers, near airports, tourist attractions, and business districts worldwide.
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="h-6 w-6 text-yellow-500" />
                Verified Reviews
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                Read authentic guest reviews and ratings to make informed decisions about your accommodation choice.
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wifi className="h-6 w-6 text-yellow-500" />
                Modern Amenities
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                Filter hotels by amenities like free WiFi, swimming pools, fitness centers, and business facilities.
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        <div className="bg-muted/50 rounded-lg p-8">
          <h2 className="text-2xl font-semibold mb-4">Hotel Booking Made Simple</h2>
          <div className="space-y-4 text-muted-foreground">
            <p>
              TripsCart's hotel booking platform offers competitive rates and instant confirmation for thousands of 
              properties worldwide. Our partnerships with leading hotel chains and independent properties ensure 
              you get the best value for your money.
            </p>
            <p>
              Whether you need a quick overnight stay or an extended vacation rental, our advanced search filters 
              help you find accommodations that meet your specific requirements, from pet-friendly options to 
              accessible rooms.
            </p>
            <p>
              Enjoy flexible booking options with free cancellation on many properties, and benefit from our 
              customer support team who are available to assist with any special requests or booking modifications.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hotels;