import heroImage from "@/assets/hero-flight.jpg";
import BookingForm from "./BookingForm";
import { Phone } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative">
      <div className="absolute inset-0">
        <img src={heroImage} alt="Airplane at sunset - flight booking hero" className="w-full h-[70vh] md:h-[80vh] object-cover" loading="eager" />
        <div className="absolute inset-0 hero-overlay" aria-hidden="true" />
      </div>
      <div className="relative container mx-auto pt-16 md:pt-28 pb-10 md:pb-16 px-4 sm:px-6">
        <div className="max-w-3xl">
          <h1 className="text-gradient-primary text-3xl md:text-4xl lg:text-5xl">Your trip, just a click away</h1>
          <p className="mt-4 text-base md:text-lg lg:text-xl text-muted-foreground max-w-2xl">
            Explore a vast array of options and find the perfect tickets with our easy online booking.
          </p>
        </div>
        <div className="mt-8 md:mt-10">
          <BookingForm />
        </div>
        
        {/* Emergency Phone Banner - Mobile Only */}
        <div className="mt-6 md:hidden">
          <a 
            href="tel:+442080044475" 
            className="flex items-center justify-center gap-3 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 active:scale-95"
          >
            <div className="bg-white/20 rounded-full p-2">
              <Phone className="w-5 h-5" />
            </div>
            <div className="text-center">
              <div className="text-sm font-medium opacity-90">24/7 Emergency Support</div>
              <div className="text-lg font-bold">Call: 0208-004-4475</div>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
