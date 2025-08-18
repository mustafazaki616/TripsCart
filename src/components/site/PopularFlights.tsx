import { Link } from "react-router-dom";
import dubai from "@/assets/dest-dubai.jpg";
import bangkok from "@/assets/dest-bangkok.jpg";
import istanbul from "@/assets/dest-istanbul.jpg";
import pakistan from "@/assets/pak-bg.avif";
import india from "@/assets/india-bg.avif";
import southAfrica from "@/assets/africa-bg.jpg";
import zimbabwe from "@/assets/zimbabwe-bg.jpg";
import umrah from "@/assets/umrah-bg.jpeg";

const packages = [
  { id: 1, image: pakistan, title: "Pakistan Packages", price: "£420", description: "Explore the rich culture and heritage", link: "/flights/pakistan" },
  { id: 2, image: india, title: "India Packages", price: "£440", description: "Discover the diversity of India", link: "/flights/pakistan" },
  { id: 3, image: southAfrica, title: "South Africa Packages", price: "£450", description: "Experience wildlife and natural beauty", link: "/flights/africa" },
  { id: 4, image: zimbabwe, title: "Zimbabwe Packages", price: "£480", description: "Adventure in the heart of Africa", link: "/flights/africa" },
  { id: 5, image: umrah, title: "Umrah Packages", price: "£500", description: "Spiritual journey to the holy cities", link: "/umrah" },
  { id: 6, image: istanbul, title: "Turkey Packages", price: "£450", description: "Where East meets West", link: "/flights/pakistan" },
  { id: 7, image: bangkok, title: "Thailand Packages", price: "£420", description: "Tropical paradise and culture", link: "/flights/pakistan" },
  { id: 8, image: dubai, title: "Dubai Packages", price: "£440", description: "Luxury in the desert oasis", link: "/flights/pakistan" },
];
// £
const PopularFlights = () => {
  return (
    <section id="popular" className="bg-secondary/40 border-y">
      <div className="container mx-auto py-14 md:py-20">
        <div className="flex items-end justify-between mb-6">
          <div>
            <p className="text-sm text-primary mb-2">Popular Destinations</p>
            <h2>Explore Our Travel Packages</h2>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {packages.map((pack) => (
            <Link 
              to={pack.link} 
              key={pack.id} 
              className="block group overflow-hidden rounded-xl bg-card border shadow-soft hover:shadow-md transition-shadow"
            >
              <article>
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img 
                    src={pack.image} 
                    alt={pack.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                    loading="lazy" 
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-sm font-medium">{pack.title}</h3>
                  <div className="mt-1 text-xs text-muted-foreground">{pack.description}</div>
                  <div className="mt-3 font-semibold">Start from {pack.price}</div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularFlights;
