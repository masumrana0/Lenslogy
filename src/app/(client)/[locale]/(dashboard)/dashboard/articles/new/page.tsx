"use client";
import { DashboardHeader } from "@/components/(dashboard)/shared/dashboard-header";
import { useEffect, useState } from "react";
import ArticleForm from "./_components/article-form/article-form";
import ArticleFormSkeleton from "./_components/skeleton/article-form-skeleton";

// Import a simple placeholder instead of the complex form

const NewArticlePage = () => {
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    setShowForm(true);
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <DashboardHeader
        heading="Create Article"
        text="Create a new article for your blog"
      />

      {!showForm ? <ArticleFormSkeleton /> : <ArticleForm />}
    </div>
  );
};

export default NewArticlePage;
