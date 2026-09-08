import { Icon } from "@iconify/react";
import { cn } from "@/lib/utils";

export type StatusVariant =
  | "verified"
  | "strong-match"
  | "possible-match"
  | "estimate"
  | "partial"
  | "conflicting"
  | "outdated"
  | "unavailable"
  | "needs-confirmation"
  | "confirmed"
  | "ai-extracted"
  | "inferred";

const config: Record<
  StatusVariant,
  { label: string; icon: string; className: string }
> = {
  verified:           { label: "Verified",            icon: "material-symbols:verified-outline",       className: "bg-green-50  text-green-700  border-green-200"  },
  "strong-match":     { label: "Strong match",        icon: "material-symbols:check-circle-outline",   className: "bg-green-50  text-green-700  border-green-200"  },
  "possible-match":   { label: "Possible match",      icon: "material-symbols:help-outline",           className: "bg-blue-50   text-blue-700   border-blue-200"   },
  estimate:           { label: "Estimate",            icon: "material-symbols:calculate-outline",      className: "bg-amber-50  text-amber-700  border-amber-200"  },
  partial:            { label: "Partial result",      icon: "material-symbols:incomplete-circle",      className: "bg-amber-50  text-amber-700  border-amber-200"  },
  conflicting:        { label: "Conflicting evidence",icon: "material-symbols:warning-outline",        className: "bg-amber-50  text-amber-700  border-amber-200"  },
  outdated:           { label: "Outdated info",       icon: "material-symbols:history",                className: "bg-amber-50  text-amber-700  border-amber-200"  },
  unavailable:        { label: "Unable to verify",    icon: "material-symbols:block",                  className: "bg-gray-50   text-gray-500   border-gray-200"   },
  "needs-confirmation":{ label: "Needs confirmation", icon: "material-symbols:edit-outline",           className: "bg-blue-50   text-blue-700   border-blue-200"   },
  confirmed:          { label: "Confirmed by user",   icon: "material-symbols:check-circle",           className: "bg-green-50  text-green-700  border-green-200"  },
  "ai-extracted":     { label: "Extracted by AI",     icon: "material-symbols:auto-awesome",           className: "bg-purple-50 text-purple-700 border-purple-200" },
  inferred:           { label: "Inferred",            icon: "material-symbols:psychology-outline",     className: "bg-blue-50   text-blue-600   border-blue-200"   },
};

interface StatusBadgeProps {
  variant: StatusVariant;
  className?: string;
  showIcon?: boolean;
}

export function StatusBadge({ variant, className, showIcon = true }: StatusBadgeProps) {
  const { label, icon, className: variantClass } = config[variant];
  return (
    <span
      aria-label={label}
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-medium",
        variantClass,
        className,
      )}
    >
      {showIcon && <Icon icon={icon} className="size-3 shrink-0" aria-hidden />}
      {label}
    </span>
  );
}
