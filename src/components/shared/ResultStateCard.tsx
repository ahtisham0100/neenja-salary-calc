import { Icon } from "@iconify/react";
import { cn } from "@/lib/utils";

export type ResultState =
  | "complete"
  | "partial"
  | "unavailable"
  | "unsupported"
  | "ambiguous"
  | "conflicting"
  | "stale"
  | "consent-required"
  | "needs-confirmation";

const config: Record<
  ResultState,
  { title: string; icon: string; iconClass: string; borderClass: string }
> = {
  complete:            { title: "Complete",              icon: "material-symbols:check-circle-outline",  iconClass: "text-green-600", borderClass: "border-green-200 bg-green-50"    },
  partial:             { title: "Partial result",        icon: "material-symbols:incomplete-circle",     iconClass: "text-amber-600", borderClass: "border-amber-200 bg-amber-50"    },
  unavailable:         { title: "Unavailable",           icon: "material-symbols:cloud-off-outline",     iconClass: "text-gray-500",  borderClass: "border-gray-200 bg-gray-50"      },
  unsupported:         { title: "Not supported",         icon: "material-symbols:block",                 iconClass: "text-gray-500",  borderClass: "border-gray-200 bg-gray-50"      },
  ambiguous:           { title: "Ambiguous",             icon: "material-symbols:help-outline",          iconClass: "text-blue-600",  borderClass: "border-blue-200 bg-blue-50"      },
  conflicting:         { title: "Conflicting evidence",  icon: "material-symbols:warning-outline",       iconClass: "text-amber-600", borderClass: "border-amber-200 bg-amber-50"    },
  stale:               { title: "Information may be outdated", icon: "material-symbols:history",         iconClass: "text-amber-600", borderClass: "border-amber-200 bg-amber-50"    },
  "consent-required":  { title: "Consent required",     icon: "material-symbols:privacy-tip-outline",   iconClass: "text-blue-600",  borderClass: "border-blue-200 bg-blue-50"      },
  "needs-confirmation":{ title: "Needs your confirmation", icon: "material-symbols:edit-outline",       iconClass: "text-blue-600",  borderClass: "border-blue-200 bg-blue-50"      },
};

interface ResultStateCardProps {
  state: ResultState;
  explanation: string;
  stillUsable?: string;
  nextSteps?: string[];
  onRetry?: () => void;
  className?: string;
}

export function ResultStateCard({
  state,
  explanation,
  stillUsable,
  nextSteps,
  onRetry,
  className,
}: ResultStateCardProps) {
  const { title, icon, iconClass, borderClass } = config[state];

  return (
    <div className={cn("rounded-lg border p-4 space-y-3", borderClass, className)}>
      <div className="flex items-start gap-3">
        <Icon icon={icon} className={cn("mt-0.5 size-5 shrink-0", iconClass)} aria-hidden />
        <div>
          <p className="text-sm font-semibold text-foreground">{title}</p>
          <p className="mt-0.5 text-sm text-muted-foreground">{explanation}</p>
        </div>
      </div>

      {stillUsable && (
        <p className="text-xs text-muted-foreground">
          <span className="font-medium">Still available:</span> {stillUsable}
        </p>
      )}

      {nextSteps && nextSteps.length > 0 && (
        <ul className="space-y-1 text-xs text-muted-foreground">
          <li className="font-medium text-foreground">What you can do:</li>
          {nextSteps.map((step, i) => (
            <li key={i} className="flex items-start gap-1.5">
              <Icon icon="material-symbols:arrow-right-alt" className="mt-0.5 size-3.5 shrink-0 text-primary" aria-hidden />
              {step}
            </li>
          ))}
        </ul>
      )}

      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-primary underline underline-offset-2 hover:text-primary/80 transition-colors"
        >
          <Icon icon="material-symbols:refresh" className="size-3.5" aria-hidden />
          Try again
        </button>
      )}
    </div>
  );
}
