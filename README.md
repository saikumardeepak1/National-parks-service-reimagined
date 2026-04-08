# National Parks Service — Reimagined

A production-grade frontend portfolio project reimagining the U.S. National Park Service experience across all 63 parks. Designed and built from scratch.

**Live site:** [saikumardeepak1.github.io/National-parks-service-reimagined](https://saikumardeepak1.github.io/National-parks-service-reimagined/)

---

## Stack

- **React 19** + **Vite** — component architecture and build tooling
- **Tailwind CSS** — design system and utility-first styling
- **Framer Motion** — page transitions and micro-animations
- **React Router v7** — client-side routing with session gating
- **GitHub Actions** — CI/CD auto-deploy to GitHub Pages

## Features

- Immersive landing page with cinematic video backgrounds for 10 featured parks
- All 63 national parks with detailed park pages — trails, wildlife, seasonal guides
- Regional wildlife system with 36 species across 12 regions
- America the Beautiful pass program page
- Reservations planning page with seasonal demand visualization
- Custom text scramble animation, park emblem system, and animated bear mascot

## Design System

| Token | Value |
|---|---|
| Background | `#fcf9f3` (warm cream) |
| Dark surface | `#0d1a0f` (forest black) |
| Gold accent | `#c4a46b` |
| Headline font | Playfair Display |
| Body font | Cormorant Garamond |
| Label font | Inter |

## Project Structure

```
src/
  components/       # Reusable UI components
    ui/             # Primitive components (TextScramble)
  data/             # Park and wildlife data (parksData.js)
  pages/            # Route-level page components
public/
  assets/
    emblems/        # 63 individual park logos (PNG)
    wildlife/       # 36 regional wildlife photos
    parks/          # Featured park hero images
  parks/            # Park hero photos and videos (local only)
```

## Local Development

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # Production build
```

## Credits

Design, frontend engineering, and content curation by **Sai Kumar Deepak**.
