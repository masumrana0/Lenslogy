import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { DashboardHeader } from "@/components/(dashboard)/shared/dashboard-header";
import { UsersTable } from "./_components/users-table";
import UserForm from "./_components/user-form";

export default async function UsersPage() {
  const session = await getServerSession(authOptions);
  const role = session?.user.role;

  if (
    !session ||
    !session.user ||
    (role !== "SUPER_ADMIN" && role !== "ADMIN")
  ) {
    redirect("/dashboard");
  }

  return (
    <div className="flex flex-col gap-8">
      <DashboardHeader heading="Users" text="Manage your blog users" />

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div>
          <h2 className="text-xl font-bold mb-4">Add New User</h2>
          <UserForm currentUserRole={role} />
        </div>
        <div>
          <h2 className="text-xl font-bold mb-4">Existing Users</h2>
          <UsersTable currentUserRole={role} />
        </div>
      </div>
    </div>
  );
}
