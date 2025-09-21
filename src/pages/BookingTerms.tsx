import { FileText, AlertTriangle, Info, CheckCircle, Phone, Mail } from "lucide-react";

const BookingTerms = () => {
  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-2 mb-6">
              <FileText className="text-primary w-8 h-8" />
              <h1 className="text-4xl md:text-5xl font-bold">Booking Terms & Conditions</h1>
            </div>
            <p className="text-xl text-muted-foreground mb-8">
              Please read these terms carefully before making your booking with flightshop380.
            </p>
          </div>
        </div>
      </section>

      {/* Terms Content */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="space-y-12">
            
            {/* General Terms */}
            <div className="bg-card rounded-xl p-8 border">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Info className="text-primary" />
                General Terms
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  By making a booking with flightshop380, you agree to be bound by these terms and conditions. These terms apply to all bookings made through our website, phone, or in-person.
                </p>
                <p>
                  All prices are quoted in British Pounds (GBP) unless otherwise stated. Prices are subject to change without notice until the booking is confirmed.
                </p>
                <p>
                  Bookings are not confirmed until you receive a confirmation email from flightshop380 with your booking reference number.
                </p>
              </div>
            </div>

            {/* Booking & Payment */}
            <div className="bg-card rounded-xl p-8 border">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <CheckCircle className="text-primary" />
                Booking & Payment
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Payment Terms:</h3>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Full payment is required at the time of booking for all confirmed reservations</li>
                    <li>We accept major credit cards, debit cards, and bank transfers</li>
                    <li>Payment plans may be available for certain packages (subject to approval)</li>
                    <li>All payments are processed securely through our payment partners</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Booking Confirmation:</h3>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Confirmation will be sent within 24 hours of payment receipt</li>
                    <li>Please check all details carefully and report any errors immediately</li>
                    <li>Keep your booking reference number for all communications</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Cancellation Policy */}
            <div className="bg-card rounded-xl p-8 border">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <AlertTriangle className="text-primary" />
                Cancellation & Refund Policy
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Cancellation Charges:</h3>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li><strong>More than 30 days:</strong> 10% of total booking value</li>
                    <li><strong>15-30 days:</strong> 25% of total booking value</li>
                    <li><strong>7-14 days:</strong> 50% of total booking value</li>
                    <li><strong>Less than 7 days:</strong> 100% of total booking value (no refund)</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Refund Process:</h3>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Refunds will be processed within 10-15 business days</li>
                    <li>Processing fees may apply</li>
                    <li>Refunds will be made to the original payment method</li>
                  </ul>
                </div>
                <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
                  <p className="text-yellow-700 dark:text-yellow-300">
                    <strong>Note:</strong> Special cancellation terms apply to Umrah and Hajj packages. Please refer to specific package terms.
                  </p>
                </div>
              </div>
            </div>

            {/* Travel Documents */}
            <div className="bg-card rounded-xl p-8 border">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <FileText className="text-primary" />
                Travel Documents & Requirements
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Passport Requirements:</h3>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Valid passport with minimum 6 months validity beyond travel dates</li>
                    <li>Sufficient blank pages for visas and stamps</li>
                    <li>Passport must be in good condition</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Visa Requirements:</h3>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Visa applications must be submitted at least 4-6 weeks before travel</li>
                    <li>All required documents must be provided in the correct format</li>
                    <li>Visa approval is subject to embassy/consulate discretion</li>
                    <li>Visa fees are non-refundable once application is submitted</li>
                  </ul>
                </div>
                <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                  <p className="text-blue-700 dark:text-blue-300">
                    <strong>Important:</strong> It is your responsibility to ensure all travel documents are valid and meet destination requirements.
                  </p>
                </div>
              </div>
            </div>

            {/* Health & Insurance */}
            <div className="bg-card rounded-xl p-8 border">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <AlertTriangle className="text-primary" />
                Health & Travel Insurance
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  We strongly recommend comprehensive travel insurance for all bookings. This should cover:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Medical expenses and emergency evacuation</li>
                  <li>Trip cancellation and interruption</li>
                  <li>Lost or delayed baggage</li>
                  <li>Flight delays and missed connections</li>
                  <li>Personal liability coverage</li>
                </ul>
                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                  <p className="text-red-700 dark:text-red-300">
                    <strong>Warning:</strong> flightshop380 is not responsible for any medical expenses or losses incurred during travel.
                  </p>
                </div>
              </div>
            </div>

            {/* Special Terms for Umrah/Hajj */}
            <div className="bg-card rounded-xl p-8 border">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <FileText className="text-primary" />
                Special Terms for Umrah & Hajj Packages
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Umrah Packages:</h3>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Valid Umrah visa required (we assist with application)</li>
                    <li>Proof of vaccination may be required</li>
                    <li>Modest dress code must be followed</li>
                    <li>Group coordination is mandatory</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Hajj Packages:</h3>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Hajj visa and quota system applies</li>
                    <li>Strict adherence to Saudi government regulations</li>
                    <li>Health certificates and vaccinations required</li>
                    <li>No cancellations once visa is approved</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Force Majeure */}
            <div className="bg-card rounded-xl p-8 border">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <AlertTriangle className="text-primary" />
                Force Majeure
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  flightshop380 is not liable for any failure to perform due to circumstances beyond our control, including but not limited to:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Natural disasters and extreme weather conditions</li>
                  <li>Government actions, war, or civil unrest</li>
                  <li>Airline strikes or technical failures</li>
                  <li>Pandemics or health emergencies</li>
                  <li>Acts of terrorism</li>
                </ul>
                <p>
                  In such cases, we will work with you to find alternative arrangements or provide appropriate refunds where possible.
                </p>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-card rounded-xl p-8 border">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Info className="text-primary" />
                Contact & Support
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  For questions about these terms or to make changes to your booking:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li className="flex items-center gap-2">
                    <strong>Email:</strong> 
                    <a href="mailto:info@flightshop380.com" className="flex items-center gap-1 hover:text-yellow-400 transition-colors">
                      <Mail className="w-4 h-4" /> info@flightshop380.com
                    </a>
                  </li>
                  <li className="flex items-center gap-2">
                    <strong>Phone:</strong> 
                    <a href="tel:020-360-31248" className="flex items-center gap-1 hover:text-yellow-400 transition-colors">
                      <Phone className="w-4 h-4" /> 020-360-31248
                    </a>
                  </li>
                  <li><strong>Hours:</strong> Monday-Sunday 9:00 AM - 9:00 PM GMT</li>
                  <li><strong>Emergency:</strong> 24/7 emergency contact provided with booking confirmation</li>
                </ul>
              </div>
            </div>

            {/* Legal Notice */}
            <div className="bg-secondary/20 rounded-xl p-8 border">
              <h2 className="text-2xl font-bold mb-6">Legal Notice</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  These terms and conditions are governed by English law. Any disputes will be subject to the exclusive jurisdiction of the courts of England and Wales.
                </p>
                <p>
                  flightshop380 reserves the right to modify these terms at any time. Updated terms will be posted on our website and will apply to all new bookings.
                </p>
                <p className="text-sm">
                  <strong>Last updated:</strong> {new Date().toLocaleDateString()}
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};

export default BookingTerms;
