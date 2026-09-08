@AGENTS.md

# Neenja

Career platform SaaS: ATS Resume Scan, Career Profile, Job Applications, Job Trust Centre, and Financial tracking.

## Stack

| Tool | Version | Notes |
| --- | --- | --- |
| Next.js | 16.3 | App Router, Turbopack, `src/` dir, `@/*` alias. See AGENTS.md above — consult `node_modules/next/dist/docs/` before assuming APIs. |
| React | 19.2 | |
| TypeScript | 5.x | Layouts/pages use generated types (`LayoutProps<"/">`, `PageProps`) |
| Tailwind CSS | 4.x | **No `tailwind.config.ts`** — all theme config lives in `src/app/globals.css` via `@theme` |
| shadcn/ui | CLI v3 (`npx shadcn@3 add <name>`) | neutral base color, CSS variables. Components in `src/components/ui/` |
| lucide-react | 1.x | Icons |
| react-dropzone | 20.x | File upload zones |
| next-themes | 0.4 | Installed; dark-mode toggling not wired up yet (`.dark` class variant ready in CSS) |

## Design tokens

Defined as CSS variables in `src/app/globals.css` (`:root` for light, `.dark` for dark). Always use the semantic Tailwind classes (`bg-primary`, `text-muted-foreground`, `border-border`…), never raw hex in components.

Palette (light):

- `--primary: #A8C900` — Neenja green-yellow. CTAs, active nav text, icon accents. Foreground on primary is `#111111` (dark on green, not white).
- `--foreground: #111111` — near-black text
- `--background` / `--card` / `--sidebar`: `#FFFFFF`
- `--accent: #F1F7DC` — light green; active nav bg, hover surfaces, icon chip backgrounds
- `--muted / --secondary: #F5F5F5` — gray surfaces
- `--border / --input: #E4E4E4`
- `--ring: #A8C900`

Radius scale (driven by `--radius: 12px`):

- `rounded-lg` = 12px (cards), `rounded-md` = 8px (buttons, nav items, icon chips), `rounded-sm` = 6px

Typography: Inter via `next/font` (`--font-inter` → `font-sans`, applied on `body`); Geist Mono for `font-mono`. Body is antialiased, white bg, `#111` text.

Visual language: clean white background, light gray card surfaces, rounded cards with subtle solid — or dashed (upload zones) — borders, dark announcement banner with accent CTA.

## Folder structure

```
src/
  app/
    layout.tsx            # Root layout: fonts, AnnouncementBanner, Sidebar + scrollable <main>
    page.tsx              # Redirects to /resume-scan
    globals.css           # Tailwind v4 @theme + all design tokens
    (dashboard)/          # Route group for app pages (no URL segment)
      resume-scan/page.tsx
  components/
    ui/                   # shadcn/ui primitives — managed by CLI, avoid hand-editing
    layout/               # App shell: Sidebar.tsx, AnnouncementBanner.tsx
    resume-scan/          # Feature components, one folder per feature
  hooks/                  # use-mobile.ts etc.
  lib/utils.ts            # cn() helper
```

## Conventions

- **Components**: PascalCase files for app components (`Sidebar.tsx`, `CvUploadZone.tsx`); shadcn `ui/` files stay kebab-case as generated. Named exports for app components.
- **Server-first**: pages are server components; interactivity (dropzone, dismissible banner, `usePathname`) lives in small `"use client"` leaf components under `src/components/<feature>/`.
- **Layout shell**: fixed 260px sidebar (`w-[260px] shrink-0 border-r`), main area `flex-1 overflow-y-auto`; the body is `h-dvh flex-col` so only `<main>` scrolls.
- **Sidebar nav**: items defined in the `navItems` array in `src/components/layout/Sidebar.tsx`. Active state = `bg-accent text-primary` + 1px-rounded left bar via `before:` pseudo. Add new sections there and create the matching route under `(dashboard)/`.
- **Pages**: route folders kebab-case (`resume-scan`), page content wrapped in `mx-auto max-w-5xl px-8 py-10`, `<h1>` `text-2xl font-semibold tracking-tight` with muted subtext.
- **Adding shadcn components**: `npx shadcn@3 add <name>` (pin to v3 — the v4 CLI has different flags/registry behavior).
- **Metadata**: root layout sets `title.template = "%s | Neenja"`; pages export `metadata.title` with just the page name.
