"use client";

import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import SessionContext from "./SessionContext";

export function Providers({ children }) {
  return (
    <NextUIProvider>
      <NextThemesProvider attribute="class" defaultTheme="dark">
        <SessionContext>{children}</SessionContext>
      </NextThemesProvider>
    </NextUIProvider>
  );
}
