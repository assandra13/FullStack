"use client"; // Penting agar ini menjadi Client Component

import { SessionProvider } from "next-auth/react";
import type { Session } from "next-auth";

interface AuthProviderProps {
  children: React.ReactNode;
  session: Session | null;
}

export default function AuthProvider({ children, session }: AuthProviderProps) {
  return <SessionProvider session={session}>{children}</SessionProvider>;
}
