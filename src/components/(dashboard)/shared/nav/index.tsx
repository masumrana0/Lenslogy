"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { BarChart3, FileText, FolderPlus, Home, Settings, Tag, Users } from "lucide-react"

interface DashboardNavProps {
  role: string
}

export function DashboardNav({ role }: DashboardNavProps) {
  const pathname = usePathname()

  const navItems = [
    {
      title: "Overview",
      href: "/dashboard",
      icon: Home,
      roles: ["SUPER_ADMIN", "ADMIN", "AUTHOR"],
    },
    {
      title: "Articles",
      href: "/dashboard/articles",
      icon: FileText,
      roles: ["SUPER_ADMIN", "ADMIN", "AUTHOR"],
    },
    {
      title: "Categories",
      href: "/dashboard/categories",
      icon: FolderPlus,
      roles: ["SUPER_ADMIN", "ADMIN"],
    },
    {
      title: "Tags",
      href: "/dashboard/tags",
      icon: Tag,
      roles: ["SUPER_ADMIN", "ADMIN"],
    },
    {
      title: "Users",
      href: "/dashboard/users",
      icon: Users,
      roles: ["SUPER_ADMIN", "ADMIN"],
    },
    {
      title: "Analytics",
      href: "/dashboard/analytics",
      icon: BarChart3,
      roles: ["SUPER_ADMIN", "ADMIN"],
    },
    {
      title: "Settings",
      href: "/dashboard/settings",
      icon: Settings,
      roles: ["SUPER_ADMIN", "ADMIN", "AUTHOR"],
    },
  ]

  return (
    <nav className="flex flex-col space-y-1">
      {navItems
        .filter((item) => item.roles.includes(role))
        .map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
              pathname === item.href ? "bg-accent text-accent-foreground" : "transparent",
            )}
          >
            <item.icon className="mr-2 h-4 w-4" />
            <span>{item.title}</span>
          </Link>
        ))}
    </nav>
  )
}
