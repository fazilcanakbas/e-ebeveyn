import { BlocksHeader, BlocksHero } from "@/components/heroes/blocks-hero";
import { PageShell } from "@/components/page-shell";

export default function V11Page() {
  return (
    <PageShell className="bg-[#ffd84d]" header={<BlocksHeader />}>
      <BlocksHero />
    </PageShell>
  );
}
