import type { ReactNode } from "react";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";

export function PublicShell({ children, noFooter = false }: { children: ReactNode; noFooter?: boolean }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main>{children}</main>
      {!noFooter && <SiteFooter />}
    </div>
  );
}
