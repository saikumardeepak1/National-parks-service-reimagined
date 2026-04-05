import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function YosemitePage() {
  const navigate = useNavigate();

  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-surface text-on-surface font-body selection:bg-primary selection:text-white opacity-0 animate-[fadeIn_1.5s_ease-out_forwards]">
      <style>{`
        @keyframes fadeIn {
          to { opacity: 1; }
        }
      `}</style>
      <div className="grain-overlay"></div>
      
      {/* Sticky Top Nav */}
      <nav className="sticky top-0 z-[60] w-full bg-surface/90 backdrop-blur-md px-8 py-4 flex justify-between items-center">
        <Link to="/home" className="flex items-center gap-4 hover:opacity-70 transition-opacity">
          <img 
            alt="NPS Logo" 
            className="h-12 w-auto drop-shadow-sm" 
            src="/assets/nps-logo-official.svg"
          />
          <span className="font-label text-[10px] tracking-[0.2em] font-bold text-[#1A1A1A]">NPS ARCHIVE</span>
        </Link>
        <div className="absolute left-1/2 -translate-x-1/2">
          <h2 className="font-headline text-lg tracking-widest uppercase">Yosemite National Park</h2>
        </div>
        <button 
          onClick={() => navigate('/home')}
          className="font-label text-[10px] tracking-widest flex items-center gap-2 hover:opacity-60 transition-opacity"
        >
          <span className="material-symbols-outlined text-sm">arrow_back</span>
          BACK TO ALL PARKS
        </button>
      </nav>

      {/* Sidebar (Sticky Right) */}
      <aside className="fixed right-8 top-1/2 -translate-y-1/2 z-50 hidden xl:flex flex-col gap-6 w-48 p-6 bg-[#0d1a0f] text-white">
        <div className="space-y-1">
          <p className="font-label text-[8px] tracking-widest opacity-50 uppercase">Entrance Fee</p>
          <p className="font-headline text-2xl italic">$35.00</p>
          <p className="font-label text-[9px] opacity-70">Per private vehicle</p>
        </div>
        <div className="h-[1px] bg-white/10 w-full"></div>
        <a className="font-label text-[10px] tracking-[0.2em] uppercase border border-white py-3 text-center hover:bg-white hover:text-[#0d1a0f] transition-all" href="#">
          Book Now
        </a>
        <a className="font-label text-[10px] tracking-[0.2em] uppercase flex items-center justify-center gap-2" href="#">
          <span className="material-symbols-outlined text-sm">directions</span>
          Directions
        </a>
      </aside>

      <main className="relative">
        {/* Hero Section */}
        <section className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden">
          <img 
            className="absolute inset-0 w-full h-full object-cover" 
            alt="Majestic granite face of El Capitan" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDNtGPQutdkwTkoB3T3smZPtZGkbisEBlVF_pfz3HRGCNfjakOs8kjDAaNzixI5cANjTrGoBxcv3EcotAAOVwWGCp5z75irpiMR9P14he6LkVl1clUw8kAgHGSmGyi3wfR_j4PHTD732G6bxaGdW2_-mnbpIgSDPMRyL68EUk_i_1E-LnBi5VfK2mCPNIM3mc2qVXLpXxQqdnhs5T7TYIL7hJS1Jt21CMCgUCmGZdZtEqOI4tjExBmN8N4G5p4iCmjCi5PeBj5ySrw"
          />
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative z-10 text-center text-white space-y-4">
            <p className="font-label text-xs tracking-[0.4em] uppercase opacity-80">CALIFORNIA, UNITED STATES</p>
            <h1 className="font-headline italic text-[12vw] leading-none select-none">Yosemite</h1>
            <p className="font-label text-[10px] tracking-[0.5em] uppercase opacity-60">ESTABLISHED 1890 • SIERRA NEVADA MOUNTAINS</p>
          </div>
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 animate-bounce">
            <span className="font-label text-[10px] tracking-[0.3em] text-white opacity-60">EXPLORE</span>
            <span className="material-symbols-outlined text-white/60">expand_more</span>
          </div>
        </section>

        {/* Live Conditions Bar */}
        <div className="bg-[#0d1a0f] text-white py-4 px-8 flex justify-between items-center font-label text-[10px] tracking-widest uppercase overflow-x-auto whitespace-nowrap">
          <div className="flex items-center gap-8">
            <span className="flex items-center gap-2">TEMP: <span className="text-surface-container-highest">72°F / 22°C</span></span>
            <span className="flex items-center gap-2">SUNRISE: <span className="text-surface-container-highest">06:14 AM</span></span>
            <span className="flex items-center gap-2">SUNSET: <span className="text-surface-container-highest">08:02 PM</span></span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            STATUS: PARK IS OPEN
          </div>
        </div>

        {/* Passport Stamp Section */}
        <section className="py-32 px-8 max-w-5xl mx-auto flex flex-col items-center text-center">
          <div className="w-48 h-48 rounded-full border-[3px] border-primary/10 flex items-center justify-center mb-16 relative">
            <div className="absolute inset-2 border border-primary/5 rounded-full"></div>
            <div className="text-center p-4">
              <span className="material-symbols-outlined text-5xl opacity-20 block mb-2">landscape</span>
              <p className="font-signature text-2xl text-primary/40 -rotate-12">Yosemite</p>
            </div>
          </div>
          <h3 className="font-headline text-4xl mb-8 max-w-2xl leading-relaxed">
            An archival sanctuary of granite, sequoia, and falling water.
          </h3>
          <div className="flex flex-wrap justify-center gap-12 mb-16">
            <div className="text-center">
              <p className="font-label text-[10px] tracking-widest opacity-40 uppercase mb-2">Total Area</p>
              <p className="font-headline text-xl">748,436 Acres</p>
            </div>
            <div className="text-center">
              <p className="font-label text-[10px] tracking-widest opacity-40 uppercase mb-2">Annual Visitors</p>
              <p className="font-headline text-xl">3.5 Million+</p>
            </div>
            <div className="text-center">
              <p className="font-label text-[10px] tracking-widest opacity-40 uppercase mb-2">Designated Trails</p>
              <p className="font-headline text-xl">800 Miles</p>
            </div>
          </div>
          <p className="font-body text-lg text-on-surface/70 leading-relaxed max-w-3xl first-letter:text-5xl first-letter:font-headline first-letter:float-left first-letter:mr-3">
            Yosemite National Park, set within California’s Sierra Nevada mountains, is famed for its giant, ancient sequoia trees, and for Tunnel View, the iconic outlook of towering Bridalveil Fall and the granite cliffs of El Capitan and Half Dome. In Yosemite Village are shops, restaurants, lodging, the Yosemite Museum and the Ansel Adams Gallery, with prints of the photographer’s renowned black-and-white landscapes of the area.
          </p>
        </section>

        {/* Chapter Tabs (Sticky) */}
        <div className="sticky top-[64px] z-40 bg-surface border-y border-outline-variant/10">
          <div className="max-w-screen-xl mx-auto px-8 flex justify-center gap-12 py-6 overflow-x-auto">
            <a className="font-label text-[10px] tracking-[0.2em] uppercase text-primary border-b border-primary pb-1" href="#overview">Overview</a>
            <a className="font-label text-[10px] tracking-[0.2em] uppercase text-on-surface/40 hover:text-primary transition-colors" href="#wildlife">Wildlife</a>
            <a className="font-label text-[10px] tracking-[0.2em] uppercase text-on-surface/40 hover:text-primary transition-colors" href="#trails">Trails</a>
            <a className="font-label text-[10px] tracking-[0.2em] uppercase text-on-surface/40 hover:text-primary transition-colors" href="#planning">Best Time</a>
            <a className="font-label text-[10px] tracking-[0.2em] uppercase text-on-surface/40 hover:text-primary transition-colors" href="#gallery">Gallery</a>
          </div>
        </div>

        {/* Section 4: Overview */}
        <section className="py-32 grid md:grid-cols-2 gap-0" id="overview">
          <div className="h-[819px]">
            <img 
              className="w-full h-full object-cover" 
              alt="Moody view of Yosemite Valley floor" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBtDnUlEaSnRmc7DnT21boUgjgezibY-6Lb0THbNM-d4KTdjSZrIsv5gYZXlV-ylaR-Z2-FVJTj0fVkKj4b5d1TUK3GENV5PDR8eFtteur-Mxm1QiyfbcmfGTRCccQLmqE1uy6qb0AxZXp3K0D26j81PlNPHO8Tk-yQTak5hv5oQkg3720yeYcYOssn6d0nvPk33zGZ9HNVp5QIgP-R5BWFB7WXXbkcCrYWBrLyQ6vZNlTQkvAlmXhXlnezhLGCvA9JAZmCg-Kt6jI"
            />
          </div>
          <div className="bg-surface-container-low p-16 md:p-24 flex flex-col justify-center">
            <p className="font-label text-[10px] tracking-[0.4em] uppercase mb-12 opacity-50">Discovery Guide</p>
            <h2 className="font-headline text-5xl mb-12">Why the Curator Recommends Yosemite</h2>
            <ul className="space-y-8 font-body text-xl text-on-surface/80">
              <li className="flex gap-6">
                <span className="font-headline italic text-primary/30">01</span>
                <span>Witness the vertical majesty of El Capitan, the largest monolithic granite block in the world.</span>
              </li>
              <li className="flex gap-6">
                <span className="font-headline italic text-primary/30">02</span>
                <span>Stand beneath the mist of Yosemite Falls, one of the tallest waterfalls in North America.</span>
              </li>
              <li className="flex gap-6">
                <span className="font-headline italic text-primary/30">03</span>
                <span>Walk among giants in Mariposa Grove, home to over 500 mature giant sequoias.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Section 5: Wildlife Spotlight */}
        <section className="py-32 px-8 bg-surface-container-highest/30" id="wildlife">
          <div className="max-w-screen-xl mx-auto">
            <div className="flex items-baseline gap-4 mb-16">
              <h2 className="font-headline text-4xl italic">Wildlife</h2>
              <span className="font-label text-[10px] tracking-[0.4em] uppercase opacity-40">The Park's Inhabitants</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Bear Card */}
              <div className="group perspective-1000 h-96">
                <div className="relative w-full h-full card-inner shadow-sm">
                  <div className="absolute inset-0 backface-hidden bg-white p-2">
                    <img className="w-full h-full object-cover" alt="American Black Bear" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCJP-6XAbNTV7LFIZEicmNo_TtY8S2L-Uh6G01_tqFv2eaA2X-KNTkB775nawkD0dY8ZSgZSD4ISHeuniMvL5Z6UEsC-sWdmlG8K-0XlecUzJFP6dT3F-87vzIZFgyPm4QyDn0WjHYg6BIQ_KX7xRnWtmhYjJdoqNmXbU8_Xr1llAuYe7Bu9T_OvObuWS2XRCezxne2l45GEy8zxPLVLmSYt5mAy_nHQEnG6LRu2xeIHqOELUFFaUMVoyo4A-QyQKAh7eJaoLtl00g" />
                    <div className="absolute bottom-6 left-6 text-white">
                      <p className="font-label text-[9px] tracking-widest uppercase">Mammal</p>
                      <h4 className="font-headline text-2xl italic">American Black Bear</h4>
                    </div>
                  </div>
                  <div className="absolute inset-0 backface-hidden rotate-y-180 bg-[#0d1a0f] text-white p-12 flex flex-col justify-center">
                    <h4 className="font-headline text-xl mb-4 italic">The Forest Sentinel</h4>
                    <p className="font-body text-sm opacity-80 leading-relaxed">
                      Despite their name, many black bears in Yosemite are actually brown or blonde. There are approximately 300-500 black bears in the park.
                    </p>
                  </div>
                </div>
              </div>
              {/* Deer Card */}
              <div className="group perspective-1000 h-96">
                <div className="relative w-full h-full card-inner shadow-sm">
                  <div className="absolute inset-0 backface-hidden bg-white p-2">
                    <img className="w-full h-full object-cover" alt="Mule Deer" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB0rr5lUzQzs-He5HSdvZPy6knfRrAxQ_ummjoQzJmZPelRM4AbiOqU2ypqjQRa5-Dp7XuhH8cqYPkpOuzELUdmRf80WnsC7BnPYUDxFN3i7IUmjjnpKx38LRM9Rqsf786_RitcMY-m7xCgE7S0IOvN5TYizzd0AWLvuWQbtIa-OjHc1s2damsQZKR0KiTipBFVa3kctDw71DFaTo2nC7XEfejhEt9d_AQC3zY7Dv4PqPF6w6qLRFxJUVH2TmQau3OPBCV2QTsjf8w" />
                    <div className="absolute bottom-6 left-6 text-white">
                      <p className="font-label text-[9px] tracking-widest uppercase">Mammal</p>
                      <h4 className="font-headline text-2xl italic">Mule Deer</h4>
                    </div>
                  </div>
                  <div className="absolute inset-0 backface-hidden rotate-y-180 bg-[#0d1a0f] text-white p-12 flex flex-col justify-center">
                    <h4 className="font-headline text-xl mb-4 italic">Meadow Wanderer</h4>
                    <p className="font-body text-sm opacity-80 leading-relaxed">
                      Named for their large, mule-like ears, these are the most common large mammals seen in Yosemite Valley meadows.
                    </p>
                  </div>
                </div>
              </div>
              {/* Bobcat Card */}
              <div className="group perspective-1000 h-96">
                <div className="relative w-full h-full card-inner shadow-sm">
                  <div className="absolute inset-0 backface-hidden bg-white p-2">
                    <img className="w-full h-full object-cover" alt="Bobcat" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC5qAqE9ut43gTJHuZTiPJAoXZE6BOPJcBtR1pyV-HhB1nSRPhDP7XmGc66vpnFuZXKiUpBlFn4URkuhNxJ82WcxdnBsFlQYrx37nHwWBSo9LicsH41CTF8rUoGxB6TABg71pwGUKUHpr1-gVhjqCS8d9kObn98L0hDWrALUzKJ6xlfRq1i-6EXk_BkGrr9Lk32y8niNSqpHV5WKoyOFmIYyBfMz6pC62S8Ar2juKDOMQ7iLgPnv933EcDZvAxAgJtbkVpOl7eSTRE" />
                    <div className="absolute bottom-6 left-6 text-white">
                      <p className="font-label text-[9px] tracking-widest uppercase">Carnivore</p>
                      <h4 className="font-headline text-2xl italic">Bobcat</h4>
                    </div>
                  </div>
                  <div className="absolute inset-0 backface-hidden rotate-y-180 bg-[#0d1a0f] text-white p-12 flex flex-col justify-center">
                    <h4 className="font-headline text-xl mb-4 italic">The Elusive Ghost</h4>
                    <p className="font-body text-sm opacity-80 leading-relaxed">
                      Extremely elusive and mostly nocturnal, bobcats are excellent hunters that help balance the park's rodent populations.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 6: Trails */}
        <section className="py-32 px-8" id="trails">
          <div className="max-w-screen-xl mx-auto flex flex-col lg:flex-row gap-16">
            <div className="lg:w-1/3">
              <h2 className="font-headline text-5xl mb-8">Iconic Trails</h2>
              <p className="font-body text-lg text-on-surface/60 mb-12">From valley floor strolls to grueling high-altitude ascents, these trails define the Yosemite experience.</p>
              <div className="space-y-6">
                {/* Trail Card 1 */}
                <div className="group p-8 bg-surface-container-low hover:bg-primary hover:text-white transition-all cursor-pointer">
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="font-headline text-2xl italic">Half Dome Cables</h4>
                    <span className="font-label text-[8px] border px-2 py-1 tracking-widest uppercase border-current">Hard</span>
                  </div>
                  <div className="flex gap-4 font-label text-[10px] tracking-widest opacity-60 mb-4">
                    <span>14.2 MILES</span>
                    <span>4,800 FT GAIN</span>
                  </div>
                  <div className="h-[2px] bg-current opacity-10 w-full mb-4"></div>
                  <div className="h-8 flex items-end gap-1 opacity-40">
                    <div className="bg-current w-full h-2"></div>
                    <div className="bg-current w-full h-4"></div>
                    <div className="bg-current w-full h-8"></div>
                    <div className="bg-current w-full h-6"></div>
                    <div className="bg-current w-full h-10"></div>
                  </div>
                </div>
                {/* Trail Card 2 */}
                <div className="group p-8 bg-surface-container-low hover:bg-primary hover:text-white transition-all cursor-pointer">
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="font-headline text-2xl italic">Mist Trail</h4>
                    <span className="font-label text-[8px] border px-2 py-1 tracking-widest uppercase border-current">Moderate</span>
                  </div>
                  <div className="flex gap-4 font-label text-[10px] tracking-widest opacity-60 mb-4">
                    <span>5.4 MILES</span>
                    <span>2,000 FT GAIN</span>
                  </div>
                  <div className="h-[2px] bg-current opacity-10 w-full mb-4"></div>
                  <div className="h-8 flex items-end gap-1 opacity-40">
                    <div className="bg-current w-full h-4"></div>
                    <div className="bg-current w-full h-10"></div>
                    <div className="bg-current w-full h-6"></div>
                    <div className="bg-current w-full h-8"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:w-2/3 h-[700px] bg-surface-container-highest relative group overflow-hidden">
              <img className="w-full h-full object-cover opacity-80 grayscale group-hover:grayscale-0 transition-all duration-1000" alt="Topographic map of Yosemite Valley" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAsmMhIya7oKMWuXT0JTvLAanrVEnY4jpDmz11nznQP8-udaZr13wN3G92ELyj8AcIHQClt7zsQv1mwdTd9fem2Td62vAq93NcelUutBlu5mwWHINI0YbEwWdjhwdeMeGE70BzKuAdAPqjSmQ4yvFayhe79QrToxl9ENNG1sSQsU264uRMGk1yLgRqfiaVgam3TelcnCf68zQMQ8Bac3znV4rAQ6Pk516G9BHRAvxDJnYHdtsUXjQoZ9kDXzS6DB9FlRbkTa7Ujga0" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white/90 backdrop-blur px-8 py-4 font-label text-[10px] tracking-[0.3em] uppercase flex items-center gap-3 shadow-xl">
                  <span className="material-symbols-outlined">map</span>
                  Interactive Topography
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 7: Plan Your Visit */}
        <section className="py-32 px-8 bg-[#0d1a0f] text-white" id="planning">
          <div className="max-w-screen-xl mx-auto">
            <h2 className="font-headline text-4xl italic mb-16 text-center">Seasonal Pacing</h2>
            <div className="flex items-center justify-between font-label text-[9px] tracking-widest uppercase mb-12 border-y border-white/10 py-6">
              <span className="opacity-30">JAN</span>
              <span className="opacity-30">FEB</span>
              <span className="opacity-30">MAR</span>
              <span className="opacity-30">APR</span>
              <span className="text-white border-b-2 border-white pb-2">MAY</span>
              <span className="text-white border-b-2 border-white pb-2">JUN</span>
              <span className="opacity-30">JUL</span>
              <span className="opacity-30">AUG</span>
              <span className="opacity-30">SEP</span>
              <span className="opacity-30">OCT</span>
              <span className="opacity-30">NOV</span>
              <span className="opacity-30">DEC</span>
            </div>
            <div className="grid md:grid-cols-2 gap-24 py-12">
              <div>
                <h4 className="font-label text-[10px] tracking-[0.4em] uppercase opacity-40 mb-8">GETTING THERE</h4>
                <div className="space-y-8 font-body text-lg">
                  <p className="opacity-80">Yosemite is accessible via four main entrances: Hwy 41 (Wawona), Hwy 140 (Arch Rock), Hwy 120 (Big Oak Flat), and Hwy 120 East (Tioga Pass - seasonal).</p>
                  <div className="space-y-4">
                    <div className="flex justify-between border-b border-white/10 pb-4">
                      <span>From San Francisco</span>
                      <span className="font-label text-sm opacity-50">4.5 HOURS</span>
                    </div>
                    <div className="flex justify-between border-b border-white/10 pb-4">
                      <span>From Los Angeles</span>
                      <span className="font-label text-sm opacity-50">6 HOURS</span>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-label text-[10px] tracking-[0.4em] uppercase opacity-40 mb-8">NEED TO KNOW</h4>
                <ul className="space-y-6 font-body text-lg opacity-80">
                  <li className="flex items-start gap-4">
                    <span className="material-symbols-outlined text-sm mt-1">confirmation_number</span>
                    Reservations may be required for entry during peak hours. Check the official NPS site for current mandates.
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="material-symbols-outlined text-sm mt-1">restaurant</span>
                    Store all food in bear-proof lockers. Never leave food or scented items in your vehicle.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 8: Gallery */}
        <section className="py-32 px-4" id="gallery">
          <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
            <img className="w-full object-cover" alt="Gallery item" src="https://lh3.googleusercontent.com/aida-public/AB6AXuALVDZo18NcA6IOqyttncTNCbIbMrQ7wUjV37jHjbebeGNvCYToBiK4wvNyrji6d-6H0JbGyRpaWeSlH84zYXF3ochEJhU_T52dpsOAloLyWrMp4rfFaw7mCIX0btRaAD8ZDSPW-3tR3EQjidaPktm2jekwMpRqSGO4_fwoTPhjoT0SMKq6ljH9h5y92tUXmIYLaGnkfaXFQwIm-FbgX9aPgjdb7LyzpjeeSPikSZGO5owNq-qqV2eAXJZrqcr4yFkCLWyMCZGvDm4" />
            <img className="w-full object-cover" alt="Gallery item" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB-fok0Cc0C2zxyY2pCASvJRye69O20HfRUaE_sXhzGtVNVvCmj_GtmOQgz9D74thrJm6r5fGkixgYddt0SPZMgrf8mYWUfzDGAnaCqG6Z5Zz8k_C3mvlXy8zLlJb9adwUFAlNp_9ZA1tQqsISMQQAFRFidPHxwvDWh-SOPp0xU3fp9Wi4Hxft5iGU8HZmnvRVhkj4T0WCbPvltkBLgIPvYrRVUPJikBhm91xnFIJYPLbmTON2kvDlLCp6X3r5DTSrfRNWwGQMnU7o" />
            <img className="w-full object-cover" alt="Gallery item" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB5wn9UCLlDkG6-Npz5hd_Z3YbBWTyEf_f9wKQ_QNlaKrwLtXzwPr7YOOwhnRigDnYdGdTDDpDk-AXQy2bDB6DFfOmcZQiWETgGWKT4v4HJgmcUkttSbjR_ezRb-b7uDJAuMbj7U_1pBjgMs8ZkqlaoZkQHe_yLtPu5HmmRaSAFjMQssnxV3DcJSbqIJTx5hmoU_MIVjSgwVEhQ10bg-GaN9hzwhSuUbt1TnEQC05ob37P7R1ZctNygnA_Mj9D8cbiMAm0JSzW5Hvo" />
            <img className="w-full object-cover" alt="Gallery item" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDYtz1EyfrboG90lnoONS7-8ELtf-39YLdhw_Mout3ppKSf-LbNR5hq76Ybx36l38Mmm0qoaxSDH9nEoWSewMFc6qZ5vZzmm12iwmI48QPvI5ekvU1mHPU_fPs33r4sXcF9iRADEiNSRsO9vRRY_m0SvAuazQPPh6Ko0LIA1v8P59X8Ncvv1xTOorBz2pEKb3B6_y3MZpDxE_N0RDAzq49SEUWYLY9cM93wPI5Jh6yFQk87eF2z_hNHaljCSD7OgyY8SKiYNI098ac" />
            <img className="w-full object-cover" alt="Gallery item" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDtOZemOsEnxe5dduroVemVzx42y7jSnZzX9h9jqQ_bPEDU1h7ll1WJV5RKiGDdh4jNux_AZ4TpUNEGwemlk0cqZ8KhGG5mKjwtZOSBm65FhNovh93_ZOgv7ejh2L9kJhTIRwQQ8OdBktLAmXTBgQbwKJKYXkqW-lxDZiQZgTRRayj2YTP5QZvllrci2xmDlqfJ64kjkE9aFisAh6Drw7Z3zTSqtJWMk5zjDCwcG1nhDncV1hLiM9J3iSROkdvQBWCAqVJPGZ1Eoz0" />
            <img className="w-full object-cover" alt="Gallery item" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBOAqY6jQK0ICo6p9MDsI-Etuhz0n92Cl-Zb57IOwDIXBJXGvWFMSDhNjs41-TUYkA-XN6YgLpICjsS6eCGwkGy8fGUXMWXPui4XUwjpzaXxpsY_IPU0Yta2wyV0Z0wHUi6c4aBHV5bA6Loef_aPWrnm_t2HvxTRDhOTR6jbq_66uw2pybyn5_sOBDMhvMnsGoGCcUzlhq_McpK2vPbzxuhlubHZJVmftStVkSh_I9_4kBL6XEQ2Od7YLExfMWWcrHcWdMStTcuYKY" />
          </div>
        </section>

        {/* Section 9: Bottom Transition */}
        <section className="bg-[#080808] text-white py-48 px-8 text-center relative overflow-hidden">
          <img className="absolute inset-0 w-full h-full object-cover opacity-20 grayscale" alt="Sequoia trees" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBdlnI8DcAPdxy6LskH1kUckO4YdEg-Dz8y6zgyXzYPYg7hkazQLrnp4MyoxZ9kawnbaB0dqcrG2uPIbosS3fJsDvsFkhKrY-HLP6nLB2cGuQIgrcxvyCKzPYcP0LaI2jdaLT88pak55-BwYCMUD2qERQzkQHbGoy1he0wq17AkJnm8tpTRwZRD-5J-3Or26-K3WgpbfjhxC7ywyIz0JvHL5X06dZEdRu64Xx--rKX2WP4pkS4GR0DmXy4wne9GV2RwuNGWh7dsO6Y" />
          <div className="relative z-10">
            <p className="font-label text-[10px] tracking-[0.5em] uppercase opacity-40 mb-12">NEXT ON THE ROAD</p>
            <h2 className="font-headline italic text-6xl md:text-8xl mb-16">Sequoia National Park</h2>
            <a className="inline-flex items-center gap-6 font-label text-xs tracking-[0.3em] uppercase group" href="#">
              <span>Continue the Journey</span>
              <span className="material-symbols-outlined text-lg group-hover:translate-x-4 transition-transform">arrow_forward</span>
            </a>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="bg-transparent w-full mb-24 px-12 pt-64">
        <div className="flex justify-between items-center w-full max-w-screen-2xl mx-auto border-t border-primary/5 pt-12">
          <p className="font-label text-[9px] tracking-widest uppercase text-black/30">© NATIONAL PARK SERVICE ARCHIVE</p>
          <div className="flex gap-12">
            <a className="font-label text-[9px] tracking-widest uppercase text-black/30 hover:text-primary transition-colors underline underline-offset-4" href="#">Privacy</a>
            <a className="font-label text-[9px] tracking-widest uppercase text-black/30 hover:text-primary transition-colors underline underline-offset-4" href="#">Terms</a>
            <a className="font-label text-[9px] tracking-widest uppercase text-black/30 hover:text-primary transition-colors underline underline-offset-4" href="#">Legal</a>
          </div>
        </div>
      </footer>

      {/* Bottom Nav Bar */}
      <nav className="fixed bottom-0 w-full z-50 flex justify-around items-center px-12 pb-8 pt-4 bg-white/90 backdrop-blur-md border-t border-black/5">
        <a className="flex flex-col items-center justify-center text-black/40 pt-2 hover:text-black transition-colors duration-300" href="#">
          <span className="material-symbols-outlined mb-1">explore</span>
          <span className="font-label uppercase tracking-[0.1em] text-[10px]">Expeditions</span>
        </a>
        <a className="flex flex-col items-center justify-center text-black border-t-2 border-black pt-2" href="#">
          <span className="material-symbols-outlined mb-1">history_edu</span>
          <span className="font-label uppercase tracking-[0.1em] text-[10px]">Archives</span>
        </a>
        <a className="flex flex-col items-center justify-center text-black/40 pt-2 hover:text-black transition-colors duration-300" href="#">
          <span className="material-symbols-outlined mb-1">map</span>
          <span className="font-label uppercase tracking-[0.1em] text-[10px]">Map</span>
        </a>
        <a className="flex flex-col items-center justify-center text-black/40 pt-2 hover:text-black transition-colors duration-300" href="#">
          <span className="material-symbols-outlined mb-1">person</span>
          <span className="font-label uppercase tracking-[0.1em] text-[10px]">Profile</span>
        </a>
      </nav>
    </div>
  );
}
