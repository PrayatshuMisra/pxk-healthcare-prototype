/** Community Wayfinding: the PxK Pathway is the recurring route-map, never a generic flowchart. */
import { PATHWAY_STAGES } from "@/data/mockData";
import { ChartNoAxesCombined, ClipboardList, MapPin, MessageCircle } from "lucide-react";
const ICONS = { MessageCircle, ClipboardList, MapPin, ChartNoAxesCombined };

export function PathwayRail({ active = 1, compact = false }: { active?: number; compact?: boolean }) {
  return <div className={`pathway-rail ${compact ? "pathway-rail--compact" : ""}`} aria-label="PxK patient pathway">{PATHWAY_STAGES.map((stage, index) => { const Icon = ICONS[stage.icon as keyof typeof ICONS]; const isActive = index <= active; return <div key={stage.number} className={`pathway-stage ${isActive ? "is-active" : ""}`}><div className="pathway-marker"><Icon className="h-4 w-4" aria-hidden="true" /></div><div className="min-w-0"><p className="route-label">{stage.number}</p><p className="mt-1 text-base font-bold tracking-[-0.03em] text-[var(--ink)]">{stage.title}</p>{!compact && <p className="mt-1 max-w-44 text-xs leading-5 text-[var(--muted-ink)]">{stage.copy}</p>}</div></div>; })}</div>;
}
