# Neenja — Intelligent Career & Salary Platform

> **Empowering career decisions through evidence-based ATS scanning, transparent compensation intelligence, job trust verification, and end-to-end application tracking.**

---

## 🌟 Overview

**Neenja** is an all-in-one career platform SaaS built with Next.js 16, React 19, and Tailwind CSS v4. Designed with clarity, transparency, and actionable data at its core, Neenja helps job seekers navigate the entire hiring lifecycle—from optimizing CVs for ATS filters and verifying employer authenticity to calculating true take-home pay, researching city living costs, and negotiating competing offers.

---

## ✨ Key Features & Modules

### 1. 🎯 ATS Optimization Scan (`/resume-scan`)
- **Multi-Category Score Breakdown**: In-depth analysis across required skills, experience, education, certifications, keywords, CV structure, readability, and formatting.
- **Evidence-Backed Match Tracking**: Highlights exact, strong, and partial matches between CV text and job descriptions.
- **Actionable Gap Analysis**: Identifies missing requirements, ambiguous points, and partially supported qualifications.
- **Targeted Bullet Rewrites**: Provides impact-driven rewrite suggestions with clear rationales and truthfulness warnings.

### 2. 💷 Salary & Offers Intelligence (`/salary`)
- **Take-Home Pay Calculator**: Accurate net income estimation based on tax year regulations (e.g., UK 2026–27 income tax brackets, Class 1 NI, and pension deductions).
- **City Cost & Affordability**: Predicts living expenses (housing, utilities, food, transport, healthcare) and calculates disposable income and savings rates.
- **Minimum Wage & NLW Compliance**: Evaluates base pay, contracted vs. actual hours, and detects illegal wage shortfalls resulting from unpaid overtime.
- **Side-by-Side Offer Comparison**: Compares competing offers across base compensation, bonuses, pension matches, commute/remote flexibility, effective hourly rate, and net disposable income.
- **Transparent Computations**: Powered by expandable mathematical breakdowns (`CalculationBreakdown`) and cited evidence sources (`EvidenceCard`).

### 3. 🛡️ Job Trust Centre (`/job-trust`)
- **Dual-Layer Trust Verification**: Independent assessments for official employer registration records and job-advert safety signals.
- **Scam & Fraud Detection**: Flags high-risk warning signals including upfront fee requests, cryptocurrency/gift card payments, spoofed domains, and coercive urgency language.
- **Transparent Risk States**: Clearly differentiates between verified companies and potentially unsafe individual job postings.

### 4. 📋 Job Application Tracker (`/applications` & `/applications/[id]`)
- **Full-Lifecycle Pipeline**: Tracks opportunities across stages: *Interested, Saved, Preparing, Applied, Assessment, Interview, Offer, Negotiating, Accepted, Rejected, Withdrawn*.
- **Integrated Risk & CV Badging**: Shows employer trust status and linked CV versions directly in the application list.
- **Stage Detail & Timelines**: Manage interview dates, deadlines, job descriptions, compensation ranges, and interview notes.

### 5. 📄 CV Upload & Onboarding Wizard (`/cv-upload`)
- **Drag-and-Drop Ingestion**: Supports PDF, DOCX, and image document formats up to 10 MB via `react-dropzone`.
- **Privacy & Consent First**: Explicit `ConsentBanner` gates AI parsing before any data leaves the user session.
- **Authentic Progress Reporting**: Honest, non-simulated multi-step status feedback.
- **Interactive Extraction Review**: Users review, approve, edit, or reject AI-extracted fields prior to saving.

### 6. 👤 Career Profile (`/career-profile`)
- **Single Source of Career Truth**: Central repository for confirmed employment history, education, skills, and work preferences.
- **AI Extraction Provenance**: Distinct visual tags distinguishing confirmed user data, AI-extracted data, and inferred suggestions.

### 7. 🤖 AI Career Assistant (`/ai-assistant`)
- **Contextual Copilot**: Quick-action career advisor capable of answering salary, ATS match, city affordability, and application questions.
- **Human-in-the-Loop Safeguards**: Explicitly marked AI boundaries ensuring decisions and updates require user confirmation.

---

## 🎨 Design System & UX Principles

Neenja follows a refined visual aesthetic tailored for professional tools:
- **Color Palette**:
  - **Primary**: Brand green-yellow (`#90B200` / `#A8C900`) for primary actions, active indicators, and accents.
  - **Foreground**: Deep charcoal (`#111111`) ensuring high contrast and readability.
  - **Surfaces**: Crisp white cards (`#FFFFFF`) with subtle neutral borders (`#E4E4E4`) and soft gray backgrounds (`#F5F5F5`).
  - **Accent**: Soft lime tint (`#F8FFE9` / `#F1F7DC`) for active navigation and elevated focus states.
- **Radius Scale**: Consistent rounded geometry (`sm: 6px`, `md: 8px`, `lg: 12px`).
- **Typography**: Clean contemporary typography using **Manrope** (`font-sans`) and **Geist Mono** (`font-mono`).
- **Shared Trust Components**:
  - `StatusBadge`: Semantic badge system (`verified`, `strong-match`, `estimate`, `partial`, `conflicting`, `ai-extracted`).
  - `EvidenceCard`: Data freshness, confidence ratings, and source attribution.
  - `CalculationBreakdown`: Step-by-step mathematical formulas and assumptions.
  - `ResultStateCard`: Comprehensive feedback states for edge cases and partial results.
  - `ConsentBanner`: User consent dialogs prior to external processing.

---

## 🛠️ Technology Stack

| Technology | Version | Purpose |
| :--- | :--- | :--- |
| **[Next.js](https://nextjs.org/)** | 16.3.0 | React Framework (App Router, Turbopack, Server & Client Components) |
| **[React](https://react.dev/)** | 19.2.8 | UI Library |
| **[TypeScript](https://www.typescriptlang.org/)** | 5.x | Static Type Safety |
| **[Tailwind CSS](https://tailwindcss.com/)** | 4.x | Utility-first styling configured via `@theme` in `globals.css` |
| **[shadcn/ui](https://ui.shadcn.com/)** | CLI v3 | Accessible UI component primitives |
| **[Radix UI](https://www.radix-ui.com/)** | Latest | Headless accessible UI primitives |
| **[Iconify](https://iconify.design/) & [Lucide](https://lucide.dev/)** | Latest | Modern vector iconography (`@iconify/react`, `lucide-react`) |
| **[react-dropzone](https://react-dropzone.js.org/)** | 20.x | Drag-and-drop document upload interface |
| **[next-themes](https://github.com/pacocoursey/next-themes)** | 0.4.x | Theme foundation |

---

## 📁 Project Structure

```text
neenja/
├── public/                     # Static assets and SVGs
├── src/
│   ├── app/
│   │   ├── (dashboard)/        # Main app route group
│   │   │   ├── ai-assistant/   # AI Career Assistant page
│   │   │   ├── applications/   # Application tracker & detail ([id])
│   │   │   ├── career-profile/ # Verified career profile page
│   │   │   ├── cv-upload/      # Multi-step CV upload wizard
│   │   │   ├── job-trust/      # Employer & advert safety verification
│   │   │   ├── resume-scan/    # ATS CV match analysis
│   │   │   └── salary/         # Take-home pay, living costs & offer comparison
│   │   ├── favicon.ico
│   │   ├── globals.css         # Tailwind v4 theme variables & tokens
│   │   ├── layout.tsx          # Root layout (Sidebar + Announcement Banner)
│   │   └── page.tsx            # Dashboard home & quick actions
│   ├── components/
│   │   ├── layout/             # Shell components (Sidebar, AnnouncementBanner)
│   │   ├── resume-scan/        # Feature-specific components (CvUploadZone)
│   │   ├── shared/             # Reusable design system primitives
│   │   │   ├── CalculationBreakdown.tsx
│   │   │   ├── ConsentBanner.tsx
│   │   │   ├── EvidenceCard.tsx
│   │   │   ├── ResultStateCard.tsx
│   │   │   └── StatusBadge.tsx
│   │   └── ui/                 # shadcn/ui primitives (button, card, dialog, etc.)
│   ├── hooks/                  # Custom React hooks (e.g., use-mobile.ts)
│   └── lib/                    # Shared utilities (cn helper)
├── CLAUDE.md                   # Repository conventions and coding guidelines
├── AGENTS.md                   # Next.js agent instructions
├── components.json             # shadcn/ui configuration
├── next.config.ts              # Next.js configuration
├── package.json                # Project dependencies and npm scripts
├── tsconfig.json               # TypeScript configuration
└── README.md                   # Project documentation
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have **Node.js 20+** and **npm** installed on your system.

### 1. Clone & Install Dependencies

```bash
# Clone the repository
git clone https://github.com/ahtisham0100/neenja-salary-calc.git

# Navigate into project directory
cd neenja

# Install dependencies
npm install
```

### 2. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

---

## 📜 Available Scripts

- `npm run dev` — Starts the Next.js development server with Turbopack.
- `npm run build` — Builds the optimized production application.
- `npm run start` — Starts the production server.
- `npm run lint` — Runs ESLint checks across all project files.

---
