
"use client"; // Harus Client Component

import { SessionProvider } from "next-auth/react";
import type { Session } from "next-auth";
import { useEffect, useState } from "react";

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    import("@/lib/auth").then((mod) => {
      mod.getSession().then(setSession);
    });
  }, []);

  return <SessionProvider session={session}>{children}</SessionProvider>;
}
