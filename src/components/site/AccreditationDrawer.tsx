
import React from "react";
import atolLogo from "@/assets/atol-logo.webp";
import iataLogo from "@/assets/iata-logo.webp";

const AccreditationDrawer: React.FC = () => {
  const [open, setOpen] = React.useState(false);

  const toggleOpen = () => setOpen((prev) => !prev);

  return (
    <>
      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-[1px] transition-opacity"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Drawer container with panel that slides and a tab that stays attached */}
      <div className="fixed right-0 top-1/2 z-50 -translate-y-1/2">
        {/* Panel */}
        <div
          className={`relative h-[40vh] w-[22rem] max-w-[85vw] rounded-l-2xl bg-black text-white shadow-xl will-change-transform transform transition-transform duration-500 ease-in-out ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
          aria-hidden={!open}
        >
          <div className="h-full overflow-y-auto p-8">
            <div className="space-y-10">
              <div className="flex flex-col items-center text-center gap-4">
                <img
                  src={atolLogo}
                  alt="ATOL Protected"
                  className="h-16 w-16"
                />
                <p className="text-sm leading-relaxed">
                  We are <span className="font-semibold">ATOL Accredited</span> -
                  Your Travel Security Guaranteed.
                </p>
              </div>

              <div className="flex flex-col items-center text-center gap-4">
                <img
                  src={iataLogo}
                  alt="IATA"
                  className="h-16 w-16"
                />
                <p className="text-sm leading-relaxed">
                  We are <span className="font-semibold">IATA Registered</span> -
                  TripsCart
                </p>
              </div>
            </div>
          </div>

          {/* Attached tab that sits outside the panel's left edge */}
          <button
            type="button"
            onClick={toggleOpen}
            aria-label={open ? "Close accreditation" : "Open accreditation"}
            className="absolute -left-10 top-1/2 -translate-y-1/2 rounded-l-xl rounded-r-none bg-amber-500 px-2 py-3 text-[10px] font-semibold tracking-wide text-white shadow-lg hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-300"
            style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
          >
            ACCREDITATION
          </button>
        </div>

        {/* When closed, keep a slim tab visible at the viewport edge to open */}
        {!open && (
          <button
            type="button"
            onClick={toggleOpen}
            aria-label="Open accreditation"
            className="fixed right-0 top-1/2 z-50 -translate-y-1/2 rounded-l-xl bg-amber-500 px-2 py-3 text-[10px] font-semibold tracking-wide text-white shadow-lg hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-300"
            style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
          >
            ACCREDITATION
          </button>
        )}
      </div>
    </>
  );
};

export default AccreditationDrawer;


