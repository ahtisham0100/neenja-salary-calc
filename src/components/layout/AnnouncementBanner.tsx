"use client";

import { useState } from "react";
import { X } from "lucide-react";

import { Button } from "@/components/ui/button";

export function AnnouncementBanner() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) {
    return null;
  }

  return (
    <div className="relative flex items-center justify-center gap-4 bg-neutral-900 px-12 py-2.5 text-sm text-white">
      <p className="truncate">
        Land more interviews — scan your CV against any job description.
      </p>
      <Button
        size="sm"
        className="h-7 shrink-0 rounded-full bg-primary px-4 text-primary-foreground hover:bg-primary/90"
        asChild
      >
        <a href="/resume-scan">Try it free</a>
      </Button>
      <button
        type="button"
        onClick={() => setDismissed(true)}
        aria-label="Dismiss announcement"
        className="absolute right-4 top-1/2 -translate-y-1/2 rounded-sm p-1 text-neutral-400 transition-colors hover:text-white"
      >
        <X className="size-4" />
      </button>
    </div>
  );
}
