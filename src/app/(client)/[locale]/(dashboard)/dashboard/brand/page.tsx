import { DashboardHeader } from "@/components/(dashboard)/shared/dashboard-header";
import { authOptions } from "@/lib/next-auth/auth";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import FormValueForm from "./_components/create-form-data-form";
import FormDataTable from "./_components/form-data-table";

export default async function BrandPage() {
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
          <h2 className="text-xl font-bold mb-4">Add New Brand</h2>
          <FormValueForm mode="brand" />
        </div>
        <div>
          <h2 className="text-xl font-bold mb-4">Existing Brands</h2>
          <FormDataTable mode="brand" />
        </div>
      </div>
    </div>
  );
}
