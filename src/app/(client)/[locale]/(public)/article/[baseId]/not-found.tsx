import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function ArticleNotFound() {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
      <div className="text-center px-4">
        <h1 className="text-6xl font-bold text-gray-900 dark:text-white mb-4">
          404
        </h1>
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-6">
          Article Not Found
        </h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto mb-8">
          The article you&apos;re looking for doesn&apos;t exist or has been removed.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
        >
          <ArrowLeft size={18} />
          Back to Home
        </Link>
      </div>
    </main>
  );
}
