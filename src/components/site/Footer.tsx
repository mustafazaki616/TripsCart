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
      <div className="container mx-auto py-8 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="text-2xl font-bold mb-4"> flightshop380</div>
            <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
              flightshop380 offers a seamless flight search experience, smart comparisons, and secure checkout to help you book the best fares with ease. Your trusted travel companion for unforgettable journeys.
            </p>
            <div className="text-sm text-muted-foreground">
              <p className="mb-1">📧 info@flightshop380.com</p>
              <p className="mb-1">📞 0203-603-1248</p>  
              <p>🕒 24/7 Customer Support</p>
            </div>
          </div>

          {/* Services */}
          <div>
            <div className="font-semibold mb-4 text-foreground">Services</div>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><a href="/services/flight-booking" className="hover:text-yellow-400 transition-colors">Flight Booking</a></li>
              <li><a href="/services/hotels" className="hover:text-yellow-400 transition-colors">Hotels</a></li>
              <li><a href="/services/car-rental" className="hover:text-yellow-400 transition-colors">Car Rental</a></li>
              <li><a href="/services/visa-services" className="hover:text-yellow-400 transition-colors">Visa Services</a></li>
              {/* <li><a href="/services/travel-insurance" className="hover:text-yellow-400 transition-colors">Travel Insurance</a></li> */}
            </ul>
          </div>

          {/* Support */}
          <div>
            <div className="font-semibold mb-4 text-foreground">Support</div>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><a href="/support/help-center" className="hover:text-yellow-400 transition-colors">Help Center</a></li>
              <li><a href="/support/contact-us" className="hover:text-yellow-400 transition-colors">Contact Us</a></li>
              <li><a href="/support/faq" className="hover:text-yellow-400 transition-colors">FAQ</a></li>
              <li><a href="/support/booking-help" className="hover:text-yellow-400 transition-colors">Booking Help</a></li>
              {/* <li><a href="/support/cancellation" className="hover:text-yellow-400 transition-colors">Cancellation</a></li> */}
            </ul>
          </div>

          {/* Social & Payment */}
          <div>
            <div className="font-semibold mb-4 text-foreground">Connect With Us</div>
            <div className="flex items-center gap-3 mb-6">
              <a href="https://twitter.com" aria-label="Twitter" className="hover:text-yellow-400 transition-colors p-2 rounded-full hover:bg-yellow-400/10" target="_blank" rel="noopener noreferrer">
                <Twitter size={20} />
              </a>
              <a href="https://www.facebook.com/share/1A38pdBkqU/?mibextid=wwXIfr" aria-label="Facebook" className="hover:text-yellow-400 transition-colors p-2 rounded-full hover:bg-yellow-400/10" target="_blank" rel="noopener noreferrer">
                <Facebook size={20} />
              </a>
              <a href="https://www.instagram.com/tripscartuk?igsh=MWo0bzV1cm8yYWp3Nw%3D%3D&utm_source=qr" aria-label="Instagram" className="hover:text-yellow-400 transition-colors p-2 rounded-full hover:bg-yellow-400/10" target="_blank" rel="noopener noreferrer">
                <Instagram size={20} />
              </a>
            </div>
            
            <div className="text-sm font-semibold mb-3 text-foreground">Secure Payments</div>
            <div className="flex items-center gap-1 flex-wrap mb-4">
              <DeltaIcon />
              <VisaElectronIcon />
              <MasterCardIcon />
              <VisaIcon />
              <AmexIcon />
            </div>
            
            <div className="text-xs text-muted-foreground">
              {/* <p className="mb-1">🔒 SSL Secured</p>
              <p>✅ ATOL Protected</p> */}
            </div>
          </div>
        </div>

        
        {/* ATOL Protection Information */}
        <div className="mt-12 pt-8 border-t">
          <div className="text-center max-w-4xl mx-auto">
            <h3 className="text-lg font-semibold mb-4 text-foreground">Your Travel Protection with flightshop380</h3>
            <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 text-sm text-muted-foreground leading-relaxed">
              <p className="mb-4">
                Selected flights and flight-inclusive holidays available through flightshop380 are financially protected under the ATOL scheme. However, ATOL protection does not cover all holiday and travel services featured on our platform. We recommend confirming the protection applicable to your booking before proceeding.
              </p>
              <p className="mb-4">
                If you do not receive an ATOL Certificate upon booking, your reservation will not be ATOL protected. Should you receive an ATOL Certificate, please verify that all components of your trip are properly listed. If any parts are missing, those elements are not financially protected.
              </p>
              <p className="mb-4">
                For comprehensive information about financial protection and the ATOL Certificate, please visit our booking terms or contact our support team. flightshop380 is committed to ensuring your travel experience is both memorable and secure.
              </p>
              {/* <p className="text-center font-medium text-foreground">
                For the latest travel guidance from the Foreign & Commonwealth Office, including security updates, local regulations, and passport requirements, 
                <a href="#" className="text-yellow-600 hover:text-yellow-500 underline ml-1">click here</a>.
              </p> */}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 pt-6 border-t">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            <div className="text-xs text-muted-foreground text-center lg:text-left">
              © {new Date().getFullYear()}  flightshop380. All rights reserved. | Registered in England & Wales
            </div>
            <div className="flex flex-wrap gap-4 text-xs text-muted-foreground justify-center">
              <a href="/booking-terms" className="hover:text-yellow-400 transition-colors">Privacy Policy</a>
              <a href="/booking-terms" className="hover:text-yellow-400 transition-colors">Terms of Service</a>
              <a href="/cookies" className="hover:text-yellow-400 transition-colors">Cookie Policy</a>
              <a href="/accessibility" className="hover:text-yellow-400 transition-colors">Accessibility</a>
              <a href="/sitemap" className="hover:text-yellow-400 transition-colors">Sitemap</a>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t text-center">
            <p className="text-xs text-muted-foreground">
              ATOL Protection: When you pay you will be supplied with an ATOL Certificate. Please ask for it and check to ensure that everything you booked is listed on it.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
