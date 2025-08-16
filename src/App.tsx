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
