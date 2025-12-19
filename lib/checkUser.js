// lib/checkUser.js
"use server";

import { auth, clerkClient } from "@clerk/nextjs/server";
import { db } from "@/lib/prisma";

export async function getOrCreateDbUser() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  // 1) Try find existing DB user
  let user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });
  if (user) return user;

  // 2) Create DB user from Clerk profile
  const client = await clerkClient();
  const clerkUser = await client.users.getUser(userId);

  const email =
    clerkUser.emailAddresses?.[0]?.emailAddress ||
    clerkUser.primaryEmailAddress?.emailAddress ||
    "";

  const name = [clerkUser.firstName, clerkUser.lastName]
    .filter(Boolean)
    .join(" ")
    .trim();

  // IMPORTANT:
  // If your Prisma User model requires different fields, adjust here.
  user = await db.user.create({
    data: {
      clerkUserId: userId,
      email,
      name: name || "User",
    },
  });

  return user;
}
