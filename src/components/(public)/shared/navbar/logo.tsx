import Link from "next/link";
import React from "react";

const Logo = ({ className }: { className?: string }) => {
  return (
    <Link href="/" className={`shrink-0 ${className}`}>
      <div className="flex items-center">
        <span className="font-bold text-2xl">
          <span className="text-black dark:text-white">Masum </span>
          <span className="text-red-500 dark:text-red-400">Rana</span>
        </span>
      </div>
    </Link>
  );
};

export default Logo;
