import type React from "react";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

import { DashboardNav } from "@/components/(dashboard)/shared/nav";
import { UserNav } from "@/components/(dashboard)/shared/nav/user-nav";
import Logo from "@/components/(public)/shared/navbar/logo";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = (await getServerSession(authOptions)) as {
    user?: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role?: string; // Added role property
    };
  };

  // if (!session) {
  //   redirect("/auth/login");
  // }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Logo />
          {session.user && <UserNav user={session.user} />}
        </div>
      </header>
      <div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr] lg:grid-cols-[240px_1fr]">
        <aside className="hidden w-[200px] flex-col md:flex lg:w-[240px] border-r py-6 pr-6">
          {session.user && <DashboardNav role={session.user.role as string} />}
        </aside>
        <main className="flex w-full flex-1 flex-col overflow-hidden py-6">
          {children}
        </main>
      </div>
    </div>
  );
}
