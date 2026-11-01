import { createFileRoute, Link } from "@tanstack/react-router";
import { DataIntelCenter } from "@/components/DataIntelCenter";

export const Route = createFileRoute("/data")({
  head: () => ({
    meta: [
      { title: "Scientific Data Intelligence Center — W.O.O.H.O.O." },
      { name: "description", content: "Ingestion pipelines, source registry, data quality and catalog cross-matching." },
      { property: "og:title", content: "Scientific Data Intelligence Center" },
      { property: "og:description", content: "The data foundation of the W.O.O.H.O.O. Discovery Engine." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: DataPage,
});

function DataPage() {
  return (
    <main className="px-4 py-8 sm:px-8 sm:py-10">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-glow">Scientific Data Intelligence Center</h1>
        <p className="mt-3 mb-8 text-muted-foreground">Every dataset traceable from source to experiment.</p>
        <DataIntelCenter />
      </div>
    </main>
  );
}
