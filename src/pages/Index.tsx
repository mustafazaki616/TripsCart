import HeroSection from "@/components/site/HeroSection";
import HowItWorks from "@/components/site/HowItWorks";
import PopularFlights from "@/components/site/PopularFlights";
import Features from "@/components/site/Features";
import FAQSection from "@/components/site/FAQSection";
import TrustpilotReviews from "@/components/site/TrustpilotReviews";

const Index = () => {
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: 'Do you offer travel insurance?', acceptedAnswer: { '@type': 'Answer', text: 'Yes, optional travel insurance is available for unexpected events like trip cancellations, medical emergencies, or lost luggage.' } },
      { '@type': 'Question', name: 'Are there any additional fees or taxes not included in the displayed price?', acceptedAnswer: { '@type': 'Answer', text: 'All mandatory taxes and fees are shown before you pay unless stated otherwise for specific providers.' } },
    ],
  };

  return (
    <>
      <HeroSection />
      <HowItWorks />
      <PopularFlights />
      <Features />
      <TrustpilotReviews />
      <FAQSection />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
    </>
  );
};

export default Index;
