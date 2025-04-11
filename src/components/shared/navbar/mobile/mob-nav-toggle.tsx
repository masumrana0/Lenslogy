"use client";
import { toggleMobileMenu } from "@/redux/features/nav-states/nav-slice";
import { useAppDispatch } from "@/redux/hook";
import { Menu } from "lucide-react";
import React from "react";

const NavMobileToggle = () => {
  const dispatch = useAppDispatch();
  return (
    <button
      className="md:hidden p-2 text-gray-600 dark:text-gray-300"
      onClick={() => dispatch(toggleMobileMenu())}
    >
      <Menu size={24} />
    </button>
  );
};

export default NavMobileToggle;
