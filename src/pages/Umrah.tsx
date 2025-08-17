import BookingForm from "@/components/site/BookingForm";
import umrahBg from "@/assets/umrah-bg.webp";

const Umrah = () => {
  return (
    <>
      {/* Hero Section with Background Image */}
      <div 
        className="relative min-h-screen bg-cover bg-center"
        style={{ 
          backgroundImage: `url(${umrahBg})`,
        }}
      >
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/40 to-background"></div>
        
        {/* Content */}
        <div className="relative pt-32 pb-20">
          {/* Title */}
          <div className="container mx-auto px-4 text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Affordable Umrah Packages from UK
            </h1>
          </div>

          {/* Form Section */}
          <div className="container mx-auto px-4">
            <BookingForm />
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="bg-background">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto prose prose-invert">
            <h2>Plan Your Sacred Journey with TripsCart</h2>
            <p>
              Affordable Umrah packages from the UK provide a budget-friendly option for pilgrims seeking to perform 
              the sacred journey to Makkah and Madinah. These packages generally cover the essential aspects of 
              the trip, including return flights, visa processing, and hotel accommodations.
            </p>
            <p>
              For those seeking a bit more comfort, our economy packages offer additional benefits and convenience, 
              allowing pilgrims to focus on their spiritual journey without worrying about logistics.
            </p>
            <p>
              Each detail of our packages is mentioned on our website. Our experienced team ensures that your 
              spiritual journey is comfortable and memorable, with full support throughout your stay.
            </p>
          </div>

          <section className="mt-16">
            <h2 className="text-2xl font-semibold mb-8 text-center">Popular Umrah Packages</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1,2,3].map((i) => (
                <div key={i} className="rounded-xl border bg-card p-6">
                  <div className="text-lg font-medium">Umrah Package {i}</div>
                  <div className="mt-2 text-sm text-muted-foreground">7 nights • Flights + Hotels + Transport</div>
                  <div className="mt-4 font-semibold">from £470</div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default Umrah;


