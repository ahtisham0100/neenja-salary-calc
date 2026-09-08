"use client";

import { useState } from "react";
import type { Metadata } from "next";
import { Icon } from "@iconify/react";
import { Textarea } from "@/components/ui/textarea";
import { CvUploadZone } from "@/components/resume-scan/CvUploadZone";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { EvidenceCard } from "@/components/shared/EvidenceCard";
import { CalculationBreakdown } from "@/components/shared/CalculationBreakdown";

const scoreBreakdown = [
  { category: "Required skills",    score: 88, max: 100, match: "strong-match"   as const },
  { category: "Preferred skills",   score: 70, max: 100, match: "possible-match" as const },
  { category: "Experience",         score: 90, max: 100, match: "strong-match"   as const },
  { category: "Education",          score: 100,max: 100, match: "verified"       as const },
  { category: "Certifications",     score: 40, max: 100, match: "partial"        as const },
  { category: "Keywords",           score: 72, max: 100, match: "possible-match" as const },
  { category: "Transferable skills",score: 65, max: 100, match: "possible-match" as const },
  { category: "CV structure",       score: 85, max: 100, match: "strong-match"   as const },
  { category: "Readability",        score: 90, max: 100, match: "strong-match"   as const },
  { category: "Formatting",         score: 80, max: 100, match: "strong-match"   as const },
];

const matched = [
  { requirement: "5+ years UX/Product design",  cvEvidence: "6 years at Fintech Solutions",   jdEvidence: "Minimum 5 years required", matchType: "Exact"    },
  { requirement: "Figma proficiency",            cvEvidence: "Figma listed in skills section", jdEvidence: "Figma listed as required",  matchType: "Exact"    },
  { requirement: "BA/BSc in design field",       cvEvidence: "BA Graphic Design, Leeds",       jdEvidence: "Degree in design or equivalent", matchType: "Strong" },
];

const missing = [
  { requirement: "AWS certification", category: "Missing",               suggestion: "Add AWS certification or note cloud exposure" },
  { requirement: "People management", category: "Partially supported",   suggestion: "Mention mentoring 2 junior designers"          },
  { requirement: "B2B SaaS experience",category: "Unclear",              suggestion: "Clarify if Fintech Solutions is B2B SaaS"       },
];

const rewrites = [
  {
    original:  "Led design of payments dashboard",
    suggested: "Led end-to-end UX design of a B2B payments dashboard serving 2 M+ users, reducing task completion time by 34 %",
    evidence:  "JD requests quantified impact and user scale",
    warning:   null,
  },
  {
    original:  "Worked with engineers on implementation",
    suggested: "Collaborated with a team of 8 engineers across 3 squads to deliver design solutions on a 2-week sprint cycle",
    evidence:  "JD requires cross-functional collaboration evidence",
    warning:   "Only add team size and sprint detail if accurate",
  },
];

export default function ResumeScanPage() {
  const [showResults, setShowResults] = useState(false);

  return (
    <div className="mx-auto max-w-5xl px-8 py-10 space-y-8">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight">ATS Optimisation Scan</h1>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          Upload your CV and paste the job description. We&apos;ll show how well your resume
          matches what applicant tracking systems look for.
        </p>
      </header>

      {/* Inputs */}
      <div className="grid gap-6 md:grid-cols-2">
        <section aria-label="CV upload">
          <h2 className="mb-3 text-sm font-medium">Your CV</h2>
          <CvUploadZone />
        </section>
        <section aria-label="Job description">
          <h2 className="mb-3 text-sm font-medium">Job Description</h2>
          <Textarea placeholder="Paste the job description here…" className="min-h-64 h-full resize-none rounded-lg bg-card" />
        </section>
      </div>
      <div className="flex justify-end">
        <button
          onClick={() => setShowResults(true)}
          className="rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          Run ATS Scan
        </button>
      </div>

      {/* Results */}
      {showResults && (
        <div className="space-y-8 border-t border-border pt-8">

          {/* Summary */}
          <div className="rounded-xl border border-border bg-card px-6 py-6 flex flex-col sm:flex-row gap-6 items-start">
            <div className="flex flex-col items-center">
              <div className="relative flex size-24 items-center justify-center">
                <svg viewBox="0 0 36 36" className="size-24 -rotate-90">
                  <circle cx="18" cy="18" r="15.9" fill="none" stroke="#e4e4e4" strokeWidth="3" />
                  <circle cx="18" cy="18" r="15.9" fill="none" stroke="#90b200" strokeWidth="3"
                    strokeDasharray="82 18" strokeLinecap="round" />
                </svg>
                <span className="absolute text-2xl font-bold tabular-nums">82</span>
              </div>
              <StatusBadge variant="strong-match" className="mt-2" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-lg font-semibold">Strong match for Senior Product Designer</p>
              <p className="mt-1 text-sm text-muted-foreground max-w-lg">
                Your CV aligns well with the core requirements. Three areas could boost your score further.
              </p>
              <div className="mt-3 space-y-1.5">
                {["Add AWS certification or equivalent cloud exposure", "Clarify B2B SaaS experience", "Quantify user scale on payments dashboard"].map((tip) => (
                  <div key={tip} className="flex items-start gap-2 text-sm">
                    <Icon icon="material-symbols:arrow-right-alt" className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
                    {tip}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Score breakdown */}
          <section aria-label="Score breakdown">
            <h2 className="mb-3 text-sm font-semibold">Score Breakdown</h2>
            <div className="rounded-xl border border-border bg-card divide-y divide-border">
              {scoreBreakdown.map((row) => (
                <div key={row.category} className="flex items-center gap-4 px-5 py-3">
                  <span className="w-40 shrink-0 text-sm text-muted-foreground">{row.category}</span>
                  <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
                    <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${row.score}%` }} />
                  </div>
                  <span className="w-8 text-right text-sm font-semibold tabular-nums">{row.score}</span>
                  <StatusBadge variant={row.match} className="shrink-0" />
                </div>
              ))}
            </div>
          </section>

          {/* Matched requirements */}
          <section aria-label="Matched requirements">
            <h2 className="mb-3 text-sm font-semibold">Matched Requirements</h2>
            <div className="rounded-xl border border-border bg-card divide-y divide-border">
              {matched.map((row) => (
                <div key={row.requirement} className="grid grid-cols-4 gap-4 px-5 py-4 text-xs">
                  <div><p className="font-medium text-foreground">{row.requirement}</p></div>
                  <div><p className="text-muted-foreground">{row.cvEvidence}</p></div>
                  <div><p className="text-muted-foreground">{row.jdEvidence}</p></div>
                  <div><StatusBadge variant="strong-match" /></div>
                </div>
              ))}
            </div>
          </section>

          {/* Missing / weak */}
          <section aria-label="Missing or weak requirements">
            <h2 className="mb-3 text-sm font-semibold">Missing or Weak Requirements</h2>
            <div className="space-y-2">
              {missing.map((row) => (
                <div key={row.requirement} className="rounded-lg border border-border bg-card px-4 py-3 flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-sm font-medium">{row.requirement}</span>
                      <StatusBadge variant={row.category === "Missing" ? "unavailable" : row.category === "Partially supported" ? "partial" : "needs-confirmation"} />
                    </div>
                    <p className="text-xs text-muted-foreground">{row.suggestion}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Rewrite suggestions */}
          <section aria-label="Rewrite suggestions">
            <h2 className="mb-3 text-sm font-semibold">Rewrite Suggestions</h2>
            <div className="space-y-3">
              {rewrites.map((rw, i) => (
                <div key={i} className="rounded-xl border border-border bg-card px-5 py-4 space-y-3">
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div>
                      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">Original</p>
                      <p className="text-sm text-muted-foreground italic">{rw.original}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-primary uppercase tracking-wider mb-1">Suggested</p>
                      <p className="text-sm text-foreground">{rw.suggested}</p>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">Evidence: {rw.evidence}</p>
                  {rw.warning && (
                    <div className="flex items-start gap-1.5 text-xs text-amber-700">
                      <Icon icon="material-symbols:warning-outline" className="size-3.5 mt-0.5 shrink-0" aria-hidden />
                      {rw.warning}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          <EvidenceCard source="AI analysis (session-only)" retrievedDate="Just now" confidence="medium" freshness="fresh" />
        </div>
      )}
    </div>
  );
}
