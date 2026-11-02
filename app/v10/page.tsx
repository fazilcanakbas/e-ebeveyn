import { CinemaHeader, CinemaHero } from "@/components/heroes/cinema-hero";
import { PageShell } from "@/components/page-shell";

export default function V10Page() {
  return (
    <PageShell className="relative bg-black" header={<CinemaHeader />}>
      <CinemaHero />
    </PageShell>
  );
}
