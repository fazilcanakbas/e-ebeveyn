import { FanHero } from "@/components/heroes/fan-hero";
import { PageShell } from "@/components/page-shell";

export default function V3Page() {
  return (
    <PageShell className="bg-[linear-gradient(180deg,#ffedb8_0%,#fff5d9_100%)]">
      <FanHero />
    </PageShell>
  );
}
