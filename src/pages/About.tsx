import { Plane, Shield, Users, Globe, Award, Clock } from "lucide-react";
import Counter from "@/components/site/Counter";

const About = () => {
  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-2 mb-6">
              <Plane className="text-primary w-8 h-8" />
              <h1 className="text-4xl md:text-5xl font-bold">About flightshop380</h1>
            </div>
            <p className="text-xl text-muted-foreground mb-8">
              Your trusted partner for seamless travel experiences, connecting you to the world with confidence and care.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-lg text-muted-foreground mb-6">
                At flightshop380, we believe that travel should be accessible, enjoyable, and worry-free. Our mission is to provide exceptional travel services that connect people with their dreams, whether it's a spiritual journey to Umrah, an adventure across Africa, or a business trip to Pakistan.
              </p>
              <p className="text-lg text-muted-foreground">
                We're committed to offering competitive prices, personalized service, and comprehensive support throughout your entire journey.
              </p>
            </div>
            <div className="bg-card/50 rounded-2xl p-8 border">
              <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
              <p className="text-muted-foreground mb-6">
                To become the leading travel platform for Muslim communities worldwide, known for our reliability, cultural sensitivity, and exceptional customer service.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-primary/10 rounded-lg">
                  <div className="text-2xl font-bold text-primary">
                    <Counter end={50} suffix="K+" />
                  </div>
                  <div className="text-sm text-muted-foreground">Happy Travelers</div>
                </div>
                <div className="text-center p-4 bg-primary/10 rounded-lg">
                  <div className="text-2xl font-bold text-primary">
                    <Counter end={50} suffix="+" />
                  </div>
                  <div className="text-sm text-muted-foreground">Destinations</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-secondary/20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-card rounded-xl p-6 border">
              <Shield className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-3">Trust & Security</h3>
              <p className="text-muted-foreground">
                Your safety and security are our top priorities. We ensure all our services meet the highest standards of safety and compliance.
              </p>
            </div>
            <div className="bg-card rounded-xl p-6 border">
              <Users className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-3">Customer First</h3>
              <p className="text-muted-foreground">
                Every decision we make is centered around providing the best possible experience for our customers.
              </p>
            </div>
            <div className="bg-card rounded-xl p-6 border">
              <Globe className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-3">Global Reach</h3>
              <p className="text-muted-foreground">
                Connecting communities across continents with reliable and affordable travel solutions.
              </p>
            </div>
            <div className="bg-card rounded-xl p-6 border">
              <Award className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-3">Excellence</h3>
              <p className="text-muted-foreground">
                We strive for excellence in every aspect of our service, from booking to arrival.
              </p>
            </div>
            <div className="bg-card rounded-xl p-6 border">
              <Clock className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-3">Reliability</h3>
              <p className="text-muted-foreground">
                Count on us to deliver on our promises with punctual and dependable service.
              </p>
            </div>
            <div className="bg-card rounded-xl p-6 border">
              <Plane className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-3">Innovation</h3>
              <p className="text-muted-foreground">
                Continuously improving our services with modern technology and creative solutions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-card rounded-xl border">
              <Plane className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Flight Booking</h3>
              <p className="text-sm text-muted-foreground">
                Competitive prices on flights to Pakistan, Africa, and worldwide destinations.
              </p>
            </div>
            <div className="text-center p-6 bg-card rounded-xl border">
              <div className="w-12 h-12 bg-primary/20 rounded-lg mx-auto mb-4 flex items-center justify-center">
                <span className="text-primary font-bold">🏨</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Hotel Booking</h3>
              <p className="text-sm text-muted-foreground">
                Quality accommodations from budget to luxury options worldwide.
              </p>
            </div>
            <div className="text-center p-6 bg-card rounded-xl border">
              <div className="w-12 h-12 bg-primary/20 rounded-lg mx-auto mb-4 flex items-center justify-center">
                <span className="text-primary font-bold">🕋</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Umrah Packages</h3>
              <p className="text-sm text-muted-foreground">
                Complete Umrah packages with visa, accommodation, and transportation.
              </p>
            </div>
            <div className="text-center p-6 bg-card rounded-xl border">
              <div className="w-12 h-12 bg-primary/20 rounded-lg mx-auto mb-4 flex items-center justify-center">
                <span className="text-primary font-bold">🕋</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Hajj Services</h3>
              <p className="text-sm text-muted-foreground">
                Comprehensive Hajj packages with expert guidance and support.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 bg-secondary/20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose flightshop380?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">ATOL Protected</h3>
              <p className="text-muted-foreground">
                Your bookings are protected by ATOL, ensuring your money is safe and secure.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">24/7 Support</h3>
              <p className="text-muted-foreground">
                Our dedicated team is available round the clock to assist you with any queries.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Award className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Best Prices</h3>
              <p className="text-muted-foreground">
                We guarantee the best prices with our direct partnerships with airlines and hotels.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
