import { Plane, Menu, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-background/70 bg-background/80 border-b">
      <nav className="container mx-auto flex items-center justify-between py-4">
        <a href="/" className="flex items-center gap-2">
          <Plane className="text-primary" />
          <span className="text-lg font-bold">AirVoyage</span>
        </a>
        <div className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          <a href="/" className="hover:text-foreground transition-colors">HOME</a>
          <a href="#about" className="hover:text-foreground transition-colors">ABOUT</a>
          <a href="#" className="hover:text-foreground transition-colors inline-flex items-center gap-1">FLIGHTS <ChevronDown className="w-4 h-4" /></a>
          <a href="#" className="hover:text-foreground transition-colors inline-flex items-center gap-1">FLIGHTS TO AFRICA <ChevronDown className="w-4 h-4" /></a>
          <a href="#" className="hover:text-foreground transition-colors inline-flex items-center gap-1">UMRAH <ChevronDown className="w-4 h-4" /></a>
          <a href="#hajj" className="hover:text-foreground transition-colors">HAJJ</a>
          <a href="#booking-terms" className="hover:text-foreground transition-colors">BOOKING TERMS</a>
          <a href="#contact" className="hover:text-foreground transition-colors">CONTACT</a>
        </div>
        <div className="hidden md:flex items-center gap-3">
          <Button variant="outline">Login</Button>
          <Button variant="hero">Register</Button>
        </div>
        <Button variant="ghost" className="md:hidden" aria-label="Open menu">
          <Menu />
        </Button>
      </nav>
    </header>
  );
};

export default Navbar;
