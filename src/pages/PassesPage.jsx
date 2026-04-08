import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { TextScramble } from '../components/ui/TextScramble';

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

const passes = [
  {
    id: 'annual',
    name: 'Annual Pass',
    price: '$80',
    priceSub: 'per year',
    tagline: 'Your key to every horizon.',
    who: 'General public — U.S. and international visitors',
    description: 'Covers entrance fees at more than 2,000 federal recreation sites across the country. One pass, every national park, national forest, wildlife refuge, and BLM land. Valid for 12 months from purchase.',
    coverage: ['All 63 national parks', 'National forests & grasslands', 'Wildlife refuges', 'BLM & Bureau of Reclamation sites', 'Army Corps of Engineers sites'],
    details: 'Admits pass holder and passengers in a single, private vehicle at per-vehicle fee areas. At per-person fee areas, admits the pass holder and up to 3 additional adults (15 and under are free).',
    color: '#c4a46b',
    image: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=1200&q=80',
  },
  {
    id: 'senior',
    name: 'Senior Pass',
    price: '$20',
    priceSub: 'lifetime',
    tagline: 'A lifetime of wilderness.',
    who: 'U.S. citizens or permanent residents age 62 or older',
    description: 'A lifetime pass for U.S. citizens and permanent residents age 62 and older. Also available as an annual pass for $20. Provides a 50% discount on some amenity fees charged for camping, swimming, and boat launching.',
    coverage: ['All annual pass benefits', '50% discount on expanded amenity fees', 'Camping fee discounts at federal sites', 'Day-use fee discounts'],
    details: 'Lifetime pass: $80 (one-time). Annual senior pass: $20/year. Must show proof of age and residency or citizenship.',
    color: '#8B7355',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&q=80',
  },
  {
    id: 'military',
    name: 'Military Pass',
    price: 'Free',
    priceSub: 'annual',
    tagline: 'For those who served the land.',
    who: 'Current U.S. military members and dependents in the Army, Navy, Air Force, Marines, Coast Guard, and Space Force',
    description: 'Free annual pass for active duty military personnel and their dependents with valid military ID (CAC card or form DD-1173). Also available to Gold Star Families.',
    coverage: ['All annual pass benefits', 'Available to dependents with valid ID', 'Gold Star Families eligible', 'Covers all 2,000+ federal recreation sites'],
    details: 'Valid for 12 months from date of issue. Must present valid military identification. Dependents must have valid form of military dependent ID.',
    color: '#4A5D4A',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80',
  },
  {
    id: 'access',
    name: 'Access Pass',
    price: 'Free',
    priceSub: 'lifetime',
    tagline: 'These lands belong to everyone.',
    who: 'U.S. citizens or permanent residents with permanent disabilities',
    description: 'A free lifetime pass for U.S. citizens and permanent residents with permanent disabilities. Provides a 50% discount on some expanded amenity fees for camping, swimming, and boat launching.',
    coverage: ['All annual pass benefits', '50% discount on expanded amenity fees', 'Lifetime validity', 'Camping and day-use discounts'],
    details: 'Must provide documentation of permanent disability. Available in-person at federal recreation sites or via mail with $10 processing fee.',
    color: '#5B7B8A',
    image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1200&q=80',
  },
  {
    id: '4th-grade',
    name: 'Every Kid Outdoors',
    price: 'Free',
    priceSub: 'for 4th graders',
    tagline: 'Every child deserves a wild place.',
    who: 'U.S. 4th graders (including home-schooled students and those in their 4th year of school)',
    description: 'A free pass giving every 4th grader in America — and their families — unlimited access to federal lands and waters for an entire school year. Part of the Every Kid Outdoors Act signed into law in 2019.',
    coverage: ['All annual pass benefits', 'Covers the student\'s entire family', 'Valid September through August', 'Access to all 2,000+ federal sites'],
    details: 'Students obtain a paper voucher at everykidoutdoors.gov, then exchange it for a durable pass at any federal recreation site. Valid from September 1 through August 31 of the school year.',
    color: '#D4764E',
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&q=80',
  },
  {
    id: 'volunteer',
    name: 'Volunteer Pass',
    price: 'Free',
    priceSub: '250+ hours',
    tagline: 'Earned through service.',
    who: 'Volunteers with 250 or more cumulative service hours with federal land management agencies',
    description: 'A free annual pass earned by accumulating 250 or more hours of volunteer service across federal agencies. Recognizes the essential contribution of volunteers who maintain trails, restore habitats, and protect our shared lands.',
    coverage: ['All annual pass benefits', 'Cumulative hours across agencies', 'Annual validity from date of issue', 'Recognized at all federal sites'],
    details: 'Hours may be accumulated across multiple federal agencies and locations. Supervising agency certifies volunteer hours. Pass issued at the agency where hours were completed.',
    color: '#6B8E6B',
    image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200&q=80',
  },
];

const faqs = [
  {
    q: 'Where can I purchase a pass?',
    a: 'In-person at any national park entrance station or federal recreation site. Online at recreation.gov or usgs.gov/pass. The Annual Pass, Senior Annual Pass, and Military Pass are also available at select retail locations.',
  },
  {
    q: 'Does the pass cover camping fees?',
    a: 'The standard Annual Pass covers entrance fees only. The Senior Pass and Access Pass provide a 50% discount on expanded amenity fees (camping, swimming, boat launch). Standard campsite reservations through recreation.gov are separate.',
  },
  {
    q: 'Can I share my pass?',
    a: 'Passes are non-transferable but cover the pass holder plus passengers in a single private vehicle at per-vehicle fee areas. At per-person fee areas, the pass covers the holder plus 3 additional adults. Children 15 and under are always free.',
  },
  {
    q: 'What if I visit only one park per year?',
    a: 'Most national parks charge $30–$35 per vehicle for a 7-day entrance pass. If you visit three or more federal recreation sites in a year, the $80 Annual Pass pays for itself.',
  },
  {
    q: 'Do I need a pass for every national park?',
    a: 'Not all parks charge entrance fees. Of the 63 national parks, about two-thirds charge an entrance fee. Parks like Great Smoky Mountains, Congaree, and Redwood have no entrance fee. However, many still have parking or camping fees.',
  },
];

export default function PassesPage() {
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [selectedPass, setSelectedPass] = useState('annual');

  const activePass = passes.find(p => p.id === selectedPass);

  return (
    <div className="bg-surface text-on-surface font-body selection:bg-primary/10 opacity-0 animate-[fadeIn_1.2s_ease-out_forwards]">
      <style>{`@keyframes fadeIn { to { opacity: 1; } }`}</style>
      <div className="grain-overlay" />

      {/* Nav */}
      <nav className="sticky top-0 z-[60] w-full bg-surface/90 backdrop-blur-md px-8 py-4 flex justify-between items-center border-b border-outline-variant/10">
        <Link to="/home" className="hover:opacity-70 transition-opacity shrink-0">
          <img alt="NPS" className="w-16 h-auto drop-shadow-lg" src="/assets/nps-logo-official.svg" />
        </Link>
        <div className="absolute left-1/2 -translate-x-1/2">
          <h2 className="font-headline text-lg tracking-widest uppercase hidden md:block">Passes & Permits</h2>
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
            src="https://images.unsplash.com/photo-1472396961693-142e6e269027?w=1800&q=80"
            alt="National Park landscape"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/60" />
          <div className="relative z-10 text-center text-white px-4 space-y-6">
            <p className="font-label text-[11px] tracking-[0.5em] uppercase opacity-60">U.S. DEPARTMENT OF THE INTERIOR</p>
            <TextScramble
              as="h1"
              duration={1.0}
              speed={0.03}
              characterSet="ABCDEFGHIJKLMNOPQRSTUVWXYZ"
              className="font-headline italic leading-none"
              style={{ fontSize: 'clamp(3rem, 10vw, 8rem)', fontFamily: "'Playfair Display', serif" }}
            >
              America the Beautiful
            </TextScramble>
          </div>
        </section>

        {/* Introduction */}
        <section className="py-28 md:py-36 px-8 max-w-3xl mx-auto text-center">
          <Reveal>
            <p className="font-label text-[10px] tracking-[0.4em] uppercase opacity-50 mb-8">THE PASS PROGRAM</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-headline text-4xl md:text-5xl mb-10 leading-tight">
              One pass. Over 2,000 federal recreation sites. Every national park.
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="font-body text-xl md:text-2xl text-on-surface/75 leading-relaxed max-w-2xl mx-auto">
              The America the Beautiful pass series is your single credential to the entire system of U.S. federal lands — national parks, national forests, wildlife refuges, and more. Six pass types ensure that every American has access to these shared landscapes.
            </p>
          </Reveal>
        </section>

        {/* Pass Selector */}
        <section className="pb-32 px-8">
          <div className="max-w-screen-xl mx-auto">
            {/* Pass tabs */}
            <Reveal>
              <div className="flex flex-wrap justify-center gap-3 mb-16">
                {passes.map(pass => (
                  <button
                    key={pass.id}
                    onClick={() => setSelectedPass(pass.id)}
                    className={`font-label text-[10px] tracking-[0.15em] uppercase px-5 py-3 border transition-all ${
                      selectedPass === pass.id
                        ? 'bg-[#0d1a0f] text-white border-[#0d1a0f]'
                        : 'border-outline-variant/30 text-on-surface/55 hover:text-on-surface hover:border-on-surface/30'
                    }`}
                  >
                    {pass.name}
                  </button>
                ))}
              </div>
            </Reveal>

            {/* Active pass detail */}
            {activePass && (
              <motion.div
                key={activePass.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="grid lg:grid-cols-2 gap-0 border border-outline-variant/15 overflow-hidden"
              >
                {/* Image side */}
                <div className="h-[400px] lg:h-auto relative overflow-hidden group">
                  <img
                    src={activePass.image}
                    alt={activePass.name}
                    className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-10 md:p-14">
                    <p className="font-label text-[9px] tracking-[0.4em] uppercase text-white/60 mb-3">{activePass.priceSub}</p>
                    <div className="flex items-baseline gap-4">
                      <span
                        className="font-headline text-6xl md:text-7xl text-white"
                        style={{ color: activePass.color }}
                      >
                        {activePass.price}
                      </span>
                    </div>
                    <p className="font-headline italic text-xl text-white/80 mt-4">{activePass.tagline}</p>
                  </div>
                </div>

                {/* Detail side */}
                <div className="bg-surface-container-low p-10 md:p-14 flex flex-col justify-center">
                  <h3 className="font-headline text-3xl md:text-4xl italic mb-3">{activePass.name}</h3>
                  <p className="font-label text-[10px] tracking-[0.2em] uppercase opacity-40 mb-8">{activePass.who}</p>

                  <p className="font-body text-lg text-on-surface/75 leading-relaxed mb-10">
                    {activePass.description}
                  </p>

                  <div className="mb-10">
                    <p className="font-label text-[9px] tracking-[0.3em] uppercase opacity-40 mb-4">COVERAGE</p>
                    <ul className="space-y-3">
                      {activePass.coverage.map((item, i) => (
                        <li key={i} className="flex items-start gap-3 font-body text-base text-on-surface/75">
                          <span className="shrink-0 mt-1 text-xs" style={{ color: activePass.color }}>◆</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="h-[1px] bg-outline-variant/15 mb-8" />

                  <p className="font-body text-sm text-on-surface/55 leading-relaxed italic">
                    {activePass.details}
                  </p>
                </div>
              </motion.div>
            )}
          </div>
        </section>

        {/* Quick Comparison */}
        <section className="bg-[#0d1a0f] text-white py-28 md:py-36 px-8">
          <div className="max-w-screen-xl mx-auto">
            <Reveal>
              <h2 className="font-headline text-4xl italic mb-4 text-center">At a Glance</h2>
              <p className="font-label text-[10px] tracking-[0.4em] uppercase text-white/30 text-center mb-16">PASS COMPARISON</p>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[700px]">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left font-label text-[9px] tracking-[0.3em] uppercase text-white/40 pb-4 pr-8">Pass</th>
                      <th className="text-left font-label text-[9px] tracking-[0.3em] uppercase text-white/40 pb-4 pr-8">Price</th>
                      <th className="text-left font-label text-[9px] tracking-[0.3em] uppercase text-white/40 pb-4 pr-8">Duration</th>
                      <th className="text-left font-label text-[9px] tracking-[0.3em] uppercase text-white/40 pb-4 pr-8">Eligibility</th>
                      <th className="text-left font-label text-[9px] tracking-[0.3em] uppercase text-white/40 pb-4">Camping Discount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { name: 'Annual', price: '$80', dur: '12 months', elig: 'General public', disc: '—' },
                      { name: 'Senior (Lifetime)', price: '$80', dur: 'Lifetime', elig: 'Age 62+, U.S. citizen', disc: '50%' },
                      { name: 'Senior (Annual)', price: '$20', dur: '12 months', elig: 'Age 62+, U.S. citizen', disc: '50%' },
                      { name: 'Military', price: 'Free', dur: '12 months', elig: 'Active duty + dependents', disc: '—' },
                      { name: 'Access', price: 'Free', dur: 'Lifetime', elig: 'Permanent disability', disc: '50%' },
                      { name: 'Every Kid Outdoors', price: 'Free', dur: 'School year', elig: '4th graders + family', disc: '—' },
                      { name: 'Volunteer', price: 'Free', dur: '12 months', elig: '250+ service hours', disc: '—' },
                    ].map((row, i) => (
                      <tr key={i} className="border-b border-white/5 hover:bg-white/[0.03] transition-colors">
                        <td className="py-5 pr-8 font-headline text-lg italic">{row.name}</td>
                        <td className="py-5 pr-8 font-body text-base text-[#c4a46b]">{row.price}</td>
                        <td className="py-5 pr-8 font-body text-base text-white/70">{row.dur}</td>
                        <td className="py-5 pr-8 font-body text-base text-white/70">{row.elig}</td>
                        <td className="py-5 font-body text-base text-white/70">{row.disc}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Where to Purchase */}
        <section className="py-28 md:py-36 px-8">
          <div className="max-w-screen-xl mx-auto">
            <Reveal>
              <h2 className="font-headline text-4xl italic mb-16 text-center leading-snug">Where to Purchase</h2>
            </Reveal>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: 'In Person',
                  desc: 'Purchase at any national park entrance station, visitor center, or federal recreation site. Present valid ID at the time of purchase.',
                  icon: '⊞',
                },
                {
                  title: 'Online',
                  desc: 'Order through recreation.gov or the USGS online store. Passes ship within 7–10 business days. Digital passes available at select sites.',
                  icon: '◈',
                },
                {
                  title: 'By Mail',
                  desc: 'Mail a completed application with payment to USGS. Include a $10 processing fee for passes ordered by mail. Allow 4–6 weeks for delivery.',
                  icon: '✉',
                },
              ].map((method, i) => (
                <Reveal key={i} delay={i * 0.1}>
                  <div className="p-10 bg-surface-container-low hover:bg-surface-container-high transition-all h-full">
                    <span className="text-3xl mb-6 block opacity-30">{method.icon}</span>
                    <h4 className="font-headline text-xl italic mb-4">{method.title}</h4>
                    <p className="font-body text-base text-on-surface/65 leading-relaxed">{method.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-28 md:py-36 px-8 bg-surface-container-highest/30">
          <div className="max-w-3xl mx-auto">
            <Reveal>
              <h2 className="font-headline text-4xl italic mb-4 text-center">Common Questions</h2>
              <p className="font-label text-[10px] tracking-[0.4em] uppercase opacity-30 text-center mb-16">FREQUENTLY ASKED</p>
            </Reveal>
            <div className="space-y-0">
              {faqs.map((faq, i) => (
                <Reveal key={i} delay={i * 0.05}>
                  <div className="border-b border-outline-variant/15">
                    <button
                      onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                      className="w-full text-left py-7 flex justify-between items-start gap-8 group"
                    >
                      <span className="font-headline text-lg md:text-xl italic group-hover:text-primary transition-colors">{faq.q}</span>
                      <span className={`text-xl shrink-0 opacity-30 transition-transform duration-300 ${expandedFaq === i ? 'rotate-45' : ''}`}>+</span>
                    </button>
                    <motion.div
                      initial={false}
                      animate={{
                        height: expandedFaq === i ? 'auto' : 0,
                        opacity: expandedFaq === i ? 1 : 0,
                      }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="font-body text-base text-on-surface/65 leading-relaxed pb-7">
                        {faq.a}
                      </p>
                    </motion.div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-36 px-8 text-center bg-surface-container-low relative overflow-hidden border-t border-outline-variant/10">
          <div className="relative z-10 max-w-2xl mx-auto">
            <Reveal>
              <p className="font-label text-[10px] tracking-[0.5em] uppercase opacity-40 mb-10">READY TO EXPLORE</p>
              <h2 className="font-headline italic text-5xl md:text-[5.5rem] leading-none mb-8" style={{ fontFamily: "'Playfair Display', serif" }}>
                Your parks<br/>are waiting.
              </h2>
              <p className="font-body text-lg md:text-xl text-on-surface/55 mx-auto mb-14 leading-relaxed">
                With an America the Beautiful pass, every horizon across every national park is yours to discover.
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
                  to="/reservations"
                  className="inline-flex items-center justify-center gap-3 font-label text-[10px] tracking-[0.2em] uppercase border border-on-surface/20 text-on-surface/55 px-10 py-4 hover:border-on-surface hover:text-on-surface transition-all"
                >
                  Plan Reservations
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
            <Link className="font-label text-[9px] tracking-widest uppercase text-black/30 hover:text-primary transition-colors underline underline-offset-4" to="/reservations">Reservations</Link>
            <Link className="font-label text-[9px] tracking-widest uppercase text-black/30 hover:text-primary transition-colors underline underline-offset-4" to="/home">Home</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
