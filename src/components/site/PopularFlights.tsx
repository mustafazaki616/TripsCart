import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import kl from "@/assets/dest-kuala-lumpur.jpg";
import bkk from "@/assets/dest-bangkok.jpg";
import lhr from "@/assets/dest-london.jpg";
import dxb from "@/assets/dest-dubai.jpg";
import dps from "@/assets/dest-bali.jpg";
import ist from "@/assets/dest-istanbul.jpg";

const flights = [
  { id: 1, image: kl, route: "Surakarta → Kuala Lumpur", date: "06 Apr, 2024", price: "$213.53" },
  { id: 2, image: bkk, route: "Jakarta → Bangkok", date: "06 Apr, 2024", price: "$259.84" },
  { id: 3, image: lhr, route: "Bandung → London", date: "07 Apr, 2024", price: "$321.75" },
  { id: 4, image: dxb, route: "Jakarta → Singapore", date: "08 Apr, 2024", price: "$70.53" },
  { id: 5, image: dps, route: "Surabaya → Denpasar Bali", date: "09 Apr, 2024", price: "$25.12" },
  { id: 6, image: ist, route: "Yogyakarta → Istanbul", date: "10 Apr, 2024", price: "$464.75" },
];

const PopularFlights = () => {
  return (
    <section id="popular" className="bg-secondary/40 border-y">
      <div className="container mx-auto py-14 md:py-20">
        <div className="flex items-end justify-between mb-6">
          <div>
            <p className="text-sm text-primary mb-2">Recommendation</p>
            <h2>Popular flights near your location available now.</h2>
          </div>
          <Button variant="outline" className="hidden md:inline-flex">See More <ArrowRight /></Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {flights.map((f)=> (
            <article key={f.id} className="group overflow-hidden rounded-xl bg-card border shadow-soft">
              <div className="relative aspect-[16/10] overflow-hidden">
                <img src={f.image} alt={f.route} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
              </div>
              <div className="p-4">
                <h3 className="text-sm font-medium">{f.route}</h3>
                <div className="mt-1 text-xs text-muted-foreground">{f.date}</div>
                <div className="mt-3 font-semibold">Start from {f.price}</div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularFlights;
