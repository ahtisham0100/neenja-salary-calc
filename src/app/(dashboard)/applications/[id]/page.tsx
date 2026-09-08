import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { EvidenceCard } from "@/components/shared/EvidenceCard";

export const metadata: Metadata = { title: "Application Detail" };

export default async function ApplicationDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <div className="mx-auto max-w-4xl px-8 py-10 space-y-8">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/applications" className="hover:text-foreground transition-colors">Applications</Link>
        <Icon icon="material-symbols:chevron-right" className="size-4" aria-hidden />
        <span className="text-foreground font-medium">Senior Product Designer</span>
      </div>

      <header className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Senior Product Designer</h1>
          <p className="mt-1 text-sm text-muted-foreground">Acme Ltd. · London · £72,000</p>
          <div className="mt-2 flex flex-wrap gap-2">
            <span className="rounded-full bg-purple-50 px-3 py-0.5 text-xs font-medium text-purple-700">Interview</span>
            <span className="text-xs text-muted-foreground">Applied 2 Sep 2026</span>
          </div>
        </div>
        <div className="flex gap-2 shrink-0">
          <button className="rounded-lg border border-border px-3 py-2 text-sm font-medium hover:bg-muted transition-colors">Add note</button>
          <button className="rounded-lg bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors">Update stage</button>
        </div>
      </header>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Main content */}
        <div className="md:col-span-2 space-y-6">

          {/* Job info */}
          <section className="rounded-xl border border-border bg-card p-5 space-y-3" aria-label="Job information">
            <h2 className="text-sm font-semibold flex items-center gap-2">
              <Icon icon="hugeicons:new-job" className="size-4.5 text-muted-foreground" aria-hidden /> Job Information
            </h2>
            {[
              ["Job title",  "Senior Product Designer"],
              ["Employer",   "Acme Ltd."],
              ["Location",   "London (Hybrid, 3 days in office)"],
              ["Salary",     "£70,000 – £75,000 + equity"],
              ["Contract",   "Permanent, full-time"],
              ["Posted",     "28 Aug 2026"],
            ].map(([k,v]) => (
              <div key={k} className="flex gap-4 text-sm">
                <span className="w-28 shrink-0 text-muted-foreground">{k}</span>
                <span className="text-foreground">{v}</span>
              </div>
            ))}
          </section>

          {/* Notes */}
          <section className="rounded-xl border border-border bg-card p-5 space-y-3" aria-label="Notes">
            <h2 className="text-sm font-semibold flex items-center gap-2">
              <Icon icon="material-symbols:notes" className="size-4.5 text-muted-foreground" aria-hidden /> Notes
            </h2>
            <p className="text-sm text-muted-foreground">Spoke with recruiter Alice on 3 Sep. First interview scheduled for 8 Sep. Panel of 3: hiring manager, design lead, and product manager.</p>
          </section>

          {/* ATS scan */}
          <section className="rounded-xl border border-border bg-card p-5 space-y-3" aria-label="ATS scan result">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold flex items-center gap-2">
                <Icon icon="material-symbols:scan-outline" className="size-4.5 text-muted-foreground" aria-hidden /> ATS Scan
              </h2>
              <Link href="/resume-scan" className="text-xs text-primary underline underline-offset-2">Run new scan</Link>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-3xl font-bold tabular-nums text-primary">82</span>
              <div>
                <StatusBadge variant="strong-match" />
                <p className="mt-1 text-xs text-muted-foreground">CV v3 · scanned 2 Sep</p>
              </div>
            </div>
          </section>

          {/* Activity history */}
          <section className="rounded-xl border border-border bg-card p-5 space-y-4" aria-label="Activity history">
            <h2 className="text-sm font-semibold flex items-center gap-2">
              <Icon icon="material-symbols:history" className="size-4.5 text-muted-foreground" aria-hidden /> Activity History
            </h2>
            {[
              { date:"8 Sep",  text:"Interview scheduled — panel of 3" },
              { date:"3 Sep",  text:"Spoke with recruiter Alice Chen"   },
              { date:"2 Sep",  text:"Application submitted via LinkedIn" },
              { date:"1 Sep",  text:"CV scanned — 82/100 match"         },
            ].map((e,i) => (
              <div key={i} className="flex gap-3 text-sm">
                <span className="w-14 shrink-0 text-xs text-muted-foreground pt-0.5">{e.date}</span>
                <div className="flex items-start gap-2">
                  <div className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                  <span>{e.text}</span>
                </div>
              </div>
            ))}
          </section>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Recruiter */}
          <section className="rounded-xl border border-border bg-card p-4 space-y-2" aria-label="Recruiter details">
            <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Recruiter</h2>
            <p className="text-sm font-medium">Alice Chen</p>
            <p className="text-xs text-muted-foreground">alice@acme.co.uk</p>
            <Link href="/job-trust" className="inline-flex items-center gap-1 text-xs text-primary underline underline-offset-2">
              <Icon icon="hugeicons:security-check" className="size-3.5" /> Check employer
            </Link>
          </section>

          {/* Employer verification */}
          <section className="rounded-xl border border-green-200 bg-green-50 p-4 space-y-2" aria-label="Employer verification">
            <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Employer trust</h2>
            <StatusBadge variant="verified" />
            <p className="text-xs text-muted-foreground">Acme Ltd. is registered at Companies House. Reg. 04729183.</p>
            <EvidenceCard source="Companies House" retrievedDate="2 Sep 2026" confidence="high" freshness="fresh" />
          </section>

          {/* Deadline */}
          <section className="rounded-xl border border-border bg-card p-4 space-y-2" aria-label="Key dates">
            <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Key dates</h2>
            {[["Interview","8 Sep 2026, 10am"],["Offer deadline","—"],["Start date","Negotiable"]].map(([k,v]) => (
              <div key={k} className="flex justify-between text-sm">
                <span className="text-muted-foreground">{k}</span>
                <span className="font-medium">{v}</span>
              </div>
            ))}
          </section>
        </div>
      </div>
    </div>
  );
}
