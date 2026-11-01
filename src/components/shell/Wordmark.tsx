import { cn } from "@/lib/utils";

export function OrbitMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={cn("size-8", className)} aria-hidden>
      <circle cx="16" cy="16" r="5" className="fill-primary" />
      <ellipse cx="16" cy="16" rx="14" ry="6" transform="rotate(-28 16 16)" className="fill-none stroke-cyan" strokeWidth="1.4" />
      <circle cx="27.3" cy="9.8" r="1.9" className="fill-foreground" />
    </svg>
  );
}

export function Wordmark({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex items-center gap-2.5 min-w-0">
      <OrbitMark className="shrink-0" />
      {!compact && (
        <div className="min-w-0 leading-tight">
          <div className="text-sm font-semibold tracking-[0.18em] text-foreground">W.O.O.H.O.O.</div>
          <div className="truncate text-[10px] font-medium tracking-[0.14em] text-muted-foreground">EXPLORE BEYOND THE KNOWN</div>
        </div>
      )}
    </div>
  );
}
