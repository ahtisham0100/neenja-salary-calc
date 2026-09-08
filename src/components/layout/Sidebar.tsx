"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "@iconify/react";

type NavItem = {
  label: string;
  href: string;
  icon: string;
};

const navItems: NavItem[] = [
  { label: "Home",            href: "/",               icon: "material-symbols:home-outline-rounded" },
  { label: "Career Profile",  href: "/career-profile", icon: "ph:brain"                             },
  { label: "CV Scanner",      href: "/resume-scan",    icon: "material-symbols:scan-outline"         },
  { label: "Applications",    href: "/applications",   icon: "hugeicons:new-job"                    },
  { label: "Job Trust",       href: "/job-trust",      icon: "hugeicons:security-check"             },
  { label: "Salary & Offers", href: "/salary",         icon: "lets-icons:line-up"                   },
  { label: "AI Assistant",    href: "/ai-assistant",   icon: "material-symbols:auto-awesome"        },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex w-[260px] shrink-0 flex-col border-r border-sidebar-border bg-sidebar">
      {/* Logo */}
      <div className="flex h-16 items-center gap-2.5 px-5">
        <span className="flex size-8 items-center justify-center rounded-md bg-primary">
          <Icon icon="material-symbols:auto-awesome" className="size-4.5 text-primary-foreground" />
        </span>
        <span className="text-lg font-semibold tracking-tight">Neenja</span>
      </div>

      {/* Nav */}
      <nav aria-label="Main" className="flex-1 space-y-0.5 px-3 py-3">
        {navItems.map((item) => {
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname === item.href || pathname.startsWith(`${item.href}/`);

          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive ? "page" : undefined}
              className={
                isActive
                  ? // Active: Figma spec — bg #F8FFE9, border-left 2px #90B200, radius 6px
                    "flex items-center gap-3 rounded-[6px] border-l-2 border-primary bg-accent px-3 py-2 text-sm font-semibold text-primary transition-colors"
                  : // Inactive: Figma spec — no bg, radius 12px, gray icon + text
                    "flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-semibold text-[#676f7e] transition-colors hover:bg-muted hover:text-foreground"
              }
            >
              <Icon
                icon={item.icon}
                className={`size-5 shrink-0 ${isActive ? "text-primary" : "text-[#a5aab0]"}`}
              />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
