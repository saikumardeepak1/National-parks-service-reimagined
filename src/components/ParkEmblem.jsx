import React from 'react';

// Converts a park name to the kebab-case filename used in /public/63 NPS LOGO/
function nameToSlug(name) {
  return name
    .toLowerCase()
    .normalize('NFD')                    // decompose accented chars (ā → a + combining mark)
    .replace(/[\u0300-\u036f]/g, '')     // strip combining diacritics
    .replace(/[ʻʼ'']/g, '')             // strip Hawaiian ʻokina and smart quotes
    .replace(/[–—]/g, '-')              // em/en dash → hyphen
    .replace(/[^a-z0-9\s-]/g, '')       // remove remaining specials (periods, etc.)
    .trim()
    .replace(/\s+/g, '-');              // spaces → hyphens
}

export default function ParkEmblem({ park }) {
  const slug = nameToSlug(park.name);
  const src = `${import.meta.env.BASE_URL}assets/emblems/${slug}.png`;

  return (
    <img
      src={src}
      alt={`${park.name} National Park logo`}
      className="w-full h-auto object-contain"
    />
  );
}
