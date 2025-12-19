# 💸 SpendWise

SpendWise is a modern **AI-powered personal finance platform** built with **Next.js** that helps users manage accounts, track transactions, set budgets, and visualize spending, all in a clean, fast, and responsive UI.

---

## ✨ What SpendWise Does

✅ **Account Management**
- Create multiple accounts (bank, cash, credit, etc.)
- Mark one account as the **default** (required for budgeting)

✅ **Transaction Tracking**
- Add **income** and **expense** transactions
- Edit existing transactions
- Supports **recurring transactions** (Daily, Weekly, Monthly, Yearly)

✅ **Smart Dashboard**
- View all accounts at a glance
- Monthly budget progress tracking for the **default account**
- Recent transactions list
- Monthly expense breakdown (category-wise)

✅ **Account Insights**
- Each account has a dedicated page with:
  - 📊 Bar graph overview (income vs expense)
  - 🧾 Transaction table with filters + sorting + pagination

✅ **Receipt Scanning (AI)**
- Upload a receipt image to auto-fill details like:
  - Amount
  - Date
  - Category
  - Description

✅ **Auth + Security**
- Secure authentication via **Clerk**
- Protection + rate limiting via **Arcjet**

---

## 🧰 Tech Stack

- **Framework:** Next.js (App Router)
- **UI:** Tailwind CSS + shadcn/ui
- **Auth:** Clerk
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Charts:** Recharts
- **Validation:** Zod + React Hook Form
- **Security:** Arcjet
- **Notifications:** Sonner

---

## 📁 Key Pages

- `/` → Landing page (Hero + Features + Testimonials)
- `/dashboard` → Dashboard overview (accounts, budget, charts)
- `/account/[id]` → Account detail + charts + transaction table
- `/transaction/create` → Add/Edit transaction

---

## 🔥 Core Features (Quick List)

- 🏦 Multi-account support
- ⭐ Default account logic
- 💰 Budget tracking + progress bar
- 🔁 Recurring transactions
- 🔍 Search + filters + sorting
- 🧹 Bulk delete transactions
- 📊 Interactive charts (bar + pie)
- 🧾 AI receipt scanning
- 🔐 Clerk authentication
- 🛡️ Arcjet protection

---


