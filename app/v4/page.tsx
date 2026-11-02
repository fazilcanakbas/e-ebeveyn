import { AskHero } from "@/components/heroes/ask-hero";
import { PageShell } from "@/components/page-shell";

export default function V4Page() {
  return (
    <PageShell className="relative bg-white">
      <AskHero />
    </PageShell>
  );
}
