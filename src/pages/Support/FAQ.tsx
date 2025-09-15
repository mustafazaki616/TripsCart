import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, Search, Book, CreditCard, Shield } from "lucide-react";
import { useState } from "react";

const FAQ = () => {
  const [openItems, setOpenItems] = useState<string[]>([]);

  const toggleItem = (id: string) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const faqCategories = [
    {
      title: "Booking & Search",
      icon: Search,
      questions: [
        {
          id: "booking-1",
          question: "How do I search for flights?",
          answer: "Use our search form on the homepage to enter your departure and destination cities, travel dates, and number of passengers. Our system will show you available flights from multiple airlines with real-time pricing."
        },
        {
          id: "booking-2",
          question: "Can I book flights and hotels together?",
          answer: "Yes! flightshop380 offers package deals that combine flights and hotels for better savings. Look for the 'Flight + Hotel' option when searching to see bundled packages."
        },
        {
          id: "booking-3",
          question: "How far in advance can I book?",
          answer: "You can typically book flights up to 11 months in advance, hotels up to 18 months ahead, and car rentals up to 12 months in advance, depending on the provider."
        }
      ]
    },
    {
      title: "Payment & Pricing",
      icon: CreditCard,
      questions: [
        {
          id: "payment-1",
          question: "What payment methods do you accept?",
          answer: "We accept all major credit cards (Visa, Mastercard, American Express), debit cards, and PayPal. All payments are processed securely through encrypted connections."
        },
        {
          id: "payment-2",
          question: "Are there any hidden fees?",
          answer: "No, we believe in transparent pricing. All fees and taxes are clearly displayed before you complete your booking. The final price you see is what you'll pay."
        },
        {
          id: "payment-3",
          question: "When will I be charged?",
          answer: "For most bookings, you'll be charged immediately upon confirmation. Some hotels may charge at the property, and this will be clearly indicated during booking."
        }
      ]
    },
    {
      title: "Managing Bookings",
      icon: Book,
      questions: [
        {
          id: "manage-1",
          question: "How can I view my booking details?",
          answer: "Log into your flightshop380 account and go to 'My Bookings' to view all your reservations, confirmation numbers, and booking details. You can also access this information from your confirmation email."
        },
        {
          id: "manage-2",
          question: "Can I modify my booking after confirmation?",
          answer: "Modification options depend on the booking terms and conditions. Many bookings allow changes for a fee, while others may be non-refundable. Check your booking details or contact our support team."
        },
        {
          id: "manage-3",
          question: "How do I cancel my booking?",
          answer: "You can cancel eligible bookings through your account dashboard or by contacting our support team. Cancellation policies vary by provider and booking type."
        }
      ]
    },
    {
      title: "Security & Protection",
      icon: Shield,
      questions: [
        {
          id: "security-1",
          question: "Is my personal information secure?",
          answer: "Yes, we use industry-standard SSL encryption to protect your personal and payment information. We never store your full credit card details on our servers."
        },
        {
          id: "security-2",
          question: "What is ATOL protection?",
          answer: "ATOL (Air Travel Organiser's Licence) protection covers certain flight bookings and package holidays. If an ATOL-protected booking fails, you'll receive a refund or alternative arrangements."
        },
        {
          id: "security-3",
          question: "What if my flight is cancelled?",
          answer: "If your flight is cancelled by the airline, you're entitled to a full refund or rebooking. Our support team will help you understand your options and assist with rebooking if needed."
        }
      ]
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
          <p className="text-lg text-muted-foreground">
            Find quick answers to the most common questions about booking and using flightshop380 services
          </p>
        </div>

        <div className="space-y-8">
          {faqCategories.map((category) => {
            const IconComponent = category.icon;
            return (
              <Card key={category.title}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <IconComponent className="h-6 w-6 text-yellow-500" />
                    {category.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {category.questions.map((faq) => (
                      <Collapsible key={faq.id}>
                        <CollapsibleTrigger 
                          className="flex items-center justify-between w-full p-4 text-left bg-muted/50 rounded-lg hover:bg-muted transition-colors"
                          onClick={() => toggleItem(faq.id)}
                        >
                          <span className="font-medium">{faq.question}</span>
                          <ChevronDown 
                            className={`h-4 w-4 transition-transform ${
                              openItems.includes(faq.id) ? 'rotate-180' : ''
                            }`} 
                          />
                        </CollapsibleTrigger>
                        <CollapsibleContent className="px-4 py-3">
                          <p className="text-muted-foreground">{faq.answer}</p>
                        </CollapsibleContent>
                      </Collapsible>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <Card>
            <CardHeader>
              <CardTitle>Still have questions?</CardTitle>
              <CardDescription>
                Can't find the answer you're looking for? Our support team is here to help.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="/support/contact-us" 
                  className="inline-flex items-center justify-center px-6 py-2 bg-yellow-500 hover:bg-yellow-600 text-black rounded-md font-medium transition-colors"
                >
                  Contact Support
                </a>
                <a 
                  href="/support/help-center" 
                  className="inline-flex items-center justify-center px-6 py-2 border border-gray-300 hover:bg-gray-50 rounded-md font-medium transition-colors"
                >
                  Visit Help Center
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default FAQ;