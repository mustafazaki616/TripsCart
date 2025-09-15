import BookingForm from "@/components/site/BookingForm";
import africaBg from "@/assets/africa-bg.jpg";

const FlightsAfrica = () => {
  return (
    <>
      {/* Hero Section with Background Image */}
      <div 
        className="relative min-h-screen bg-cover bg-center"
        style={{ 
          backgroundImage: `url(${africaBg})`,
        }}
      >
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/40 to-background"></div>
        
        {/* Content */}
        <div className="relative pt-32 pb-20">
          {/* Title */}
          <div className="container mx-auto px-4 text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Affordable Flights to Africa
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
            <h2>Discover Africa with flightshop380</h2>
            <p>
              Explore great-value fares to key African destinations with flightshop380. We offer competitive prices 
              on flights to major cities across Africa, including Accra, Lagos, Nairobi, and Harare.
            </p>
            <p>
              Our expert team specializes in finding the best routes and deals for your African journey. 
              Whether you're traveling for business, visiting family, or exploring the continent's rich 
              cultural heritage, we've got you covered.
            </p>
            <p>
              Fill out the form above and we'll contact you with personalized options that match your 
              travel needs and budget. Let us help make your African journey memorable and affordable.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default FlightsAfrica;
