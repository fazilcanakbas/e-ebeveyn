import type { ReactNode } from "react";
import { MomentHeader } from "@/components/heroes/moment-header";
import { SiteFooter } from "@/components/site-footer";

export default function CorporateLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-svh flex-1 flex-col overflow-x-clip bg-white">
      <MomentHeader />
      <main className="anim-word flex-1 px-4 pt-24 lg:px-8 lg:pt-36">{children}</main>
      <SiteFooter />
    </div>
  );
}
