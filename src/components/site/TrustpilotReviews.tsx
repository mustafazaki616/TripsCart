import { Star } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useState, useRef, useEffect } from "react";

const reviews = [
  {
    name: "Naveed Khan",
    date: "Jan 9, 2025",
    text: "I recently had the pleasure of...",
    fullText: "I recently had the pleasure of interacting with the staff of this airline ticket company, and I was thoroughly impressed. The team was friendly, knowledgeable, and professional throughout the entire process. I recently used Tripscart for booking my travel, and I am highly satisfied with their service. The platform is user-friendly, making it easy to compare and select the best options Their customer support team was responsive and helpful, addressing any questions I had before and during my trip. The bookings were seamless, and everything was well-organized. Overall, Tripscart made my travel planning hassle-free, and I would definitely recommend them to anyone looking for a reliable travel service.",
    initials: "NK",
    rating: 5,
    country: "GB",
    reviewCount: "5 reviews"
  },
  {
    name: "Hassam Riaz",
    date: "Aug 6, 2025",
    text: "Had great experience with tripscart they are very helpful and they have...",
    fullText: "Had great experience with tripscart they are very helpful and they have very fair pricing the most best thing is they are very polite and daniel helps me alot to rebook my new flight and gave me more reasonable options with different airlines. Highly appreciate your efforts and assistance. Highly recommend.",
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
];

const TrustpilotReviews = () => {
  const [expandedReview, setExpandedReview] = useState<string | null>(null);
  const reviewRefs = useRef<{ [key: string]: HTMLElement | null }>({});

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
                <span className="font-medium">4.9</span> average rating
              </span>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full border bg-card shadow-sm">
            <Star className="w-4 h-4 text-primary" fill="currentColor" />
            <span className="text-sm font-medium">Trustpilot</span>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {reviews.map((r) => {
            const isExpanded = expandedReview === r.name;
            return (
              <article 
                key={r.name} 
                ref={(el) => reviewRefs.current[r.name] = el}
                className="rounded-xl border bg-card p-5 shadow-sm transition-all duration-300"
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
    </section>
  );
};

export default TrustpilotReviews;
