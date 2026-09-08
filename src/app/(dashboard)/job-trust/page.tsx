"use client";

import { useState } from "react";
import type { Metadata } from "next";
import { Icon } from "@iconify/react";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { EvidenceCard } from "@/components/shared/EvidenceCard";
import { ResultStateCard } from "@/components/shared/ResultStateCard";

type Tab = "employer" | "job-safety";

const warningSignals = [
  { signal: "Upfront payment request",         severity: "high",   found: false },
  { signal: "Cryptocurrency / gift-card request", severity: "high", found: false },
  { signal: "Suspicious email domain",         severity: "high",   found: false },
  { signal: "Employer–domain mismatch",        severity: "medium", found: true  },
  { signal: "Pressure or urgency language",    severity: "medium", found: true  },
  { signal: "Vague responsibilities",          severity: "low",    found: true  },
  { signal: "Missing interview process detail",severity: "low",    found: false },
  { signal: "Unrealistic salary for role",     severity: "medium", found: false },
];

const severityConfig = {
  high:   { label:"High",   cls:"bg-red-50   text-red-700   border-red-200",   icon:"material-symbols:warning"         },
  medium: { label:"Medium", cls:"bg-amber-50 text-amber-700 border-amber-200", icon:"material-symbols:warning-outline" },
  low:    { label:"Low",    cls:"bg-blue-50  text-blue-700  border-blue-200",  icon:"material-symbols:info-outline"    },
};

export default function JobTrustPage() {
  const [tab, setTab] = useState<Tab>("employer");
  const [employerSearched, setEmployerSearched] = useState(false);
  const [safetyChecked, setSafetyChecked] = useState(false);

  const found = warningSignals.filter(w => w.found);

  return (
    <div className="mx-auto max-w-4xl px-8 py-10 space-y-6">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight">Job Trust Centre</h1>
        <p className="mt-1 text-sm text-muted-foreground max-w-2xl">
          Two independent assessments: employer registration records and job-advert safety signals.
          A registered company does not make a specific job safe — review both.
        </p>
      </header>

      {/* Tab bar */}
      <div className="flex gap-1 rounded-xl border border-border bg-muted/30 p-1 w-fit">
        {([["employer","Employer Verification","hugeicons:security-check"],["job-safety","Job Safety Check","material-symbols:policy-outline"]] as const).map(([t, label, icon]) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              tab === t ? "bg-card shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Icon icon={icon} className="size-4" aria-hidden />
            {label}
          </button>
        ))}
      </div>

      {/* Employer Verification */}
      {tab === "employer" && (
        <div className="space-y-6">
          <div className="rounded-xl border border-border bg-card p-6 space-y-4">
            <h2 className="text-sm font-semibold">Search company records</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {["Company name","Country","Registration number","Website","Email domain","Registered address"].map(f => (
                <div key={f}>
                  <label className="text-xs font-medium text-muted-foreground mb-1 block">{f}</label>
                  <input className="w-full h-9 rounded-lg border border-border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40" placeholder={`Enter ${f.toLowerCase()}…`} />
                </div>
              ))}
            </div>
            <button onClick={() => setEmployerSearched(true)} className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors">
              Search records
            </button>
          </div>

          {employerSearched && (
            <div className="space-y-4">
              {/* Result banner */}
              <div className="rounded-xl border border-green-200 bg-green-50 px-5 py-4 flex items-start gap-3">
                <Icon icon="material-symbols:verified" className="size-6 text-green-600 mt-0.5 shrink-0" aria-hidden />
                <div>
                  <p className="font-semibold text-green-900">Exact match found</p>
                  <p className="text-sm text-green-700 mt-0.5">The company name and registration number match a Companies House record.</p>
                </div>
                <StatusBadge variant="verified" className="ml-auto shrink-0" />
              </div>

              {/* Company details */}
              <div className="rounded-xl border border-border bg-card divide-y divide-border">
                {[
                  ["Legal name",          "Acme Technologies Limited"],
                  ["Trading name",        "Acme Ltd."],
                  ["Registration status", "Active"],
                  ["Registration no.",    "04729183"],
                  ["Registered address",  "1 Tech Street, London, EC1A 1BB"],
                  ["Incorporated",        "12 March 2002"],
                  ["Official authority",  "Companies House (UK)"],
                ].map(([k,v]) => (
                  <div key={k} className="flex gap-4 px-5 py-3 text-sm">
                    <span className="w-44 shrink-0 text-muted-foreground">{k}</span>
                    <span className="font-medium">{v}</span>
                  </div>
                ))}
              </div>

              <EvidenceCard source="Companies House" url="https://find-and-update.company-information.service.gov.uk" retrievedDate="7 Sep 2026" dataDate="7 Sep 2026" confidence="high" freshness="fresh" />

              <div className="rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-800 space-y-1">
                <p className="font-semibold">Suggested questions for the recruiter</p>
                <ul className="space-y-1 text-xs">
                  <li>· Can you confirm the legal company name that will appear on my employment contract?</li>
                  <li>· Is the role employed or via a third-party agency?</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Job Safety Check */}
      {tab === "job-safety" && (
        <div className="space-y-6">
          <div className="rounded-xl border border-border bg-card p-6 space-y-4">
            <h2 className="text-sm font-semibold">Analyse job advert or recruiter messages</h2>
            <div className="space-y-3">
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1 block">Paste job advert or recruiter message</label>
                <textarea rows={5} className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/40" placeholder="Paste the full job advert or message here…" />
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {["Recruiter email","Employer website"].map(f => (
                  <div key={f}>
                    <label className="text-xs font-medium text-muted-foreground mb-1 block">{f}</label>
                    <input className="w-full h-9 rounded-lg border border-border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40" placeholder={`Enter ${f.toLowerCase()}…`} />
                  </div>
                ))}
              </div>
            </div>
            <button onClick={() => setSafetyChecked(true)} className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors">
              Check for warning signs
            </button>
          </div>

          {safetyChecked && (
            <div className="space-y-4">
              {/* Overall */}
              <div className={`rounded-xl border px-5 py-4 flex items-start gap-3 ${found.some(w => w.severity === "high") ? "border-red-200 bg-red-50" : "border-amber-200 bg-amber-50"}`}>
                <Icon icon="material-symbols:warning-outline" className="size-6 text-amber-600 mt-0.5 shrink-0" aria-hidden />
                <div>
                  <p className="font-semibold">{found.length} warning signals detected</p>
                  <p className="text-sm text-muted-foreground mt-0.5">
                    {found.filter(w => w.severity === "high").length} high · {found.filter(w => w.severity === "medium").length} medium · {found.filter(w => w.severity === "low").length} low.
                    Review each signal and verify before proceeding.
                  </p>
                </div>
              </div>

              {/* Signal table */}
              <div className="rounded-xl border border-border bg-card divide-y divide-border">
                <div className="grid grid-cols-3 px-5 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  <span>Signal</span><span>Severity</span><span>Status</span>
                </div>
                {warningSignals.map((w) => {
                  const sc = severityConfig[w.severity as keyof typeof severityConfig];
                  return (
                    <div key={w.signal} className="grid grid-cols-3 items-center gap-4 px-5 py-3 text-sm">
                      <span className={w.found ? "text-foreground font-medium" : "text-muted-foreground"}>{w.signal}</span>
                      <span className={`inline-flex w-fit items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-medium ${sc.cls}`}>
                        <Icon icon={sc.icon} className="size-3" aria-hidden />{sc.label}
                      </span>
                      <span className={w.found ? "text-red-600 font-medium" : "text-green-600"}>
                        {w.found ? "⚠ Found" : "✓ Not found"}
                      </span>
                    </div>
                  );
                })}
              </div>

              <ResultStateCard
                state="partial"
                explanation="3 rule-based signals were detected. No high-risk signals (upfront payment, crypto request) were found, but the email domain and urgency language warrant manual verification."
                stillUsable="You can still view all signals and recommended checks."
                nextSteps={[
                  "Verify the recruiter email domain matches the company website",
                  "Ask the recruiter why a decision is needed urgently",
                  "Request a formal interview process timeline in writing",
                ]}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
