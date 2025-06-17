import type { ReactNode } from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/next-auth/auth";
import { redirect } from "next/navigation";
import DashBoardSidebarNav from "@/components/(dashboard)/shared/nav";
import DashboardTopNav from "@/components/(dashboard)/shared/nav/top-nav";
import type { IUser } from "./users/_interface/user.interface";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/auth/login");

  const userRole = session.user.role ?? "AUTHOR";

  return (
    <div className="flex h-screen w-full overflow-hidden scrollbar-hidden container mx-auto">
      {/* Top nav - fixed height */}
      <div className="fixed top-0 left-0 right-0 z-50 border-b bg-background">
        <DashboardTopNav user={session.user as IUser} />
      </div>

      {/* Main content with sidebar and scrollable area */}
      <div className="flex w-full mt-[60px] h-[calc(100vh-60px)]">
        {/* Sidebar (desktop) - fixed position */}
        <aside className="hidden md:block w-64 flex-shrink-0 border-r bg-background">
          <div className="h-full px-4 py-6">
            <DashBoardSidebarNav role={userRole} />
          </div>
        </aside>

        {/* Main content area */}
        <main className="flex-1 flex flex-col w-full">
          {/* Top nav (mobile only) */}
          <div className="md:hidden border-b bg-background p-2">
            <DashBoardSidebarNav role={userRole} />
          </div>

          {/* Scrollable content area - ONLY this will have a scrollbar */}
          <div className="flex-1 overflow-y-auto overflow-x-hidden">
            <div className="p-5">{children}</div>
          </div>
        </main>
      </div>
    </div>
  );
}
