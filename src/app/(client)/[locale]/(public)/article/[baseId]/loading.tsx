import ArticleSkeleton from "../_components/skeleton/article-detail";

export default function Loading() {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-900">
      <ArticleSkeleton />
    </main>
  );
}
