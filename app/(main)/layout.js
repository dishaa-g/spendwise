import { SignedIn, SignedOut } from "@clerk/nextjs";
import Sidebar from "@/components/sidebar";

export default function MainLayout({ children }) {
  return (
    <div className="min-h-[calc(100vh-64px)] bg-background">
      <div className="mx-auto w-full max-w-6xl px-4 pb-12 pt-8 sm:px-6 lg:px-8">
        <SignedIn>
          <div className="grid gap-6 md:grid-cols-[16rem_1fr]">
            <Sidebar />
            <main className="min-w-0">{children}</main>
          </div>
        </SignedIn>

        <SignedOut>
          <main className="min-w-0">{children}</main>
        </SignedOut>
      </div>
    </div>
  );
}
