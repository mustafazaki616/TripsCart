import { CreditCard, Clock, BellRing, ShieldCheck } from "lucide-react";

const features = [
  { icon: Clock, title: "CS Standby 24 Hours", desc: "Customer support available around-the-clock for your convenience." },
  { icon: CreditCard, title: "Multi Payment Methods", desc: "Diverse payment options for seamless booking." },
  { icon: BellRing, title: "Automatic GPS Messages", desc: "Automated updates for hassle‑free travel." },
  { icon: ShieldCheck, title: "Secure Booking", desc: "Industry‑standard encryption and protections." },
];

const Features = () => {
  return (
    <section id="features" className="container mx-auto py-14 md:py-20">
      <div className="max-w-2xl mx-auto text-center mb-10">
        <span className="text-sm text-primary">Best Featured</span>
        <h2 className="mt-2">Seamless Ticket Reservation: Top Booking Platform Feature</h2>
        <p className="mt-3 text-muted-foreground">Enjoy hassle‑free ticket booking with our seamless and user‑friendly platform features.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {features.map(({icon:Icon, title, desc})=> (
          <div key={title} className="rounded-xl bg-card border shadow-soft p-5">
            <div className="w-10 h-10 rounded-lg bg-secondary/70 flex items-center justify-center mb-3">
              <Icon className="text-primary" />
            </div>
            <h3 className="text-base font-semibold">{title}</h3>
            <p className="text-sm text-muted-foreground mt-2">{desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
