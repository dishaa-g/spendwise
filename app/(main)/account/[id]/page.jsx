import { Suspense } from "react";
import { getAccountWithTransactions } from "@/actions/account";
import { BarLoader } from "react-spinners";
import { TransactionTable } from "../_components/transaction-table";
import { notFound } from "next/navigation";
import { AccountChart } from "../_components/account-chart";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, PenBox } from "lucide-react";

export default async function AccountPage({ params }) {
  const { id } = await params;
  const accountData = await getAccountWithTransactions(id);

  if (!accountData) notFound();

  const { transactions, ...account } = accountData;

  return (
    <div className="space-y-8">
      {/* Soft header layer (matches dashboard) */}
      <div className="rounded-3xl border border-border bg-gradient-to-b from-blue-50/50 to-background p-6 sm:p-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-3">
            <Link href="/dashboard" className="inline-flex items-center gap-2">
              <Button variant="outline" className="rounded-xl" size="sm">
                <ArrowLeft className="h-4 w-4" />
                <span className="ml-1">Back</span>
              </Button>
            </Link>

            <div>
              <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl capitalize">
                {account.name}
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                {account.type.charAt(0) + account.type.slice(1).toLowerCase()}{" "}
                Account
              </p>
            </div>
          </div>

          <div className="flex flex-col items-start gap-3 sm:items-end">
            <div className="rounded-3xl border border-border bg-card px-5 py-4 shadow-sm">
              <div className="text-xs text-muted-foreground">
                Current balance
              </div>
              <div className="mt-1 text-2xl font-bold tracking-tight">
                ${parseFloat(account.balance).toFixed(2)}
              </div>
              <div className="mt-1 text-xs text-muted-foreground">
                {account._count.transactions} transactions
              </div>
            </div>

            <Link href="/transaction/create">
              <Button className="rounded-xl w-full sm:w-auto">
                <PenBox className="h-4 w-4" />
                <span className="ml-2">Add transaction</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Chart */}
      <Suspense
        fallback={<BarLoader className="mt-4" width={"100%"} color="#9333ea" />}
      >
        <AccountChart transactions={transactions} />
      </Suspense>

      {/* Table */}
      <Suspense
        fallback={<BarLoader className="mt-4" width={"100%"} color="#9333ea" />}
      >
        <TransactionTable transactions={transactions} />
      </Suspense>
    </div>
  );
}
