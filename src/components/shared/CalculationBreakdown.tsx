"use client";

import { useState } from "react";
import { Icon } from "@iconify/react";
import { cn } from "@/lib/utils";

interface CalcLine {
  label: string;
  rule?: string;
  formula?: string;
  substitution?: string;
  value: string;
  source?: string;
  isAssumption?: boolean;
}

interface CalculationBreakdownProps {
  title?: string;
  lines: CalcLine[];
  className?: string;
}

export function CalculationBreakdown({ title, lines, className }: CalculationBreakdownProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className={cn("rounded-lg border border-border bg-card", className)}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between px-4 py-3 text-sm font-medium text-foreground hover:bg-muted/40 transition-colors rounded-lg"
        aria-expanded={open}
      >
        <span className="flex items-center gap-2">
          <Icon icon="material-symbols:calculate-outline" className="size-4 text-muted-foreground" aria-hidden />
          {title ?? "How this was calculated"}
        </span>
        <Icon
          icon="material-symbols:expand-more"
          className={cn("size-4 text-muted-foreground transition-transform duration-200", open && "rotate-180")}
          aria-hidden
        />
      </button>

      {open && (
        <div className="border-t border-border px-4 pb-4 pt-3 space-y-3">
          {lines.map((line, i) => (
            <div key={i} className="text-xs">
              <div className="flex items-baseline justify-between gap-4">
                <span className={cn("font-medium", line.isAssumption && "italic text-muted-foreground")}>
                  {line.label}
                  {line.isAssumption && " (assumption)"}
                </span>
                <span className="shrink-0 font-semibold tabular-nums">{line.value}</span>
              </div>
              {line.rule && (
                <p className="mt-0.5 text-muted-foreground">Rule: {line.rule}</p>
              )}
              {line.formula && (
                <p className="mt-0.5 font-mono text-muted-foreground">Formula: {line.formula}</p>
              )}
              {line.substitution && (
                <p className="mt-0.5 font-mono text-muted-foreground">= {line.substitution}</p>
              )}
              {line.source && (
                <p className="mt-0.5 text-muted-foreground/70">Source: {line.source}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
