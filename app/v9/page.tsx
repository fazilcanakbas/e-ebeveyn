import { PosterHeader, PosterHero } from "@/components/heroes/poster-hero";
import { PageShell } from "@/components/page-shell";

export default function V9Page() {
  return (
    <PageShell className="bg-[#ff4a1c]" header={<PosterHeader />}>
      <PosterHero />
    </PageShell>
  );
}
