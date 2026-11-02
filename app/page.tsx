import { BigQuestion } from "@/components/big-question";
import { MomentHeader } from "@/components/heroes/moment-header";
import { MomentHero } from "@/components/heroes/moment-hero";
import { OneDay } from "@/components/one-day";
import { SiteFooter } from "@/components/site-footer";
import { StageGuides } from "@/components/stage-guides";

export default function Home() {
  return (
    <div className="flex min-h-svh flex-1 flex-col overflow-x-clip bg-white">
      <MomentHeader heroId="ana-hero" />
      <div
        id="ana-hero"
        className="relative flex h-[86svh] min-h-[30rem] shrink-0 flex-col bg-[#2a201b] pt-14 lg:pt-[4.5rem]"
      >
        <main className="flex min-h-0 flex-1 flex-col">
          <MomentHero />
        </main>
      </div>
      <StageGuides />
      <BigQuestion />
      <OneDay />
      <SiteFooter />
    </div>
  );
}
