"use client";
import React, { useState } from "react";
import { Search, X } from "lucide-react";

const NavSearchBar = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  return (
    <div>
      <button
        onClick={() => setSearchOpen(!searchOpen)}
        className="p-1 text-gray-600 hover:text-red-500 dark:text-gray-300 dark:hover:text-red-400"
      >
        <Search size={18} />
      </button>
      {searchOpen && (
        <div className="absolute top-12 left-0 w-full bg-white dark:bg-gray-800 shadow-md p-4 z-50 border-t border-gray-200 dark:border-gray-700">
          <div className="container mx-auto flex items-center">
            <input
              type="text"
              //   placeholder={translations[language].search}
              placeholder="Search"
              className="w-full p-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500 dark:focus:ring-red-400 rounded"
            />
            <button className="p-2 bg-red-500 hover:bg-red-600 text-white ml-2 rounded">
              <Search size={18} />
            </button>
            <button
              onClick={() => setSearchOpen(false)}
              className="p-2 ml-2 text-gray-600 dark:text-gray-300"
            >
              <X size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavSearchBar;
