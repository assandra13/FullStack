"use client"; // Penting agar ini menjadi Client Component

import { ThemeProvider } from "next-themes";

export default function CustomThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
      {children}
    </ThemeProvider>
  );
}
