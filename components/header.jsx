import Link from "next/link";
import { SignedIn, SignedOut, UserButton, SignInButton } from "@clerk/nextjs";
import { LayoutDashboard, PenBox, Banknote } from "lucide-react";
import { Button } from "./ui/button";

export default function Navbar() {
  return (
    <nav className="container mx-auto px-4 py-4 flex items-center justify-between border-b border-gray-200">
      <Link href="/">
        {/* Updated Text Logo with a more attractive style */}
        <div className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 tracking-tight cursor-pointer drop-shadow-lg flex items-center gap-2">
          <Banknote size={32} />
          SpendWise
        </div>
      </Link>

      {/* Navigation Links - Different for signed in/out users */}
      <div className="hidden md:flex items-center space-x-8">
        <SignedOut>
          <a href="#features" className="text-gray-600 hover:text-blue-600">
            Features
          </a>
          <a href="#testimonials" className="text-gray-600 hover:text-blue-600">
            Testimonials
          </a>
        </SignedOut>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center space-x-4">
        <SignedIn>
          <Link
            href="/dashboard"
            className="text-gray-600 hover:text-blue-600 flex items-center gap-2"
          >
            <Button variant="outline">
              <LayoutDashboard size={18} />
              <span className="hidden md:inline">Dashboard</span>
            </Button>
          </Link>
          <a href="/transaction/create">
            <Button className="flex items-center gap-2">
              <PenBox size={18} />
              <span className="hidden md:inline">Add Transaction</span>
            </Button>
          </a>
        </SignedIn>
        <SignedOut>
          <SignInButton forceRedirectUrl="/dashboard">
            <Button variant="outline">Login</Button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <UserButton
            appearance={{
              elements: {
                avatarBox: "w-10 h-10",
              },
            }}
          />
        </SignedIn>
      </div>
    </nav>
  );
}
