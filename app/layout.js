import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Spendwise",
  description: "One stop Finance Platform",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <head>
          <link rel="icon" href="/logo-sm.png" sizes="any" />
        </head>

        <body suppressHydrationWarning className={inter.className}>
          <Header />
          <main className="min-h-screen">{children}</main>

          <Toaster richColors />

          <footer className="border-t border-border py-10">
            <div className="mx-auto max-w-6xl px-4 text-center text-sm text-muted-foreground">
              Developed by Disha
            </div>
          </footer>
        </body>
      </html>
    </ClerkProvider>
  );
}
