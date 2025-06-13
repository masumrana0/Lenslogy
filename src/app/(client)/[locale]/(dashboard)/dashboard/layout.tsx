import type { ReactNode } from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/next-auth/auth";
import { redirect } from "next/navigation";
import DashBoardSidebarNav from "@/components/(dashboard)/shared/nav";
import DashboardTopNav from "@/components/(dashboard)/shared/nav/top-nav";
import { IUser } from "./users/_interface/user.interface";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  const userRole = session.user.role ?? "AUTHOR";

  return (
    <div className="flex min-h-screen flex-col">
      <DashboardTopNav user={session.user as IUser} />
      <div className="flex flex-1  container mx-auto ">
        {/* Sidebar (desktop) */}
        <aside className="hidden md:flex w-64 flex-col border-r bg-background px-4 py-6">
          <DashBoardSidebarNav role={userRole} />
        </aside>

        {/* Main content */}
        <main className="flex-1 overflow-auto ">
          {/* Top nav (mobile only) */}
          <div className="md:hidden mb-6 p-2">
            <DashBoardSidebarNav role={userRole} />
          </div>

          {children}
        </main>
      </div>
    </div>
  );
}
