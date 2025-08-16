import { Facebook, Instagram, Twitter } from "lucide-react";

// Payment card icons as SVG components
const DeltaIcon = () => (
  <svg width="40" height="24" viewBox="0 0 40 24" className="rounded border bg-white p-1">
    <rect width="40" height="24" fill="#003087" rx="4"/>
    <path d="M8 6h24l-12 12L8 6z" fill="white"/>
    <text x="20" y="20" textAnchor="middle" fontSize="6" fill="white" fontWeight="bold">DELTA</text>
  </svg>
);

const VisaElectronIcon = () => (
  <svg width="40" height="24" viewBox="0 0 40 24" className="rounded border bg-white p-1">
    <rect width="40" height="24" fill="#1A1F71" rx="4"/>
    <text x="20" y="10" textAnchor="middle" fontSize="5" fill="white" fontWeight="bold">VISA</text>
    <text x="20" y="18" textAnchor="middle" fontSize="4" fill="white">ELECTRON</text>
  </svg>
);

const MasterCardIcon = () => (
  <svg width="40" height="24" viewBox="0 0 40 24" className="rounded border bg-white p-1">
    <rect width="40" height="24" fill="white" rx="4"/>
    <circle cx="15" cy="12" r="6" fill="#EB001B"/>
    <circle cx="25" cy="12" r="6" fill="#F79E1B"/>
    <text x="20" y="20" textAnchor="middle" fontSize="4" fill="#000" fontWeight="bold">mastercard</text>
  </svg>
);

const VisaIcon = () => (
  <svg width="40" height="24" viewBox="0 0 40 24" className="rounded border bg-white p-1">
    <rect width="40" height="24" fill="#1A1F71" rx="4"/>
    <text x="20" y="16" textAnchor="middle" fontSize="8" fill="white" fontWeight="bold">VISA</text>
  </svg>
);

const AmexIcon = () => (
  <svg width="40" height="24" viewBox="0 0 40 24" className="rounded border bg-white p-1">
    <rect width="40" height="24" fill="#006FCF" rx="4"/>
    <text x="20" y="10" textAnchor="middle" fontSize="5" fill="white" fontWeight="bold">AMERICAN</text>
    <text x="20" y="18" textAnchor="middle" fontSize="5" fill="white" fontWeight="bold">EXPRESS</text>
  </svg>
);

const Footer = () => {
  return (
    <footer className="border-t bg-background px-4 sm:px-6">
      <div className="container mx-auto py-6 md:py-12">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          <div>
            <div className="text-lg sm:text-xl font-bold">TripsCart</div>
            <p className="mt-2 text-xs sm:text-sm text-muted-foreground">TripsCart offers a seamless flight search experience, smart comparisons, and secure checkout to help you book the best fares with ease.</p>
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
            <div className="flex items-center gap-3 text-muted-foreground mb-4">
              <a href="https://twitter.com" aria-label="Twitter" className="hover:text-foreground" target="_blank" rel="noopener noreferrer"><Twitter /></a>
              <a href="https://www.facebook.com/share/1A38pdBkqU/?mibextid=wwXIfr" aria-label="Facebook" className="hover:text-foreground" target="_blank" rel="noopener noreferrer"><Facebook /></a>
              <a href="https://www.instagram.com/tripscartuk?igsh=MWo0bzV1cm8yYWp3Nw%3D%3D&utm_source=qr" aria-label="Instagram" className="hover:text-foreground" target="_blank" rel="noopener noreferrer"><Instagram /></a>
            </div>
            <div className="text-sm font-semibold mb-2 text-foreground">We accept card payment</div>
            <div className="flex items-center gap-1 flex-wrap">
              <DeltaIcon />
              <VisaElectronIcon />
              <MasterCardIcon />
              <VisaIcon />
              <AmexIcon />
            </div>
          </div>
        </div>

        
        <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t text-xs text-muted-foreground flex flex-col sm:flex-row items-center sm:justify-between gap-4 sm:gap-0">
          <div className="text-center sm:text-left">© {new Date().getFullYear()} TripsCart. All rights reserved.</div>
          <div className="flex gap-4 text-center">
            <a href="#" className="hover:text-foreground">Privacy Policy</a>
            <a href="#" className="hover:text-foreground">Terms of Use</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
