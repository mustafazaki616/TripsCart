import React from 'react';

// Import airline logo images
import flyEmirates from '../../assets/flights/fly-emirates.webp';
import loganAir from '../../assets/flights/log.webp';
import piaAirways from '../../assets/flights/pia.webp';
import ryanAir from '../../assets/flights/raynair.webp';
import saudiaAirways from '../../assets/flights/saudi.webp';
import wizzAir from '../../assets/flights/wizz.webp';
import britishAirways from '../../assets/flights/BRITISH.webp';
import aerLingus from '../../assets/flights/ae.webp';
import bhAir from '../../assets/flights/bh-air.webp';
import flyDubai from '../../assets/flights/fly-dubai.webp';

interface AirlineLogo {
  src: string;
  alt: string;
}

const airlineLogos: AirlineLogo[] = [
  { src: flyEmirates, alt: 'Emirates' },
  { src: loganAir, alt: 'Logan Air' },
  { src: piaAirways, alt: 'PIA Airways' },
  { src: ryanAir, alt: 'Ryan Air' },
  { src: saudiaAirways, alt: 'Saudia Airways' },
  { src: wizzAir, alt: 'Wizz Air' },
  { src: britishAirways, alt: 'British Airways' },
  { src: aerLingus, alt: 'Aer Lingus' },
  { src: bhAir, alt: 'BH Air' },
  { src: flyDubai, alt: 'Fly Dubai' },
];

const MarqueeBanner: React.FC = () => {
  return (
    <section className="marquee-section bg-[#0a1e3b] py-6">
      <div className="marquee right">
        <div className="marquee-content">
          {/* First set of logos */}
          {airlineLogos.map((logo, index) => (
            <div key={`logo-1-${index}`} className="marquee-item">
              <img src={logo.src} alt={logo.alt} className="h-12 md:h-16" />
            </div>
          ))}
          
          {/* Duplicate set for continuous scrolling */}
          {airlineLogos.map((logo, index) => (
            <div key={`logo-2-${index}`} className="marquee-item">
              <img src={logo.src} alt={logo.alt} className="h-12 md:h-16" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MarqueeBanner;