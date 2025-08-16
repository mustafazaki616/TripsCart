import { Facebook, Instagram, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t bg-background px-4 sm:px-6">
      <div className="container mx-auto py-8 md:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          <div>
                    <div className="text-xl font-bold">TripsCart</div>
        <p className="mt-2 text-sm text-muted-foreground">TripsCart offers a seamless flight search experience, smart comparisons, and secure checkout to help you book the best fares with ease.</p>
          </div>
          <div>
            <div className="font-semibold mb-3">Company</div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground">Blog</a></li>
              <li><a href="#" className="hover:text-foreground">Careers</a></li>
              <li><a href="#" className="hover:text-foreground">Press</a></li>
            </ul>
          </div>
          <div>
            <div className="font-semibold mb-3">Product</div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#popular" className="hover:text-foreground">Flights</a></li>
              <li><a href="#features" className="hover:text-foreground">Features</a></li>
              <li><a href="#faq" className="hover:text-foreground">FAQ</a></li>
            </ul>
          </div>
          <div>
            <div className="font-semibold mb-3">Follow</div>
            <div className="flex items-center gap-3 text-muted-foreground">
              <a href="#" aria-label="Twitter" className="hover:text-foreground"><Twitter /></a>
              <a href="#" aria-label="Facebook" className="hover:text-foreground"><Facebook /></a>
              <a href="#" aria-label="Instagram" className="hover:text-foreground"><Instagram /></a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t text-xs text-muted-foreground flex items-center justify-between">
          <div>© {new Date().getFullYear()} TripsCart. All rights reserved.</div>
          <div className="flex gap-4">
            <a href="#" className="hover:text-foreground">Privacy Policy</a>
            <a href="#" className="hover:text-foreground">Terms of Use</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
