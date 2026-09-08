"use client";

import { useState } from "react";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";

interface ConsentBannerProps {
  title: string;
  description: string;
  provider?: string;
  dataUsed?: string;
  onAccept: () => void;
  onDecline: () => void;
}

export function ConsentBanner({
  title,
  description,
  provider,
  dataUsed,
  onAccept,
  onDecline,
}: ConsentBannerProps) {
  const [decided, setDecided] = useState(false);
  if (decided) return null;

  return (
    <div
      role="dialog"
      aria-label={title}
      className="rounded-lg border border-primary/30 bg-accent px-4 py-4 space-y-3"
    >
      <div className="flex gap-3">
        <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-md bg-primary/10">
          <Icon icon="material-symbols:privacy-tip-outline" className="size-4 text-primary" aria-hidden />
        </span>
        <div>
          <p className="text-sm font-semibold text-foreground">{title}</p>
          <p className="mt-0.5 text-xs text-muted-foreground">{description}</p>
          {dataUsed && (
            <p className="mt-1 text-xs text-muted-foreground">
              <span className="font-medium">Data used:</span> {dataUsed}
            </p>
          )}
          {provider && (
            <p className="mt-0.5 text-xs text-muted-foreground">
              <span className="font-medium">Provider:</span> {provider}
            </p>
          )}
        </div>
      </div>
      <div className="flex gap-2">
        <Button
          size="sm"
          className="h-8 text-xs"
          onClick={() => { setDecided(true); onAccept(); }}
        >
          Allow
        </Button>
        <Button
          size="sm"
          variant="outline"
          className="h-8 text-xs"
          onClick={() => { setDecided(true); onDecline(); }}
        >
          Decline
        </Button>
      </div>
    </div>
  );
}
