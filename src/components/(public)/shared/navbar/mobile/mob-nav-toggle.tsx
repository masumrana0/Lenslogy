"use client";
import React from "react";
import { toggleMobileMenu } from "@/redux/features/nav-states/nav-slice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { Menu, X } from "lucide-react";

const NavMobileToggle = () => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state) => state.navSlice.isMobileMenuOpen);
  return (
    <>
      <button
        onClick={() => dispatch(toggleMobileMenu())}
        className={`md:hidden w-10 h-10 flex flex-col items-center justify-center    transition-transform duration-500 ${
          isOpen && "rotate-180"
        }`}
      >
        {isOpen ? (
          <X size={24} className="text-gray-600 dark:text-gray-300" />
        ) : (
          <Menu size={24} className="text-gray-600 dark:text-gray-300" />
        )}
      </button>
    </>
  );
};

export default NavMobileToggle;
