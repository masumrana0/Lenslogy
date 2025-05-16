import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <Link href="/" className="shrink-0">
      <div className="flex items-center">
        <span className="font-bold text-2xl">
          <span className="text-black dark:text-white">Lens</span>
          <span className="text-red-500 dark:text-red-400">Logy</span>
        </span>
      </div>
    </Link>
  );
};

export default Logo;
