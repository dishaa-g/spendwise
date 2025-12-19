import { getUserAccounts, getDashboardData } from "@/actions/dashboard";
import { getCurrentBudget } from "@/actions/budget";
import { AccountCard } from "./_components/account-card";
import { CreateAccountDrawer } from "@/components/create-account-drawer";
import { BudgetProgress } from "./_components/budget-progress";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus, PenBox } from "lucide-react";
import { DashboardOverview } from "./_components/transaction-overview";

export default async function DashboardPage() {
  const [accounts, transactions] = await Promise.all([
    getUserAccounts(),
    getDashboardData(),
  ]);

  const defaultAccount = accounts?.find((account) => account.isDefault);

  let budgetData = null;
  if (defaultAccount) {
    budgetData = await getCurrentBudget(defaultAccount.id);
  }

  return (
    <div className="space-y-8">
      {/* Soft page background layer */}
      <div className="rounded-3xl border border-border bg-gradient-to-b from-blue-50/50 to-background p-6 sm:p-8">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Dashboard
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Overview of your accounts, spending, and recent activity.
            </p>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row sm:gap-2">
            <CreateAccountDrawer>
              <Button variant="outline" className="rounded-xl">
                <Plus size={18} />
                <span className="ml-2">New account</span>
              </Button>
            </CreateAccountDrawer>

            <Link href="/transaction/create">
              <Button className="rounded-xl w-full sm:w-auto">
                <PenBox size={18} />
                <span className="ml-2">Add transaction</span>
              </Button>
            </Link>
          </div>
        </div>

        {/* Budget */}
        <div className="mt-6">
          <BudgetProgress
            initialBudget={budgetData?.budget}
            currentExpenses={budgetData?.currentExpenses || 0}
          />
        </div>
      </div>

      {/* Overview */}
      <DashboardOverview
        accounts={accounts}
        transactions={transactions || []}
      />

      {/* Accounts */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold tracking-tight">Accounts</h2>
          <p className="text-sm text-muted-foreground">
            {accounts?.length || 0} total
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <CreateAccountDrawer>
            <Card className="group cursor-pointer rounded-3xl border-dashed border-border bg-card shadow-sm transition-all hover:shadow-md">
              <CardContent className="flex h-full flex-col items-center justify-center p-8 text-center">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary">
                  <Plus className="h-6 w-6" />
                </div>
                <p className="text-sm font-medium">Add new account</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Create a bank, cash, or credit account.
                </p>
              </CardContent>
            </Card>
          </CreateAccountDrawer>

          {accounts?.length > 0 &&
            accounts.map((account) => (
              <AccountCard key={account.id} account={account} />
            ))}
        </div>
      </div>
    </div>
  );
}
