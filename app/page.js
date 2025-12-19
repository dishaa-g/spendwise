import React from "react";
import HeroSection from "@/components/hero";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import {
  featuresData,
  howItWorksData,
  statsData,
  testimonialsData,
} from "@/data/landing";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <HeroSection />

      {/* Stats */}
      <section className="py-14">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {statsData.map((stat, index) => (
              <div
                key={index}
                className="rounded-2xl border border-border bg-card p-6 text-center shadow-sm"
              >
                <div className="text-3xl font-bold tracking-tight sm:text-4xl">
                  {stat.value}
                </div>
                <div className="mt-2 text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Everything you need to manage your finances
            </h2>
            <p className="mt-3 text-sm text-muted-foreground sm:text-base">
              Clean UI, fast workflows, and the essentials that matter.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuresData.map((feature, index) => (
              <Card
                className="rounded-3xl border-border bg-card shadow-sm"
                key={index}
              >
                <CardContent className="space-y-4 p-6">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              How it works
            </h2>
            <p className="mt-3 text-sm text-muted-foreground sm:text-base">
              Three steps to get organized and stay consistent.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {howItWorksData.map((step, index) => (
              <div
                key={index}
                className="rounded-3xl border border-border bg-card p-8 text-center shadow-sm"
              >
                <div className="mx-auto mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary">
                  {step.icon}
                </div>
                <h3 className="text-lg font-semibold">{step.title}</h3>
                <p className="mt-3 text-sm text-muted-foreground">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              What users say
            </h2>
            <p className="mt-3 text-sm text-muted-foreground sm:text-base">
              Simple, clean, and easy to stick with.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {testimonialsData.map((t, index) => (
              <Card
                key={index}
                className="rounded-3xl border-border bg-card shadow-sm"
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <Image
                      src={t.image}
                      alt={t.name}
                      width={44}
                      height={44}
                      className="rounded-full"
                    />
                    <div>
                      <div className="font-semibold">{t.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {t.role}
                      </div>
                    </div>
                  </div>
                  <p className="mt-4 text-sm text-muted-foreground">
                    {t.quote}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="rounded-3xl border border-border bg-gradient-to-br from-blue-600/10 to-purple-600/10 p-10 text-center shadow-sm">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Ready to take control of your finances?
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm text-muted-foreground sm:text-base">
              Start tracking, stay consistent, and get clarity month after
              month.
            </p>
            <div className="mt-8 flex justify-center gap-3">
              <Link href="/dashboard">
                <Button size="lg" className="rounded-xl px-6">
                  Start now
                </Button>
              </Link>
              <Link href="#features">
                <Button size="lg" variant="outline" className="rounded-xl px-6">
                  Explore features
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

     
    </div>
  );
};

export default LandingPage;
