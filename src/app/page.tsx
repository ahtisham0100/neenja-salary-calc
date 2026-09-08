import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = { title: "Home" };

const quickActions = [
  { label: "Upload CV",            href: "/cv-upload",      icon: "material-symbols:upload-file-outline", description: "Add a new CV version"        },
  { label: "Scan CV vs Job",       href: "/resume-scan",    icon: "material-symbols:scan-outline",         description: "Check ATS match score"       },
  { label: "Add Application",      href: "/applications",   icon: "hugeicons:new-job",                    description: "Track a new role"            },
  { label: "Verify Employer",      href: "/job-trust",      icon: "hugeicons:security-check",             description: "Check company registration"  },
  { label: "Check Job Advert",     href: "/job-trust",      icon: "material-symbols:policy-outline",      description: "Scan for scam signals"       },
  { label: "Take-Home Pay",        href: "/salary",         icon: "lets-icons:line-up",                   description: "Estimate net income"         },
  { label: "Compare Offers",       href: "/salary?tab=compare", icon: "material-symbols:compare-arrows", description: "Side-by-side offer view"     },
  { label: "Ask the Assistant",    href: "/ai-assistant",   icon: "material-symbols:auto-awesome",        description: "Ask any career question"     },
];

const recentScans = [
  { role: "Senior Product Designer", company: "Fintech Co.", score: 82, match: "Strong match", date: "Today" },
  { role: "UX Lead",                 company: "HealthStart",  score: 61, match: "Possible match", date: "2 days ago" },
];

const attentionApps = [
  { role: "Product Designer",     company: "Acme Ltd.",   stage: "Interview",   action: "Send thank-you note",        deadline: "Tomorrow"     },
  { role: "Senior UX Designer",   company: "Nova Tech",   stage: "Offer",       action: "Review offer details",        deadline: "3 days left"  },
  { role: "UX Researcher",        company: "Startup XYZ", stage: "Assessment",  action: "Complete take-home task",     deadline: "In 5 hours"   },
];

const stageColor: Record<string, string> = {
  Interview:  "bg-blue-50 text-blue-700",
  Offer:      "bg-green-50 text-green-700",
  Assessment: "bg-amber-50 text-amber-700",
};

export default function HomePage() {
  return (
    <div className="mx-auto max-w-5xl px-8 py-10 space-y-10">

      {/* Header */}
      <header>
        <h1 className="text-2xl font-semibold tracking-tight">Good morning 👋</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Here&apos;s what needs your attention today.
        </p>
      </header>

      {/* Quick actions */}
      <section aria-label="Quick actions">
        <h2 className="mb-4 text-sm font-semibold text-muted-foreground uppercase tracking-wider">Quick actions</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {quickActions.map((a) => (
            <Link
              key={a.href + a.label}
              href={a.href}
              className="group flex flex-col gap-2 rounded-xl border border-border bg-card p-4 transition-all hover:border-primary/40 hover:bg-accent hover:shadow-sm"
            >
              <span className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <Icon icon={a.icon} className="size-4.5" aria-hidden />
              </span>
              <span className="text-sm font-semibold text-foreground">{a.label}</span>
              <span className="text-xs text-muted-foreground">{a.description}</span>
            </Link>
          ))}
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-2">

        {/* Applications needing attention */}
        <section aria-label="Applications needing attention">
          <h2 className="mb-3 text-sm font-semibold">Applications needing attention</h2>
          <div className="space-y-2">
            {attentionApps.map((app, i) => (
              <Link
                key={i}
                href="/applications"
                className="flex items-start justify-between gap-3 rounded-lg border border-border bg-card px-4 py-3 hover:bg-muted/40 transition-colors"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{app.role}</p>
                  <p className="text-xs text-muted-foreground">{app.company}</p>
                  <p className="mt-1 text-xs text-foreground">{app.action}</p>
                </div>
                <div className="flex flex-col items-end gap-1.5 shrink-0">
                  <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${stageColor[app.stage]}`}>
                    {app.stage}
                  </span>
                  <span className="text-xs text-muted-foreground">{app.deadline}</span>
                </div>
              </Link>
            ))}
          </div>
          <Link href="/applications" className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-primary underline underline-offset-2">
            View all applications <Icon icon="material-symbols:arrow-right-alt" className="size-3.5" />
          </Link>
        </section>

        {/* Recent CV scans */}
        <section aria-label="Recent CV scans">
          <h2 className="mb-3 text-sm font-semibold">Recent CV scans</h2>
          <div className="space-y-2">
            {recentScans.map((scan, i) => (
              <Link
                key={i}
                href="/resume-scan"
                className="flex items-center justify-between gap-4 rounded-lg border border-border bg-card px-4 py-3 hover:bg-muted/40 transition-colors"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{scan.role}</p>
                  <p className="text-xs text-muted-foreground">{scan.company} · {scan.date}</p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="text-lg font-bold tabular-nums text-primary">{scan.score}</span>
                  <span className="text-xs text-muted-foreground">{scan.match}</span>
                </div>
              </Link>
            ))}
          </div>
          <Link href="/resume-scan" className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-primary underline underline-offset-2">
            New scan <Icon icon="material-symbols:arrow-right-alt" className="size-3.5" />
          </Link>
        </section>

        {/* Career Profile completion */}
        <section aria-label="Career profile completion">
          <h2 className="mb-3 text-sm font-semibold">Career Profile</h2>
          <div className="rounded-xl border border-border bg-card px-5 py-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Profile completion</span>
              <span className="text-sm font-semibold">68%</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
              <div className="h-full w-[68%] rounded-full bg-primary transition-all" />
            </div>
            <ul className="space-y-1.5 text-xs text-muted-foreground">
              {["Add certifications (3 missing)", "Confirm 2 AI-extracted skills", "Add visa / sponsorship status"].map((tip) => (
                <li key={tip} className="flex items-center gap-1.5">
                  <Icon icon="material-symbols:radio-button-unchecked" className="size-3 text-amber-500 shrink-0" aria-hidden />
                  {tip}
                </li>
              ))}
            </ul>
            <Link href="/career-profile" className="inline-flex items-center gap-1 text-xs font-medium text-primary underline underline-offset-2">
              Complete profile <Icon icon="material-symbols:arrow-right-alt" className="size-3.5" />
            </Link>
          </div>
        </section>

        {/* Recent trust checks */}
        <section aria-label="Recent trust checks">
          <h2 className="mb-3 text-sm font-semibold">Recent trust checks</h2>
          <div className="space-y-2">
            {[
              { company: "Nova Technologies Ltd.",  status: "Verified",       statusClass: "text-green-700 bg-green-50", icon: "material-symbols:verified-outline" },
              { company: "Recruiter: jobs@hirefast.io", status: "2 warnings", statusClass: "text-amber-700 bg-amber-50", icon: "material-symbols:warning-outline"  },
            ].map((check, i) => (
              <Link key={i} href="/job-trust" className="flex items-center justify-between gap-3 rounded-lg border border-border bg-card px-4 py-3 hover:bg-muted/40 transition-colors">
                <p className="truncate text-sm font-medium">{check.company}</p>
                <span className={`flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${check.statusClass}`}>
                  <Icon icon={check.icon} className="size-3" aria-hidden />
                  {check.status}
                </span>
              </Link>
            ))}
          </div>
          <Link href="/job-trust" className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-primary underline underline-offset-2">
            New check <Icon icon="material-symbols:arrow-right-alt" className="size-3.5" />
          </Link>
        </section>

      </div>
    </div>
  );
}
