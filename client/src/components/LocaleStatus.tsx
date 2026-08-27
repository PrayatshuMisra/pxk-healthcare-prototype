/** Community Wayfinding: unreviewed clinical language is never presented as a completed translation. */
import type { Language } from "@/data/mockData";
import { Languages } from "lucide-react";
export function LocaleStatus({ language }: { language: Language }) { if (language === "en" || language === "kn") return null; const label = language === "tulu" ? "Tulu" : "Konkani"; return <div className="locale-source-banner" role="status"><Languages /><p><strong>{label} source boundary:</strong> navigation labels are localised. Clinical screening and decision-support copy remains in English source until it has been reviewed by qualified language and clinical reviewers.</p></div>; }
