import { DashboardHeader } from "@/components/(dashboard)/shared/dashboard-header";
import { authOptions } from "@/lib/next-auth/auth";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import FormValueForm from "../brand/_components/create-form-data-form";
import FormDataTable from "../brand/_components/form-data-table";

export default async function GadgetType() {
  const session = await getServerSession(authOptions);

  if (
    !session ||
    (session.user?.role !== "SUPER_ADMIN" && session.user?.role !== "ADMIN")
  ) {
    redirect("/dashboard");
  }

  return (
    <div className="flex flex-col gap-8">
      <DashboardHeader heading="Gadget Types" text="Manage your  Gadget Type" />

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div>
          <h2 className="text-xl font-bold mb-4">Add New Gadget Type</h2>
          <FormValueForm mode="gadgetType" />
        </div>
        <div>
          <h2 className="text-xl font-bold mb-4">Existing Gadget Types</h2>
          <FormDataTable mode="gadgetType" />
        </div>
      </div>
    </div>
  );
}
