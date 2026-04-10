import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// On GitHub Pages the repo name is the base path.
// On Vercel (and local dev) the site lives at the root.
const isGitHubPages = process.env.GITHUB_ACTIONS === 'true';

export default defineConfig({
  plugins: [react()],
  base: isGitHubPages ? '/National-parks-service-reimagined/' : '/',
})
