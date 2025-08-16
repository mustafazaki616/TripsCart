import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Car, Shield, MapPin, Clock } from "lucide-react";

const CarRental = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Car Rental Services</h1>
          <p className="text-lg text-muted-foreground">
            Rent a car with ease and explore your destination at your own pace with TripsCart's car rental partners
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Car className="h-6 w-6 text-yellow-500" />
                Diverse Vehicle Fleet
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                Choose from economy cars, luxury vehicles, SUVs, and specialty cars from trusted rental companies worldwide.
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-6 w-6 text-yellow-500" />
                Convenient Pickup Locations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                Pick up your rental car at airports, city centers, hotels, and other convenient locations in destinations worldwide.
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-6 w-6 text-yellow-500" />
                Comprehensive Insurance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                Drive with confidence with optional insurance coverage and protection plans available for your rental vehicle.
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-6 w-6 text-yellow-500" />
                Flexible Rental Periods
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                Rent for a few hours, days, weeks, or months with flexible pickup and drop-off times to suit your schedule.
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        <div className="bg-muted/50 rounded-lg p-8">
          <h2 className="text-2xl font-semibold mb-4">Why Rent a Car with TripsCart?</h2>
          <div className="space-y-4 text-muted-foreground">
            <p>
              TripsCart partners with leading car rental companies to offer competitive rates and reliable service. 
              Our platform makes it easy to compare prices, vehicle types, and rental terms from multiple providers 
              in one convenient location.
            </p>
            <p>
              Whether you're traveling for business or leisure, having your own transportation gives you the freedom 
              to explore at your own pace. From compact cars for city driving to spacious SUVs for family trips, 
              we have the right vehicle for every journey.
            </p>
            <p>
              Enjoy transparent pricing with no hidden fees, easy online booking, and the option to modify or 
              cancel your reservation. Our customer support team is available to help with any questions about 
              your car rental booking.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarRental;