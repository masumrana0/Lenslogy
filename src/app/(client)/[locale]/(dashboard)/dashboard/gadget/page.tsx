import { DashboardHeader } from "@/components/(dashboard)/shared/dashboard-header";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import React from "react";
import GadgetTable from "./_components/gadget-table";

const GadgetPage = () => {
  return (
    <div className="flex flex-col gap-4">
      <DashboardHeader heading="Gadgets" text="Manage your Gadget">
        <Button asChild>
          <Link href="/dashboard/gadget/new">
            <Plus className=" h-3 w-2" />Create Gadget
          </Link>
        </Button>
      </DashboardHeader>

      <GadgetTable />
    </div>
  );
};

export default GadgetPage;
