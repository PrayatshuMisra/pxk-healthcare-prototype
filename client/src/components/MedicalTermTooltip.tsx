/** Community Wayfinding: medical-term tooltips offer short definitions, never diagnostic interpretation. */
import { MEDICAL_HELP } from "@/data/medicalHelp";
import type { Language } from "@/data/mockData";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { CircleHelp } from "lucide-react";
export function MedicalTermTooltip({ term, language }: { term?: string; language: Language }) { if (!term || !MEDICAL_HELP[term]) return null; const help = MEDICAL_HELP[term][language]; return <Tooltip><TooltipTrigger asChild><button type="button" className="term-help" aria-label={`What does ${help.term} mean?`}><CircleHelp /></button></TooltipTrigger><TooltipContent className="max-w-64 border-[#BCD5CA] bg-[#F8FBF7] p-3 text-[#173B39]"><p className="font-bold">{help.term}</p><p className="mt-1 text-xs leading-5 text-[#536865]">{help.meaning}</p></TooltipContent></Tooltip>; }
