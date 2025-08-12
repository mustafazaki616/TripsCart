import { Star } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const reviews = [
  {
    name: "Zimal Hussain",
    date: "Nov 21, 2024",
    text: "MTU is really useful. They give us a lot of choices to help us make up our minds.",
    initials: "ZH",
  },
  {
    name: "Samreen Khalid",
    date: "Nov 24, 2024",
    text: "I really love My Trip UK! They always have the best deals and do an amazing job taking care...",
    initials: "SK",
  },
  {
    name: "Akhil Firman",
    date: "Nov 21, 2024",
    text: "I highly recommend them. My Trip UK has been my travel agent for a long time and has...",
    initials: "AF",
  },
];

const TrustpilotReviews = () => {
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
          {reviews.map((r) => (
            <article key={r.name} className="rounded-xl border bg-card p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback>{r.initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium leading-tight">{r.name}</div>
                    <div className="text-xs text-muted-foreground">{r.date}</div>
                  </div>
                </div>
                <Star className="w-5 h-5 text-primary" fill="currentColor" />
              </div>
              <div className="mt-3 flex items-center gap-1 text-primary">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-4 h-4" fill="currentColor" />
                ))}
              </div>
              <p className="mt-3 text-sm text-muted-foreground">
                {r.text}
              </p>
              <a href="#" className="mt-4 inline-block text-sm font-medium hover:underline">Read more</a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustpilotReviews;
