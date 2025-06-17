import { DashboardHeader } from "@/components/(dashboard)/shared/dashboard-header";
import { Button } from "@/components/ui/button";

import { Plus } from "lucide-react";

import Link from "next/link";
import ArticlesTable from "./_components/article-table/article-table";

export default async function ArticlesPage() {
  return (
    <div className="flex flex-col gap-4">
      <DashboardHeader heading="Articles" text="Manage your articles">
        <Button asChild>
          <Link href="/dashboard/articles/new">
            <Plus className="mr-2 h-4 w-4" /> New Article
          </Link>
        </Button>
      </DashboardHeader>

      <ArticlesTable />
    </div>
  );
}
