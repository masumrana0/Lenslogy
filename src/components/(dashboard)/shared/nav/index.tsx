"use client";

import React, { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import SideBarNavItem from "./side-navbar/sidebar-nav-item";
import { sideNavItemsContent } from "@/content/dashboard/side-nav-content";
import { toggleSidebarMobileMenu } from "@/redux/features/nav-states/nav-slice";
import Logo from "@/components/(public)/shared/navbar/logo";

const DashBoardSidebarNav: React.FC<{ role: string }> = ({ role }) => {
  const [isMobile, setIsMobile] = useState(false);
  const dispatch = useAppDispatch();
  const isSidebarOpen = useAppSelector(
    (state) => state.navSlice.isDashBoardSideBarOpen
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    const handleMediaChange = (e: MediaQueryListEvent | MediaQueryList) => {
      setIsMobile(e.matches);
    };

    // Initial check
    handleMediaChange(mediaQuery);

    // Listen to changes
    mediaQuery.addEventListener("change", handleMediaChange);

    return () => {
      mediaQuery.removeEventListener("change", handleMediaChange);
    };
  }, []);

  const filteredNavItems = sideNavItemsContent.filter((item) =>
    item.roles.includes(role)
  );

  const handleToggleSidebar = () => {
    dispatch(toggleSidebarMobileMenu());
  };

  const NavItems = () => (
    <>
      {filteredNavItems.map((item) => (
        <SideBarNavItem key={item.href} item={item} isMobile={isMobile} />
      ))}
    </>
  );

  return (
    <>
      {/* Mobile Nav */}
      {isMobile && (
        <div className="md:hidden">
          <Sheet open={isSidebarOpen} onOpenChange={handleToggleSidebar}>
            <SheetContent side="left" className="w-[80%] max-w-[300px] pt-10">
              <Logo className="flex justify-center " />
              <nav className="flex flex-col space-y-1">
                <NavItems />
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      )}

      {/* Desktop Nav */}
      {!isMobile && (
        <nav className="hidden md:flex md:flex-col space-y-1 w-full">
          <NavItems />
        </nav>
      )}
    </>
  );
};

export default DashBoardSidebarNav;
