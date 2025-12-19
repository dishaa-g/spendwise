"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, PenBox, WalletCards } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/transaction/create", label: "Add transaction", icon: PenBox },
  { href: "/account", label: "Manage accounts", icon: WalletCards },
];

export default function Sidebar() {
  const pathname = usePathname();

  const isActive = (href) => {
    if (href === "/dashboard") return pathname === "/dashboard";
    if (href === "/account") return pathname?.startsWith("/account");
    return pathname?.startsWith(href);
  };

  return (
    <aside className="hidden md:flex md:flex-col md:gap-4 md:py-2">
      {/* Brand */}
      <div className="rounded-3xl border border-border bg-card p-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600" />
          <div className="leading-tight">
            <div className="text-sm font-semibold tracking-tight">
              SpendWise
            </div>
            <div className="text-xs text-muted-foreground">
              Your finance hub
            </div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <div className="rounded-3xl border border-border bg-card p-2 shadow-sm">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm transition-colors",
                active
                  ? "bg-secondary text-foreground"
                  : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground"
              )}
            >
              <span
                className={cn(
                  "flex h-9 w-9 items-center justify-center rounded-2xl border",
                  active
                    ? "border-transparent bg-gradient-to-br from-blue-600 to-purple-600 text-white"
                    : "border-border bg-background text-foreground"
                )}
              >
                <Icon className="h-4 w-4" />
              </span>

              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>

      {/* Tip */}
      <div className="rounded-3xl border border-border bg-card p-4 text-xs text-muted-foreground shadow-sm">
        Tip: Keep one default account to track your monthly budget.
      </div>
    </aside>
  );
}
