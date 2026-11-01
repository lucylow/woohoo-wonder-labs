import { createFileRoute } from "@tanstack/react-router";
import { CosmicWebExplorer, CosmoModelRegistry, ExpansionExplorer, ParameterInference } from "@/components/CosmologyLab";

export const Route = createFileRoute("/cosmology")({
  head: () => ({
    meta: [
      { title: "Cosmology Intelligence Lab — W.O.O.H.O.O." },
      { name: "description", content: "Dark energy exploration, Bayesian cosmological inference, model comparison and N-body cosmic web simulation." },
      { property: "og:title", content: "Cosmology Intelligence Lab" },
      { property: "og:description", content: "Investigate the structure and expansion of the universe." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: CosmologyPage,
});

function CosmologyPage() {
  return (
    <main className="px-4 py-8 sm:px-8 sm:py-10">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-glow">Cosmology Intelligence Lab</h1>
        <p className="mt-3 text-muted-foreground">Dark matter, dark energy and the cosmic web, with real calculations and clearly labeled demo data.</p>
        <ExpansionExplorer />
        <ParameterInference />
        <CosmicWebExplorer />
        <CosmoModelRegistry />
      </div>
    </main>
  );
}
