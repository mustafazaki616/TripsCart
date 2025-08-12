import heroImage from "@/assets/hero-flight.jpg";
import BookingForm from "./BookingForm";
import AccreditationBanner from "./AccreditationBanner";

const HeroSection = () => {
  return (
    <section className="relative">
      <div className="absolute inset-0">
        <img src={heroImage} alt="Airplane at sunset - flight booking hero" className="w-full h-[70vh] md:h-[80vh] object-cover" loading="eager" />
        <div className="absolute inset-0 hero-overlay" aria-hidden="true" />
      </div>
      <div className="relative container mx-auto pt-20 md:pt-28 pb-10 md:pb-16">
        <div className="max-w-3xl">
          <h1 className="text-gradient-primary">Fly Beyond Limits: Premium Flight Booking Experience</h1>
          <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-2xl">
            Explore a vast array of options and find the perfect tickets with our easy online booking.
          </p>
        </div>
        <div className="mt-8 md:mt-10">
          <BookingForm />
        </div>
      </div>
      <AccreditationBanner />
    </section>
  );
};

export default HeroSection;
