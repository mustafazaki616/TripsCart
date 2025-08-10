import { Plane, Menu } from "lucide-react";
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
          <a href="#how" className="hover:text-foreground transition-colors">How it works</a>
          <a href="#popular" className="hover:text-foreground transition-colors">Popular Flights</a>
          <a href="#features" className="hover:text-foreground transition-colors">Features</a>
          <a href="#faq" className="hover:text-foreground transition-colors">FAQ</a>
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
