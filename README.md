# MKM Air Travels — Website

Corporate website for **MKM Air Travels Pvt. Ltd.**, an IATA accredited and TAAI affiliated travel management company based in New Delhi, India.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 19 + TypeScript |
| Build Tool | Vite 8 |
| Styling | Tailwind CSS v3 |
| Animations | Framer Motion |
| Icons | Lucide React |
| Routing | React Router v7 |
| SEO | React Helmet Async |

## Pages

| Route | Page |
|-------|------|
| `/` | Home |
| `/about` | About MKM |
| `/corporate-travel` | Corporate Travel |
| `/services` | All Services |
| `/why-mkm` | Why MKM |
| `/faqs` | FAQs |
| `/contact` | Contact |

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Type check (no build)
npm run type-check

# Lint
npm run lint

# Production build
npm run build

# Preview production build locally
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── layout/       # Navbar, Footer, Layout
│   ├── sections/     # Hero, StatsStrip, AboutSnapshot, etc.
│   └── ui/           # Reusable UI primitives (ServiceCard, FAQAccordion, etc.)
├── data/             # Static content (services, FAQs, navigation, whyMKM)
├── hooks/            # useScrollAnimation, useCounterAnimation
├── pages/            # Route-level page components
├── types/            # TypeScript interfaces
├── index.css         # Global styles + Tailwind layers
└── main.tsx          # App entry point
```

## Deployment

The `dist/` folder contains the production build. Deploy to any static hosting provider:

- **Netlify**: Connect repo, set build command `npm run build`, publish dir `dist`
- **Vercel**: Auto-detected as Vite project — deploys on push
- **cPanel / shared hosting**: Upload contents of `dist/` to `public_html`

> **Important**: For SPA routing to work on Apache/Nginx, configure redirects so all routes serve `index.html`.
>
> **Netlify `_redirects`**: Add `/* /index.html 200` to `public/`
>
> **Apache `.htaccess`**: Add `FallbackResource /index.html`

## Contact

**MKM Air Travels Pvt. Ltd.**  
B Block, 207, Mahatta Tower, Community Centre, Janakpuri, New Delhi 110058  
📞 +91 98734 79705  
📧 mkmairtravels@gmail.com  
GSTIN: 07AADCM0123G1Z1
