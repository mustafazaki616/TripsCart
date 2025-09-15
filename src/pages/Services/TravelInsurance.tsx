import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Heart, Plane, Umbrella } from "lucide-react";

const TravelInsurance = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Travel Insurance</h1>
          <p className="text-lg text-muted-foreground">
            Protect your journey with comprehensive travel insurance coverage from flightshop380's trusted partners
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-6 w-6 text-yellow-500" />
                Medical Coverage
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                Comprehensive medical coverage including emergency treatment, hospitalization, and medical evacuation worldwide.
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plane className="h-6 w-6 text-yellow-500" />
                Trip Protection
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                Coverage for trip cancellation, interruption, and delay expenses to protect your travel investment.
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-6 w-6 text-yellow-500" />
                Personal Protection
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                Protection for personal belongings, luggage, and coverage for personal liability during your travels.
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Umbrella className="h-6 w-6 text-yellow-500" />
                24/7 Assistance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                Round-the-clock emergency assistance and support services wherever you are in the world.
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        <div className="bg-muted/50 rounded-lg p-8">
          <h2 className="text-2xl font-semibold mb-4">Why Choose Travel Insurance?</h2>
          <div className="space-y-4 text-muted-foreground">
            <p>
              Travel insurance provides essential protection against unexpected events that could disrupt your trip 
              or result in significant financial loss. From medical emergencies abroad to trip cancellations due 
              to unforeseen circumstances, comprehensive coverage gives you peace of mind.
            </p>
            <p>
              flightshop380 partners with reputable insurance providers to offer competitive rates and comprehensive 
              coverage options. Whether you're taking a short domestic trip or an extended international journey, 
              we have insurance plans tailored to your specific travel needs.
            </p>
            <p>
              Our travel insurance options include single trip coverage, annual multi-trip policies, and specialized 
              coverage for adventure activities, business travel, and group trips. Compare plans and choose the 
              protection that's right for your journey.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TravelInsurance;