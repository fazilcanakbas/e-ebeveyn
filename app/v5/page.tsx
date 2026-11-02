import { BentoHero } from "@/components/heroes/bento-hero";
import { PageShell } from "@/components/page-shell";

export default function V5Page() {
  return (
    <PageShell className="bg-[#f6f3ee]">
      <BentoHero />
    </PageShell>
  );
}
