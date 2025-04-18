import Link from "next/link";
import React from "react";

const ViewAll: React.FC<{ title: string; href: string }> = ({
  href,
  title,
}) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-xl font-bold relative pl-3 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-red-500">
        {title}
      </h2>
      <Link
        href={`/article/${href}`}
        className="text-sm text-red-500 hover:underline"
      >
        View All
      </Link>
    </div>
  );
};

export default ViewAll;
