// actions/dashboard.js
"use server";

import aj from "@/lib/arcjet";
import { db } from "@/lib/prisma";
import { request } from "@arcjet/next";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { getOrCreateDbUser } from "@/lib/checkUser";

const serialize = (obj) => {
  const serialized = { ...obj };

  // Prisma Decimal safety
  if (serialized.balance?.toNumber)
    serialized.balance = serialized.balance.toNumber();
  if (serialized.amount?.toNumber)
    serialized.amount = serialized.amount.toNumber();

  return serialized;
};

export async function getUserAccounts() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  // Ensures the DB user exists even for brand new signups
  const user = await getOrCreateDbUser();

  const accounts = await db.account.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
    include: {
      _count: { select: { transactions: true } },
    },
  });

  return accounts.map(serialize);
}

export async function createAccount(data) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const req = await request();

  const decision = await aj.protect(req, {
    userId,
    requested: 1,
  });

  if (decision.isDenied()) {
    if (decision.reason.isRateLimit()) {
      throw new Error("Too many requests. Please try again later.");
    }
    throw new Error("Request blocked");
  }

  const user = await getOrCreateDbUser();

  const balanceFloat = parseFloat(data.balance);
  if (Number.isNaN(balanceFloat)) throw new Error("Invalid balance amount");

  const existingAccounts = await db.account.findMany({
    where: { userId: user.id },
    select: { id: true },
  });

  const shouldBeDefault =
    existingAccounts.length === 0 ? true : !!data.isDefault;

  if (shouldBeDefault) {
    await db.account.updateMany({
      where: { userId: user.id, isDefault: true },
      data: { isDefault: false },
    });
  }

  const account = await db.account.create({
    data: {
      ...data,
      balance: balanceFloat,
      userId: user.id,
      isDefault: shouldBeDefault,
    },
  });

  revalidatePath("/dashboard");
  return { success: true, data: serialize(account) };
}

export async function getDashboardData() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await getOrCreateDbUser();

  const transactions = await db.transaction.findMany({
    where: { userId: user.id },
    orderBy: { date: "desc" },
  });

  return transactions.map(serialize);
}
