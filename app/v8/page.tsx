import { HookHero } from "@/components/heroes/hook-hero";
import { PageShell } from "@/components/page-shell";

export default function V8Page() {
  return (
    <PageShell className="relative bg-[#f1ebe8]">
      <HookHero />
    </PageShell>
  );
}
