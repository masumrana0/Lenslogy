// import { authOptions } from "@/lib/next-auth/auth";
// import { getServerSession } from "next-auth/next";
// import { redirect } from "next/navigation";

import { DashboardHeader } from "@/components/(dashboard)/shared/dashboard-header";
import ArticleFormWrapper from "./_components/article-form/form-wrapper";

const NewArticlePage = () => {
  // const session = getServerSession(authOptions);

  // if (!session) {
  //   redirect("/auth/login");
  // }

  return (
    <div className="flex flex-col gap-4">
      <DashboardHeader
        heading="Create Article"
        text="Create a new article for your blog"
      />

      <ArticleFormWrapper />
    </div>
  );
};

export default NewArticlePage;
