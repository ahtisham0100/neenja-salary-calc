"use client";

import { useState } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { cn } from "@/lib/utils";

const stages = ["Interested","Saved","Preparing","Applied","Assessment","Interview","Offer","Negotiating","Accepted","Rejected","Withdrawn"] as const;
type Stage = typeof stages[number];

const stageColor: Record<Stage, string> = {
  Interested:  "bg-gray-100  text-gray-600",
  Saved:       "bg-gray-100  text-gray-600",
  Preparing:   "bg-blue-50   text-blue-700",
  Applied:     "bg-blue-100  text-blue-800",
  Assessment:  "bg-amber-50  text-amber-700",
  Interview:   "bg-purple-50 text-purple-700",
  Offer:       "bg-green-50  text-green-700",
  Negotiating: "bg-teal-50   text-teal-700",
  Accepted:    "bg-green-100 text-green-800",
  Rejected:    "bg-red-50    text-red-600",
  Withdrawn:   "bg-gray-100  text-gray-500",
};

type App = {
  id: number; title: string; company: string; location: string;
  stage: Stage; applied: string; nextAction: string; deadline: string;
  salary: string; cv: string; risk: "verified" | "warning" | "unchecked";
};

const apps: App[] = [
  { id:1, title:"Senior Product Designer", company:"Acme Ltd.",      location:"London",    stage:"Interview",   applied:"2 Sep",  nextAction:"Send thank-you email",     deadline:"Tomorrow",  salary:"£72k",  cv:"v3", risk:"verified"  },
  { id:2, title:"UX Lead",                 company:"Nova Tech",      location:"Remote",    stage:"Offer",       applied:"28 Aug", nextAction:"Review offer letter",       deadline:"3 days",    salary:"£85k",  cv:"v3", risk:"verified"  },
  { id:3, title:"UX Researcher",           company:"HealthStart",    location:"Manchester",stage:"Assessment",  applied:"1 Sep",  nextAction:"Submit take-home task",     deadline:"Today 5pm", salary:"£60k",  cv:"v2", risk:"unchecked" },
  { id:4, title:"Product Designer",        company:"TechCorp",       location:"Edinburgh", stage:"Applied",     applied:"3 Sep",  nextAction:"Follow up if no reply",     deadline:"10 Sep",    salary:"£65k",  cv:"v3", risk:"warning"   },
  { id:5, title:"Design Manager",          company:"BigCo",          location:"London",    stage:"Preparing",   applied:"—",      nextAction:"Tailor CV for this role",   deadline:"—",         salary:"£90k",  cv:"v3", risk:"unchecked" },
  { id:6, title:"Interaction Designer",    company:"AgencyX",        location:"Remote",    stage:"Rejected",    applied:"20 Aug", nextAction:"Archive",                   deadline:"—",         salary:"£55k",  cv:"v1", risk:"unchecked" },
];

const riskIcon: Record<App["risk"], { icon: string; cls: string; label: string }> = {
  verified:  { icon: "material-symbols:verified-outline",   cls: "text-green-600", label: "Employer verified"   },
  warning:   { icon: "material-symbols:warning-outline",    cls: "text-amber-600", label: "Warnings found"      },
  unchecked: { icon: "material-symbols:help-outline",       cls: "text-gray-400",  label: "Not checked"         },
};

export default function ApplicationsPage() {
  const [search, setSearch] = useState("");
  const [stageFilter, setStageFilter] = useState<Stage | "">("");

  const filtered = apps.filter((a) =>
    (a.title + a.company).toLowerCase().includes(search.toLowerCase()) &&
    (stageFilter === "" || a.stage === stageFilter)
  );

  return (
    <div className="mx-auto max-w-6xl px-8 py-10 space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Applications</h1>
          <p className="mt-1 text-sm text-muted-foreground">{apps.length} tracked · {apps.filter(a => ["Interview","Offer","Assessment"].includes(a.stage)).length} active</p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors shrink-0">
          <Icon icon="material-symbols:add" className="size-4" aria-hidden />
          Add application
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="relative">
          <Icon icon="material-symbols:search" className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search role or company…"
            className="h-9 rounded-lg border border-border bg-card pl-9 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
          />
        </div>
        <select
          value={stageFilter}
          onChange={e => setStageFilter(e.target.value as Stage | "")}
          className="h-9 rounded-lg border border-border bg-card px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
        >
          <option value="">All stages</option>
          {stages.map(s => <option key={s}>{s}</option>)}
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-border bg-card">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              {["Role","Company","Location","Stage","Applied","Next action","Deadline","Salary","CV","Trust"].map(h => (
                <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filtered.map((app) => {
              const risk = riskIcon[app.risk];
              return (
                <tr key={app.id} className="hover:bg-muted/20 transition-colors">
                  <td className="px-4 py-3">
                    <Link href={`/applications/${app.id}`} className="font-medium text-foreground hover:text-primary underline-offset-2 hover:underline">
                      {app.title}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">{app.company}</td>
                  <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">{app.location}</td>
                  <td className="px-4 py-3">
                    <span className={cn("rounded-full px-2.5 py-0.5 text-xs font-medium whitespace-nowrap", stageColor[app.stage])}>
                      {app.stage}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">{app.applied}</td>
                  <td className="px-4 py-3 text-foreground max-w-[200px] truncate">{app.nextAction}</td>
                  <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">{app.deadline}</td>
                  <td className="px-4 py-3 text-muted-foreground whitespace-nowrap tabular-nums">{app.salary}</td>
                  <td className="px-4 py-3 text-muted-foreground">{app.cv}</td>
                  <td className="px-4 py-3">
                    <Icon icon={risk.icon} className={cn("size-4.5", risk.cls)} aria-label={risk.label} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
