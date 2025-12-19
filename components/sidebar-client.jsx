"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, PenBox, WalletCards, Banknote } from "lucide-react";
import { cn } from "@/lib/utils";

export default function SidebarClient({ defaultAccountId }) {
  const pathname = usePathname();

  const manageAccountsHref = defaultAccountId
    ? `/account/${defaultAccountId}`
    : "/dashboard";

  const navItems = [
    {
      key: "dashboard",
      href: "/dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
    },
    {
      key: "add",
      href: "/transaction/create",
      label: "Add transaction",
      icon: PenBox,
    },
    {
      key: "manage",
      href: manageAccountsHref,
      label: "Manage accounts",
      icon: WalletCards,
    },
  ];

  const isActive = (item) => {
    if (item.key === "dashboard") return pathname === "/dashboard";
    if (item.key === "add") return pathname?.startsWith("/transaction/create");
    if (item.key === "manage") return pathname?.startsWith("/account/");
    return false;
  };

  return (
    <aside className="hidden md:flex md:flex-col md:gap-4 md:py-2">
      {/* Brand */}
      <div className="rounded-3xl border border-border bg-card p-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-sm">
            <Banknote className="h-5 w-5" />
          </div>
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
          const active = isActive(item);

          return (
            <Link
              key={item.key}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-2xl px-3 py-2 text-sm transition-colors",
                active
                  ? "bg-secondary text-foreground"
                  : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground"
              )}
            >
              <span
                className={cn(
                  "flex h-9 w-9 items-center justify-center rounded-2xl",
                  active
                    ? "bg-gradient-to-br from-blue-600 to-purple-600 text-white"
                    : "bg-secondary text-foreground"
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
        Tip: Set one default account to track your monthly budget.
      </div>
    </aside>
  );
}
