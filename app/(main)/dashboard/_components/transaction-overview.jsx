"use client";

import { useMemo, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import { format } from "date-fns";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const COLORS = [
  "#FF6B6B",
  "#4ECDC4",
  "#45B7D1",
  "#96CEB4",
  "#FFEEAD",
  "#D4A5A5",
  "#9FA8DA",
];

export function DashboardOverview({ accounts, transactions }) {
  const initialId = accounts.find((a) => a.isDefault)?.id || accounts[0]?.id;
  const [selectedAccountId, setSelectedAccountId] = useState(initialId);

  const { recentTransactions, pieChartData } = useMemo(() => {
    const accountTransactions = (transactions || []).filter(
      (t) => t.accountId === selectedAccountId
    );

    const recent = [...accountTransactions]
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 5);

    const now = new Date();
    const currentMonthExpenses = accountTransactions.filter((t) => {
      const d = new Date(t.date);
      return (
        t.type === "EXPENSE" &&
        d.getMonth() === now.getMonth() &&
        d.getFullYear() === now.getFullYear()
      );
    });

    const expensesByCategory = currentMonthExpenses.reduce((acc, t) => {
      const category = t.category;
      if (!acc[category]) acc[category] = 0;
      acc[category] += t.amount;
      return acc;
    }, {});

    const pie = Object.entries(expensesByCategory).map(([name, value]) => ({
      name,
      value,
    }));

    return { recentTransactions: recent, pieChartData: pie };
  }, [transactions, selectedAccountId]);

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {/* Recent */}
      <Card className="rounded-3xl border-border bg-card shadow-sm">
        <CardContent className="p-6">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="text-sm font-semibold">Recent transactions</div>
              <div className="mt-1 text-xs text-muted-foreground">
                Latest activity for the selected account.
              </div>
            </div>

            <Select
              value={selectedAccountId}
              onValueChange={setSelectedAccountId}
            >
              <SelectTrigger className="w-[180px] rounded-xl">
                <SelectValue placeholder="Select account" />
              </SelectTrigger>
              <SelectContent>
                {accounts.map((a) => (
                  <SelectItem key={a.id} value={a.id}>
                    {a.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="mt-6 space-y-4">
            {recentTransactions.length === 0 ? (
              <div className="rounded-2xl border border-border bg-secondary/40 p-6 text-center text-sm text-muted-foreground">
                No recent transactions for this account.
              </div>
            ) : (
              recentTransactions.map((t) => (
                <div
                  key={t.id}
                  className="flex items-center justify-between gap-4 rounded-2xl border border-border bg-background/40 px-4 py-3"
                >
                  <div className="min-w-0">
                    <div className="truncate text-sm font-medium">
                      {t.description || "Untitled Transaction"}
                    </div>
                    <div className="mt-1 text-xs text-muted-foreground">
                      {format(new Date(t.date), "PP")}
                    </div>
                  </div>

                  <div
                    className={cn(
                      "shrink-0 inline-flex items-center rounded-xl px-3 py-1 text-sm font-medium",
                      t.type === "EXPENSE"
                        ? "bg-red-500/10 text-red-600"
                        : "bg-green-500/10 text-green-600"
                    )}
                  >
                    {t.type === "EXPENSE" ? (
                      <ArrowDownRight className="mr-1 h-4 w-4" />
                    ) : (
                      <ArrowUpRight className="mr-1 h-4 w-4" />
                    )}
                    ${t.amount.toFixed(2)}
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* Breakdown */}
      <Card className="rounded-3xl border-border bg-card shadow-sm">
        <CardContent className="p-6">
          <div className="text-sm font-semibold">Monthly expense breakdown</div>
          <div className="mt-1 text-xs text-muted-foreground">
            Category split for the current month.
          </div>

          <div className="mt-6">
            {pieChartData.length === 0 ? (
              <div className="rounded-2xl border border-border bg-secondary/40 p-6 text-center text-sm text-muted-foreground">
                No expenses this month.
              </div>
            ) : (
              <div className="h-[320px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieChartData}
                      cx="50%"
                      cy="50%"
                      outerRadius={95}
                      dataKey="value"
                      labelLine={false}
                    >
                      {pieChartData.map((_, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value) => `$${Number(value).toFixed(2)}`}
                      contentStyle={{
                        backgroundColor: "hsl(var(--popover))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "12px",
                      }}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
