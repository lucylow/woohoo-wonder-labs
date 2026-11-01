import { useEffect, useState, type ReactNode } from "react";
import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import { ChevronRight, Menu, PanelLeftClose, PanelLeftOpen, Search, X } from "lucide-react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { NAV, NAV_GROUPS, findNav, type NavItem } from "@/lib/navigation";
import { cn } from "@/lib/utils";
import { Wordmark } from "./Wordmark";

const COLLAPSE_KEY = "woohoo.sidebar.collapsed";
const RECENT_KEY = "woohoo.recent";

export function AppShell({ children }: { children: ReactNode }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [recent, setRecent] = useState<string[]>([]);
  const current = findNav(location.pathname);

  useEffect(() => {
    setCollapsed(localStorage.getItem(COLLAPSE_KEY) === "1");
    try { setRecent(JSON.parse(localStorage.getItem(RECENT_KEY) ?? "[]")); } catch { /* ignore */ }
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setRecent((r) => {
      const next = [location.pathname, ...r.filter((p) => p !== location.pathname)].slice(0, 4);
      localStorage.setItem(RECENT_KEY, JSON.stringify(next));
      return next;
    });
  }, [location.pathname]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); setPaletteOpen((o) => !o); }
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "b") { e.preventDefault(); toggleCollapse(); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  const toggleCollapse = () => setCollapsed((c) => { localStorage.setItem(COLLAPSE_KEY, c ? "0" : "1"); return !c; });

  const go = (item: NavItem, section?: string) => {
    setPaletteOpen(false);
    navigate({ to: item.to, hash: section }).then(() => {
      if (section) setTimeout(() => document.getElementById(section)?.scrollIntoView({ behavior: "smooth" }), 60);
      else window.scrollTo({ top: 0 });
    });
  };

  return (
    <TooltipProvider delayDuration={200}>
      <div className="flex min-h-screen bg-cosmos text-foreground">
        {mobileOpen && <button aria-label="Close menu" className="fixed inset-0 z-40 bg-background/70 backdrop-blur-sm lg:hidden" onClick={() => setMobileOpen(false)} />}
        <aside
          className={cn(
            "fixed inset-y-0 left-0 z-50 flex flex-col border-r border-sidebar-border bg-sidebar transition-[width,transform] duration-200",
            collapsed ? "lg:w-[68px]" : "lg:w-64",
            "w-72 lg:translate-x-0",
            mobileOpen ? "translate-x-0" : "-translate-x-full",
          )}
        >
          <div className="flex h-14 items-center justify-between gap-2 border-b border-sidebar-border px-4">
            <Link to="/" aria-label="W.O.O.H.O.O. home"><Wordmark compact={collapsed} /></Link>
            <button className="rounded-md p-1.5 text-muted-foreground hover:bg-sidebar-accent hover:text-foreground lg:hidden" onClick={() => setMobileOpen(false)} aria-label="Close menu"><X className="size-4" /></button>
          </div>

          <div className="px-3 pt-3">
            <SideButton collapsed={collapsed} label="Search & commands" onClick={() => setPaletteOpen(true)}>
              <Search className="size-4 shrink-0" />
              {!collapsed && <><span className="flex-1 text-left">Search…</span><Kbd>⌘K</Kbd></>}
            </SideButton>
          </div>

          <nav aria-label="Research modules" className="flex-1 overflow-y-auto px-3 py-3">
            {NAV_GROUPS.map((group) => (
              <div key={group} className="mb-4">
                {!collapsed && <div className="px-2 pb-1.5 text-[10px] font-semibold tracking-[0.14em] text-muted-foreground/80 uppercase">{group}</div>}
                {NAV.filter((n) => n.group === group).map((item) => {
                  const active = item.to === current.to;
                  const Icon = item.icon;
                  const link = (
                    <Link
                      key={item.to}
                      to={item.to}
                      className={cn(
                        "group flex h-9 items-center gap-3 rounded-md px-2.5 text-sm transition-colors",
                        active ? "nav-glow bg-sidebar-accent text-foreground font-medium" : "text-sidebar-foreground hover:bg-sidebar-accent/60 hover:text-foreground",
                        collapsed && "lg:justify-center lg:px-0",
                      )}
                    >
                      <Icon className={cn("size-4 shrink-0", active ? item.accent : "text-muted-foreground group-hover:" + item.accent)} />
                      <span className={cn("truncate", collapsed && "lg:hidden")}>{item.label}</span>
                    </Link>
                  );
                  return collapsed ? (
                    <Tooltip key={item.to}><TooltipTrigger asChild>{link}</TooltipTrigger><TooltipContent side="right">{item.label}</TooltipContent></Tooltip>
                  ) : link;
                })}
              </div>
            ))}
          </nav>

          <div className="hidden border-t border-sidebar-border p-3 lg:block">
            <SideButton collapsed={collapsed} label={collapsed ? "Expand sidebar" : "Collapse sidebar"} onClick={toggleCollapse}>
              {collapsed ? <PanelLeftOpen className="size-4" /> : <><PanelLeftClose className="size-4" /><span className="flex-1 text-left">Collapse</span><Kbd>⌘B</Kbd></>}
            </SideButton>
          </div>
        </aside>

        <div className={cn("flex min-w-0 flex-1 flex-col transition-[padding] duration-200", collapsed ? "lg:pl-[68px]" : "lg:pl-64")}>
          <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-border/70 bg-background/80 px-4 backdrop-blur-md sm:px-8">
            <button className="-ml-1 rounded-md p-1.5 text-muted-foreground hover:bg-accent hover:text-foreground lg:hidden" onClick={() => setMobileOpen(true)} aria-label="Open menu"><Menu className="size-5" /></button>
            <nav aria-label="Breadcrumb" className="flex min-w-0 items-center gap-1.5 text-sm">
              <Link to="/" className="hidden text-muted-foreground hover:text-foreground sm:inline">W.O.O.H.O.O.</Link>
              <ChevronRight className="hidden size-3.5 text-muted-foreground/60 sm:inline" />
              <span className="hidden text-muted-foreground sm:inline">{current.group}</span>
              <ChevronRight className="hidden size-3.5 text-muted-foreground/60 sm:inline" />
              <span className="flex min-w-0 items-center gap-2 font-medium">
                <span className={cn("size-1.5 shrink-0 rounded-full", current.accentBg)} />
                <span className="truncate">{current.label}</span>
              </span>
            </nav>
            <button
              onClick={() => setPaletteOpen(true)}
              className="ml-auto flex h-9 items-center gap-2 rounded-md border border-border bg-secondary/60 px-3 text-sm text-muted-foreground transition-colors hover:border-ring/50 hover:text-foreground"
            >
              <Search className="size-4" />
              <span className="hidden md:inline">Jump to module or lab</span>
              <Kbd>⌘K</Kbd>
            </button>
          </header>

          {current.sections && (
            <div className="sticky top-14 z-20 border-b border-border/60 bg-background/70 backdrop-blur-md">
              <div className="flex gap-1 overflow-x-auto px-4 py-2 sm:px-8 [scrollbar-width:none]">
                {current.sections.map((s) => (
                  <a key={s.id} href={`#${s.id}`} className="shrink-0 rounded-full px-3 py-1 text-xs text-muted-foreground transition-colors hover:bg-accent hover:text-foreground">
                    {s.label}
                  </a>
                ))}
              </div>
            </div>
          )}

          <div className="flex-1">{children}</div>
          <footer className="border-t border-border/60 px-4 py-5 text-xs text-muted-foreground sm:px-8">
            W.O.O.H.O.O. — Where Only Our Heroes Orbit Outward · All simulations run in your browser.
          </footer>
        </div>

        <CommandDialog open={paletteOpen} onOpenChange={setPaletteOpen}>
          <CommandInput placeholder="Search modules, labs and tools…" />
          <CommandList>
            <CommandEmpty>No matching module.</CommandEmpty>
            {recent.length > 0 && (
              <CommandGroup heading="Recent">
                {recent.map((p) => { const n = findNav(p); const I = n.icon; return (
                  <CommandItem key={"r" + p} value={"recent " + n.label} onSelect={() => go(n)}><I className={n.accent} />{n.label}</CommandItem>
                ); })}
              </CommandGroup>
            )}
            <CommandGroup heading="Modules">
              {NAV.map((n) => { const I = n.icon; return (
                <CommandItem key={n.to} value={n.label + " " + n.description} onSelect={() => go(n)}>
                  <I className={n.accent} />
                  <span>{n.label}</span>
                  <span className="ml-auto truncate text-xs text-muted-foreground">{n.group}</span>
                </CommandItem>
              ); })}
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Labs & tools">
              {NAV.flatMap((n) => (n.sections ?? []).map((s) => (
                <CommandItem key={n.to + s.id} value={`${s.label} ${n.label}`} onSelect={() => go(n, s.id)}>
                  <span className={cn("size-1.5 rounded-full", n.accentBg)} />
                  <span>{s.label}</span>
                  <span className="ml-auto text-xs text-muted-foreground">{n.short}</span>
                </CommandItem>
              )))}
            </CommandGroup>
          </CommandList>
        </CommandDialog>
      </div>
    </TooltipProvider>
  );
}

function SideButton({ collapsed, label, onClick, children }: { collapsed: boolean; label: string; onClick: () => void; children: ReactNode }) {
  const btn = (
    <button onClick={onClick} aria-label={label} className={cn(
      "flex h-9 w-full items-center gap-3 rounded-md border border-sidebar-border px-2.5 text-sm text-muted-foreground transition-colors hover:bg-sidebar-accent hover:text-foreground",
      collapsed && "lg:justify-center lg:px-0",
    )}>{children}</button>
  );
  return collapsed ? <Tooltip><TooltipTrigger asChild>{btn}</TooltipTrigger><TooltipContent side="right">{label}</TooltipContent></Tooltip> : btn;
}

function Kbd({ children }: { children: ReactNode }) {
  return <kbd className="rounded border border-border bg-background/60 px-1.5 py-0.5 text-[10px] text-muted-foreground">{children}</kbd>;
}
