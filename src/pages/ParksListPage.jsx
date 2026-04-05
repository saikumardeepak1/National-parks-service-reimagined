import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { parksData } from '../data/parksData';

export default function ParksListPage() {
  const [hoveredPark, setHoveredPark] = useState(null);
  const [bgPark, setBgPark] = useState(null);
  const navigate = useNavigate();
  const bgTimer = useRef(null);

  // Small debounce so the bg image doesn't flicker when moving between rows quickly
  const handleMouseEnter = (park) => {
    clearTimeout(bgTimer.current);
    setHoveredPark(park);
    setBgPark(park);
  };
  const handleMouseLeave = () => {
    setHoveredPark(null);
    bgTimer.current = setTimeout(() => setBgPark(null), 600);
  };

  useEffect(() => () => clearTimeout(bgTimer.current), []);

  return (
    <div className="relative min-h-screen bg-[#0b0a08] text-[#f0ebe1] overflow-y-auto">

      {/* ── Background image crossfade ────────────────────────────────────── */}
      <AnimatePresence>
        {bgPark && (
          <motion.div
            key={bgPark.id}
            className="fixed inset-0 pointer-events-none z-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: hoveredPark ? 0.38 : 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: 'easeInOut' }}
            style={{
              backgroundImage: `url(${bgPark.heroPhoto})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        )}
      </AnimatePresence>

      {/* Grain */}
      <div className="grain-overlay" />

      {/* ── Sticky Header ─────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 border-b border-[#1e1c19] bg-[#0b0a08]/95 backdrop-blur">
        <div className="max-w-screen-2xl mx-auto px-8 md:px-14 py-5 flex justify-between items-center">
          <Link
            to="/home"
            className="flex items-center gap-3 group"
          >
            <span className="font-label text-[9px] tracking-[0.3em] uppercase text-[#c4a46b] group-hover:text-white transition-colors">
              ← Home
            </span>
          </Link>

          <div className="absolute left-1/2 -translate-x-1/2 text-center">
            <img
              src="/assets/nps-logo-official.svg"
              alt="NPS"
              className="h-10 w-auto opacity-80 mx-auto"
            />
          </div>

          <span className="font-label text-[9px] tracking-[0.3em] uppercase text-[#3d3832]">
            63 Protected Lands
          </span>
        </div>
      </header>

      {/* ── Hero Title ────────────────────────────────────────────────────── */}
      <div className="relative z-10 max-w-screen-2xl mx-auto px-8 md:px-14 pt-20 pb-12 border-b border-[#1e1c19]">
        <p className="font-label text-[9px] tracking-[0.4em] uppercase text-[#c4a46b] mb-4">
          The Complete Archive
        </p>
        <h1
          className="font-headline text-[clamp(3rem,8vw,7rem)] leading-none italic text-[#f0ebe1]"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          National Parks
        </h1>
        <p className="font-label text-[10px] tracking-[0.3em] uppercase text-[#3d3832] mt-4">
          Established 1872 — {new Date().getFullYear()}
        </p>
      </div>

      {/* ── Column Headers ────────────────────────────────────────────────── */}
      <div className="relative z-10 max-w-screen-2xl mx-auto px-8 md:px-14">
        <div className="flex items-center py-4 border-b border-[#1e1c19]">
          <span className="w-14 font-label text-[8px] tracking-[0.3em] uppercase text-[#282520]">No.</span>
          <span className="flex-1 font-label text-[8px] tracking-[0.3em] uppercase text-[#282520]">Park</span>
          <span className="hidden md:block w-52 font-label text-[8px] tracking-[0.3em] uppercase text-[#282520]">State</span>
          <span className="hidden lg:block w-24 font-label text-[8px] tracking-[0.3em] uppercase text-[#282520]">Est.</span>
          <span className="hidden lg:block w-28 font-label text-[8px] tracking-[0.3em] uppercase text-[#282520]">Visitors</span>
          <span className="w-8" />
        </div>

        {/* ── Park Rows ───────────────────────────────────────────────────── */}
        {parksData.map((park) => (
          <motion.div
            key={park.id}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '0px 0px -40px 0px' }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            onMouseEnter={() => handleMouseEnter(park)}
            onMouseLeave={handleMouseLeave}
            onClick={() => navigate(`/park/${park.id}`)}
            className="relative flex items-center py-5 border-b border-[#1a1815] cursor-pointer group"
          >
            {/* Hover highlight bar */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              animate={{ opacity: hoveredPark?.id === park.id ? 1 : 0 }}
              transition={{ duration: 0.25 }}
              style={{ background: 'linear-gradient(90deg, rgba(196,164,107,0.06) 0%, transparent 60%)' }}
            />

            {/* Number */}
            <span
              className="relative z-10 w-14 shrink-0 font-headline italic text-sm leading-none transition-colors duration-300"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                color: hoveredPark?.id === park.id ? '#c4a46b' : '#2e2c28',
              }}
            >
              {park.id.toString().padStart(2, '0')}
            </span>

            {/* Park name */}
            <span
              className="relative z-10 flex-1 font-headline leading-none transition-all duration-300"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 'clamp(1.4rem, 2.8vw, 2.4rem)',
                color: hoveredPark?.id === park.id ? '#ffffff' : '#dedad2',
                letterSpacing: hoveredPark?.id === park.id ? '0.01em' : '0',
              }}
            >
              {park.name}
            </span>

            {/* State */}
            <span
              className="relative z-10 hidden md:block w-52 font-label text-[10px] tracking-[0.2em] uppercase transition-colors duration-300"
              style={{ color: hoveredPark?.id === park.id ? '#c4a46b' : '#8a8070' }}
            >
              {park.state}
            </span>

            {/* Established */}
            <span
              className="relative z-10 hidden lg:block w-24 font-label text-[10px] tracking-widest transition-colors duration-300"
              style={{ color: hoveredPark?.id === park.id ? '#c4a46b' : '#6e6860' }}
            >
              {park.established}
            </span>

            {/* Visitors */}
            <span
              className="relative z-10 hidden lg:block w-28 font-label text-[10px] tracking-widest transition-colors duration-300"
              style={{ color: hoveredPark?.id === park.id ? '#6e6860' : '#544f48' }}
            >
              {park.visitors}
            </span>

            {/* Arrow */}
            <motion.span
              className="relative z-10 w-8 text-right font-label text-sm shrink-0"
              animate={{
                x: hoveredPark?.id === park.id ? 4 : 0,
                color: hoveredPark?.id === park.id ? '#c4a46b' : '#1e1c19',
              }}
              transition={{ duration: 0.2 }}
            >
              →
            </motion.span>
          </motion.div>
        ))}
      </div>

      {/* ── Footer ────────────────────────────────────────────────────────── */}
      <footer className="relative z-10 max-w-screen-2xl mx-auto px-8 md:px-14 py-24">
        <div className="flex justify-between items-end border-t border-[#1e1c19] pt-12">
          <div>
            <p className="font-label text-[9px] tracking-[0.3em] uppercase text-[#282520]">
              © National Park Service Archive
            </p>
            <p className="font-label text-[9px] tracking-[0.2em] uppercase text-[#1e1c19] mt-2">
              Preserving the Wilderness Since 1916
            </p>
          </div>
          <Link
            to="/home"
            className="font-label text-[9px] tracking-[0.3em] uppercase text-[#3d3832] hover:text-[#c4a46b] transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </footer>
    </div>
  );
}
