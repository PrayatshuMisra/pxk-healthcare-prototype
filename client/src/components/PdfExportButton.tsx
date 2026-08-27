/** Community Wayfinding: PDF export makes the prototype’s factor trace portable without hiding its clinical limits. */
import { exportClinicianPdf } from "@/lib/clinicianPdf";
import { COPY } from "@/data/localization";
import type { Language, ScreeningRecord } from "@/data/mockData";
import { Download } from "lucide-react";
export function PdfExportButton({ record, language, className = "" }: { record: ScreeningRecord; language: Language; className?: string }) { return <button className={`btn btn-outline pdf-export ${className}`} onClick={() => exportClinicianPdf(record)}><Download className="h-4 w-4" />{COPY[language].exportPdf}</button>; }
