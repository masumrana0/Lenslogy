"use client";
import type { IUser } from "@/app/(client)/[locale]/(dashboard)/dashboard/users/_interface/user.interface";
import Logo from "@/components/(public)/shared/navbar/logo";
import LanguageSwitcher from "@/components/(public)/shared/navbar/switch-lang";
import Theme from "@/components/(public)/shared/navbar/theme";
import type React from "react";
import { UserNav } from "../user-nav";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAppDispatch } from "@/redux/hook";
import { toggleSidebarMobileMenu } from "@/redux/features/nav-states/nav-slice";

const DashboardTopNav: React.FC<{ user: IUser }> = ({ user }) => {
  const dispatch = useAppDispatch();
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 sm:h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center">
          <Button
            onClick={() => dispatch(toggleSidebarMobileMenu())}
            variant="outline"
            size="icon"
            className="md:hidden"
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
          <Logo className="scale-75 sm:scale-90 hidden md:block md:scale-100" />
        </div>

        <div className="flex items-center gap-2 sm:gap-3 md:gap-5">
          <LanguageSwitcher />
          <Theme />
          {user && <UserNav user={user} />}
        </div>
      </div>
    </header>
  );
};

export default DashboardTopNav;
