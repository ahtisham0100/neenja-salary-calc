import type { Metadata } from "next";
import { Icon } from "@iconify/react";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = { title: "Career Profile" };

const sections = [
  {
    title: "Employment History",
    icon: "hugeicons:new-job",
    fields: [
      { label: "Role",     value: "Senior Product Designer",  status: "confirmed"    as const },
      { label: "Company",  value: "Fintech Solutions Ltd.",    status: "confirmed"    as const },
      { label: "Period",   value: "Jan 2022 – Present",       status: "ai-extracted" as const },
      { label: "Summary",  value: "Led end-to-end design of a payments dashboard serving 2M users. Reduced task completion time by 34%.", status: "ai-extracted" as const },
    ],
  },
  {
    title: "Education",
    icon: "material-symbols:school-outline",
    fields: [
      { label: "Degree",      value: "BA Graphic Design",       status: "confirmed"    as const },
      { label: "Institution", value: "University of Leeds",      status: "confirmed"    as const },
      { label: "Year",        value: "2018",                    status: "ai-extracted" as const },
    ],
  },
];

const skills = [
  { name: "Figma",          status: "confirmed"     as const },
  { name: "User Research",  status: "confirmed"     as const },
  { name: "Prototyping",    status: "ai-extracted"  as const },
  { name: "Design Systems", status: "confirmed"     as const },
  { name: "Accessibility",  status: "inferred"      as const },
  { name: "React",          status: "needs-confirmation" as const },
];

const preferences = [
  { label: "Preferred roles",     value: "Product Designer, UX Lead, Design Manager" },
  { label: "Preferred locations", value: "London, Remote (UK)" },
  { label: "Salary expectation",  value: "£65,000 – £80,000 per year" },
  { label: "Work style",          value: "Hybrid or remote" },
  { label: "Visa / sponsorship",  value: "Not specified" },
];

export default function CareerProfilePage() {
  return (
    <div className="mx-auto max-w-5xl px-8 py-10 space-y-8">

      {/* Header */}
      <header className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Career Profile</h1>
          <p className="mt-1 text-sm text-muted-foreground max-w-xl">
            Your confirmed career information, extracted from your CV and verified by you.
            AI-extracted fields are highlighted — review and approve them.
          </p>
        </div>
        <a
          href="/cv-upload"
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors shrink-0"
        >
          <Icon icon="material-symbols:upload-file-outline" className="size-4" aria-hidden />
          Update CV
        </a>
      </header>

      {/* Profile summary card */}
      <div className="rounded-xl border border-border bg-card px-6 py-5 flex gap-5 items-center">
        <span className="flex size-16 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-2xl font-bold">
          JD
        </span>
        <div className="min-w-0">
          <p className="text-lg font-semibold">Jane Doe</p>
          <p className="text-sm text-muted-foreground">Senior Product Designer · London, UK</p>
          <div className="mt-2 flex flex-wrap gap-2">
            <StatusBadge variant="confirmed" />
            <span className="text-xs text-muted-foreground">Profile 68% complete</span>
          </div>
        </div>
        <div className="ml-auto shrink-0">
          <div className="h-12 w-12">
            <svg viewBox="0 0 36 36" className="size-12 -rotate-90">
              <circle cx="18" cy="18" r="15.9" fill="none" stroke="#e4e4e4" strokeWidth="3" />
              <circle cx="18" cy="18" r="15.9" fill="none" stroke="#90b200" strokeWidth="3"
                strokeDasharray={`${68} ${100 - 68}`} strokeLinecap="round" />
            </svg>
          </div>
        </div>
      </div>

      {/* AI-extracted notice */}
      <div className="flex items-start gap-2.5 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm">
        <Icon icon="material-symbols:auto-awesome" className="mt-0.5 size-4 shrink-0 text-amber-600" aria-hidden />
        <p className="text-amber-800">
          <span className="font-semibold">2 fields need your review.</span>{" "}
          AI-extracted information is shown with a badge. Approve, edit, or reject each one.
        </p>
      </div>

      {/* Employment + Education */}
      {sections.map((section) => (
        <section key={section.title} aria-label={section.title}>
          <div className="mb-3 flex items-center gap-2">
            <Icon icon={section.icon} className="size-4.5 text-muted-foreground" aria-hidden />
            <h2 className="text-sm font-semibold">{section.title}</h2>
          </div>
          <div className="rounded-xl border border-border bg-card divide-y divide-border">
            {section.fields.map((field) => (
              <div key={field.label} className="flex items-start justify-between gap-4 px-5 py-3.5">
                <div className="min-w-0">
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-0.5">{field.label}</p>
                  <p className="text-sm text-foreground">{field.value}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <StatusBadge variant={field.status} />
                  {field.status === "ai-extracted" && (
                    <div className="flex gap-1">
                      <button className="rounded px-2 py-1 text-xs font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">Approve</button>
                      <button className="rounded px-2 py-1 text-xs font-medium border border-border hover:bg-muted transition-colors">Edit</button>
                      <button className="rounded px-2 py-1 text-xs font-medium text-muted-foreground hover:bg-muted transition-colors">Reject</button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}

      {/* Skills */}
      <section aria-label="Skills">
        <div className="mb-3 flex items-center gap-2">
          <Icon icon="material-symbols:star-outline" className="size-4.5 text-muted-foreground" aria-hidden />
          <h2 className="text-sm font-semibold">Skills</h2>
        </div>
        <div className="rounded-xl border border-border bg-card px-5 py-4">
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span
                key={skill.name}
                className="flex items-center gap-1.5 rounded-full border border-border bg-muted px-3 py-1 text-xs font-medium"
              >
                {skill.name}
                <StatusBadge variant={skill.status} showIcon className="text-[10px] px-1.5 py-0" />
              </span>
            ))}
          </div>
          <button className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-primary underline underline-offset-2">
            <Icon icon="material-symbols:add" className="size-3.5" aria-hidden />
            Add skill
          </button>
        </div>
      </section>

      {/* Career preferences */}
      <section aria-label="Career preferences">
        <div className="mb-3 flex items-center gap-2">
          <Icon icon="material-symbols:tune" className="size-4.5 text-muted-foreground" aria-hidden />
          <h2 className="text-sm font-semibold">Career Preferences</h2>
        </div>
        <div className="rounded-xl border border-border bg-card divide-y divide-border">
          {preferences.map((pref) => (
            <div key={pref.label} className="flex items-center justify-between gap-4 px-5 py-3.5">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{pref.label}</p>
              <div className="flex items-center gap-2">
                <p className="text-sm text-foreground text-right">{pref.value}</p>
                <button className="text-muted-foreground hover:text-foreground transition-colors">
                  <Icon icon="material-symbols:edit-outline" className="size-4" aria-hidden />
                  <span className="sr-only">Edit {pref.label}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
