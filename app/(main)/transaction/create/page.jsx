import Link from "next/link";
import { getUserAccounts } from "@/actions/dashboard";
import { defaultCategories } from "@/data/categories";
import { AddTransactionForm } from "../_components/transaction-form";
import { getTransaction } from "@/actions/transaction";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default async function AddTransactionPage({ searchParams }) {
  const accounts = await getUserAccounts();

  const sp = await searchParams;
  const editId = sp?.edit;

  let initialData = null;
  if (editId) {
    const transaction = await getTransaction(editId);
    initialData = transaction;
  }

  return (
    <div className="space-y-8">
      {/* Soft header wrapper (same design language as Account/Dashboard) */}
      <div className="rounded-3xl border border-border bg-gradient-to-b from-blue-50/50 to-background p-6 sm:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-3">
            <Link href="/dashboard" className="inline-flex items-center gap-2">
              <Button variant="outline" className="rounded-xl" size="sm">
                <ArrowLeft className="h-4 w-4" />
                <span className="ml-1">Back</span>
              </Button>
            </Link>

            <div>
              <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                {editId ? "Edit transaction" : "Add transaction"}
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                {editId
                  ? "Update details and save changes."
                  : "Log an expense or income, and optionally scan a receipt."}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Form */}
      <AddTransactionForm
        accounts={accounts}
        categories={defaultCategories}
        editMode={!!editId}
        initialData={initialData}
      />
    </div>
  );
}
