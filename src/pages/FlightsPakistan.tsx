import BookingForm from "@/components/site/BookingForm";
import fpBgImg from "@/assets/mobile-bg/mobile-bg-fpafr.jpg";
import pakistanMobileBg from "@/assets/mobile-bg/mobile-bg-fpafr.jpg";
import { useIsMobile } from '@/hooks/use-mobile';

const FlightsPakistan = () => {

  const isMobile = useIsMobile();

  return (
    <>
      {/* Hero Section with Single Background Image */}
       <div 
         className="relative min-h-screen bg-cover bg-center bg-no-repeat overflow-hidden"
         style={{ 
           backgroundImage: `url(${isMobile ? pakistanMobileBg : fpBgImg})`,
           backgroundSize: 'cover',
           minHeight: '100vh'
         }}
       >
        
        {/* Gradient Overlay */}
         <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/40 to-background"></div>
         
         {/* Content */}
         <div className="relative z-10 pt-32 pb-20">
          {/* Title */}
          <div className="container mx-auto px-4 text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Affordable International Flights 
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
            <h2>Find the Best Flights with flightshop380</h2>
            <p>
              Looking for affordable flights? flightshop380 offers the best fares from the UK to all major 
              countries. Whether you're traveling to Pakistan, India, Dubai, or any other destination, 
              we ensure competitive prices and excellent service.
            </p>
            <p>
              Our dedicated team works to find you the most convenient routes and best deals. We understand 
              the importance of reliable and comfortable travel when visiting family or conducting business 
              in Pakistan.
            </p>
            <p>
              Complete the form above and our team will reach out with tailored options that match your 
              preferences and budget. We're here to make your journey as smooth as possible.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default FlightsPakistan;


