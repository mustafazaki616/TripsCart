import React from "react";

const AccreditationBanner: React.FC = () => {
  const [open, setOpen] = React.useState(true);

  return (
    <>
      {/* Desktop/large screens: fixed vertical badge on the left, vertically centered */}
      <div
        className="hidden md:flex fixed left-0 top-1/2 -translate-y-1/2 z-30 animate-enter"
        role="complementary"
        aria-label="Accreditation banner"
      >
        <div className="flex items-stretch rounded-[var(--radius)] overflow-hidden shadow-elevated">
          {/* Vertical yellow tab (toggle) */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="accreditation-panel-desktop"
            className="bg-primary flex items-center justify-center px-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <span className="text-foreground uppercase tracking-widest text-[10px] md:text-xs font-semibold -rotate-90 whitespace-nowrap select-none">
              ACCREDITATION
            </span>
          </button>

          {/* Panel */}
          <div
            id="accreditation-panel-desktop"
            className={
              `bg-card/95 backdrop-blur-sm px-4 py-4 md:px-5 md:py-5 flex flex-col items-center justify-center gap-3 md:gap-4 transition-transform duration-300 ${open ? 'translate-x-0' : '-translate-x-full'}`
            }
          >
            <img
              src="/assets/images/atol-logo.webp"
              alt="ATOL Protected logo"
              className="w-20 max-w-[80px] h-auto object-contain"
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
              className="w-20 max-w-[80px] h-auto object-contain"
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
      <div className="md:hidden absolute left-4 right-4 bottom-4 z-30 animate-enter">
        <div className="flex items-stretch rounded-[var(--radius)] overflow-hidden shadow-elevated bg-card/95 backdrop-blur-sm">
          {/* Yellow tab (toggle) */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="accreditation-panel-mobile"
            className="bg-primary px-2 md:px-3 py-4 flex items-center justify-center"
          >
            <span className="text-foreground uppercase tracking-widest text-[10px] font-semibold">
              ACCREDITATION
            </span>
          </button>

          {/* Sliding content area */}
          <div
            id="accreditation-panel-mobile"
            className={`flex-1 transition-all duration-300 ${open ? 'opacity-100' : 'opacity-0 pointer-events-none'} px-3 py-3`}
            style={{ maxHeight: open ? 500 : 0, overflow: 'hidden' }}
          >
            <div className="grid grid-cols-[auto,1fr] gap-x-3 gap-y-2 items-center">
              <img
                src="/assets/images/atol-logo.webp"
                alt="ATOL Protected logo"
                className="w-16 max-w-[80px] h-auto object-contain"
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
                className="w-16 max-w-[80px] h-auto object-contain"
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
      </div>
    </>
  );
};

export default AccreditationBanner;
