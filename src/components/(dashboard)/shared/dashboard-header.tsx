import type React from "react";

interface DashboardHeaderProps {
  heading: string;
  text?: string;
  children?: React.ReactNode;
}

export function DashboardHeader({
  heading,
  text,
  children,
}: DashboardHeaderProps) {
  return (
    <div className="relative border-b pb-6 mb-4">
      {/* Brand color accent line */}
      <div className="absolute left-0 top-0 h-1 w-24 bg-gradient-to-r from-red-600 to-red-400 rounded-br-md" />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 px-2">
        <div className="grid gap-2">
          <h1 className="font-heading text-3xl md:text-4xl font-bold tracking-tight">
            {heading}
            <span className="text-red-500">.</span>
          </h1>
          {text && (
            <p className="text-base md:text-lg text-muted-foreground">{text}</p>
          )}
        </div>

        {children && (
          <div className="flex items-center gap-3 mt-2 sm:mt-0">{children}</div>
        )}
      </div>

      {/* Subtle decorative element */}
      <div className="absolute -bottom-1 left-0 w-full h-[2px] bg-gradient-to-r from-red-500/20 via-red-500/5 to-transparent" />
    </div>
  );
}
