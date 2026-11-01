import { createFileRoute, Link } from "@tanstack/react-router";
import { TransitLab } from "@/components/TransitLab";
import { TaskRouter } from "@/components/TaskRouter";
import { MathLab } from "@/components/MathLab";
import { PinnLab } from "@/components/PinnLab";
import { ModelRegistry } from "@/components/ModelRegistry";
import { PhysicsSimLab } from "@/components/PhysicsSimLab";
import { QuantumLab } from "@/components/QuantumLab";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Atom, Database, FlaskConical, Orbit, Zap } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "W.O.O.H.O.O. Discovery Engine — Explore Beyond the Known" },
      { name: "description", content: "AI-powered exoplanet transit discovery and light-curve analysis." },
      { property: "og:title", content: "W.O.O.H.O.O. Discovery Engine" },
      { property: "og:description", content: "Machine Learning Meets the Universe." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="min-h-screen bg-cosmos text-foreground px-4 py-10 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-4xl">
        <p className="text-xs font-semibold text-primary">SCIENTIFIC EXPLORATION / W.O.O.H.O.O.</p>
        <h1 className="mt-3 text-4xl sm:text-6xl font-bold tracking-tight text-glow">W.O.O.H.O.O. Discovery Engine</h1>
        <p className="mt-3 text-muted-foreground">
          Explore Beyond the Known. Simulate a stellar light curve and detect planetary transits.
        </p>
        <nav aria-label="Research centers" className="mt-7 grid grid-cols-2 gap-2 sm:grid-cols-3">
          {([
            { to: "/data", label: "Data Intelligence", icon: Database },
            { to: "/cosmology", label: "Cosmology", icon: Orbit },
            { to: "/particles", label: "Particle Physics", icon: Atom },
            { to: "/materials", label: "Materials", icon: FlaskConical },
            { to: "/plasma", label: "Plasma & Fusion", icon: Zap },
          ] as const).map(({ to, label, icon: Icon }) => (
            <Button key={to} asChild variant="outline" className="h-auto min-h-12 min-w-0 justify-start px-3 py-2 whitespace-normal">
              <Link to={to}><Icon className="shrink-0 text-primary" /><span className="min-w-0">{label}</span><ArrowUpRight className="ml-auto shrink-0 text-muted-foreground" /></Link>
            </Button>
          ))}
        </nav>


        <TransitLab />
        <TaskRouter />
        <MathLab />
        <PinnLab />
        <PhysicsSimLab />
        <QuantumLab />
        <ModelRegistry />
      </div>
    </main>
  );
}
