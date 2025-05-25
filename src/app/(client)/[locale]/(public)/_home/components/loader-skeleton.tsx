import { Skeleton } from "@/components/ui/skeleton";

export default function HomeLoaderSkeleton() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Skeleton className="h-8 w-24" />
          <nav className="hidden md:flex items-center space-x-8">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-20" />
          </nav>
          <Skeleton className="h-4 w-20" />
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="grid lg:grid-cols-3 gap-6 mb-12">
          {/* Main Featured Article */}
          <div className="lg:col-span-2">
            <div className="relative h-64 lg:h-80 rounded-lg overflow-hidden">
              <Skeleton className="w-full h-full" />
              <div className="absolute bottom-4 left-4 right-4">
                <Skeleton className="h-4 w-20 mb-2" />
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            </div>
          </div>

          {/* Secondary Featured Articles */}
          <div className="space-y-4">
            <div className="relative h-28 rounded-lg overflow-hidden">
              <Skeleton className="w-full h-full" />
              <div className="absolute bottom-2 left-2 right-2">
                <Skeleton className="h-3 w-16 mb-1" />
                <Skeleton className="h-4 w-full mb-1" />
                <Skeleton className="h-3 w-1/2" />
              </div>
            </div>
            <div className="relative h-28 rounded-lg overflow-hidden">
              <Skeleton className="w-full h-full" />
              <div className="absolute bottom-2 left-2 right-2">
                <Skeleton className="h-3 w-16 mb-1" />
                <Skeleton className="h-4 w-full mb-1" />
                <Skeleton className="h-3 w-1/2" />
              </div>
            </div>
          </div>
        </div>

        {/* Featured Blog Section */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-4 w-16" />
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="h-48 w-full rounded-lg" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-5 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-20" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Latest News Section */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-4 w-16" />
          </div>
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Main News Article */}
            <div className="space-y-4">
              <Skeleton className="h-64 w-full rounded-lg" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-20" />
              </div>
            </div>

            {/* News List */}
            <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex space-x-4">
                  <Skeleton className="h-16 w-16 rounded-lg flex-shrink-0" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-3 w-16" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-3 w-full" />
                    <Skeleton className="h-3 w-20" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-slate-900 text-white mt-16">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Brand Section */}
            <div className="space-y-4">
              <Skeleton className="h-8 w-24 bg-slate-700" />
              <Skeleton className="h-4 w-full bg-slate-700" />
              <Skeleton className="h-4 w-3/4 bg-slate-700" />
              <div className="flex space-x-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Skeleton key={i} className="h-6 w-6 bg-slate-700" />
                ))}
              </div>
            </div>

            {/* Categories */}
            <div className="space-y-4">
              <Skeleton className="h-5 w-20 bg-slate-700" />
              <div className="space-y-2">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <Skeleton key={i} className="h-4 w-16 bg-slate-700" />
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <Skeleton className="h-5 w-24 bg-slate-700" />
              <div className="space-y-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Skeleton key={i} className="h-4 w-20 bg-slate-700" />
                ))}
              </div>
            </div>

            {/* Newsletter */}
            <div className="space-y-4">
              <Skeleton className="h-5 w-20 bg-slate-700" />
              <Skeleton className="h-4 w-full bg-slate-700" />
              <Skeleton className="h-4 w-3/4 bg-slate-700" />
              <div className="space-y-2">
                <Skeleton className="h-10 w-full bg-slate-700" />
                <Skeleton className="h-10 w-full bg-slate-700" />
              </div>
            </div>
          </div>

          <div className="border-t border-slate-700 mt-8 pt-8 text-center">
            <Skeleton className="h-4 w-48 bg-slate-700 mx-auto" />
          </div>
        </div>
      </footer>
    </div>
  );
}
