"use client";

import { useState } from "react";
import { Icon } from "@iconify/react";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { EvidenceCard } from "@/components/shared/EvidenceCard";
import { CalculationBreakdown } from "@/components/shared/CalculationBreakdown";

type Tab = "salary" | "city" | "minwage" | "compare";

const tabs: { id: Tab; label: string; icon: string }[] = [
  { id: "salary",  label: "Take-Home Pay",    icon: "lets-icons:line-up"                },
  { id: "city",    label: "City Affordability",icon: "ph:globe"                          },
  { id: "minwage", label: "Min. Wage Checker", icon: "material-symbols:gavel-outline"   },
  { id: "compare", label: "Compare Offers",    icon: "material-symbols:compare-arrows"  },
];

/* ─── Salary tab ─── */
function SalaryTab() {
  const [calculated, setCalculated] = useState(false);
  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-border bg-card p-6 space-y-4">
        <h2 className="text-sm font-semibold">Salary inputs</h2>
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            ["Salary amount","70000"],["Frequency","Annual"],["Currency","GBP"],
            ["Country","United Kingdom"],["Region / tax area","England"],["Tax year","2026–27"],
            ["Working hours / week","37.5"],["Working weeks / year","48"],["Pension (%)","5"],
          ].map(([label, placeholder]) => (
            <div key={label}>
              <label className="text-xs font-medium text-muted-foreground mb-1 block">{label}</label>
              <input defaultValue={placeholder} className="w-full h-9 rounded-lg border border-border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40" />
            </div>
          ))}
        </div>
        <button onClick={() => setCalculated(true)} className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors">
          Calculate take-home pay
        </button>
      </div>

      {calculated && (
        <div className="space-y-4">
          <div className="flex items-start gap-2 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-xs text-amber-800">
            <Icon icon="material-symbols:calculate-outline" className="size-4 mt-0.5 shrink-0" aria-hidden />
            <span><strong>Estimate only.</strong> This is based on standard tax rates and your inputs. Your actual pay may differ based on personal circumstances, tax codes, and employer deductions.</span>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {[
              { label:"Gross annual",     value:"£70,000",  sub:""                        },
              { label:"Estimated tax",    value:"−£17,232", sub:"Income tax + NI"         },
              { label:"Pension (5%)",     value:"−£3,500",  sub:"Employee contribution"   },
              { label:"Est. net annual",  value:"£49,268",  sub:"After tax & pension"     },
              { label:"Monthly take-home",value:"£4,106",   sub:"Net / 12"                },
              { label:"Effective hourly", value:"£25.66",   sub:"Net / 1,920 hrs/yr"      },
            ].map((r) => (
              <div key={r.label} className="rounded-xl border border-border bg-card px-4 py-4">
                <p className="text-xs text-muted-foreground mb-1">{r.label}</p>
                <p className="text-xl font-bold tabular-nums text-foreground">{r.value}</p>
                {r.sub && <p className="text-xs text-muted-foreground mt-0.5">{r.sub}</p>}
              </div>
            ))}
          </div>

          <StatusBadge variant="estimate" />

          <CalculationBreakdown
            title="How this was calculated"
            lines={[
              { label:"Personal allowance",  value:"£12,570",  rule:"UK 2026–27 standard personal allowance", source:"HMRC" },
              { label:"Basic rate tax (20%)",value:"£7,540",   formula:"(£50,270 − £12,570) × 20%",          source:"HMRC" },
              { label:"Higher rate tax (40%)",value:"£7,892",  formula:"(£70,000 − £50,270) × 40%",          source:"HMRC" },
              { label:"NI Class 1",           value:"£4,284",  rule:"12% on earnings £12,570–£50,270",       source:"HMRC", isAssumption:true },
              { label:"Pension deduction",    value:"£3,500",  formula:"£70,000 × 5%",                       source:"User input" },
            ]}
          />

          <EvidenceCard source="HMRC tax tables 2026–27" retrievedDate="7 Sep 2026" dataDate="6 Apr 2026" confidence="high" freshness="fresh" />
        </div>
      )}
    </div>
  );
}

/* ─── City tab ─── */
function CityTab() {
  const [researched, setResearched] = useState(false);
  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-border bg-card p-6 space-y-4">
        <h2 className="text-sm font-semibold">Household setup</h2>
        <div className="grid gap-3 sm:grid-cols-3">
          {[["City","London"],["Country","United Kingdom"],["Adults","1"],["Children","0"],["Housing type","1-bed flat"],["Location","City centre"],["Transport","Public transport"],["Work arrangement","Hybrid (3 days)"]].map(([l,p]) => (
            <div key={l}>
              <label className="text-xs font-medium text-muted-foreground mb-1 block">{l}</label>
              <input defaultValue={p} className="w-full h-9 rounded-lg border border-border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40" />
            </div>
          ))}
        </div>
        <button onClick={() => setResearched(true)} className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors">
          Research costs
        </button>
      </div>

      {researched && (
        <div className="space-y-4">
          <div className="rounded-xl border border-border bg-card divide-y divide-border">
            <div className="grid grid-cols-4 px-5 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              <span>Category</span><span className="text-right">Low</span><span className="text-right">Central</span><span className="text-right">High</span>
            </div>
            {[
              ["Housing",       "£1,400","£1,700","£2,100","researched"],
              ["Utilities",     "£120",  "£160",  "£220",  "researched"],
              ["Food",          "£250",  "£350",  "£500",  "researched"],
              ["Transport",     "£148",  "£175",  "£200",  "researched"],
              ["Healthcare",    "£30",   "£50",   "£80",   "researched"],
              ["Other",         "£100",  "£150",  "£250",  "researched"],
            ].map(([cat,lo,mid,hi,src]) => (
              <div key={cat} className="grid grid-cols-4 items-center px-5 py-3 text-sm">
                <span className="text-muted-foreground flex items-center gap-1.5">
                  {cat}
                  {src === "user" && <span className="text-[10px] bg-blue-50 text-blue-600 rounded px-1">You</span>}
                </span>
                <span className="text-right text-muted-foreground tabular-nums">{lo}</span>
                <span className="text-right font-medium tabular-nums">{mid}</span>
                <span className="text-right text-muted-foreground tabular-nums">{hi}</span>
              </div>
            ))}
            <div className="grid grid-cols-4 px-5 py-3 text-sm font-semibold border-t-2 border-border">
              <span>Total</span>
              <span className="text-right tabular-nums">£2,048</span>
              <span className="text-right tabular-nums text-primary">£2,585</span>
              <span className="text-right tabular-nums">£3,350</span>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {[
              { label:"Disposable income", value:"£1,521/mo", sub:"Take-home minus central costs" },
              { label:"Housing ratio",     value:"41%",        sub:"Housing / gross income"        },
              { label:"Savings rate",      value:"18%",        sub:"Estimated savings / net income" },
            ].map(r => (
              <div key={r.label} className="rounded-xl border border-border bg-card px-4 py-4">
                <p className="text-xs text-muted-foreground">{r.label}</p>
                <p className="text-xl font-bold tabular-nums mt-1">{r.value}</p>
                <p className="text-xs text-muted-foreground">{r.sub}</p>
              </div>
            ))}
          </div>

          <StatusBadge variant="estimate" />
          <EvidenceCard source="Numbeo (London, Q3 2026)" retrievedDate="7 Sep 2026" dataDate="Sep 2026" confidence="medium" freshness="ok" />
        </div>
      )}
    </div>
  );
}

/* ─── Minimum wage tab ─── */
function MinWageTab() {
  const [checked, setChecked] = useState(false);
  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-border bg-card p-6 space-y-4">
        <h2 className="text-sm font-semibold">Check minimum wage compliance</h2>
        <div className="grid gap-3 sm:grid-cols-3">
          {[["Country","United Kingdom"],["Worker age","25"],["Apprentice?","No"],["Industry","Retail"],["Employment type","Part-time"],["Contracted hrs/wk","25"],["Actual hrs/wk","28"],["Offered rate","£11.50/hr"],["Deductions (£/mo)","0"]].map(([l,p]) => (
            <div key={l}>
              <label className="text-xs font-medium text-muted-foreground mb-1 block">{l}</label>
              <input defaultValue={p} className="w-full h-9 rounded-lg border border-border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40" />
            </div>
          ))}
        </div>
        <button onClick={() => setChecked(true)} className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors">
          Check compliance
        </button>
      </div>

      {checked && (
        <div className="space-y-4">
          <div className="rounded-xl border border-green-200 bg-green-50 px-5 py-4 space-y-1">
            <div className="flex items-center gap-2">
              <Icon icon="material-symbols:check-circle-outline" className="size-5 text-green-600" aria-hidden />
              <p className="font-semibold text-green-900">Appears to meet National Living Wage</p>
            </div>
            <p className="text-sm text-green-700">Based on your inputs, the offered rate of £11.50/hr appears to meet or exceed the applicable minimum wage. However, the extra 3 unpaid hours per week reduces your effective rate.</p>
          </div>

          <div className="rounded-xl border border-border bg-card divide-y divide-border">
            {[
              ["Applicable wage rule",   "National Living Wage (age 21+)"],
              ["Official rate",          "£11.44/hr (2026)"],
              ["Offered rate",           "£11.50/hr"],
              ["Countable hours/week",   "28 hrs (including 3 hrs over contracted)"],
              ["Effective hourly rate",  "£10.27/hr (if 3 extra hrs are unpaid)"],
              ["Shortfall",             "−£1.17/hr against NLW if extra hours unpaid"],
            ].map(([k,v]) => (
              <div key={k} className="flex gap-4 px-5 py-3 text-sm">
                <span className="w-52 shrink-0 text-muted-foreground">{k}</span>
                <span className="font-medium">{v}</span>
              </div>
            ))}
          </div>

          <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-xs text-amber-800">
            <p className="font-semibold mb-1">Key assumption</p>
            <p>We assumed the 3 extra hours per week are unpaid. If they are paid at the same rate, compliance is maintained. Confirm this with your employer before signing.</p>
          </div>

          <StatusBadge variant="estimate" />
          <EvidenceCard source="GOV.UK National Minimum Wage rates" retrievedDate="7 Sep 2026" dataDate="1 Apr 2026" confidence="high" freshness="fresh" />
        </div>
      )}
    </div>
  );
}

/* ─── Offer comparison tab ─── */
function CompareTab() {
  const rows = [
    { measure:"Base salary",          a:"£70,000",   b:"£80,000",   diff:"B +£10k",  better:"B" },
    { measure:"Est. take-home/mo",    a:"£4,106",    b:"£4,742",    diff:"B +£636",  better:"B" },
    { measure:"Bonus",                a:"Up to 10%", b:"None",      diff:"A variable",better:"A" },
    { measure:"Pension contribution", a:"5% matched",b:"3% matched",diff:"A +2%",    better:"A" },
    { measure:"Working hrs/wk",       a:"40",        b:"37.5",      diff:"B −2.5hrs", better:"B" },
    { measure:"Remote days/wk",       a:"2",         b:"5 (remote)",diff:"B fully remote",better:"B" },
    { measure:"Effective hourly (net)",a:"£25.66",   b:"£30.09",    diff:"B +£4.43", better:"B" },
    { measure:"City cost (monthly)",  a:"£2,585",    b:"£1,800",    diff:"B −£785",  better:"B" },
    { measure:"Disposable income/mo", a:"£1,521",    b:"£2,942",    diff:"B +£1,421",better:"B" },
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-3 sm:grid-cols-2">
        {(["Offer A","Offer B"] as const).map((o) => (
          <div key={o} className="rounded-xl border border-border bg-card p-5 space-y-3">
            <h3 className="text-sm font-semibold">{o}</h3>
            {["Role","Company","Location","Salary"].map(f => (
              <div key={f}>
                <label className="text-xs text-muted-foreground mb-0.5 block">{f}</label>
                <input className="w-full h-8 rounded-lg border border-border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40" placeholder={`${o} ${f.toLowerCase()}…`} />
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Comparison table */}
      <div className="overflow-x-auto rounded-xl border border-border bg-card">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              {["Measure","Offer A","Offer B","Difference","Better"].map(h => (
                <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {rows.map((r) => (
              <tr key={r.measure} className="hover:bg-muted/10 transition-colors">
                <td className="px-4 py-3 font-medium text-foreground">{r.measure}</td>
                <td className={`px-4 py-3 tabular-nums ${r.better === "A" ? "text-primary font-semibold" : "text-muted-foreground"}`}>{r.a}</td>
                <td className={`px-4 py-3 tabular-nums ${r.better === "B" ? "text-primary font-semibold" : "text-muted-foreground"}`}>{r.b}</td>
                <td className="px-4 py-3 text-muted-foreground">{r.diff}</td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${r.better === "A" ? "bg-blue-50 text-blue-700" : "bg-green-50 text-green-700"}`}>
                    {r.better}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Narrative summary */}
      <div className="rounded-xl border border-border bg-card px-5 py-5 space-y-2">
        <p className="text-sm font-semibold">What this shows</p>
        {[
          "Offer B pays £10,000 more base salary and leaves £1,421 more disposable income per month.",
          "Offer A has a 10% bonus which could add up to £7,000 if met — higher variable compensation.",
          "Offer B has a better pension match and fully remote working.",
          "Offer A is in a higher-cost city, which reduces its financial advantage.",
          "The decision depends on how you weight guaranteed pay vs variable upside.",
        ].map((s,i) => (
          <p key={i} className="text-sm text-muted-foreground flex items-start gap-2">
            <Icon icon="material-symbols:arrow-right-alt" className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />{s}
          </p>
        ))}
      </div>
      <StatusBadge variant="estimate" />
    </div>
  );
}

/* ─── Page ─── */
export default function SalaryPage() {
  const [tab, setTab] = useState<Tab>("salary");
  const ActiveTab = { salary: SalaryTab, city: CityTab, minwage: MinWageTab, compare: CompareTab }[tab];

  return (
    <div className="mx-auto max-w-5xl px-8 py-10 space-y-6">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight">Salary & Offers</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Calculate take-home pay, research city costs, check minimum wage, and compare two offers side by side.
        </p>
      </header>

      {/* Tab bar */}
      <div className="flex flex-wrap gap-1 rounded-xl border border-border bg-muted/30 p-1 w-fit">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              tab === t.id ? "bg-card shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Icon icon={t.icon} className="size-4" aria-hidden />
            {t.label}
          </button>
        ))}
      </div>

      <ActiveTab />
    </div>
  );
}
