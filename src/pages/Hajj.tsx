import BookingForm from "@/components/site/BookingForm";
import hajjBg from "@/assets/hajj-bg.jpg";

const HajjPage = () => {
  return (
    <>
      {/* Hero Section with Background Image */}
      <div 
        className="relative min-h-screen bg-cover bg-center"
        style={{ 
          backgroundImage: `url(${hajjBg})`,
        }}
      >
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/40 to-background"></div>
        
        {/* Content */}
        <div className="relative pt-32 pb-20">
          {/* Title */}
          <div className="container mx-auto px-4 text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Affordable Flights for Hajj
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
            <h2>Book Your Hajj Journey with flightshop380</h2>
            <p>
              flightshop380 is one of the most trusted and highly credible travel companies of the present time. 
              We offer numerous packages of Hajj flights at competitive rates. The interesting part besides 
              the affordable rates is the superior customer service by the professional customer department.
            </p>
            <p>
              More importantly, we value our customers by offering the best packages and supreme services. 
              Additionally, what makes us different from others is that we care for our customer and their 
              belongings. Moreover, we focus a lot on customer safety and security. The secret to our success 
              is that we give priority to our customers.
            </p>
            <p>
              Each detail of our packages is mentioned on our website. The guidelines provided on the website 
              would be enough for you to understand and book. However, if you are experiencing any difficulties 
              in understanding our affordable packages, then you can contact our service team for your clarification.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default HajjPage;


