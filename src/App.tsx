import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RootLayout from "./components/layout/RootLayout";
import Index from "./pages/Index";
import About from "./pages/About";
import BookingTerms from "./pages/BookingTerms";
import Contact from "./pages/Contact";
import Umrah from "./pages/Umrah";
import FlightsPakistan from "./pages/FlightsPakistan";
import FlightsAfrica from "./pages/FlightsAfrica";
import Hajj from "./pages/Hajj";
import NotFound from "./pages/NotFound";

// Services Pages
import FlightBooking from "./pages/Services/FlightBooking";
import Hotels from "./pages/Services/Hotels";
import CarRental from "./pages/Services/CarRental";
import VisaServices from "./pages/Services/VisaServices";
import TravelInsurance from "./pages/Services/TravelInsurance";

// Support Pages
import HelpCenter from "./pages/Support/HelpCenter";
import ContactUs from "./pages/Support/ContactUs";
import FAQ from "./pages/Support/FAQ";
import BookingHelp from "./pages/Support/BookingHelp";
import Cancellation from "./pages/Support/Cancellation";
import EmergencyCallButton from "./components/site/EmergencyCallButton";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <RootLayout>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/booking-terms" element={<BookingTerms />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/Umrah" element={<Umrah />} />
            <Route path="/flights/pakistan" element={<FlightsPakistan />} />
            <Route path="/flights/africa" element={<FlightsAfrica />} />
            <Route path="/hajj" element={<Hajj />} />
            
            {/* Services Routes */}
            <Route path="/services/flight-booking" element={<FlightBooking />} />
            <Route path="/services/hotels" element={<Hotels />} />
            <Route path="/services/car-rental" element={<CarRental />} />
            <Route path="/services/visa-services" element={<VisaServices />} />
            <Route path="/services/travel-insurance" element={<TravelInsurance />} />
            
            {/* Support Routes */}
            <Route path="/support/help-center" element={<HelpCenter />} />
            <Route path="/support/contact-us" element={<ContactUs />} />
            <Route path="/support/faq" element={<FAQ />} />
            <Route path="/support/booking-help" element={<BookingHelp />} />
            <Route path="/support/cancellation" element={<Cancellation />} />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <EmergencyCallButton />
        </RootLayout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
