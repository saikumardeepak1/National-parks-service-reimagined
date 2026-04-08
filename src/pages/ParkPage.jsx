import React, { useEffect, useRef, useState } from 'react';
import { useParams, Link, useNavigate, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { parksData, regionWildlife } from '../data/parksData';
import ParkEmblem from '../components/ParkEmblem';
import { TextScramble } from '../components/ui/TextScramble';

// ── Reveal wrapper ─────────────────────────────────────────────────────────────
function Reveal({ children, delay = 0, className = '' }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -60px 0px' }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

// ── Wildlife flip card ─────────────────────────────────────────────────────────
function WildlifeCard({ animal }) {
  return (
    <div className="group perspective-1000 h-96">
      <div className="relative w-full h-full card-inner shadow-sm">
        {/* Front */}
        <div className="absolute inset-0 backface-hidden overflow-hidden">
          <img
            src={animal.image}
            alt={animal.name}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8 z-10">
            <p className="font-label text-[9px] tracking-widest uppercase text-white/60 mb-2">{animal.type}</p>
            <h4 className="font-headline text-2xl italic text-white">{animal.name}</h4>
            <p className="font-label text-[9px] tracking-widest uppercase text-white/30 mt-3">Hover to learn more</p>
          </div>
        </div>
        {/* Back */}
        <div
          className="absolute inset-0 backface-hidden rotate-y-180 text-white p-10 flex flex-col justify-end overflow-hidden"
        >
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${animal.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: 'brightness(0.35) saturate(0.6)',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
          <div className="relative z-10">
            <h4 className="font-headline text-xl mb-3 italic">{animal.tagline}</h4>
            <p className="font-body text-sm opacity-80 leading-relaxed">{animal.desc}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Difficulty badge color ─────────────────────────────────────────────────────
const difficultyColor = {
  Easy: 'bg-green-900/40 text-green-400 border-green-900',
  Moderate: 'bg-yellow-900/40 text-yellow-400 border-yellow-900',
  Hard: 'bg-orange-900/40 text-orange-400 border-orange-900',
  Strenuous: 'bg-red-900/40 text-red-400 border-red-900',
};

// ── Elevation bar mini-chart ───────────────────────────────────────────────────
function ElevBar({ difficulty }) {
  const bars = { Easy: [2, 2, 3, 2, 2], Moderate: [2, 4, 6, 5, 3], Hard: [3, 5, 8, 7, 5], Strenuous: [3, 6, 10, 9, 7] };
  const heights = bars[difficulty] || bars.Moderate;
  return (
    <div className="h-8 flex items-end gap-[3px] opacity-40">
      {heights.map((h, i) => (
        <div key={i} className="bg-current flex-1 rounded-sm" style={{ height: `${h * 3}px` }} />
      ))}
    </div>
  );
}

// ── Main component ─────────────────────────────────────────────────────────────
export default function ParkPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const park = parksData.find(p => p.id === parseInt(id));
  const heroVideoRef = useRef(null);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    window.scrollTo(0, 0);
    if (heroVideoRef.current) {
      heroVideoRef.current.play().catch(() => {});
    }
  }, [id]);

  if (!park) return <Navigate to="/parks" replace />;

  const wildlife = regionWildlife[park.region] || regionWildlife.rockies;
  const nextPark = parksData[park.id % parksData.length]; // wraps around
  const allMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const tabs = ['overview', 'wildlife', 'trails', 'planning', 'gallery'];

  return (
    <div className="bg-surface text-on-surface font-body selection:bg-primary/10 opacity-0 animate-[fadeIn_1.2s_ease-out_forwards]">
      <style>{`@keyframes fadeIn { to { opacity: 1; } }`}</style>
      <div className="grain-overlay" />

      {/* ── Sticky Nav ──────────────────────────────────────────────────────── */}
      <nav className="sticky top-0 z-[60] w-full bg-surface/92 backdrop-blur-xl px-8 py-4 flex justify-between items-center border-b border-outline-variant/10">
        <Link to="/home" className="hover:opacity-70 transition-opacity shrink-0">
          <img alt="NPS" className="w-16 h-auto drop-shadow-lg" src="/assets/nps-logo-official.svg" />
        </Link>
        <div className="absolute left-1/2 -translate-x-1/2">
          <h2 className="font-label text-[11px] md:text-xs tracking-[0.25em] uppercase hidden md:block font-medium">{park.name} National Park</h2>
        </div>
        <button
          onClick={() => navigate('/parks')}
          className="font-label text-[10px] tracking-widest flex items-center gap-2 hover:opacity-60 transition-opacity"
        >
          ← ALL PARKS
        </button>
      </nav>

      {/* ── Booking Sidebar ─────────────────────────────────────────────────── */}
      <aside className="fixed right-8 top-1/2 -translate-y-1/2 z-50 hidden xl:flex flex-col gap-6 w-48 p-6 bg-[#0d1a0f] text-white">
        <div className="space-y-1">
          <p className="font-label text-[8px] tracking-widest opacity-50 uppercase">Entrance Fee</p>
          <p className="font-headline text-2xl italic">${park.fee}.00</p>
          <p className="font-label text-[9px] opacity-70">Per private vehicle</p>
        </div>
        <div className="h-[1px] bg-white/10 w-full" />
        <a className="font-label text-[10px] tracking-[0.2em] uppercase border border-white py-3 text-center hover:bg-white hover:text-[#0d1a0f] transition-all" href="#">
          Book Now
        </a>
        <a className="font-label text-[10px] tracking-[0.2em] uppercase flex items-center justify-center gap-2 opacity-60 hover:opacity-100 transition-opacity" href="#">
          ↗ Directions
        </a>
      </aside>

      <main className="relative">

        {/* ── Hero ──────────────────────────────────────────────────────────── */}
        <section className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden">
          {/* Video hero */}
          {park.heroVideo ? (
            <>
              <img
                src={park.heroPhoto}
                alt={park.name}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <video
                ref={heroVideoRef}
                loop muted playsInline
                className="absolute inset-0 w-full h-full object-cover"
              >
                <source src={park.heroVideo} type="video/mp4" />
              </video>
            </>
          ) : (
            <img
              src={park.heroPhoto}
              alt={park.name}
              className="absolute inset-0 w-full h-full object-cover"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/50" />

          <div className="relative z-10 text-center text-white space-y-5 px-4">
            <p className="font-label text-xs tracking-[0.4em] uppercase opacity-70">{park.state.toUpperCase()}, UNITED STATES</p>
            <TextScramble
              as="h1"
              duration={1.2}
              speed={0.03}
              characterSet="ABCDEFGHIJKLMNOPQRSTUVWXYZ"
              trigger={true}
              className="font-headline italic leading-none"
              style={{ fontSize: 'clamp(3rem, 12vw, 10rem)', fontFamily: "'Playfair Display', serif" }}
            >
              {park.name}
            </TextScramble>
            <p className="font-label text-[11px] tracking-[0.5em] uppercase opacity-50 mt-2">
              ESTABLISHED {park.established} · {park.area} ACRES
            </p>
          </div>

          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 animate-bounce">
            <span className="font-label text-[10px] tracking-[0.3em] text-white opacity-60">EXPLORE</span>
            <span className="text-white/60 text-xl">↓</span>
          </div>
        </section>

        {/* ── Conditions Bar ────────────────────────────────────────────────── */}
        <div className="bg-[#0d1a0f] text-white py-4 px-8 flex justify-between items-center font-label text-[10px] tracking-widest uppercase overflow-x-auto whitespace-nowrap gap-8">
          <div className="flex items-center gap-8">
            <span className="flex items-center gap-2">ENTRANCE FEE: <span className="text-white/70">${park.fee}/vehicle</span></span>
            <span className="flex items-center gap-2">AREA: <span className="text-white/70">{park.area} acres</span></span>
            <span className="flex items-center gap-2">ANNUAL VISITORS: <span className="text-white/70">{park.visitors}</span></span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            STATUS: PARK IS OPEN
          </div>
        </div>

        {/* ── Passport / Stats ──────────────────────────────────────────────── */}
        <section className="py-28 md:py-36 px-8 max-w-5xl mx-auto flex flex-col items-center text-center">
          <Reveal>
            <div className="flex flex-col items-center mb-12">
              <div className="w-44 drop-shadow-2xl">
                <ParkEmblem park={park} />
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h3 className="font-headline text-3xl md:text-4xl mb-8 max-w-2xl leading-snug">
              {park.description.split('.')[0]}.
            </h3>
          </Reveal>
          <Reveal delay={0.15} className="flex flex-wrap justify-center gap-12 md:gap-16 mb-16">
            <div className="text-center">
              <p className="font-label text-[10px] tracking-widest opacity-50 uppercase mb-2">Total Area</p>
              <p className="font-headline text-xl">{park.area} Acres</p>
            </div>
            <div className="text-center">
              <p className="font-label text-[10px] tracking-widest opacity-50 uppercase mb-2">Annual Visitors</p>
              <p className="font-headline text-xl">{park.visitors}</p>
            </div>
            <div className="text-center">
              <p className="font-label text-[10px] tracking-widest opacity-50 uppercase mb-2">Established</p>
              <p className="font-headline text-xl">{park.established}</p>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="font-body text-lg md:text-xl text-on-surface/75 leading-relaxed max-w-3xl first-letter:text-5xl first-letter:font-headline first-letter:float-left first-letter:mr-3 first-letter:leading-none first-letter:mt-1">
              {park.description}
            </p>
          </Reveal>
        </section>

        {/* ── Chapter Tabs ──────────────────────────────────────────────────── */}
        <div className="sticky top-[64px] z-40 bg-surface/95 backdrop-blur-md border-y border-outline-variant/10">
          <div className="max-w-screen-xl mx-auto px-8 flex justify-center gap-8 md:gap-10 py-5 overflow-x-auto">
            {tabs.map(tab => (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  document.getElementById(tab)?.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`font-label text-[11px] tracking-[0.2em] uppercase transition-colors pb-1 whitespace-nowrap ${
                  activeTab === tab
                    ? 'text-primary border-b border-primary'
                    : 'text-on-surface/45 hover:text-primary'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* ── Overview ──────────────────────────────────────────────────────── */}
        <section className="grid md:grid-cols-2 gap-0" id="overview">
          <div className="h-[600px] md:h-[780px] overflow-hidden">
            <img
              className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-1000"
              alt={park.name}
              src={park.image}
            />
          </div>
          <div className="bg-surface-container-low p-12 md:p-20 flex flex-col justify-center">
            <p className="font-label text-[10px] tracking-[0.4em] uppercase mb-10 opacity-55">Why Visit</p>
            <h2 className="font-headline text-3xl md:text-5xl mb-10 leading-snug">
              Why the Curator Recommends {park.name}
            </h2>
            <ul className="space-y-8 font-body text-lg md:text-xl text-on-surface/80">
              {park.highlights.map((h, i) => (
                <li key={i} className="flex gap-6">
                  <span className="font-headline italic text-primary/30 shrink-0">0{i + 1}</span>
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── Wildlife ──────────────────────────────────────────────────────── */}
        <section className="py-28 md:py-36 px-8 bg-surface-container-highest/30" id="wildlife">
          <div className="max-w-screen-xl mx-auto">
            <Reveal className="flex items-baseline gap-4 mb-16">
              <h2 className="font-headline text-4xl italic">Wildlife</h2>
              <span className="font-label text-[10px] tracking-[0.4em] uppercase opacity-50">The Park's Inhabitants</span>
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {wildlife.map((animal, i) => (
                <Reveal key={i} delay={i * 0.08}>
                  <WildlifeCard animal={animal} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── Trails ────────────────────────────────────────────────────────── */}
        <section className="py-28 md:py-36 px-8" id="trails">
          <div className="max-w-screen-xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-16">
              <div className="lg:w-1/2">
                <Reveal>
                  <h2 className="font-headline text-4xl md:text-5xl mb-8 leading-snug">Iconic Trails</h2>
                  <p className="font-body text-lg md:text-xl text-on-surface/65 mb-12 leading-relaxed">
                    These routes define the {park.name} experience — from accessible valley walks to demanding alpine ascents.
                  </p>
                </Reveal>
                <div className="space-y-6">
                  {park.trails.map((trail, i) => (
                    <Reveal key={i} delay={i * 0.1}>
                      <div className="group p-8 bg-surface-container-low hover:bg-primary hover:text-white transition-all cursor-pointer">
                        <div className="flex justify-between items-start mb-4">
                          <h4 className="font-headline text-2xl italic">{trail.name}</h4>
                          <span className={`font-label text-[8px] border px-2 py-1 tracking-widest uppercase border-current ${difficultyColor[trail.difficulty] || ''} group-hover:bg-transparent group-hover:text-white group-hover:border-white`}>
                            {trail.difficulty}
                          </span>
                        </div>
                        <div className="flex gap-6 font-label text-[11px] tracking-widest opacity-60 mb-4">
                          <span>{trail.miles} MILES</span>
                          <span>{trail.gain} GAIN</span>
                        </div>
                        <div className="h-[1px] bg-current opacity-10 w-full mb-4" />
                        <ElevBar difficulty={trail.difficulty} />
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>

              <div className="lg:w-1/2 h-[500px] lg:h-auto bg-surface-container-highest relative overflow-hidden group">
                <img
                  className="w-full h-full object-cover opacity-70 grayscale group-hover:grayscale-0 group-hover:opacity-90 transition-all duration-1000"
                  alt={`${park.name} landscape`}
                  src={park.heroPhoto}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-10">
                  <div>
                    <p className="font-label text-[9px] tracking-[0.4em] uppercase text-white/50 mb-2">Park Landscape</p>
                    <p className="font-headline italic text-2xl text-white">{park.name}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Planning ──────────────────────────────────────────────────────── */}
        <section className="py-28 md:py-36 px-8 bg-[#0d1a0f] text-white" id="planning">
          <div className="max-w-screen-xl mx-auto">
            <Reveal>
              <h2 className="font-headline text-4xl italic mb-16 text-center">Seasonal Pacing</h2>
            </Reveal>

            {/* Month bar */}
            <Reveal>
              <div className="flex items-center justify-between font-label text-[9px] tracking-widest uppercase border-y border-white/10 py-6 mb-16">
                {allMonths.map(m => {
                  const isGood = park.bestMonths.includes(m);
                  return (
                    <div key={m} className="flex flex-col items-center gap-2">
                      <div className={`w-1.5 h-6 rounded-full transition-all ${isGood ? 'bg-[#c4a46b]' : 'bg-white/10'}`} />
                      <span className={isGood ? 'text-white' : 'text-white/20'}>{m}</span>
                    </div>
                  );
                })}
              </div>
            </Reveal>

            <div className="grid md:grid-cols-2 gap-24">
              <Reveal>
                <h4 className="font-label text-[10px] tracking-[0.4em] uppercase opacity-50 mb-8">BEST TIME TO VISIT</h4>
                <p className="font-body text-lg md:text-xl opacity-85 leading-relaxed">
                  Peak season runs through{' '}
                  <span className="text-[#c4a46b]">
                    {park.bestMonths.slice(0, 3).join(', ')}
                  </span>
                  {park.bestMonths.length > 3 ? ` and ${park.bestMonths[3]}` : ''}.
                  Shoulder seasons offer thinner crowds and dramatic light conditions. Winter brings solitude and a fundamentally different landscape.
                </p>
              </Reveal>
              <Reveal delay={0.1}>
                <h4 className="font-label text-[10px] tracking-[0.4em] uppercase opacity-50 mb-8">NEED TO KNOW</h4>
                <ul className="space-y-6 font-body text-lg md:text-xl opacity-85">
                  <li className="flex items-start gap-4">
                    <span className="shrink-0 mt-1 text-[#c4a46b]">◆</span>
                    Advance reservations may be required during peak season. Check nps.gov for current entry mandates.
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="shrink-0 mt-1 text-[#c4a46b]">◆</span>
                    Entrance fee is ${park.fee} per private vehicle. Annual America the Beautiful Pass covers entry to all national parks.
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="shrink-0 mt-1 text-[#c4a46b]">◆</span>
                    Leave No Trace principles are strictly observed. Pack out everything you carry in.
                  </li>
                </ul>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── Gallery ───────────────────────────────────────────────────────── */}
        <section className="py-28 md:py-36 px-4" id="gallery">
          <Reveal className="max-w-screen-2xl mx-auto px-4 mb-12">
            <div className="flex items-baseline gap-4">
              <h2 className="font-headline text-4xl italic">Gallery</h2>
              <span className="font-label text-[10px] tracking-[0.4em] uppercase opacity-50">The Landscape in Frame</span>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            <div className="col-span-2 h-[480px] overflow-hidden group/img">
              <img className="w-full h-full object-cover grayscale group-hover/img:grayscale-0 group-hover/img:scale-105 transition-all duration-700" src={park.heroPhoto} alt={park.name} />
            </div>
            <div className="flex flex-col gap-2">
              <div className="h-[235px] overflow-hidden group/img">
                <img className="w-full h-full object-cover object-top grayscale group-hover/img:grayscale-0 group-hover/img:scale-105 transition-all duration-700" src={park.image} alt={park.name} />
              </div>
              <div className="h-[235px] overflow-hidden group/img">
                <img className="w-full h-full object-cover object-bottom grayscale group-hover/img:grayscale-0 group-hover/img:scale-105 transition-all duration-700" src={park.heroPhoto} alt={park.name} style={{ objectPosition: '50% 70%' }} />
              </div>
            </div>
            <div className="h-[300px] overflow-hidden group/img">
              <img className="w-full h-full object-cover grayscale group-hover/img:grayscale-0 group-hover/img:scale-105 transition-all duration-700" src={park.image} alt={park.name} style={{ objectPosition: '50% 30%' }} />
            </div>
            <div className="h-[300px] overflow-hidden group/img">
              <img className="w-full h-full object-cover grayscale group-hover/img:grayscale-0 group-hover/img:scale-105 transition-all duration-700" src={park.heroPhoto} alt={park.name} style={{ objectPosition: '30% 60%' }} />
            </div>
            <div className="h-[300px] overflow-hidden group/img">
              <img className="w-full h-full object-cover grayscale group-hover/img:grayscale-0 group-hover/img:scale-105 transition-all duration-700" src={park.image} alt={park.name} style={{ objectPosition: '70% 50%' }} />
            </div>
          </div>
        </section>

        {/* ── Next Park ─────────────────────────────────────────────────────── */}
        <section className="bg-[#080808] text-white py-40 px-8 text-center relative overflow-hidden">
          <img
            className="absolute inset-0 w-full h-full object-cover opacity-20 grayscale"
            alt={nextPark.name}
            src={nextPark.heroPhoto}
          />
          <div className="relative z-10">
            <p className="font-label text-[10px] tracking-[0.5em] uppercase opacity-40 mb-10">NEXT ON THE ROAD</p>
            <h2
              className="font-headline italic mb-14"
              style={{ fontSize: 'clamp(2.5rem, 8vw, 6rem)', fontFamily: "'Playfair Display', serif" }}
            >
              {nextPark.name} National Park
            </h2>
            <button
              onClick={() => navigate(`/park/${nextPark.id}`)}
              className="inline-flex items-center gap-6 font-label text-xs tracking-[0.3em] uppercase group hover:opacity-70 transition-opacity"
            >
              <span>Continue the Journey</span>
              <span className="group-hover:translate-x-4 transition-transform inline-block">→</span>
            </button>
          </div>
        </section>

      </main>

      {/* ── Footer ────────────────────────────────────────────────────────────── */}
      <footer className="bg-transparent w-full px-12 pt-24 pb-32">
        <div className="flex justify-between items-center w-full max-w-screen-2xl mx-auto border-t border-primary/5 pt-12">
          <p className="font-label text-[9px] tracking-widest uppercase text-black/30">© NATIONAL PARK SERVICE ARCHIVE</p>
          <div className="flex gap-12">
            <Link className="font-label text-[9px] tracking-widest uppercase text-black/30 hover:text-primary transition-colors underline underline-offset-4" to="/parks">All Parks</Link>
            <Link className="font-label text-[9px] tracking-widest uppercase text-black/30 hover:text-primary transition-colors underline underline-offset-4" to="/home">Home</Link>
          </div>
        </div>
      </footer>

      {/* ── Bottom Nav ────────────────────────────────────────────────────────── */}
      <div className="fixed bottom-0 w-full z-50 group/nav">
        {/* Invisible hover trigger zone */}
        <div className="absolute bottom-0 w-full h-24 cursor-default" />
        {/* Gradient fade + nav — hidden until hover */}
        <div className="translate-y-full group-hover/nav:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
          <div className="w-full h-12 bg-gradient-to-t from-white/90 to-transparent pointer-events-none" />
          <nav className="flex justify-around items-center px-12 pb-8 pt-4 bg-white/90 backdrop-blur-md border-t border-black/5">
            <Link className="flex flex-col items-center justify-center text-black/40 pt-2 hover:text-black transition-colors" to="/parks">
              <span className="text-xl mb-1">⊞</span>
              <span className="font-label uppercase tracking-[0.1em] text-[10px]">All Parks</span>
            </Link>
            <Link className="flex flex-col items-center justify-center text-black border-t-2 border-black pt-2" to={`/park/${park.id}`}>
              <span className="text-xl mb-1">◈</span>
              <span className="font-label uppercase tracking-[0.1em] text-[10px]">This Park</span>
            </Link>
            <Link className="flex flex-col items-center justify-center text-black/40 pt-2 hover:text-black transition-colors" to="/home">
              <span className="text-xl mb-1">⌂</span>
              <span className="font-label uppercase tracking-[0.1em] text-[10px]">Home</span>
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
}
