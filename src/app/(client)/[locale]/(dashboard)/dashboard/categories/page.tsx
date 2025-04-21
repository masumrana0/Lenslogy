import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { DashboardHeader } from "@/components/(dashboard)/shared/dashboard-header";
import { CategoryForm } from "./_components/CategoryForm";
import { CategoriesTable } from "./_components/categories-table";

export default async function CategoriesPage() {
  const session = await getServerSession(authOptions);

  if (
    !session ||
    (session.user?.role !== "SUPER_ADMIN" && session.user?.role !== "ADMIN")
  ) {
    redirect("/dashboard");
  }

  return (
    <div className="flex flex-col gap-8">
      <DashboardHeader
        heading="Categories"
        text="Manage your blog categories"
      />

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div>
          <h2 className="text-xl font-bold mb-4">Add New Category</h2>
          <CategoryForm />
        </div>
        <div>
          <h2 className="text-xl font-bold mb-4">Existing Categories</h2>
          <CategoriesTable />
        </div>
      </div>
    </div>
  );
}
