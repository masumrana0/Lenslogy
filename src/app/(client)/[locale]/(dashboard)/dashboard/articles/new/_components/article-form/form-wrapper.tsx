"use client";
import { IArticle } from "@/app/(client)/[locale]/(public)/article/_interface/interface";
import ArticleFormSkeleton from "../skeleton/article-form-skeleton";
import { Suspense } from "react";
import dynamic from "next/dynamic";
const ArticleForm = dynamic(() => import("./article-form"), {
  ssr: false,
  loading: () => <ArticleFormSkeleton />,
});

interface ArticleFormWrapperProps {
  article?: IArticle;
  onSuccess?: (article: IArticle) => void;
}

const ArticleFormWrapper = ({
  article,
  onSuccess,
}: ArticleFormWrapperProps) => {
  return (
    <Suspense fallback={<ArticleFormSkeleton />}>
      <ArticleForm article={article as any} onSuccess={onSuccess as any} />
    </Suspense>
  );
};

export default ArticleFormWrapper;
