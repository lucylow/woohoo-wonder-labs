import { Atom, BrainCircuit, Database, FlaskConical, Orbit, Sigma, Telescope, Zap, type LucideIcon } from "lucide-react";

export type AppPath = "/" | "/data" | "/cosmology" | "/particles" | "/materials" | "/plasma";

export interface NavItem {
  to: AppPath;
  label: string;
  short: string;
  description: string;
  icon: LucideIcon;
  /** Tailwind text class for the domain accent */
  accent: string;
  /** Tailwind bg class for the domain accent */
  accentBg: string;
  group: string;
  sections?: { id: string; label: string }[];
}

export const NAV: NavItem[] = [
  {
    to: "/",
    label: "Discovery Engine",
    short: "Overview",
    description: "Exoplanet transits, task routing, equation discovery, PINNs, physics, quantum and model registry.",
    icon: Telescope,
    accent: "text-domain-astro",
    accentBg: "bg-domain-astro",
    group: "Workspace",
    sections: [
      { id: "transit", label: "Exoplanet Hunter" },
      { id: "router", label: "AI Task Router" },
      { id: "math", label: "Equation Discovery" },
      { id: "pinn", label: "Physics-Informed NN" },
      { id: "physics", label: "Physics Simulation" },
      { id: "quantum", label: "Quantum Lab" },
      { id: "models", label: "Model Registry" },
    ],
  },
  {
    to: "/data",
    label: "Data Intelligence",
    short: "Data",
    description: "Dataset explorer, quality checks, pipelines and feature analysis.",
    icon: Database,
    accent: "text-domain-data",
    accentBg: "bg-domain-data",
    group: "Data",
  },
  {
    to: "/cosmology",
    label: "Cosmology Intelligence",
    short: "Cosmology",
    description: "Expansion history, parameter inference and large-scale structure.",
    icon: Orbit,
    accent: "text-domain-cosmo",
    accentBg: "bg-domain-cosmo",
    group: "Astronomy & Cosmology",
  },
  {
    to: "/particles",
    label: "Particle Physics",
    short: "Particles",
    description: "Collision events, detector reconstruction and resonance searches.",
    icon: Atom,
    accent: "text-domain-particle",
    accentBg: "bg-domain-particle",
    group: "Particle & Materials",
  },
  {
    to: "/materials",
    label: "Materials Intelligence",
    short: "Materials",
    description: "Crystal structures, property prediction, atomic dynamics and generative discovery.",
    icon: FlaskConical,
    accent: "text-domain-materials",
    accentBg: "bg-domain-materials",
    group: "Particle & Materials",
    sections: [
      { id: "overview", label: "Overview" },
      { id: "structure", label: "Atomic Structure" },
      { id: "predict", label: "Property Prediction" },
      { id: "electronic", label: "Electronic Structure" },
      { id: "md", label: "Atomic Dynamics" },
      { id: "thermo", label: "Thermodynamics" },
      { id: "discover", label: "Generative Discovery" },
      { id: "registry", label: "Materials Registry" },
    ],
  },
  {
    to: "/plasma",
    label: "Plasma & Fusion",
    short: "Plasma",
    description: "Plasma scales, MHD, particle-in-cell, turbulence, fusion balance and disruptions.",
    icon: Zap,
    accent: "text-domain-plasma",
    accentBg: "bg-domain-plasma",
    group: "Physics Laboratories",
    sections: [
      { id: "overview", label: "Overview" },
      { id: "state", label: "Plasma State" },
      { id: "orbits", label: "Particle Orbits" },
      { id: "mhd", label: "MHD Lab" },
      { id: "pic", label: "Particle-in-Cell" },
      { id: "waves", label: "Waves & Turbulence" },
      { id: "fusion", label: "Fusion Research" },
      { id: "disrupt", label: "Disruptions" },
    ],
  },
];

export const NAV_GROUPS = Array.from(new Set(NAV.map((n) => n.group)));

export const findNav = (path: string) => NAV.find((n) => n.to === path) ?? NAV[0];

export const EXTRA_ICONS = { BrainCircuit, Sigma };
