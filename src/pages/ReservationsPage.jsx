import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { TextScramble } from '../components/ui/TextScramble';
import { parksData } from '../data/parksData';

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

// Parks requiring timed-entry or advance reservations (real data)
const timedEntryParks = [
  { id: 3, name: 'Arches', season: 'Apr 1 – Oct 31', type: 'Timed Entry', note: 'Required for daytime vehicle entry. Reserve at recreation.gov up to 3 months in advance.', slots: 'Very High Demand' },
  { id: 1, name: 'Acadia', season: 'May 25 – Oct 22', type: 'Vehicle Reservation', note: 'Cadillac Summit Road reservation required. Ocean Drive may require reservation.', slots: 'High Demand' },
  { id: 22, name: 'Glacier', season: 'May 24 – Sep 8', type: 'Vehicle Reservation', note: 'Going-to-the-Sun Road vehicle reservation required for entry between 6am–3pm.', slots: 'Very High Demand' },
  { id: 30, name: 'Haleakalā', season: 'Year-round', type: 'Sunrise Reservation', note: 'Reservation required for sunrise viewing (3am–7am). Limited to 150 vehicles per morning.', slots: 'Very High Demand' },
  { id: 51, name: 'Rocky Mountain', season: 'May 24 – Oct 14', type: 'Timed Entry', note: 'Required for Bear Lake Road Corridor. Park-wide timed entry during peak season.', slots: 'High Demand' },
  { id: 63, name: 'Zion', season: 'Mar – Nov', type: 'Shuttle Required', note: 'Private vehicles prohibited in Zion Canyon during shuttle season. Shuttle is free with park entry.', slots: 'Moderate' },
  { id: 62, name: 'Yosemite', season: 'Apr – Oct', type: 'Peak Day Reservation', note: 'Day-use reservations may be required on peak weekends and holidays. Half Dome permits required separately.', slots: 'Very High Demand' },
  { id: 24, name: 'Grand Canyon', season: 'Year-round for rim-to-rim', type: 'Backcountry Permit', note: 'Backcountry permits required for all overnight below-rim camping. Phantom Ranch lottery in advance.', slots: 'High Demand' },
];

const reservationTypes = [
  {
    title: 'Timed Entry Permits',
    icon: '◷',
    description: 'Some of the most popular parks now require advance timed-entry reservations during peak season to manage visitation and protect the visitor experience. Reservations are typically released on a rolling 30-day or seasonal window.',
    steps: [
      'Check if your destination park requires a reservation at nps.gov',
      'Create an account at recreation.gov',
      'Reserve your timed-entry window (morning or afternoon slots)',
      'Download or print your permit — have it ready at the entrance gate',
    ],
    tip: 'Set a calendar reminder for when reservations open. Popular parks like Arches and Glacier sell out within minutes of release.',
  },
  {
    title: 'Campground Reservations',
    icon: '△',
    description: 'Most developed campgrounds in popular national parks are reservable through recreation.gov. Sites open on a rolling 6-month window and sell out rapidly for summer dates. A handful of campgrounds remain first-come, first-served.',
    steps: [
      'Search your park and desired dates at recreation.gov',
      'Filter by campground, site type (tent, RV, group), and amenities',
      'Reserve your specific site — review site photos and terrain details',
      'Check in at the campground registration board upon arrival',
    ],
    tip: 'Weekday stays and shoulder season dates (May, September) are significantly easier to book than summer weekends. Cancellations often appear 1–2 days before the date.',
  },
  {
    title: 'Wilderness & Backcountry Permits',
    icon: '◇',
    description: 'Overnight backcountry camping requires a wilderness permit in most national parks. Some popular areas use a lottery system months in advance, while others offer walk-up permits on a first-come basis.',
    steps: [
      'Research your route and check the park\'s backcountry permit system',
      'Apply through the park\'s lottery if applicable (typically opens in spring)',
      'If walk-up permits are available, arrive at the wilderness office early on your start date',
      'Attend a mandatory orientation if required and pick up your bear canister',
    ],
    tip: 'Half Dome in Yosemite, the Wonderland Trail at Rainier, and the Enchantments in the Cascades are among the most competitive lottery permits in the system.',
  },
  {
    title: 'Special Activity Permits',
    icon: '✦',
    description: 'Commercial filming, large group events, scientific research, weddings, and certain guided activities require special use permits. Some parks also require permits for specific activities like rock climbing, river floating, or cave tours.',
    steps: [
      'Contact the park\'s permit office or visit the park website for application forms',
      'Submit your application at least 2–4 weeks in advance (longer for commercial use)',
      'Pay applicable fees and provide proof of insurance if required',
      'Comply with all permit conditions including group size limits and location restrictions',
    ],
    tip: 'Cave tours at Carlsbad Caverns and Mammoth Cave, river permits on the Colorado through Grand Canyon, and climbing permits for Denali all require advance booking.',
  },
];

// Monthly demand visualization data
const monthlyDemand = [
  { month: 'Jan', level: 1 },
  { month: 'Feb', level: 1 },
  { month: 'Mar', level: 3 },
  { month: 'Apr', level: 5 },
  { month: 'May', level: 7 },
  { month: 'Jun', level: 9 },
  { month: 'Jul', level: 10 },
  { month: 'Aug', level: 9 },
  { month: 'Sep', level: 7 },
  { month: 'Oct', level: 5 },
  { month: 'Nov', level: 2 },
  { month: 'Dec', level: 1 },
];

const planningTips = [
  {
    title: 'Book 6 Months Ahead',
    desc: 'Popular campgrounds release sites on a rolling 6-month window. Mark your calendar for 7:00 AM ET on your booking day.',
  },
  {
    title: 'Consider Shoulder Season',
    desc: 'May and September offer mild weather, thinner crowds, and dramatically easier booking. Wildflowers in spring, golden light in fall.',
  },
  {
    title: 'Have a Backup Plan',
    desc: 'If your first-choice campground is full, nearby national forests and BLM land often have beautiful, less-competitive sites within a short drive.',
  },
  {
    title: 'Check Cancellations',
    desc: 'Cancellations frequently appear 1–3 days before the stay date. Check recreation.gov daily for last-minute availability.',
  },
  {
    title: 'Weekdays Over Weekends',
    desc: 'Arriving Sunday–Thursday dramatically increases availability. Many parks are half-empty midweek even at peak season.',
  },
  {
    title: 'Download Offline Maps',
    desc: 'Cell service is unreliable in most parks. Download park maps, trail guides, and your reservation confirmation before you arrive.',
  },
];

export default function ReservationsPage() {
  const navigate = useNavigate();
  const [activeType, setActiveType] = useState(0);

  return (
    <div className="bg-surface text-on-surface font-body selection:bg-primary/10 opacity-0 animate-[fadeIn_1.2s_ease-out_forwards]">
      <style>{`@keyframes fadeIn { to { opacity: 1; } }`}</style>
      <div className="grain-overlay" />

      {/* Nav */}
      <nav className="sticky top-0 z-[60] w-full bg-surface/90 backdrop-blur-md px-8 py-4 flex justify-between items-center border-b border-outline-variant/10">
        <Link to="/home" className="hover:opacity-70 transition-opacity shrink-0">
          <img alt="NPS" className="w-16 h-auto drop-shadow-lg" src={`${import.meta.env.BASE_URL}assets/nps-logo-official.svg`} />
        </Link>
        <div className="absolute left-1/2 -translate-x-1/2">
          <h2 className="font-headline text-lg tracking-widest uppercase hidden md:block">Reservations</h2>
        </div>
        <Link
          to="/home"
          className="font-label text-[10px] tracking-widest flex items-center gap-2 hover:opacity-60 transition-opacity"
        >
          ← HOME
        </Link>
      </nav>

      <main className="relative">

        {/* Hero */}
        <section className="relative h-[70vh] w-full flex flex-col items-center justify-center overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=1800&q=80"
            alt="Camping in national park"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/70" />
          <div className="relative z-10 text-center text-white px-4">
            <TextScramble
              as="h1"
              duration={1.0}
              speed={0.03}
              characterSet="ABCDEFGHIJKLMNOPQRSTUVWXYZ"
              className="font-headline italic leading-none"
              style={{ fontSize: 'clamp(3rem, 10vw, 8rem)', fontFamily: "'Playfair Display', serif" }}
            >
              Reservations
            </TextScramble>
          </div>
        </section>

        {/* Demand Overview */}
        <section className="py-28 md:py-36">
          <div className="max-w-3xl mx-auto px-8 text-center">
            <Reveal className="w-full">
              <p className="font-label text-[10px] tracking-[0.4em] uppercase opacity-40 mb-8 max-w-none">WHY RESERVATIONS MATTER</p>
            </Reveal>
            <Reveal delay={0.1} className="w-full">
              <h2 className="font-headline text-4xl md:text-5xl mb-10 leading-tight">
                312 million visits per year. Planning ahead is no longer optional.
              </h2>
            </Reveal>
            <Reveal delay={0.15} className="w-full">
              <p className="font-body text-xl text-on-surface/75 leading-relaxed mb-16">
                National park visitation has surged 60% since 2000. To protect both the parks and the visitor experience, an increasing number of parks now require advance reservations during peak season. Here is when demand is highest.
              </p>
            </Reveal>

            {/* Monthly demand chart */}
            <Reveal delay={0.2} className="w-full">
              <div className="flex items-end gap-2 w-full" style={{ height: '200px' }}>
                {monthlyDemand.map((m, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center justify-end h-full">
                    <motion.div
                      className="w-full rounded-sm"
                      style={{
                        backgroundColor: m.level >= 8 ? '#8b6d2e' : m.level >= 5 ? '#c4a46b' : '#d4c4a0',
                      }}
                      initial={{ height: 0 }}
                      whileInView={{ height: m.level * 17 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                    />
                    <span className={`font-label text-[9px] tracking-widest mt-3 ${m.level >= 8 ? 'text-[#8b6d2e]' : 'text-on-surface/50'}`}>
                      {m.month}
                    </span>
                  </div>
                ))}
              </div>
              <p className="font-label text-[9px] tracking-[0.3em] uppercase text-on-surface/40 mt-4 text-center max-w-none">
                SYSTEM-WIDE RESERVATION DEMAND BY MONTH
              </p>
            </Reveal>
          </div>
        </section>

        {/* Parks Requiring Reservations */}
        <section className="bg-[#0d1a0f] text-white py-28 md:py-36 px-8">
          <div className="max-w-screen-xl mx-auto">
            <Reveal>
              <h2 className="font-headline text-4xl italic mb-4 text-center">Parks Requiring Advance Reservations</h2>
              <p className="font-label text-[10px] tracking-[0.4em] uppercase text-white/30 text-center mb-16">2025 SEASON</p>
            </Reveal>

            <div className="grid gap-4">
              {timedEntryParks.map((park, i) => {
                const parkData = parksData.find(p => p.id === park.id);
                return (
                  <Reveal key={park.id} delay={i * 0.05}>
                    <div
                      className="group grid grid-cols-[1fr_auto] md:grid-cols-[200px_1fr_140px_140px] gap-4 md:gap-8 items-center p-6 md:p-8 border border-white/5 hover:border-white/15 hover:bg-white/[0.03] transition-all cursor-pointer"
                      onClick={() => navigate(`/park/${park.id}`)}
                    >
                      <div>
                        <h4 className="font-headline text-xl italic group-hover:text-[#c4a46b] transition-colors">{park.name}</h4>
                        <p className="font-label text-[9px] tracking-widest text-white/30 mt-1">{park.type}</p>
                      </div>
                      <p className="font-body text-sm text-white/60 leading-relaxed hidden md:block">{park.note}</p>
                      <div className="hidden md:block">
                        <p className="font-label text-[8px] tracking-widest text-white/30 mb-1">SEASON</p>
                        <p className="font-body text-sm text-white/70">{park.season}</p>
                      </div>
                      <div className="text-right md:text-left">
                        <span className={`font-label text-[8px] tracking-widest px-3 py-1 border ${
                          park.slots === 'Very High Demand'
                            ? 'border-red-800/50 text-red-400/80 bg-red-900/20'
                            : park.slots === 'High Demand'
                            ? 'border-yellow-800/50 text-yellow-400/80 bg-yellow-900/20'
                            : 'border-green-800/50 text-green-400/80 bg-green-900/20'
                        }`}>
                          {park.slots}
                        </span>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* Reservation Types Deep Dive */}
        <section className="py-28 md:py-36 px-8">
          <div className="max-w-screen-xl mx-auto">
            <Reveal>
              <h2 className="font-headline text-4xl italic mb-16 text-center">Types of Reservations</h2>
            </Reveal>

            {/* Type selector */}
            <Reveal>
              <div className="flex flex-wrap justify-center gap-3 mb-16">
                {reservationTypes.map((type, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveType(i)}
                    className={`font-label text-[10px] tracking-[0.15em] uppercase px-5 py-3 border transition-all ${
                      activeType === i
                        ? 'bg-[#0d1a0f] text-white border-[#0d1a0f]'
                        : 'border-outline-variant/30 text-on-surface/55 hover:text-on-surface hover:border-on-surface/30'
                    }`}
                  >
                    <span className="mr-2">{type.icon}</span>
                    {type.title}
                  </button>
                ))}
              </div>
            </Reveal>

            {/* Active type detail */}
            <motion.div
              key={activeType}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-2xl mx-auto"
            >
              {/* Header */}
              <div className="text-center mb-16">
                <span className="font-headline italic text-7xl text-primary/10 block mb-4 leading-none">
                  {reservationTypes[activeType].icon}
                </span>
                <h3 className="font-headline text-4xl md:text-5xl italic mb-8 leading-tight">
                  {reservationTypes[activeType].title}
                </h3>
                <p className="font-body text-lg md:text-xl text-on-surface/65 leading-relaxed mx-auto" style={{ maxWidth: '54ch' }}>
                  {reservationTypes[activeType].description}
                </p>
              </div>

              {/* Steps */}
              <div className="mb-12">
                {reservationTypes[activeType].steps.map((step, i) => (
                  <div key={i} className="flex gap-8 py-7 border-b border-outline-variant/10 items-start">
                    <span className="font-label text-[11px] tracking-[0.2em] text-primary/30 shrink-0 pt-1 w-6 text-right">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <p className="font-body text-lg md:text-xl text-on-surface/75 leading-relaxed">{step}</p>
                  </div>
                ))}
              </div>

              {/* Pro tip */}
              <div className="bg-surface-container p-8 border-l-2 border-[#c4a46b]">
                <p className="font-label text-[9px] tracking-[0.35em] uppercase text-[#c4a46b] mb-4">PRO TIP</p>
                <p className="font-body text-base md:text-lg text-on-surface/65 leading-relaxed italic">
                  {reservationTypes[activeType].tip}
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Planning Tips */}
        <section className="py-28 md:py-36 px-8 bg-surface-container-highest/30">
          <div className="max-w-screen-xl mx-auto">
            <Reveal>
              <h2 className="font-headline text-4xl italic mb-4 text-center">Planning Intelligence</h2>
              <p className="font-label text-[10px] tracking-[0.4em] uppercase opacity-30 text-center mb-16">INSIDER KNOWLEDGE</p>
            </Reveal>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {planningTips.map((tip, i) => (
                <Reveal key={i} delay={i * 0.06}>
                  <div className="p-8 bg-surface hover:bg-surface-container-low transition-all h-full group">
                    <span className="font-headline italic text-3xl text-primary/10 block mb-4">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <h4 className="font-headline text-xl italic mb-3 group-hover:text-primary transition-colors">{tip.title}</h4>
                    <p className="font-body text-base text-on-surface/65 leading-relaxed">{tip.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Key Resources */}
        <section className="bg-[#0d1a0f] text-white py-28 md:py-36 px-8">
          <div className="max-w-screen-xl mx-auto text-center">
            <Reveal>
              <h2 className="font-headline text-4xl italic mb-16">Essential Resources</h2>
            </Reveal>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: 'Recreation.gov',
                  desc: 'The official federal reservation platform. Book campgrounds, timed-entry permits, wilderness passes, and activity tickets across all national parks and federal lands.',
                  label: 'CAMPGROUNDS & PERMITS',
                },
                {
                  title: 'NPS.gov',
                  desc: 'Individual park pages with current conditions, seasonal alerts, road closures, and park-specific reservation requirements updated in real-time by park rangers.',
                  label: 'PARK CONDITIONS',
                },
                {
                  title: 'NPS App',
                  desc: 'Download the official NPS app for offline trail maps, ranger-led program schedules, GPS-enabled wayfinding, and digital pass storage for all your parks.',
                  label: 'MOBILE APP',
                },
              ].map((resource, i) => (
                <Reveal key={i} delay={i * 0.1}>
                  <div className="p-10 border border-white/8 hover:border-white/20 transition-all text-left h-full">
                    <p className="font-label text-[8px] tracking-[0.4em] uppercase text-[#c4a46b]/60 mb-4">{resource.label}</p>
                    <h4 className="font-headline text-2xl italic mb-4">{resource.title}</h4>
                    <p className="font-body text-base text-white/65 leading-relaxed">{resource.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-36 px-8 text-center bg-surface-container-low border-t border-outline-variant/10">
          <div className="relative z-10 max-w-2xl mx-auto">
            <Reveal>
              <p className="font-label text-[10px] tracking-[0.5em] uppercase opacity-40 mb-10">BEGIN YOUR JOURNEY</p>
              <h2 className="font-headline italic text-5xl md:text-[5.5rem] leading-none mb-8" style={{ fontFamily: "'Playfair Display', serif" }}>
                The trail<br/>starts here.
              </h2>
              <p className="font-body text-lg md:text-xl text-on-surface/55 mx-auto mb-14 leading-relaxed">
                Browse all 63 national parks, find your next destination, and start planning the trip of a lifetime.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/parks"
                  className="inline-flex items-center justify-center gap-3 font-label text-[10px] tracking-[0.2em] uppercase bg-[#0d1a0f] text-white px-10 py-4 hover:bg-black transition-all"
                >
                  Explore All 63 Parks →
                </Link>
                <Link
                  to="/passes"
                  className="inline-flex items-center justify-center gap-3 font-label text-[10px] tracking-[0.2em] uppercase border border-on-surface/20 text-on-surface/55 px-10 py-4 hover:border-on-surface hover:text-on-surface transition-all"
                >
                  Get Your Pass
                </Link>
              </div>
            </Reveal>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="bg-surface w-full px-12 pt-24 pb-32">
        <div className="flex justify-between items-center w-full max-w-screen-2xl mx-auto border-t border-primary/5 pt-12">
          <p className="font-label text-[9px] tracking-widest uppercase text-black/30">© NATIONAL PARK SERVICE ARCHIVE</p>
          <div className="flex gap-12">
            <Link className="font-label text-[9px] tracking-widest uppercase text-black/30 hover:text-primary transition-colors underline underline-offset-4" to="/parks">All Parks</Link>
            <Link className="font-label text-[9px] tracking-widest uppercase text-black/30 hover:text-primary transition-colors underline underline-offset-4" to="/passes">Passes</Link>
            <Link className="font-label text-[9px] tracking-widest uppercase text-black/30 hover:text-primary transition-colors underline underline-offset-4" to="/home">Home</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
