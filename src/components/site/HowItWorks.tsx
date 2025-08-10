import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const HowItWorks = () => {
  return (
    <section id="how" className="container mx-auto py-14 md:py-20">
      <div className="max-w-2xl mx-auto text-center mb-8 md:mb-12">
        <h2 className="">Effortless Ticket Booking Process</h2>
        <p className="mt-3 text-muted-foreground">Simplify your travel: three easy steps every time.</p>
      </div>
      <Accordion type="single" collapsible className="max-w-3xl mx-auto">
        <AccordionItem value="item-1">
          <AccordionTrigger>01 — Destination Research</AccordionTrigger>
          <AccordionContent>
            Explore destinations, compare fares and pick the perfect time to fly.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>02 — Flight Booking</AccordionTrigger>
          <AccordionContent>
            Choose routes and seats, then complete your secure payment.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>03 — Preparation & Enjoyment</AccordionTrigger>
          <AccordionContent>
            Get instant e‑tickets and travel reminders. Bon voyage!
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  );
};

export default HowItWorks;
