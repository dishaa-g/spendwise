"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src="/banner.jpeg"
          alt="SpendWise preview"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/80 to-background" />
      </div>

      {/* Decorative blobs */}
      <div className="pointer-events-none absolute -top-24 left-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-purple-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 right-0 h-[380px] w-[380px] rounded-full bg-blue-500/20 blur-3xl" />

      {/* Content */}
      <div className="relative mx-auto max-w-6xl px-4 pt-20 pb-16 sm:pt-28 sm:pb-20">
        <div className="grid items-center gap-10 md:grid-cols-2">
          {/* Left */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-3 py-1 text-xs text-muted-foreground backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-green-500" />
              Smart finance, simple workflows
            </div>

            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              Manage your finances with clarity and control.
            </h1>

            <p className="max-w-xl text-base text-muted-foreground sm:text-lg">
              Track accounts, add transactions fast, and get a clean view of
              where your money goes, without messy spreadsheets.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link href="/dashboard">
                <Button size="lg" className="rounded-xl px-6">
                  Get started
                </Button>
              </Link>

              <Link href="#features">
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-xl bg-background/60 px-6 backdrop-blur"
                >
                  See features
                </Button>
              </Link>
            </div>

            <div className="flex flex-wrap gap-3 pt-2 text-xs text-muted-foreground">
              <span className="rounded-full border border-border bg-background/60 px-3 py-1 backdrop-blur">
                Accounts
              </span>
              <span className="rounded-full border border-border bg-background/60 px-3 py-1 backdrop-blur">
                Transactions
              </span>
              <span className="rounded-full border border-border bg-background/60 px-3 py-1 backdrop-blur">
                Insights
              </span>
            </div>
          </div>

          {/* Right */}
          <div className="relative">
            <div className="rounded-3xl border border-border bg-background/60 p-3 shadow-sm backdrop-blur">
              <div className="relative overflow-hidden rounded-2xl">
                <Image
                  src="/banner.jpeg"
                  alt="SpendWise dashboard preview"
                  width={1200}
                  height={720}
                  className="h-auto w-full object-cover"
                  priority
                />
              </div>
            </div>

            <div className="absolute -bottom-6 left-6 hidden rounded-2xl border border-border bg-background/70 px-4 py-3 text-sm shadow-sm backdrop-blur md:block">
              <div className="font-medium">Quick add</div>
              <div className="text-xs text-muted-foreground">
                Add a transaction in seconds
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
