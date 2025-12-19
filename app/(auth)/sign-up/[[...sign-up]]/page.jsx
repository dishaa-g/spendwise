"use client";

import Link from "next/link";
import Image from "next/image";
import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="w-full max-w-5xl px-4">
      <div className="grid overflow-hidden rounded-3xl border bg-card shadow-sm lg:grid-cols-2">
        {/* Left panel */}
        <div className="relative hidden lg:block">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600 opacity-90" />
          <div className="relative flex h-full flex-col justify-between p-10 text-white">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-white/15 p-2">
                <Image
                  src="/logo-sm.png"
                  alt="SpendWise"
                  width={28}
                  height={28}
                />
              </div>
              <div className="text-lg font-semibold tracking-tight">
                SpendWise
              </div>
            </div>

            <div className="space-y-4">
              <h1 className="text-3xl font-bold leading-tight">
                Create your account
              </h1>
              <p className="text-white/90">
                Start tracking expenses and income in one place, with simple
                visuals and clear reports.
              </p>

              <div className="mt-6 grid gap-3 text-sm text-white/90">
                <div className="rounded-2xl bg-white/10 p-4">
                  Set a budget and monitor progress.
                </div>
                <div className="rounded-2xl bg-white/10 p-4">
                  View transactions by account and category.
                </div>
              </div>
            </div>

            <div className="text-xs text-white/70">Developed by Disha</div>
          </div>
        </div>

        {/* Right panel */}
        <div className="flex flex-col justify-center p-6 sm:p-10">
          <div className="mb-6 space-y-2">
            <div className="flex items-center gap-3 lg:hidden">
              <Image
                src="/logo-sm.png"
                alt="SpendWise"
                width={28}
                height={28}
              />
              <div className="text-base font-semibold">SpendWise</div>
            </div>

            <h2 className="text-2xl font-bold tracking-tight">Sign up</h2>
            <p className="text-sm text-muted-foreground">
              Create an account to access your dashboard.
            </p>
          </div>

          <div className="flex justify-center lg:justify-start">
            <SignUp
              routing="path"
              path="/sign-up"
              redirectUrl="/dashboard"
              afterSignUpUrl="/dashboard"
              appearance={{
                elements: {
                  rootBox: "w-full",
                  card: "shadow-none border-0 bg-transparent p-0 w-full",
                  headerTitle: "hidden",
                  headerSubtitle: "hidden",
                  socialButtonsBlockButton:
                    "rounded-xl border border-border bg-background hover:bg-muted",
                  socialButtonsBlockButtonText: "text-sm",
                  dividerLine: "bg-border",
                  dividerText: "text-muted-foreground",
                  formFieldLabel: "text-sm text-foreground",
                  formFieldInput:
                    "rounded-xl border border-border bg-background focus:ring-2 focus:ring-ring focus:ring-offset-0",
                  formButtonPrimary:
                    "rounded-xl bg-primary text-primary-foreground hover:opacity-95",
                  footerActionText: "text-muted-foreground",
                  footerActionLink: "text-primary hover:underline",
                },
              }}
            />
          </div>

          <p className="mt-6 text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/sign-in" className="text-primary hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
