"use client";

import type { ReactNode } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "./auth.provider";
import GoogleAuthProvider from "./google-auth.provider";
import QueryProvider from "./query.provider";
import { ThemeProvider } from "./theme-provider";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <GoogleAuthProvider>
        <QueryProvider>
          <AuthProvider>
            <TooltipProvider>
              {children}
              <ToastContainer
                position="top-right"
                autoClose={3500}
                theme="colored"
              />
            </TooltipProvider>
          </AuthProvider>
        </QueryProvider>
      </GoogleAuthProvider>
    </ThemeProvider>
  );
}
