import type { ReactNode } from "react";
import { Header } from "./header";
import { VersionSwitcher } from "./version-switcher";

// Header ve hero her zaman tek ekrana sığar; çok kısa ekranlarda sayfa kayar.
export function PageShell({
  className,
  header = <Header />,
  children,
}: {
  className: string;
  header?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className={`flex h-svh min-h-[38rem] flex-1 flex-col overflow-x-clip ${className}`}>
      {header}
      <main className="flex min-h-0 flex-1 flex-col">{children}</main>
      <VersionSwitcher />
    </div>
  );
}
