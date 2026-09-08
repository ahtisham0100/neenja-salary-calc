import { Icon } from "@iconify/react";
import { cn } from "@/lib/utils";

interface EvidenceCardProps {
  source: string;
  url?: string;
  retrievedDate: string;
  dataDate?: string;
  confidence?: "high" | "medium" | "low";
  freshness?: "fresh" | "ok" | "stale";
  className?: string;
}

const confidenceLabel = { high: "High", medium: "Medium", low: "Low" };
const freshnessConfig = {
  fresh:  { label: "Fresh",  icon: "material-symbols:check-circle-outline", className: "text-green-600" },
  ok:     { label: "OK",     icon: "material-symbols:schedule",              className: "text-amber-600" },
  stale:  { label: "Stale",  icon: "material-symbols:warning-outline",       className: "text-red-600"   },
};

export function EvidenceCard({
  source,
  url,
  retrievedDate,
  dataDate,
  confidence,
  freshness,
  className,
}: EvidenceCardProps) {
  const fresh = freshness ? freshnessConfig[freshness] : null;

  return (
    <div
      className={cn(
        "flex flex-col gap-1.5 rounded-lg border border-border bg-muted/40 px-3 py-2.5 text-xs",
        className,
      )}
    >
      <div className="flex items-center gap-1.5 font-medium text-foreground">
        <Icon icon="material-symbols:link" className="size-3.5 shrink-0 text-muted-foreground" aria-hidden />
        {url ? (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="truncate underline underline-offset-2 hover:text-primary"
          >
            {source}
          </a>
        ) : (
          <span className="truncate">{source}</span>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-muted-foreground">
        <span className="flex items-center gap-1">
          <Icon icon="material-symbols:cloud-download-outline" className="size-3" aria-hidden />
          Retrieved {retrievedDate}
        </span>
        {dataDate && (
          <span className="flex items-center gap-1">
            <Icon icon="material-symbols:calendar-today-outline" className="size-3" aria-hidden />
            Data: {dataDate}
          </span>
        )}
        {confidence && (
          <span className="flex items-center gap-1">
            <Icon icon="material-symbols:signal-cellular-alt" className="size-3" aria-hidden />
            {confidenceLabel[confidence]} confidence
          </span>
        )}
        {fresh && (
          <span className={cn("flex items-center gap-1", fresh.className)}>
            <Icon icon={fresh.icon} className="size-3" aria-hidden />
            {fresh.label}
          </span>
        )}
      </div>
    </div>
  );
}
