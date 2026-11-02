import { createFileRoute, Link } from "@tanstack/react-router";
import { TransitLab } from "@/components/TransitLab";
import { TaskRouter } from "@/components/TaskRouter";
import { MathLab } from "@/components/MathLab";
import { PinnLab } from "@/components/PinnLab";
import { ModelRegistry } from "@/components/ModelRegistry";
import { PhysicsSimLab } from "@/components/PhysicsSimLab";
import { QuantumLab } from "@/components/QuantumLab";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Telescope } from "lucide-react";
import type { ReactNode } from "react";
import { NAV } from "@/lib/navigation";

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
  const modules = NAV.filter((n) => n.to !== "/");
  const labs: [string, ReactNode][] = [
    ["transit", <TransitLab />], ["router", <TaskRouter />], ["math", <MathLab />], ["pinn", <PinnLab />],
    ["physics", <PhysicsSimLab />], ["quantum", <QuantumLab />], ["models", <ModelRegistry />],
  ];
  return (
    <main className="px-4 py-8 sm:px-8 sm:py-10">
      <div className="mx-auto max-w-6xl">
        <section className="relative overflow-hidden rounded-2xl border panel p-6 sm:p-10">
          <div className="pointer-events-none absolute -right-24 -top-24 size-80 orbit-ring opacity-40" />
          <div className="pointer-events-none absolute -right-8 -top-8 size-48 orbit-ring opacity-25" />
          <p className="font-mono text-[11px] tracking-[0.2em] text-cyan">WHERE ONLY OUR HEROES ORBIT OUTWARD</p>
          <h1 className="mt-4 max-w-2xl text-3xl font-semibold tracking-tight sm:text-5xl">Explore beyond the known.</h1>
          <p className="mt-4 max-w-xl text-muted-foreground">
            A scientific research workspace where machine learning meets the universe. Every model and simulation runs live in your browser.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            <Button asChild><a href="#transit"><Telescope />Start with exoplanet transits</a></Button>
            <Button asChild variant="outline"><a href="#models">Browse model registry</a></Button>
          </div>
        </section>

        <h2 className="mt-10 text-xs font-semibold tracking-[0.14em] text-muted-foreground uppercase">Quick actions</h2>
        <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[["transit", "Find exoplanets"], ["math", "Discover equations"], ["physics", "Run a simulation"], ["quantum", "Build a circuit"]].map(([id, label]) => (
            <a key={id} href={`#${id}`} className="group flex items-center justify-between rounded-xl border panel px-4 py-3 text-sm font-medium transition-colors hover:border-ring/60">
              {label}
              <ArrowUpRight className="size-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
            </a>
          ))}
        </div>

        <h2 className="mt-10 text-xs font-semibold tracking-[0.14em] text-muted-foreground uppercase">Research centers</h2>
        <nav aria-label="Research centers" className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {modules.map(({ to, label, description, icon: Icon, accent, accentBg, group }) => (
            <Link key={to} to={to} className="group relative flex flex-col rounded-xl border panel p-5 transition-colors hover:border-ring/60">
              <div className="flex items-center justify-between">
                <span className="flex size-9 items-center justify-center rounded-lg bg-secondary"><Icon className={"size-4 " + accent} /></span>
                <ArrowUpRight className="size-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
              </div>
              <div className="mt-4 font-medium">{label}</div>
              <p className="mt-1 text-sm text-muted-foreground">{description}</p>
              <div className="mt-4 flex items-center gap-1.5 font-mono text-[10px] tracking-wider text-muted-foreground uppercase">
                <span className={"size-1.5 rounded-full " + accentBg} />{group}
              </div>
            </Link>
          ))}
        </nav>

        {labs.map(([id, el]) => <div key={id} id={id} className="scroll-mt-28">{el}</div>)}
      </div>
    </main>
  );
}
