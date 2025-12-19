"use client";

import Link from "next/link";
import { useEffect } from "react";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { toast } from "sonner";

import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import useFetch from "@/hooks/use-fetch";
import { updateDefaultAccount } from "@/actions/account";

export function ManageAccountCard({ account }) {
  const { id, name, type, balance, isDefault } = account;

  const {
    loading: updateDefaultLoading,
    fn: updateDefaultFn,
    data: updatedAccount,
    error,
  } = useFetch(updateDefaultAccount);

  const handleDefaultChange = async () => {
    if (isDefault) {
      toast.warning("You need at least 1 default account");
      return;
    }
    await updateDefaultFn(id);
  };

  useEffect(() => {
    if (updatedAccount?.success)
      toast.success("Default account updated successfully");
  }, [updatedAccount]);

  useEffect(() => {
    if (error) toast.error(error.message || "Failed to update default account");
  }, [error]);

  const typeLabel = `${type.charAt(0) + type.slice(1).toLowerCase()} Account`;

  return (
    <Card className="h-full rounded-3xl border-border bg-card shadow-sm hover:shadow-soft transition-shadow">
      <CardContent className="flex h-full flex-col p-6">
        {/* Top */}
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <div className="truncate text-sm font-semibold capitalize">
                {name}
              </div>
              {isDefault && (
                <span className="shrink-0 rounded-full bg-green-500/10 px-2 py-0.5 text-xs font-medium text-green-700">
                  Default
                </span>
              )}
            </div>
            <div className="mt-1 text-xs text-muted-foreground">
              {typeLabel}
            </div>
          </div>

          <Switch
            checked={isDefault}
            onCheckedChange={handleDefaultChange}
            disabled={updateDefaultLoading}
            aria-label="Toggle default account"
          />
        </div>

        {/* Middle */}
        <div className="mt-6">
          <div className="text-2xl font-bold tracking-tight">
            ${parseFloat(balance).toFixed(2)}
          </div>

          <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1">
              <ArrowUpRight className="h-4 w-4 text-green-500" />
              Income
            </span>
            <span className="inline-flex items-center gap-1">
              <ArrowDownRight className="h-4 w-4 text-red-500" />
              Expense
            </span>
          </div>
        </div>

        {/* Bottom: buttons always stay inside */}
        {/* Bottom: actions (no overflow) */}
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Link href={`/account/${id}`} className="min-w-0 flex-1">
            <Button className="w-full rounded-xl whitespace-normal">
              View details
            </Button>
          </Link>

          <Link href="/transaction/create" className="min-w-0 flex-1">
            <Button
              variant="outline"
              className="w-full rounded-xl whitespace-normal"
            >
              Add transaction
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
