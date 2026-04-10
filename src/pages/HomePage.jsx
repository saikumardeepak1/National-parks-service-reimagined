import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

const B = import.meta.env.BASE_URL;

export default function HomePage() {
  const navigate = useNavigate();

  const handleMouseEnter = (e) => {
    const video = e.currentTarget.querySelector('video');
    if (video) {
      video.play().catch(err => console.log('Autoplay prevented:', err));
    }
  };

  const handleMouseLeave = (e) => {
    const video = e.currentTarget.querySelector('video');
    if (video) {
      video.pause();
    }
  };

  const goToPark = (id) => navigate(`/park/${id}`);

  return (
    <div className="bg-[#FFFFFF] text-[#1A1A1A] h-screen w-screen overflow-hidden font-body selection:bg-surface-container-highest opacity-0 animate-[fadeIn_1.5s_ease-out_forwards] flex flex-col">
      <style>{`@keyframes fadeIn { to { opacity: 1; } }`}</style>

      {/* Hero Background — no overlay, full photo */}
      <div
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: `url(${B}assets/home-bg.jpg)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
        }}
      />

      <div className="fixed inset-0 z-[100] grain-overlay" />

      {/* Top Nav — stacked on mobile, horizontal on desktop */}
      <nav className="sticky top-0 z-[60] w-full bg-[#FAF8F4]/92 backdrop-blur-md border-b border-black/8
        flex flex-col items-center py-2 px-4
        md:flex-row md:justify-between md:px-8 md:py-3">

        {/* Mobile: logo + title stacked and centered */}
        <div className="flex flex-col items-center w-full md:hidden">
          <Link to="/home" className="hover:opacity-70 transition-opacity mb-1">
            <img alt="NPS Logo" className="w-10 h-auto drop-shadow-lg" src={`${B}assets/nps-logo-official.svg`} />
          </Link>
          <h1
            className="font-headline font-bold uppercase leading-none text-[#1A1A1A] text-center whitespace-nowrap"
            style={{ fontSize: 'clamp(0.9rem, 4.8vw, 1.4rem)', letterSpacing: '0.12em', fontFamily: "'Playfair Display', serif" }}
          >
            National Park Service
          </h1>
          <div className="mt-[3px] space-y-[2px] w-full">
            <div className="h-[1.5px] bg-[#1A1A1A]/20" />
            <div className="h-[0.5px] bg-[#1A1A1A]/12" />
          </div>
        </div>

        {/* Desktop: logo left, masthead center, spacer right */}
        <Link to="/home" className="hover:opacity-70 transition-opacity shrink-0 hidden md:block">
          <img alt="NPS Logo" className="w-16 h-auto drop-shadow-lg" src={`${B}assets/nps-logo-official.svg`} />
        </Link>
        <div className="hidden md:flex flex-1 flex-col items-center select-none px-4">
          <div className="flex items-center w-full gap-2 mb-[3px]">
            <div className="flex-1 h-[1.5px] bg-[#1A1A1A]/20" />
            <span className="font-label text-[7px] tracking-[0.5em] uppercase text-black/30">Est. MCMXVI</span>
            <div className="flex-1 h-[1.5px] bg-[#1A1A1A]/20" />
          </div>
          <div className="flex items-center gap-3">
            <span className="text-black/20 text-[11px] leading-none">◆</span>
            <h1
              className="font-headline font-bold uppercase leading-none text-[#1A1A1A]"
              style={{ fontSize: 'clamp(1.25rem, 2.2vw, 1.85rem)', letterSpacing: '0.12em', fontFamily: "'Playfair Display', serif" }}
            >
              National Park Service
            </h1>
            <span className="text-black/20 text-[11px] leading-none">◆</span>
          </div>
          <div className="w-full mt-[3px] space-y-[2px]">
            <div className="h-[2px] bg-[#1A1A1A]/25" />
            <div className="h-[0.5px] bg-[#1A1A1A]/15" />
          </div>
          <p className="font-label text-[7px] tracking-[0.25em] uppercase text-black/30 mt-[3px] whitespace-nowrap">
            Archive · All 63 Parks · United States of America
          </p>
        </div>
        <div className="w-16 shrink-0 hidden md:block" />
      </nav>

      {/* Main Content Canvas */}
      <main className="flex-1 w-full flex flex-col justify-end md:justify-center items-center md:px-11 pb-24 md:pb-20 pt-2 md:pt-4 relative" style={{ minHeight: 0 }}>
        <div className="flex flex-col items-center justify-center w-full">
          {/* Scroll hint — mobile only */}
          <p className="md:hidden font-label text-[8px] tracking-[0.3em] uppercase text-black/30 mb-2 flex items-center gap-2">
            <span>Swipe to explore</span>
            <span>→</span>
          </p>
          <div className="w-full max-w-[1380px] h-[54vh] md:h-[580px] flex gap-3 items-stretch panel-container">
            
            {/* Panel 1: Yosemite */}
            <div className="panel-item bg-stone-100 cursor-pointer group" onClick={() => goToPark(62)} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
              <img className="photo-bg absolute inset-0 w-full h-full object-cover" alt="Yosemite" src={`${B}parks/Yosemite%20Photo.jpg`} />
              <video loop muted playsInline className="absolute inset-0 w-full h-full object-cover pointer-events-none">
                <source src="https://github.com/saikumardeepak1/National-parks-service-reimagined/releases/download/assets-v1/Yosemite.video.mp4" type="video/mp4" />
              </video>
              <div className="info-box absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/60 to-transparent text-white">
                <span className="font-label text-[10px] tracking-widest uppercase opacity-80">CALIFORNIA</span>
                <h3 className="font-headline text-2xl mt-1">Yosemite</h3>
              </div>
            </div>

            {/* Panel 2: Glacier */}
            <div className="panel-item bg-stone-100 cursor-pointer group" onClick={() => goToPark(22)} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
              <img className="photo-bg absolute inset-0 w-full h-full object-cover" alt="Glacier" src={`${B}parks/Glacier%20Photo.jpg`} />
              <video loop muted playsInline className="absolute inset-0 w-full h-full object-cover pointer-events-none">
                <source src="https://github.com/saikumardeepak1/National-parks-service-reimagined/releases/download/assets-v1/Glacier.Video.mp4" type="video/mp4" />
              </video>
              <div className="info-box absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/60 to-transparent text-white">
                <span className="font-label text-[10px] tracking-widest uppercase opacity-80">MONTANA</span>
                <h3 className="font-headline text-2xl mt-1">Glacier</h3>
              </div>
            </div>

            {/* Panel 3: Olympic */}
            <div className="panel-item bg-stone-100 cursor-pointer group" onClick={() => goToPark(47)} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
              <img className="photo-bg absolute inset-0 w-full h-full object-cover" alt="Olympic" src={`${B}parks/olympic%20national%20park.jpg`} />
              <video loop muted playsInline className="absolute inset-0 w-full h-full object-cover pointer-events-none">
                <source src="https://github.com/saikumardeepak1/National-parks-service-reimagined/releases/download/assets-v1/Olympic.video.mp4" type="video/mp4" />
              </video>
              <div className="info-box absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/60 to-transparent text-white">
                <span className="font-label text-[10px] tracking-widest uppercase opacity-80">WASHINGTON</span>
                <h3 className="font-headline text-2xl mt-1">Olympic</h3>
              </div>
            </div>

            {/* Panel 4: North Cascades */}
            <div className="panel-item bg-stone-100 cursor-pointer group" onClick={() => goToPark(46)} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
              <img className="photo-bg absolute inset-0 w-full h-full object-cover" alt="North Cascades" src={`${B}parks/North%20Cascades%20Photo.jpg`} />
              <video loop muted playsInline className="absolute inset-0 w-full h-full object-cover pointer-events-none">
                <source src="https://github.com/saikumardeepak1/National-parks-service-reimagined/releases/download/assets-v1/North.cascades.Video.mp4" type="video/mp4" />
              </video>
              <div className="info-box absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/60 to-transparent text-white">
                <span className="font-label text-[10px] tracking-widest uppercase opacity-80">WASHINGTON</span>
                <h3 className="font-headline text-2xl mt-1">North Cascades</h3>
              </div>
            </div>

            {/* Panel 5: Denali */}
            <div className="panel-item bg-stone-100 cursor-pointer group" onClick={() => goToPark(17)} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
              <img className="photo-bg absolute inset-0 w-full h-full object-cover" alt="Denali" src={`${B}parks/denali%20photo.jpg`} />
              <video loop muted playsInline className="absolute inset-0 w-full h-full object-cover pointer-events-none">
                <source src="https://github.com/saikumardeepak1/National-parks-service-reimagined/releases/download/assets-v1/Denali.Video.mp4" type="video/mp4" />
              </video>
              <div className="info-box absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/60 to-transparent text-white">
                <span className="font-label text-[10px] tracking-widest uppercase opacity-80">ALASKA</span>
                <h3 className="font-headline text-2xl mt-1">Denali</h3>
              </div>
            </div>

            {/* Panel 6: Zion */}
            <div className="panel-item bg-stone-100 cursor-pointer group" onClick={() => goToPark(63)} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
              <img className="photo-bg absolute inset-0 w-full h-full object-cover" alt="Zion" src={`${B}parks/Zion%20Photo.jpg`} />
              <video loop muted playsInline className="absolute inset-0 w-full h-full object-cover pointer-events-none">
                <source src="https://github.com/saikumardeepak1/National-parks-service-reimagined/releases/download/assets-v1/Zion.Video.mp4" type="video/mp4" />
              </video>
              <div className="info-box absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/60 to-transparent text-white">
                <span className="font-label text-[10px] tracking-widest uppercase opacity-80">UTAH</span>
                <h3 className="font-headline text-2xl mt-1">Zion</h3>
              </div>
            </div>

            {/* Panel 7: Grand Teton */}
            <div className="panel-item bg-stone-100 cursor-pointer group" onClick={() => goToPark(25)} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
              <img className="photo-bg absolute inset-0 w-full h-full object-cover" alt="Grand Teton" src={`${B}parks/grand%20teton%20photo.jpg`} />
              <video loop muted playsInline className="absolute inset-0 w-full h-full object-cover pointer-events-none">
                <source src="https://github.com/saikumardeepak1/National-parks-service-reimagined/releases/download/assets-v1/Grand.Teton.Video.mp4" type="video/mp4" />
              </video>
              <div className="info-box absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/60 to-transparent text-white">
                <span className="font-label text-[10px] tracking-widest uppercase opacity-80">WYOMING</span>
                <h3 className="font-headline text-2xl mt-1">Grand Teton</h3>
              </div>
            </div>

            {/* Panel 8: Yellowstone */}
            <div className="panel-item bg-stone-100 cursor-pointer group" onClick={() => goToPark(61)} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
              <img className="photo-bg absolute inset-0 w-full h-full object-cover" alt="Yellowstone" src={`${B}parks/Yellowstone%20photo.jpg`} />
              <video loop muted playsInline className="absolute inset-0 w-full h-full object-cover pointer-events-none">
                <source src="https://github.com/saikumardeepak1/National-parks-service-reimagined/releases/download/assets-v1/Yellow.stone.video.mp4" type="video/mp4" />
              </video>
              <div className="info-box absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/60 to-transparent text-white">
                <span className="font-label text-[10px] tracking-widest uppercase opacity-80">WYOMING</span>
                <h3 className="font-headline text-2xl mt-1">Yellowstone</h3>
              </div>
            </div>

            {/* Panel 9: Great Sand Dunes */}
            <div className="panel-item bg-stone-100 cursor-pointer group" onClick={() => goToPark(27)} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
              <img className="photo-bg absolute inset-0 w-full h-full object-cover" alt="Great Sand Dunes" src={`${B}parks/Great%20Sand%20Dunes%20photo.jpg`} />
              <video loop muted playsInline className="absolute inset-0 w-full h-full object-cover pointer-events-none">
                <source src="https://github.com/saikumardeepak1/National-parks-service-reimagined/releases/download/assets-v1/great.sand.sunes.video.mp4" type="video/mp4" />
              </video>
              <div className="info-box absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/60 to-transparent text-white">
                <span className="font-label text-[10px] tracking-widest uppercase opacity-80">COLORADO</span>
                <h3 className="font-headline text-2xl mt-1">Great Sand Dunes</h3>
              </div>
            </div>

            {/* Panel 10: Hawai'i Volcanoes */}
            <div className="panel-item bg-stone-100 cursor-pointer group" onClick={() => goToPark(31)} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
              <img className="photo-bg absolute inset-0 w-full h-full object-cover" alt="Hawai'i Volcanoes" src={`${B}parks/Volcanos%20photo.jpg`} />
              <video loop muted playsInline className="absolute inset-0 w-full h-full object-cover pointer-events-none">
                <source src="https://github.com/saikumardeepak1/National-parks-service-reimagined/releases/download/assets-v1/Volcanos.video.mp4" type="video/mp4" />
              </video>
              <div className="info-box absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/60 to-transparent text-white">
                <span className="font-label text-[10px] tracking-widest uppercase opacity-80">HAWAI'I</span>
                <h3 className="font-headline text-2xl mt-1">Hawai'i Volcanoes</h3>
              </div>
            </div>

          </div>
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 w-full z-50 flex justify-around items-center px-8 pb-6 pt-3 bg-white/92 backdrop-blur-md border-t border-black/6">
        <Link to="/parks" className="flex flex-col items-center gap-1 text-black/50 hover:text-black transition-colors group">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" /></svg>
          <span className="font-label text-[9px] tracking-[0.2em] uppercase">Parks</span>
        </Link>
        <Link to="/passes" className="flex flex-col items-center gap-1 text-black/50 hover:text-black transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 0 1 0 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 0 1 0-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375Z" /></svg>
          <span className="font-label text-[9px] tracking-[0.2em] uppercase">Passes</span>
        </Link>
        <Link to="/reservations" className="flex flex-col items-center gap-1 text-black/50 hover:text-black transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" /></svg>
          <span className="font-label text-[9px] tracking-[0.2em] uppercase">Reservations</span>
        </Link>
        <a href="#" className="flex flex-col items-center gap-1 text-black/50 hover:text-black transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 0 0-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0Z" /></svg>
          <span className="font-label text-[9px] tracking-[0.2em] uppercase">Trip Ideas</span>
        </a>
        <a href="#" className="flex flex-col items-center gap-1 text-black/50 hover:text-black transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" /></svg>
          <span className="font-label text-[9px] tracking-[0.2em] uppercase">More</span>
        </a>
      </nav>
    </div>
  );
}
