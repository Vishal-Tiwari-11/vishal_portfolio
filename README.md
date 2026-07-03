# Vishal Tiwari — Personal Portfolio

A modern, responsive personal portfolio built with **React, TypeScript, Vite, and Tailwind CSS**.

## Stack

- ⚛️ React 18 + TypeScript
- ⚡ Vite (fast dev server + optimized production build)
- 🎨 Tailwind CSS (custom blue accent palette, dark mode via class strategy)
- 🧩 lucide-react + react-icons (Simple Icons brand logos for the tech stack)

## Getting started

```bash
npm install
npm run dev       # start the dev server at http://localhost:5173
npm run build     # type-check and build a production bundle to /dist
npm run preview   # preview the production build locally
npm run lint      # run ESLint
```

## Project structure

```
src/
  components/
    layout/        Navbar, Footer
    ui/             Animated, SectionHeader, Badge, ThemeToggle (reusable primitives)
    sections/       Hero, About, TechStack, Experience, Projects, ProjectCard, Skills, Contact
  data/             Content for tech stack, experience, projects, skills, and social links
  hooks/            useTheme (dark mode), useActiveSection (navbar scroll-spy)
  types/            Shared TypeScript interfaces
  App.tsx           Composes all sections; lazy-loads below-the-fold sections
  main.tsx          React entry point
  index.css         Tailwind layers, accessibility helpers, reveal-animation utilities
```

## Before you deploy

1. **Update placeholder links** in `src/data/socials.ts`:
   - `socialLinks` (GitHub, LinkedIn, Portfolio URLs)
   - `emailAddress`
2. **Swap in real project links** in `src/data/projects.ts` (`repoUrl` / `liveUrl`) once your repos are public.
3. **Adjust copy** in `About.tsx`, `experience.ts`, and `projects.ts` to match your real history.
4. Optionally add a `resume.pdf` to `public/` and link it from the Hero or Contact section.

## Design notes

- **Accent color**: a custom blue scale (`brand-50`…`brand-900`, primary `#3D6BFD`) defined in `tailwind.config.js`.
- **Dark mode**: class-based (`darkMode: 'class'`), toggled via the navbar button and persisted to `localStorage`, defaulting to the visitor's OS preference on first visit.
- **Typography**: Space Grotesk (headings), Inter (body), JetBrains Mono (code, labels, tags) — loaded from Google Fonts in `index.html`.
- **Signature element**: the Hero features a mock code editor (`developer.ts`) instead of a generic gradient hero, reinforcing the developer-focused tone.
- **Accessibility**: semantic landmarks, a skip-to-content link, visible focus rings, `aria-current` on the active nav link, and `prefers-reduced-motion` support throughout.
- **Performance**: below-the-fold sections (Tech Stack, Experience, Projects, Skills, Contact) are code-split with `React.lazy` + `Suspense`; project thumbnails use CSS gradients instead of external images to avoid extra network requests.

## License

Personal project — feel free to fork and adapt for your own portfolio.
