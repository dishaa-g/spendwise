"use client";

import Link from "next/link";
import { useEffect } from "react";
import { ArrowUpRight, ArrowDownRight, Wallet, CreditCard } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import useFetch from "@/hooks/use-fetch";
import { Card, CardContent } from "@/components/ui/card";
import { updateDefaultAccount } from "@/actions/account";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export function AccountCard({ account }) {
  const { name, type, balance, id, isDefault } = account;

  const {
    loading: updateDefaultLoading,
    fn: updateDefaultFn,
    data: updatedAccount,
    error,
  } = useFetch(updateDefaultAccount);

  const handleDefaultChange = async (event) => {
    event.preventDefault(); // prevent Link navigation

    if (isDefault) {
      toast.warning("You need atleast 1 default account");
      return;
    }

    await updateDefaultFn(id);
  };

  useEffect(() => {
    if (updatedAccount?.success) {
      toast.success("Default account updated successfully");
    }
  }, [updatedAccount]);

  useEffect(() => {
    if (error) {
      toast.error(error.message || "Failed to update default account");
    }
  }, [error]);

  const typeLabel = `${type.charAt(0) + type.slice(1).toLowerCase()} Account`;

  const TypeIcon = type?.toLowerCase?.().includes("credit")
    ? CreditCard
    : Wallet;

  return (
    <Link href={`/account/${id}`} className="block">
      <Card className="rounded-3xl border-border bg-card shadow-sm transition-all hover:shadow-md">
        <CardContent className="p-6">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-secondary">
                  <TypeIcon className="h-4 w-4" />
                </div>

                <div className="min-w-0">
                  <div className="truncate text-sm font-semibold capitalize">
                    {name}
                  </div>
                  <div className="mt-0.5 text-xs text-muted-foreground">
                    {typeLabel}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div
                className={cn(
                  "rounded-xl px-2 py-1 text-[11px] font-medium",
                  isDefault
                    ? "bg-blue-600/10 text-blue-700"
                    : "bg-secondary text-muted-foreground"
                )}
              >
                {isDefault ? "Default" : "Set default"}
              </div>

              <Switch
                checked={isDefault}
                onClick={handleDefaultChange}
                disabled={updateDefaultLoading}
                aria-label="Toggle default account"
              />
            </div>
          </div>

          <div className="mt-6">
            <div className="text-2xl font-bold tracking-tight">
              ${parseFloat(balance).toFixed(2)}
            </div>

            <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1">
                <ArrowUpRight className="h-4 w-4 text-green-600" />
                Income
              </span>

              <span className="inline-flex items-center gap-1">
                <ArrowDownRight className="h-4 w-4 text-red-600" />
                Expense
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
