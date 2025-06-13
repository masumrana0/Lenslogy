"use client";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { sideNavItemsContent } from "@/content/dashboard/side-nav-content";
import { ISideBarNavItem } from "@/interface/dashboard-nav-interface";
import { cn } from "@/lib/utils";
import { toggleSidebarMobileMenu } from "@/redux/features/nav-states/nav-slice";
import { useAppDispatch } from "@/redux/hook";
import { ChevronDown, ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

// Utility to remove locale prefix like /en or /bn
const removeLocalePrefix = (path: string) =>
  path.replace(/^\/(en|bn)(\/|$)/, "/");

const SideBarNavItem = ({
  item,
  isChild = false,
  isMobile,
}: {
  item: ISideBarNavItem;
  isChild?: boolean;
  isMobile: boolean;
}) => {
  const pathname = usePathname();
  const dispatch = useAppDispatch();

  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

  const cleanPath = useMemo(() => removeLocalePrefix(pathname), [pathname]);
  const isActive = cleanPath === item.href;

  const hasChildren = item.children && item.children.length > 0;
  const isOpen = openItems[item.title] || false;

  const toggleItem = (title: string) => {
    setOpenItems((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  // Auto-open parent if one of the children is active
  useEffect(() => {
    const newOpenItems: Record<string, boolean> = {};

    sideNavItemsContent.forEach((parent) => {
      if (
        parent.children?.some(
          (child) => removeLocalePrefix(pathname) === child.href
        )
      ) {
        newOpenItems[parent.title] = true;
      }
    });

    setOpenItems(newOpenItems);
  }, [pathname]);

  if (!hasChildren) {
    return (
      <Link
        href={item.href}
        className={cn(
          "flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors",
          isActive && "bg-accent text-accent-foreground",
          isChild && "pl-9"
        )}
        onClick={() => isMobile && dispatch(toggleSidebarMobileMenu())}
      >
        <item.icon className="mr-2 h-4 w-4" />
        {item.title}
      </Link>
    );
  }

  const isChildActive = item.children?.some(
    (child) => cleanPath === child.href
  );

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={() => toggleItem(item.title)}
      className="w-full"
    >
      <CollapsibleTrigger asChild>
        <button
          className={cn(
            "flex w-full items-center justify-between rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors",
            (isActive || isChildActive) && "bg-accent/50   text-red-500 "
          )}
        >
          <div className="flex items-center ">
            <item.icon className="mr-2 h-4 w-4" />
            {item.title}
          </div>
          {isOpen ? (
            <ChevronDown className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
        </button>
      </CollapsibleTrigger>
      <CollapsibleContent className="pl-2 space-y-1 pt-1">
        {item.children?.map((child) => (
          <SideBarNavItem
            key={child.href}
            item={child}
            isMobile={isMobile}
            isChild
          />
        ))}
      </CollapsibleContent>
    </Collapsible>
  );
};

export default SideBarNavItem;
