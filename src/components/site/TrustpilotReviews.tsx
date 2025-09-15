import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useState, useRef, useEffect } from "react";

const reviews = [
  {
    name: "Naveed Khan",
    date: "Jan 9, 2025",
    text: "I recently had the pleasure of...",
    fullText: "I recently had the pleasure of interacting with the staff of this airline ticket company, and I was thoroughly impressed. The team was friendly, knowledgeable, and professional throughout the entire process. I recently used  flightshop380 for booking my travel, and I am highly satisfied with their service. The platform is user-friendly, making it easy to compare and select the best options Their customer support team was responsive and helpful, addressing any questions I had before and during my trip. The bookings were seamless, and everything was well-organized. Overall,  flightshop380 made my travel planning hassle-free, and I would definitely recommend them to anyone looking for a reliable travel service.",
    initials: "NK",
    rating: 5,
    country: "GB",
    reviewCount: "5 reviews"
  },
  {
    name: "Hassam Riaz",
    date: "Aug 6, 2025",
    text: "Had great experience with  flightshop380 they are very helpful and they have...",
    fullText: "Had great experience with  flightshop380 they are very helpful and they have very fair pricing the most best thing is they are very polite and daniel helps me alot to rebook my new flight and gave me more reasonable options with different airlines. Highly appreciate your efforts and assistance. Highly recommend.",
    initials: "HR",
    rating: 5,
    country: "GB",
    reviewCount: "3 reviews"
  },
  {
    name: "Farhad Aqil",
    date: "Aug 7, 2025",
    text: "I recently booked my tickets and the entire experience was outstanding...",
    fullText: "I recently booked my tickets and the entire experience was outstanding from start to finish! The platform is incredibly user-friendly, with a smooth and intuitive interface that made browsing options and finalizing my booking quick and stress-free.best part they ll try their frankly speaking quick and affordable.",
    initials: "FA",
    rating: 5,
    country: "GB",
    reviewCount: "2 reviews"
  },
  {
    name: "Rio Rio",
    date: "Aug 9, 2025",
    text: "I highly recommend  flightshop380 .I was...",
    fullText: "I highly recommend  flightshop380 .I was completely impressed with their professionalism and customer service. Regarding where I go .Daniyal made sure the booking process was smooth,ensuring I felt comfortable throughout. Customer service was top-notch . Thanks again guys, keep it up 👍",
    initials: "RR",
    rating: 5,
    country: "GB",
    reviewCount: "1 review"
  },
  {
    name: "Ann",
    date: "7 days ago",
    text: "Short time quick service",
    fullText: "It was our unplanned summer trip to Scotland, flights were sky rocket but  flightshop380 ad pop up helped us in very short time with reasonable rates. Thanks",
    initials: "A",
    rating: 5,
    country: "GB",
    reviewCount: "1 review"
  },
  {
    name: "Sitwat Raheel",
    date: "7 days ago",
    text: "Small Company Best Service",
    fullText: "Though I do not trust new agencies but my friend suggest  flightshop380 and no doubt they provide amazing service. Definitely recommend to try.",
    initials: "SR",
    rating: 5,
    country: "GB",
    reviewCount: "1 review"
  },
 ];

const TrustpilotReviews = () => {
  const [expandedReview, setExpandedReview] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const reviewRefs = useRef<{ [key: string]: HTMLElement | null }>({});
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (expandedReview && reviewRefs.current[expandedReview]) {
        const reviewElement = reviewRefs.current[expandedReview];
        if (reviewElement && !reviewElement.contains(event.target as Node)) {
          setExpandedReview(null);
        }
      }
    };

    if (expandedReview) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [expandedReview]);

  const toggleReview = (reviewName: string) => {
    setExpandedReview(expandedReview === reviewName ? null : reviewName);
  };

  const scrollToIndex = (index: number) => {
    if (sliderRef.current) {
      const cardWidth = sliderRef.current.children[0]?.clientWidth || 0;
      const gap = 16; // 1rem gap
      const scrollPosition = index * (cardWidth + gap);
      sliderRef.current.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      });
      setCurrentIndex(index);
    }
  };

  const nextSlide = () => {
    const nextIndex = currentIndex + 1;
    if (nextIndex < reviews.length) {
      scrollToIndex(nextIndex);
    }
  };

  const prevSlide = () => {
    const prevIndex = currentIndex - 1;
    if (prevIndex >= 0) {
      scrollToIndex(prevIndex);
    }
  };

  return (
    <section id="reviews" className="py-12 md:py-16">
      <div className="container mx-auto">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold">Our Customer's Trustpilot Reviews</h2>
            <div className="mt-2 flex items-center gap-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-1 text-primary">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-4 h-4" fill="currentColor" />
                ))}
              </div>
              <span>
                <span className="font-medium">4.3</span> average rating
              </span>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full border bg-card shadow-sm">
            <Star className="w-4 h-4 text-primary" fill="currentColor" />
            <span className="text-sm font-medium">Trustpilot</span>
          </div>
        </div>

        {/* Slider for all screen sizes */}
        <div className="mt-6 relative">
          {/* Navigation Buttons */}
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={prevSlide}
              disabled={currentIndex === 0}
              className="p-2 rounded-full border bg-card shadow-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-accent transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            {/* Dots indicator */}
            <div className="flex items-center gap-2">
              {reviews.map((_, index) => (
                <button
                  key={index}
                  onClick={() => scrollToIndex(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentIndex ? 'bg-primary' : 'bg-muted'
                  }`}
                />
              ))}
            </div>
            
            <button
              onClick={nextSlide}
              disabled={currentIndex === reviews.length - 1}
              className="p-2 rounded-full border bg-card shadow-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-accent transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
          
          {/* Slider Container */}
          <div 
            ref={sliderRef}
            className="flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {reviews.map((r) => {
              const isExpanded = expandedReview === r.name;
              return (
                <article 
                  key={r.name} 
                  ref={(el) => reviewRefs.current[r.name] = el}
                  className="flex-none w-[calc(100vw-2rem)] md:w-[calc(33.333%-1rem)] max-w-sm md:max-w-md rounded-xl border bg-card p-5 shadow-sm transition-all duration-300 snap-start"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback>{r.initials}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium leading-tight">{r.name}</div>
                        <div className="text-xs text-muted-foreground flex items-center gap-2">
                          <span>{r.country}</span>
                          <span>•</span>
                          <span>{r.reviewCount}</span>
                          <span>•</span>
                          <span>{r.date}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-primary">
                      {Array.from({ length: r.rating }).map((_, i) => (
                        <Star key={i} className="w-4 h-4" fill="currentColor" />
                      ))}
                    </div>
                  </div>
                  <p className={`mt-3 text-sm text-muted-foreground transition-all duration-300 ${
                    isExpanded ? 'line-clamp-none' : 'line-clamp-3'
                  }`}>
                    {isExpanded ? r.fullText : r.text}
                  </p>
                  <button 
                    onClick={() => toggleReview(r.name)}
                    className="mt-4 inline-block text-sm font-medium text-primary hover:underline focus:outline-none"
                  >
                    {isExpanded ? 'Show less' : 'Read more'}
                  </button>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustpilotReviews;
