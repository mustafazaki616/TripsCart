import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  { q: "Do you offer travel insurance?", a: "Yes, optional travel insurance is available for unexpected events like trip cancellations, medical emergencies, or lost luggage." },
  { q: "Are there any additional fees or taxes not included in the displayed price?", a: "All mandatory taxes and fees are shown before you pay unless stated otherwise for specific providers." },
  { q: "What payment methods do you accept?", a: "We support major credit/debit cards and various local payment methods where available." },
  { q: "How far in advance should I book my flight to get the best price?", a: "Prices tend to be lower 4–8 weeks before departure, but can vary by route and season." },
  { q: "Can I reserve a seat on the flight?", a: "Many airlines allow seat selection during or after booking for an additional fee." },
  { q: "What if I need to change or cancel my flight?", a: "Change and cancellation policies depend on the fare class and airline. Check your ticket rules or contact support." },
];

const FAQSection = () => {
  return (
    <section id="faq" className="bg-secondary/40 border-t">
      <div className="container mx-auto py-14 md:py-20">
        <div className="text-center max-w-2xl mx-auto mb-8 md:mb-12">
          <span className="text-sm text-primary">FAQs</span>
          <h2 className="mt-2">Frequently asked questions</h2>
          <p className="mt-2 text-muted-foreground">Answers to commonly asked questions for clarity and convenience.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-5xl mx-auto">
          {faqs.map((f,i)=> (
            <Accordion key={i} type="single" collapsible>
              <AccordionItem value={`faq-${i}`} className="rounded-lg border bg-card px-4">
                <AccordionTrigger className="py-3">{f.q}</AccordionTrigger>
                <AccordionContent className="pb-3 text-sm text-muted-foreground">{f.a}</AccordionContent>
              </AccordionItem>
            </Accordion>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
