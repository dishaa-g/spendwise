"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon, Loader2, Sparkles } from "lucide-react";
import { format } from "date-fns";
import { useRouter, useSearchParams } from "next/navigation";
import useFetch from "@/hooks/use-fetch";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CreateAccountDrawer } from "@/components/create-account-drawer";
import { cn } from "@/lib/utils";
import { createTransaction, updateTransaction } from "@/actions/transaction";
import { transactionSchema } from "@/app/lib/schema";
import { ReceiptScanner } from "./recipt-scanner";
import { Card, CardContent } from "@/components/ui/card";

export function AddTransactionForm({
  accounts,
  categories,
  editMode = false,
  initialData = null,
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get("edit");

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    getValues,
    reset,
  } = useForm({
    resolver: zodResolver(transactionSchema),
    defaultValues:
      editMode && initialData
        ? {
            type: initialData.type,
            amount: initialData.amount.toString(),
            description: initialData.description,
            accountId: initialData.accountId,
            category: initialData.category,
            date: new Date(initialData.date),
            isRecurring: initialData.isRecurring,
            ...(initialData.recurringInterval && {
              recurringInterval: initialData.recurringInterval,
            }),
          }
        : {
            type: "EXPENSE",
            amount: "",
            description: "",
            accountId: accounts.find((ac) => ac.isDefault)?.id,
            date: null,
            isRecurring: false,
          },
  });

  useEffect(() => {
    if (!editMode) {
      const d = getValues("date");
      if (!d) setValue("date", new Date(), { shouldValidate: false });
    }
  }, [editMode, getValues, setValue]);

  const {
    loading: transactionLoading,
    fn: transactionFn,
    data: transactionResult,
  } = useFetch(editMode ? updateTransaction : createTransaction);

  const onSubmit = (data) => {
    const formData = { ...data, amount: parseFloat(data.amount) };
    if (editMode) transactionFn(editId, formData);
    else transactionFn(formData);
  };

  const handleScanComplete = (scannedData) => {
    if (scannedData) {
      setValue("amount", scannedData.amount.toString());
      setValue("date", new Date(scannedData.date));
      if (scannedData.description)
        setValue("description", scannedData.description);
      if (scannedData.category) setValue("category", scannedData.category);
      toast.success("Receipt scanned successfully");
    }
  };

  useEffect(() => {
    if (transactionResult?.success && !transactionLoading) {
      toast.success(
        editMode
          ? "Transaction updated successfully"
          : "Transaction created successfully"
      );
      reset();
      router.push(`/account/${transactionResult.data.accountId}`);
    }
  }, [transactionResult, transactionLoading, editMode, reset, router]);

  const type = watch("type");
  const isRecurring = watch("isRecurring");
  const date = watch("date");

  const filteredCategories = categories.filter((c) => c.type === type);

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {/* Left: Form */}
      <Card className="lg:col-span-2 rounded-3xl border-border bg-card shadow-sm">
        <CardContent className="p-6 sm:p-7">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Type */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Type</label>
              <Select
                onValueChange={(value) => setValue("type", value)}
                defaultValue={type}
              >
                <SelectTrigger className="rounded-xl">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="EXPENSE">Expense</SelectItem>
                  <SelectItem value="INCOME">Income</SelectItem>
                </SelectContent>
              </Select>
              {errors.type && (
                <p className="text-sm text-red-500">{errors.type.message}</p>
              )}
            </div>

            {/* Amount + Account */}
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium">Amount</label>
                <Input
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  {...register("amount")}
                  className="rounded-xl"
                />
                {errors.amount && (
                  <p className="text-sm text-red-500">
                    {errors.amount.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Account</label>
                <Select
                  onValueChange={(value) => setValue("accountId", value)}
                  defaultValue={getValues("accountId")}
                >
                  <SelectTrigger className="rounded-xl">
                    <SelectValue placeholder="Select account" />
                  </SelectTrigger>
                  <SelectContent>
                    {accounts.map((account) => (
                      <SelectItem key={account.id} value={account.id}>
                        {account.name} ($
                        {parseFloat(account.balance).toFixed(2)})
                      </SelectItem>
                    ))}
                    <CreateAccountDrawer>
                      <Button
                        variant="ghost"
                        className="relative flex w-full cursor-default select-none items-center rounded-xl py-1.5 pl-8 pr-2 text-sm outline-none hover:bg-accent hover:text-accent-foreground"
                      >
                        Create Account
                      </Button>
                    </CreateAccountDrawer>
                  </SelectContent>
                </Select>
                {errors.accountId && (
                  <p className="text-sm text-red-500">
                    {errors.accountId.message}
                  </p>
                )}
              </div>
            </div>

            {/* Category */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Category</label>
              <Select
                onValueChange={(value) => setValue("category", value)}
                defaultValue={getValues("category")}
              >
                <SelectTrigger className="rounded-xl">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {filteredCategories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.category && (
                <p className="text-sm text-red-500">
                  {errors.category.message}
                </p>
              )}
            </div>

            {/* Date */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Date</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start rounded-xl pl-3 text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    {mounted && date ? (
                      format(date, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date || undefined}
                    onSelect={(d) => d && setValue("date", d)}
                    disabled={(d) =>
                      d > new Date() || d < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              {errors.date && (
                <p className="text-sm text-red-500">{errors.date.message}</p>
              )}
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Description</label>
              <Input
                placeholder="Eg. Grocery, Uber, Salary..."
                {...register("description")}
                className="rounded-xl"
              />
              {errors.description && (
                <p className="text-sm text-red-500">
                  {errors.description.message}
                </p>
              )}
            </div>

            {/* Recurring */}
            <div className="flex flex-col gap-3 rounded-2xl border border-border bg-background/40 p-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="space-y-0.5">
                <label className="text-sm font-semibold">
                  Recurring transaction
                </label>
                <div className="text-xs text-muted-foreground">
                  Automatically repeat this transaction on a schedule.
                </div>
              </div>
              <Switch
                checked={isRecurring}
                onCheckedChange={(checked) => setValue("isRecurring", checked)}
              />
            </div>

            {isRecurring && (
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Recurring interval
                </label>
                <Select
                  onValueChange={(value) =>
                    setValue("recurringInterval", value)
                  }
                  defaultValue={getValues("recurringInterval")}
                >
                  <SelectTrigger className="rounded-xl">
                    <SelectValue placeholder="Select interval" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="DAILY">Daily</SelectItem>
                    <SelectItem value="WEEKLY">Weekly</SelectItem>
                    <SelectItem value="MONTHLY">Monthly</SelectItem>
                    <SelectItem value="YEARLY">Yearly</SelectItem>
                  </SelectContent>
                </Select>
                {errors.recurringInterval && (
                  <p className="text-sm text-red-500">
                    {errors.recurringInterval.message}
                  </p>
                )}
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                className="w-full rounded-xl"
                onClick={() => router.back()}
                disabled={transactionLoading}
              >
                Cancel
              </Button>

              <Button
                type="submit"
                className="w-full rounded-xl"
                disabled={transactionLoading}
              >
                {transactionLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {editMode ? "Updating..." : "Creating..."}
                  </>
                ) : editMode ? (
                  "Update transaction"
                ) : (
                  "Create transaction"
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Right: Scan + Tips */}
      <div className="space-y-6">
        {!editMode && (
          <Card className="rounded-3xl border-border bg-card shadow-sm">
            <CardContent className="p-6 space-y-4">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-secondary">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-sm font-semibold">Scan receipt</div>
                  <div className="mt-1 text-xs text-muted-foreground">
                    Upload a receipt image to auto-fill amount, date, and
                    category.
                  </div>
                </div>
              </div>

              <ReceiptScanner onScanComplete={handleScanComplete} />

              <div className="rounded-2xl border border-border bg-background/40 p-4 text-xs text-muted-foreground">
                Tip: Use a clear photo with visible totals and date for best
                results.
              </div>
            </CardContent>
          </Card>
        )}

        <Card className="rounded-3xl border-border bg-card shadow-sm">
          <CardContent className="p-6">
            <div className="text-sm font-semibold">Good to know</div>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>• Pick the right account so balances remain accurate.</li>
              <li>• Use recurring for subscriptions and monthly bills.</li>
              <li>• Add a short description so search works better later.</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
