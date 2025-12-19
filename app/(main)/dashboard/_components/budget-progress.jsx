"use client";

import { useState, useEffect } from "react";
import { Pencil, Check, X } from "lucide-react";
import useFetch from "@/hooks/use-fetch";
import { toast } from "sonner";

import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { updateBudget } from "@/actions/budget";

export function BudgetProgress({ initialBudget, currentExpenses }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newBudget, setNewBudget] = useState(
    initialBudget?.amount?.toString() || ""
  );

  const {
    loading: isLoading,
    fn: updateBudgetFn,
    data: updatedBudget,
    error,
  } = useFetch(updateBudget);

  const percentUsed = initialBudget
    ? (currentExpenses / initialBudget.amount) * 100
    : 0;

  const handleUpdateBudget = async () => {
    const amount = parseFloat(newBudget);
    if (isNaN(amount) || amount <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }
    await updateBudgetFn(amount);
  };

  const handleCancel = () => {
    setNewBudget(initialBudget?.amount?.toString() || "");
    setIsEditing(false);
  };

  useEffect(() => {
    if (updatedBudget?.success) {
      setIsEditing(false);
      toast.success("Budget updated successfully");
    }
  }, [updatedBudget]);

  useEffect(() => {
    if (error) toast.error(error.message || "Failed to update budget");
  }, [error]);

  const budgetLine = initialBudget
    ? `$${currentExpenses.toFixed(2)} of $${initialBudget.amount.toFixed(2)} spent`
    : "No budget set (default account)";

  const remaining = initialBudget
    ? Math.max(initialBudget.amount - currentExpenses, 0)
    : 0;

  return (
    <Card className="rounded-3xl border-border bg-card shadow-sm">
      <CardContent className="p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="text-sm font-semibold">Monthly budget</div>
            <div className="mt-1 text-sm text-muted-foreground">
              {budgetLine}
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isEditing ? (
              <>
                <Input
                  type="number"
                  value={newBudget}
                  onChange={(e) => setNewBudget(e.target.value)}
                  className="w-36 rounded-xl"
                  placeholder="Amount"
                  autoFocus
                  disabled={isLoading}
                />
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-xl"
                  onClick={handleUpdateBudget}
                  disabled={isLoading}
                  aria-label="Save budget"
                >
                  <Check className="h-4 w-4 text-green-600" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-xl"
                  onClick={handleCancel}
                  disabled={isLoading}
                  aria-label="Cancel"
                >
                  <X className="h-4 w-4 text-red-600" />
                </Button>
              </>
            ) : (
              <Button
                variant="outline"
                className="rounded-xl"
                onClick={() => setIsEditing(true)}
              >
                <Pencil className="h-4 w-4" />
                <span className="ml-2">Edit</span>
              </Button>
            )}
          </div>
        </div>

        {initialBudget ? (
          <div className="mt-6 space-y-2">
            <Progress
              value={percentUsed}
              extraStyles={`${
                percentUsed >= 90
                  ? "bg-red-500"
                  : percentUsed >= 75
                    ? "bg-yellow-500"
                    : "bg-green-500"
              }`}
            />
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>{Math.min(percentUsed, 100).toFixed(1)}% used</span>
              <span>Remaining: ${remaining.toFixed(2)}</span>
            </div>
          </div>
        ) : (
          <div className="mt-6 rounded-2xl border border-border bg-secondary/40 p-4 text-sm text-muted-foreground">
            Set a monthly budget for your default account to track spending.
          </div>
        )}
      </CardContent>
    </Card>
  );
}
