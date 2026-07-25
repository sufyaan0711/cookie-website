# Fissure

Fissure is a premium, experimental cookie-brand marketing site, built as a Nexora portfolio piece: oversized, slow-baked cookies built around molten centres, deep textures and the perfect break.

## Stack

- Vite + React + TypeScript
- Tailwind CSS v4 (CSS-first config, tokens in `src/index.css`)
- GSAP + ScrollTrigger for the cinematic pinned scroll sequences
- Motion (`motion/react`) for interface reveals and micro-interactions
- Phosphor icons

## Running locally

```bash
npm install
npm run dev
```

## Structure

- `src/sections/` — one file per homepage section (Hero, TheCrack, Ingredients, TheBreak, Craft, Flavors, FinalCta)
- `src/components/PinnedScrollSection.tsx` — shared architecture behind "The Crack" and "The Break": pins and scrubs on capable viewports (desktop width + no `prefers-reduced-motion`), falls back to a normal static stack everywhere else
- `src/components/FissureSeam.tsx` — the current placeholder visual for those two scenes (an abstract seam of light, not a literal cookie). Swappable for a Three.js scene, an MP4/WebM, or a scroll-controlled image sequence without touching the scroll or copy architecture
- `src/index.css` — design tokens (locked dark palette, fonts), Tailwind v4 `@theme`

## Design tokens

| Token | Value |
|---|---|
| `--color-bg` | `#121113` |
| `--color-surface` | `#1c1b1e` |
| `--color-border` | `#2e2b2c` |
| `--color-text` | `#f2efea` |
| `--color-muted` | `#9c9691` |
| `--color-accent` | `#d96b41` |

Dark theme is locked site-wide by design — no section flips to light.

## Typography — pending real font files

Cabinet Grotesk and Satoshi (both Fontshare-exclusive) could not be downloaded in this build environment — `api.fontshare.com` is blocked by this sandbox's network egress policy. `src/index.css` already declares the real `@font-face` rules pointing at:

- `/public/fonts/CabinetGrotesk-Variable.woff2`
- `/public/fonts/Satoshi-Variable.woff2`

Drop the licensed files at those exact paths and the site switches to them automatically, no code changes needed. Until then, the CSS fallback stack renders **Space Grotesk** (display) and **Manrope** (body) — both self-hosted via `@fontsource` — as open-license stand-ins. **JetBrains Mono** is the real, final font already (also via `@fontsource`).

## Hero video

`public/videos/fissure-hero.mp4` is live, with `public/images/hero-poster.jpg` generated from its first frame as the poster fallback. The video autoplays muted/looped/`playsInline` with `preload="metadata"`, and is paused via JS under `prefers-reduced-motion` (falling back to the static poster frame).

The cookie in the source footage sits roughly centred (x 40-73%, y 16-75% of the 1920x1080 frame). `object-position` is tuned per breakpoint in `src/sections/Hero.tsx`:

- **Mobile/tablet** (`<1024px`): cover-cropping only leaves a narrow horizontal slice regardless of position, so these tiers just keep the cookie centred in it. The headline sits over the lower part of the frame here, protected by the bottom scrim.
- **Desktop** (`≥1024px`): the crop is much milder (video and viewport aspect are close), so the position is shifted well past the cookie, opening a clean left column for the headline instead of sitting over it.

Layering (back to front): video → soft edge mask (blends the video's own dark background into the page `#121113` at the outer few percent only) → short top scrim (nav legibility) → bottom scrim (text legibility + fade into the next section, taller/darker on mobile where the copy sits over the cookie, subtle on desktop where it's mostly just the section transition). No full-frame overlay — the cookie stays bright and detailed everywhere except the bottom band the copy occupies.

## Pending media assets

- `public/fonts/CabinetGrotesk-Variable.woff2` and `public/fonts/Satoshi-Variable.woff2` — see above.

"The Crack" and "The Break" still render an abstract placeholder (`FissureSeam`) rather than any real cookie asset. That's intentional pending the finished 3D scene, video, or image sequence.
