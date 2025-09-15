import { ShoppingCart, Menu, ChevronDown, Phone, Mail, Facebook, Instagram, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import * as React from "react";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  return (
    <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-background/70 bg-background/80 border-b">
      {/* Top bar with contact info and social links */}
      <div className="bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/70 text-white py-2 hidden md:block">
        <div className="container mx-auto flex justify-between items-center text-sm">
          <div className="flex items-center gap-4">
            <a href="tel:020-360-31248" className="flex items-center gap-1 hover:text-yellow-400 transition-colors">
              <Phone className="w-3 h-3" /> 020-360-31248
            </a>
            <a href="mailto:info@flightshop380.com" className="flex items-center gap-1 hover:text-yellow-400 transition-colors">
              <Mail className="w-3 h-3" /> info@flightshop380.com
            </a>
            <div className="flex items-center gap-1">
              <span className="flex items-center gap-1">
                <span className="inline-block w-4 h-3 bg-contain bg-no-repeat" style={{ backgroundImage: "url('https://flagcdn.com/w20/gb.png')" }} /> United Kingdom
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <a href="https://www.facebook.com/share/1A38pdBkqU/?mibextid=wwXIfr" aria-label="Facebook" className="hover:text-yellow-400 transition-colors" target="_blank" rel="noopener noreferrer">
              <Facebook className="w-4 h-4" />
            </a>
            <a href="https://www.instagram.com/tripscartuk?igsh=MWo0bzV1cm8yYWp3Nw%3D%3D&utm_source=qr" aria-label="Instagram" className="hover:text-yellow-400 transition-colors" target="_blank" rel="noopener noreferrer">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="https://twitter.com" aria-label="Twitter" className="hover:text-yellow-400 transition-colors" target="_blank" rel="noopener noreferrer">
              <Twitter className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
      <nav className="container mx-auto flex items-center justify-between py-3 px-4 sm:px-6">
        <a href="/" className="flex items-center gap-2">
          <ShoppingCart className="text-primary" />
          <span className="text-lg font-bold">flightshop380</span>
        </a>
        <div className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          <a href="/" className="hover:text-yellow-400 transition-colors">HOME</a>
          <a href="/about" className="hover:text-yellow-400 transition-colors">ABOUT</a>
          <div className="group relative">
            <a href="#" className="hover:text-yellow-400 transition-colors inline-flex items-center gap-1">FLIGHTS <ChevronDown className="w-4 h-4" /></a>
            <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all absolute left-0 mt-2 w-72 rounded-md border bg-background p-2 shadow-lg">
              <a className="block px-3 py-2 rounded hover:bg-accent" href="/flights/pakistan"> Flights to Pakistan</a>
              <a className="block px-3 py-2 rounded hover:bg-accent" href="/flights/pakistan"> Flights to India</a>
              <a className="block px-3 py-2 rounded hover:bg-accent" href="/flights/pakistan"> Flights to Zimbabwe</a>
              <a className="block px-3 py-2 rounded hover:bg-accent" href="/flights/pakistan"> Flights to Turkey</a>
              <a className="block px-3 py-2 rounded hover:bg-accent" href="/flights/pakistan"> Flights to Thailand</a>
              <a className="block px-3 py-2 rounded hover:bg-accent" href="/flights/pakistan"> Flights to Dubai</a>

            </div>
          </div>
          <div className="group relative">
            <a href="#" className="hover:text-yellow-400 transition-colors inline-flex items-center gap-1">FLIGHTS TO AFRICA <ChevronDown className="w-4 h-4" /></a>
            <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all absolute left-0 mt-2 w-72 rounded-md border bg-background p-2 shadow-lg">
              <a className="block px-3 py-2 rounded hover:bg-accent" href="/flights/africa"> Flights to Accra</a>
              <a className="block px-3 py-2 rounded hover:bg-accent" href="/flights/africa"> Flights to Nairobi</a>
              <a className="block px-3 py-2 rounded hover:bg-accent" href="/flights/africa"> Flights to Lagos</a>
              <a className="block px-3 py-2 rounded hover:bg-accent" href="/flights/africa"> Flights to Harare</a>
            </div>
          </div>
          <div className="group relative">
            <a href="#" className="hover:text-yellow-400 transition-colors inline-flex items-center gap-1">UMRAH <ChevronDown className="w-4 h-4" /></a>
            <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all absolute left-0 mt-2 min-w-[28rem] rounded-md border bg-background p-4 shadow-lg grid grid-cols-2 gap-2">
              <div>
                <div className="px-2 py-1 text-xs text-muted-foreground">Umrah Offers</div>
                <a className="block px-3 py-2 rounded hover:bg-accent" href="/umrah">Economy</a>
                <a className="block px-3 py-2 rounded hover:bg-accent" href="/umrah">Premium</a>
                <a className="block px-3 py-2 rounded hover:bg-accent" href="/umrah">Executive</a>
              </div>
              <div>
                <div className="px-2 py-1 text-xs text-muted-foreground">Seasonal</div>
                <a className="block px-3 py-2 rounded hover:bg-accent" href="/umrah">December Offers</a>
                <a className="block px-3 py-2 rounded hover:bg-accent" href="/umrah">February Offers</a>
                <a className="block px-3 py-2 rounded hover:bg-accent" href="/umrah">Ramadan Offers</a>
              </div>
            </div>
          </div>
          <a href="/hajj" className="hover:text-yellow-400 transition-colors">HAJJ</a>
          <a href="/booking-terms" className="hover:text-yellow-400 transition-colors">BOOKING TERMS</a>
          <a href="/contact" className="hover:text-yellow-400 transition-colors">CONTACT</a>
        </div>
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" className="md:hidden" aria-label="Open menu">
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[85vw] max-w-[280px] p-0 border-r">
            <div className="p-4 border-b flex items-center gap-2 bg-primary/10">
              <ShoppingCart className="text-primary" />
              <span className="text-lg font-bold">flightshop380</span>
            </div>
            <nav className="p-2 overflow-y-auto max-h-[calc(100vh-80px)] text-sm">
              <a href="/" className="block px-3 py-2.5 rounded hover:bg-accent border-b">HOME</a>
              <a href="/about" className="block px-3 py-2.5 rounded hover:bg-accent border-b">ABOUT</a>
              <Collapsible>
                <CollapsibleTrigger className="w-full text-left px-3 py-2.5 rounded hover:bg-accent inline-flex items-center justify-between border-b">
                  <span>FLIGHTS</span> <ChevronDown className="w-4 h-4" />
                </CollapsibleTrigger>
                <CollapsibleContent className="pl-4">
                  <a className="block px-3 py-2 rounded hover:bg-accent" href="/flights/pakistan"> Flights to Pakistan</a>
                  <a className="block px-3 py-2 rounded hover:bg-accent" href="/flights/pakistan"> Flights to India</a>
                  <a className="block px-3 py-2 rounded hover:bg-accent" href="/flights/pakistan"> Flights to Zimbabwe</a>
                  <a className="block px-3 py-2 rounded hover:bg-accent" href="/flights/pakistan"> Flights to Turkey</a>
                  <a className="block px-3 py-2 rounded hover:bg-accent" href="/flights/pakistan"> Flights to Thailand</a>
                  <a className="block px-3 py-2 rounded hover:bg-accent" href="/flights/pakistan"> Flights to Dubai</a>
                </CollapsibleContent>
              </Collapsible>
              <Collapsible>
                <CollapsibleTrigger className="w-full text-left px-3 py-2.5 rounded hover:bg-accent inline-flex items-center justify-between border-b">
                  <span>FLIGHTS TO AFRICA</span> <ChevronDown className="w-4 h-4" />
                </CollapsibleTrigger>
                <CollapsibleContent className="pl-4">
                  <a className="block px-3 py-2 rounded hover:bg-accent" href="/flights/africa"> Flights to Accra</a>
                  <a className="block px-3 py-2 rounded hover:bg-accent" href="/flights/africa"> Flights to Nairobi</a>
                  <a className="block px-3 py-2 rounded hover:bg-accent" href="/flights/africa"> Flights to Lagos</a>
                  <a className="block px-3 py-2 rounded hover:bg-accent" href="/flights/africa"> Flights to Harare</a>
                </CollapsibleContent>
              </Collapsible>
              <Collapsible>
                <CollapsibleTrigger className="w-full text-left px-3 py-2.5 rounded hover:bg-accent inline-flex items-center justify-between border-b">
                  <span>UMRAH</span> <ChevronDown className="w-4 h-4" />
                </CollapsibleTrigger>
                <CollapsibleContent className="pl-4">
                  <a className="block px-3 py-2 rounded hover:bg-accent" href="/umrah">Umrah Offers</a>
                  <a className="block px-3 py-2 rounded hover:bg-accent" href="/umrah">Economy</a>
                  <a className="block px-3 py-2 rounded hover:bg-accent" href="/umrah">Premium</a>
                  <a className="block px-3 py-2 rounded hover:bg-accent" href="/umrah">Executive</a>
                  <a className="block px-3 py-2 rounded hover:bg-accent" href="/umrah">December Offers</a>
                  <a className="block px-3 py-2 rounded hover:bg-accent" href="/umrah">February Offers</a>
                  <a className="block px-3 py-2 rounded hover:bg-accent" href="/umrah">Ramadan Offers</a>
                </CollapsibleContent>
              </Collapsible>
              <a href="/hajj" className="block px-3 py-2.5 rounded hover:bg-accent border-b">HAJJ</a>
              <a href="/booking-terms" className="block px-3 py-2.5 rounded hover:bg-accent border-b">BOOKING TERMS</a>
              <a href="/contact" className="block px-3 py-2.5 rounded hover:bg-accent border-b">CONTACT</a>
              
              <div className="mt-4 px-3 py-2 bg-primary/10 rounded">
                <div className="flex flex-col gap-2">
                  <a href="tel:0208-004-4475" className="flex items-center gap-1 text-xs">
                    <Phone className="w-3 h-3" /> +44 01315 87001
                  </a>
                  <a href="mailto:info@flightshop380.com" className="flex items-center gap-1 text-xs">
                    <Mail className="w-3 h-3" /> info@flightshop380.com
                  </a>
                </div>
                <div className="flex items-center gap-3 mt-3 justify-center">
                  <a href="https://www.facebook.com/share/1A38pdBkqU/?mibextid=wwXIfr" aria-label="Facebook" className="hover:text-yellow-400 transition-colors" target="_blank" rel="noopener noreferrer">
                    <Facebook className="w-4 h-4" />
                  </a>
                  <a href="https://www.instagram.com/tripscartuk?igsh=MWo0bzV1cm8yYWp3Nw%3D%3D&utm_source=qr" aria-label="Instagram" className="hover:text-yellow-400 transition-colors" target="_blank" rel="noopener noreferrer">
                    <Instagram className="w-4 h-4" />
                  </a>
                  <a href="https://twitter.com" aria-label="Twitter" className="hover:text-yellow-400 transition-colors" target="_blank" rel="noopener noreferrer">
                    <Twitter className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
};

export default Navbar;
