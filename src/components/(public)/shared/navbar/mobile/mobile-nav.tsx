"use client";
import React, { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import Link from "next/link";
import { toggleMobileMenu } from "@/redux/features/nav-states/nav-slice";
import NavMobileDropdown from "./nav-mob-dropdown";
import { INavItem } from "@/interface/nav-interface";
import { usePathname } from "next/navigation";

const MobileNav: React.FC<{ items: INavItem[] }> = ({ items }) => {
  // Redux state to control mobile menu visibility
  const mobileMenuOpen = useAppSelector(
    (state) => state.navSlice.isMobileMenuOpen
  );
  const dispatch = useAppDispatch();
  const pathname = usePathname();

  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    dispatch(toggleMobileMenu());
  }, [pathname, dispatch]);

  return (
    <>
      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
          <nav className="py-4 space-y-4">
            {items.map((item, index) => {
              if (item.type === "link") {
                return (
                  <Link
                    key={index}
                    href={item.href}
                    className="block px-4 py-2 font-medium hover:bg-gray-50 dark:hover:bg-gray-800 dark:text-gray-200"
                    onClick={() => dispatch(toggleMobileMenu())}
                  >
                    {item.label}
                  </Link>
                );
              } else if (item.type === "dropdown") {
                return <NavMobileDropdown menu={item} key={index} />;
              }
            })}
          </nav>
        </div>
      )}
    </>
  );
};

export default MobileNav;
