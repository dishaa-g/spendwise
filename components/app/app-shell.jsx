"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";
import { UserButton } from "@clerk/nextjs";
import { LayoutDashboard, Receipt, PenBox, Banknote, X } from "lucide-react";
import { Button } from "@/components/ui/button";

function NavItem({ href, icon: Icon, label, active, onClick }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={[
        "flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition-colors",
        active
          ? "bg-secondary text-foreground"
          : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground",
      ].join(" ")}
    >
      <Icon size={18} />
      <span className="font-medium">{label}</span>
    </Link>
  );
}

export default function AppShell({ children }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const nav = useMemo(
    () => [
      { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
      { href: "/transaction", label: "Transactions", icon: Receipt },
      { href: "/transaction/create", label: "Add Transaction", icon: PenBox },
    ],
    []
  );

  const sidebar = (
    <aside className="h-full w-72 border-r border-border bg-background">
      <div className="flex h-16 items-center gap-2 px-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 text-white">
          <Banknote size={20} />
        </div>
        <div className="leading-tight">
          <div className="font-semibold tracking-tight">SpendWise</div>
          <div className="text-xs text-muted-foreground">Finance workspace</div>
        </div>
      </div>

      <div className="px-3 py-3 space-y-1">
        {nav.map((item) => (
          <NavItem
            key={item.href}
            href={item.href}
            icon={item.icon}
            label={item.label}
            active={pathname === item.href}
            onClick={() => setMobileOpen(false)}
          />
        ))}
      </div>

      <div className="mt-auto px-4 pb-4">
        <div className="rounded-2xl border border-border bg-card p-4">
          <div className="text-sm font-medium">Quick tip</div>
          <div className="mt-1 text-xs text-muted-foreground">
            Add transactions regularly to keep insights accurate.
          </div>
        </div>
      </div>
    </aside>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile overlay menu */}
      {mobileOpen ? (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute left-0 top-0 h-full">{sidebar}</div>
          <button
            className="absolute right-4 top-4 rounded-xl bg-background/80 p-2 backdrop-blur"
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
          >
            <X size={18} />
          </button>
        </div>
      ) : null}

      <div className="flex min-h-screen">
        {/* Desktop sidebar */}
        <div className="hidden md:block">{sidebar}</div>

        <div className="flex min-w-0 flex-1 flex-col">
          {/* Topbar */}
          <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-border bg-background/70 px-4 backdrop-blur">
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                className="md:hidden"
                onClick={() => setMobileOpen(true)}
              >
                Menu
              </Button>
              <div className="hidden md:block text-sm text-muted-foreground">
                {pathname === "/dashboard"
                  ? "Dashboard"
                  : pathname?.startsWith("/transaction")
                    ? "Transactions"
                    : "Workspace"}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Link href="/transaction/create">
                <Button className="rounded-xl">
                  <PenBox size={18} />
                  <span className="ml-2 hidden sm:inline">Add</span>
                </Button>
              </Link>

              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "w-9 h-9",
                  },
                }}
              />
            </div>
          </header>

          {/* Page content */}
          <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8">
            {children}
          </main>

          <footer className="border-t border-border py-8">
            <div className="mx-auto w-full max-w-6xl px-4 text-sm text-muted-foreground">
              Developed by Disha
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}
