import { MomentHeader, MomentHero } from "@/components/heroes/moment-hero";
import { StageGuides } from "@/components/stage-guides";
import { VersionSwitcher } from "@/components/version-switcher";

export default function V12Page() {
  return (
    <div className="flex min-h-svh flex-1 flex-col overflow-x-clip bg-white">
      <div className="relative flex h-[86svh] min-h-[30rem] shrink-0 flex-col bg-[#2a201b]">
        <MomentHeader />
        <main className="flex min-h-0 flex-1 flex-col">
          <MomentHero />
        </main>
      </div>
      <StageGuides />
      <VersionSwitcher />
    </div>
  );
}
