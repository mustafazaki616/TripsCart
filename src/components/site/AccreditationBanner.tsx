import React from "react";

const AccreditationBanner: React.FC = () => {
  return (
    <>
      {/* Desktop/large screens: vertical badge fixed to left side of hero, centered */}
      <div
        className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-20 animate-enter"
        aria-hidden="false"
        role="complementary"
        aria-label="Accreditation banner"
      >
        <div className="flex items-stretch rounded-md overflow-hidden shadow-lg">
          {/* Vertical tab */}
          <div className="bg-primary flex items-center justify-center px-3">
            <span className="text-foreground uppercase tracking-widest text-[10px] md:text-xs font-semibold -rotate-90 whitespace-nowrap select-none">
              Accreditation
            </span>
          </div>

          {/* Panel */}
          <div className="bg-card/95 backdrop-blur-sm px-4 py-4 md:px-5 md:py-5 flex flex-col items-center justify-center gap-3 md:gap-4">
            <img
              src="/assets/images/atol-logo.webp"
              alt="ATOL Protected logo"
              className="w-16 h-auto object-contain"
              loading="lazy"
              width={80}
              height={80}
            />
            <p className="text-foreground text-center text-xs md:text-sm font-semibold leading-snug max-w-[220px]">
              We are ATOL Accredited – Your Travel Security Guaranteed.
            </p>
            <div className="h-px w-full bg-foreground/20" />
            <img
              src="/assets/images/iata-logo.webp"
              alt="IATA logo"
              className="w-16 h-auto object-contain"
              loading="lazy"
              width={80}
              height={80}
            />
            <p className="text-foreground text-center text-xs md:text-sm font-semibold leading-snug max-w-[220px]">
              We are IATA Registered – MyTrip UK
            </p>
          </div>
        </div>
      </div>

      {/* Mobile/tablet: horizontal banner at bottom of hero */}
      <div className="md:hidden absolute left-4 right-4 bottom-4 z-20 animate-enter">
        <div className="flex items-center gap-3 rounded-md overflow-hidden shadow-lg bg-card/95 backdrop-blur-sm px-3 py-3">
          <div className="bg-primary rounded-md px-2 py-6 flex items-center justify-center">
            <span className="text-foreground uppercase tracking-widest text-[10px] font-semibold">
              Accreditation
            </span>
          </div>
          <div className="flex-1 grid grid-cols-[auto,1fr] gap-x-3 gap-y-2 items-center">
            <img
              src="/assets/images/atol-logo.webp"
              alt="ATOL Protected logo"
              className="w-10 h-auto object-contain"
              loading="lazy"
              width={64}
              height={64}
            />
            <p className="text-foreground text-xs font-semibold leading-snug">
              We are ATOL Accredited – Your Travel Security Guaranteed.
            </p>
            <div className="col-span-2 h-px bg-foreground/15" />
            <img
              src="/assets/images/iata-logo.webp"
              alt="IATA logo"
              className="w-10 h-auto object-contain"
              loading="lazy"
              width={64}
              height={64}
            />
            <p className="text-foreground text-xs font-semibold leading-snug">
              We are IATA Registered – MyTrip UK
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AccreditationBanner;
