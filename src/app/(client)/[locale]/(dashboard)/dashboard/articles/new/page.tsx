import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

import { DashboardHeader } from "@/components/(dashboard)/shared/dashboard-header";
import { ArticleForm } from "../_components/article-form";

export default async function NewArticlePage() {
  const session = await getServerSession(authOptions);

  // if (!session) {
  //   redirect("/auth/login");
  // }

  return (
    <div className="flex flex-col gap-4">
      <DashboardHeader
        heading="Create Article"
        text="Create a new article for your blog"
      />

      <ArticleForm />
    </div>
  );
}
