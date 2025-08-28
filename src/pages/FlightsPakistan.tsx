import { useState, useEffect } from "react";
import BookingForm from "@/components/site/BookingForm";
import pakBg from "@/assets/pak-bg.avif";
import indiaBg from "@/assets/india-bg.avif";
import zimbabweBg from "@/assets/zimbabwe-bg.jpg";
import dubaiBg from "@/assets/dest-dubai.jpg";
import turkeyBg from "@/assets/dest-istanbul.jpg";
import thailandBg from "@/assets/dest-bangkok.jpg";

const FlightsPakistan = () => {
  const backgroundImages = [
    pakBg,
    indiaBg,
    zimbabweBg,
    turkeyBg,
    thailandBg,
    dubaiBg
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % backgroundImages.length;
        console.log('Changing to image index:', nextIndex); // Debug log
        return nextIndex;
      });
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Hero Section with Background Slideshow */}
      <div className="relative min-h-screen overflow-hidden">
        {/* Background Images */}
        {backgroundImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000 ease-in-out ${
              index === currentImageIndex 
                ? 'opacity-100 z-10' 
                : 'opacity-0 z-0'
            }`}
            style={{ 
              backgroundImage: `url(${image})`,
            }}
          />
        ))}
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/40 to-background z-20"></div>
        
        {/* Content */}
        <div className="relative z-30 pt-32 pb-20">
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
            <h2>Find the Best Flights with TripsCart</h2>
            <p>
              Looking for affordable flights? TripsCart offers the best fares from the UK to all major 
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


