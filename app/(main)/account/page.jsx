import { getUserAccounts } from "@/actions/dashboard";
import { CreateAccountDrawer } from "@/components/create-account-drawer";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { ManageAccountCard } from "./_components/manage-account-card";

export default async function ManageAccountsPage() {
  const accounts = await getUserAccounts();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Manage accounts
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Open any account to view details and transactions. You can also set
            your default account here.
          </p>
        </div>

        <CreateAccountDrawer>
          <Button variant="outline" className="rounded-xl">
            <Plus size={18} />
            <span className="ml-2">New account</span>
          </Button>
        </CreateAccountDrawer>
      </div>

      {/* Accounts grid */}
      {accounts?.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {accounts.map((account) => (
            <ManageAccountCard key={account.id} account={account} />
          ))}
        </div>
      ) : (
        <div className="rounded-3xl border border-border bg-card p-10 text-center text-sm text-muted-foreground shadow-sm">
          No accounts found. Create your first account to start tracking.
        </div>
      )}
    </div>
  );
}
