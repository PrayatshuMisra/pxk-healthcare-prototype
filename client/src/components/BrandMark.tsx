/** Community Wayfinding: the PxK route mark stays visible, tactile, and unambiguous. */
import { ASSETS } from "@/data/mockData";

export function BrandMark({ compact = false }: { compact?: boolean }) {
  return <div className="flex items-center gap-3" aria-label="PxK by Team Errorists"><img src={ASSETS.logo} alt="PxK route mark" className="h-10 w-10 shrink-0 object-contain" />{!compact && <div className="leading-none"><p className="text-[1.45rem] font-extrabold tracking-[-0.08em] text-[var(--ink)]">PxK</p><p className="mt-1 font-mono text-[0.56rem] uppercase tracking-[0.13em] text-[var(--muted-ink)]">by Team Errorists</p></div>}</div>;
}
