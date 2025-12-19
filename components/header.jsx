"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SignedIn, SignedOut, UserButton, SignInButton } from "@clerk/nextjs";
import {
  LayoutDashboard,
  PenBox,
  Banknote,
  Menu,
  X,
  CreditCard,
} from "lucide-react";
import { Button } from "./ui/button";
import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = useMemo(() => {
    return (href) => {
      if (href === "/") return pathname === "/";
      return pathname?.startsWith(href);
    };
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/70 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand */}
        <Link
          href="/"
          className="flex items-center gap-2"
          onClick={() => setOpen(false)}
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-sm">
            <Banknote size={20} />
          </div>
          <div className="leading-tight">
            <div className="text-base font-semibold tracking-tight">
              SpendWise
            </div>
            <div className="text-xs text-muted-foreground">
              Finance platform
            </div>
          </div>
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-2 md:flex">
          <SignedIn>
            {/* <Link
              href="/dashboard"
              className={cn(
                "rounded-xl px-3 py-2 text-sm transition-colors",
                isActive("/dashboard")
                  ? "bg-secondary text-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
              )}
            >
              Dashboard
            </Link>

            <Link
              href="/transaction/create"
              className={cn(
                "rounded-xl px-3 py-2 text-sm transition-colors",
                isActive("/transaction")
                  ? "bg-secondary text-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
              )}
            >
              Transactions
            </Link> */}
          </SignedIn>

          <SignedOut>
            <a
              href="#features"
              className="rounded-xl px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground hover:bg-secondary/60"
            >
              Features
            </a>
            <a
              href="#testimonials"
              className="rounded-xl px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground hover:bg-secondary/60"
            >
              Testimonials
            </a>
          </SignedOut>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <SignedIn>
            <Link href="/dashboard" className="hidden sm:inline-flex">
              <Button variant="outline" className="rounded-xl">
                <LayoutDashboard size={18} />
                <span className="ml-2">Dashboard</span>
              </Button>
            </Link>

            <Link href="/transaction/create" className="hidden sm:inline-flex">
              <Button className="rounded-xl">
                <PenBox size={18} />
                <span className="ml-2">Add</span>
              </Button>
            </Link>

            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-9 h-9",
                },
              }}
            />
          </SignedIn>

          <SignedOut>
            <SignInButton forceRedirectUrl="/dashboard">
              <Button variant="outline" className="rounded-xl">
                Login
              </Button>
            </SignInButton>
          </SignedOut>

          {/* Mobile menu button */}
          <button
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-background hover:bg-secondary/60 md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-border bg-background/95 backdrop-blur md:hidden">
          <div className="mx-auto max-w-6xl px-4 py-3 sm:px-6 lg:px-8">
            <SignedIn>
              <div className="grid gap-2">
                <Link
                  href="/dashboard"
                  onClick={() => setOpen(false)}
                  className={cn(
                    "flex items-center gap-2 rounded-xl px-3 py-2 text-sm transition-colors",
                    isActive("/dashboard")
                      ? "bg-secondary text-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
                  )}
                >
                  <LayoutDashboard className="h-4 w-4" />
                  Dashboard
                </Link>

                <Link
                  href="/transaction/create"
                  onClick={() => setOpen(false)}
                  className={cn(
                    "flex items-center gap-2 rounded-xl px-3 py-2 text-sm transition-colors",
                    isActive("/transaction")
                      ? "bg-secondary text-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
                  )}
                >
                  <CreditCard className="h-4 w-4" />
                  Transactions
                </Link>

                <Link
                  href="/transaction/create"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2 rounded-xl bg-primary px-3 py-2 text-sm text-primary-foreground"
                >
                  <PenBox className="h-4 w-4" />
                  Add transaction
                </Link>
              </div>
            </SignedIn>

            <SignedOut>
              <div className="grid gap-2">
                <a
                  href="#features"
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary/60"
                >
                  Features
                </a>
                <a
                  href="#testimonials"
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary/60"
                >
                  Testimonials
                </a>
              </div>
            </SignedOut>
          </div>
        </div>
      )}
    </header>
  );
}
