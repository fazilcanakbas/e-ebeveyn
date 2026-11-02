import { OrbitHero } from "@/components/heroes/orbit-hero";
import { PageShell } from "@/components/page-shell";

export default function V1Page() {
  return (
    <PageShell className="page-glow">
      <OrbitHero layout="center" />
    </PageShell>
  );
}
