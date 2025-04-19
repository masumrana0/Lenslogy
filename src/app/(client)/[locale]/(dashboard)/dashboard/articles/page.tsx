import Link from "next/link"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { DashboardHeader } from "@/components/(dashboard)/shared/dashboard-header"
import { ArticlesTable } from "./_components/article-table"
 
export default async function ArticlesPage() {
  const session = await getServerSession(authOptions)

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
  )
}
