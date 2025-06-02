// "use client";
// import type { IArticle } from "@/app/(client)/[locale]/(public)/article/_interface/interface";
// import ArticleFormSkeleton from "../skeleton/article-form-skeleton";
// import { Suspense, useState, useEffect } from "react";
// import dynamic from "next/dynamic";

// const ArticleForm = dynamic(() => import("./article-form"), {
//   ssr: false,
//   loading: () => <ArticleFormSkeleton />,
// });

// interface ArticleFormWrapperProps {
//   article?: IArticle;
//   onSuccess?: (article: IArticle) => void;
// }

// const ArticleFormWrapper = ({
//   article,
//   onSuccess,
// }: ArticleFormWrapperProps) => {
//   const [isMounted, setIsMounted] = useState(false);

//   useEffect(() => {
//     setIsMounted(true);
//   }, []);

//   if (!isMounted) {
//     return <ArticleFormSkeleton />;
//   }

//   return (
//     // <Suspense fallback={<ArticleFormSkeleton />}>
//     <ArticleForm article={article as any} onSuccess={onSuccess as any} />
//     // </Suspense>
//   );
// };

// export default ArticleFormWrapper;

"use client";
import type { IArticle } from "@/app/(client)/[locale]/(public)/article/_interface/interface";
import ArticleFormSkeleton from "../skeleton/article-form-skeleton";
import React, { useState, useEffect, SetStateAction, Dispatch } from "react";

// Import directly instead of dynamic import to avoid hydration issues
import ArticleForm from "./article-form";

interface ArticleFormWrapperProps {
  article?: IArticle;
  setIsEditOpen: Dispatch<
    SetStateAction<{ state: boolean; article: any | null }>
  >;
}

const ArticleFormWrapper = ({
  article,
  setIsEditOpen,
}: ArticleFormWrapperProps) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Ensure we're on the client side
    setIsClient(true);
  }, []);

  // Show skeleton until client-side hydration is complete
  if (!isClient) {
    return <ArticleFormSkeleton />;
  }

  return <ArticleForm article={article as any} setIsEditOpen={setIsEditOpen} />;
};

export default ArticleFormWrapper;
