"use client";
import { useSession } from "next-auth/react";

export const refreshSession = async () => {
  const res = await fetch("/api/auth/refresh");
  if (res.ok) {
    // ⛔️ No direct way to update session from here
    // ✅ But this will force a re-fetch if using `useSession`
    const event = new Event("visibilitychange");
    document.dispatchEvent(event);
  }
};
