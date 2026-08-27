/** Community Wayfinding: clinician export is an English, browser-generated record to preserve reliable PDF rendering and auditability. */
import { getDecisionForRecord, SCENARIOS, type ScreeningRecord } from "@/data/mockData";
import { jsPDF } from "jspdf";

const teal: [number, number, number] = [14, 92, 90];
const ink: [number, number, number] = [23, 59, 57];
const muted: [number, number, number] = [99, 116, 114];
const turmeric: [number, number, number] = [217, 155, 20];

function writeWrapped(doc: jsPDF, text: string, x: number, y: number, width: number, size = 10, color = muted) {
  doc.setFontSize(size);
  doc.setTextColor(...color);
  const lines = doc.splitTextToSize(text, width) as string[];
  doc.text(lines, x, y);
  return y + lines.length * (size * 0.48 + 2.2);
}
function rule(doc: jsPDF, y: number) { doc.setDrawColor(217, 223, 216); doc.line(18, y, 192, y); }
function footer(doc: jsPDF, page: number) {
  doc.setFontSize(7);
  doc.setTextColor(...muted);
  doc.text("PxK Route Engine v0.1 · Frontend demonstration · Not a diagnosis or treatment recommendation", 18, 284);
  doc.text(`Page ${page}`, 192, 284, { align: "right" });
}

export function buildClinicianPdf(record: ScreeningRecord) {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const decision = getDecisionForRecord(record);
  const scenario = SCENARIOS[record.scenarioId];
  let y = 20;
  let page = 1;

  doc.setFillColor(...teal); doc.rect(0, 0, 210, 11, "F");
  doc.setFont("helvetica", "bold"); doc.setFontSize(17); doc.setTextColor(...teal); doc.text("PxK", 18, y);
  doc.setFontSize(8); doc.setTextColor(...muted); doc.text("CLINICIAN REVIEW EXPORT · AUDITABLE FACTOR TRACE", 18, y + 5.5);
  y += 16; rule(doc, y); y += 8;

  doc.setFont("helvetica", "bold"); doc.setFontSize(14); doc.setTextColor(...ink); doc.text("Patient-reported screening record", 18, y); y += 7;
  doc.setFont("helvetica", "normal");
  y = writeWrapped(doc, "Prepared from patient-selected answers in a browser-local PxK prototype. This document is intended to support a clinical conversation and is not a diagnosis, treatment plan, or medical priority determination.", 18, y, 174, 9);
  y += 4;

  doc.setFillColor(244, 249, 244); doc.roundedRect(18, y, 174, 29, 1.5, 1.5, "F");
  doc.setFontSize(7); doc.setTextColor(...muted);
  doc.text("RECORD ID", 23, y + 7); doc.text("SCENARIO", 78, y + 7); doc.text("COMPLETED", 137, y + 7);
  doc.setFont("helvetica", "bold"); doc.setFontSize(10); doc.setTextColor(...ink);
  doc.text(record.id, 23, y + 14); doc.text(scenario.label, 78, y + 14); doc.text(record.completedAt, 137, y + 14);
  doc.setFont("helvetica", "normal"); doc.setFontSize(8); doc.setTextColor(...muted);
  doc.text("Display language at export: English (reliable PDF rendering)", 23, y + 23);
  y += 38;

  doc.setFont("helvetica", "bold"); doc.setFontSize(9); doc.setTextColor(...teal); doc.text("PRELIMINARY HEALTH PROFILE", 18, y); y += 6;
  doc.setFontSize(11); doc.setTextColor(...ink); doc.text(record.chiefComplaint, 18, y); y += 6;
  y = writeWrapped(doc, `Reported history: ${record.relevantHistory}`, 18, y, 174, 9); y += 4;
  doc.setDrawColor(...turmeric); doc.setLineWidth(0.8); doc.line(18, y, 18, y + 17);
  doc.setFont("helvetica", "bold"); doc.setFontSize(8); doc.setTextColor(...muted); doc.text("POTENTIAL CLINICAL ROUTE", 22, y + 5);
  doc.setFontSize(12); doc.setTextColor(...ink); doc.text(decision.potentialSpecialty, 22, y + 12); y += 23;

  rule(doc, y); y += 8;
  doc.setFont("helvetica", "bold"); doc.setFontSize(9); doc.setTextColor(...teal); doc.text("AUDITABLE FACTOR TRACE", 18, y); y += 7;
  decision.factors.forEach((item, index) => {
    if (y > 255) { footer(doc, page); doc.addPage(); page += 1; y = 20; }
    doc.setFillColor(248, 248, 243); doc.rect(18, y - 4.5, 174, 15, "F");
    doc.setFont("helvetica", "bold"); doc.setFontSize(8); doc.setTextColor(...turmeric); doc.text(String(index + 1).padStart(2, "0"), 22, y + 1);
    doc.setTextColor(...ink); doc.text(item.label, 34, y + 1);
    doc.setFont("helvetica", "normal"); doc.setTextColor(...muted); doc.text(item.answer, 34, y + 7);
    doc.setFontSize(6.5); doc.text(item.role === "priority" ? "PRIORITY REVIEW CUE" : item.role === "route" ? "ROUTING CONTEXT" : "SUPPORTING CONTEXT", 187, y + 1, { align: "right" });
    y += 18;
  });

  if (y > 228) { footer(doc, page); doc.addPage(); page += 1; y = 20; }
  rule(doc, y); y += 8;
  doc.setFont("helvetica", "bold"); doc.setFontSize(9); doc.setTextColor(...teal); doc.text("SELECTED SCREENING ANSWERS", 18, y); y += 7;
  scenario.questions.forEach((question, index) => {
    if (y > 258) { footer(doc, page); doc.addPage(); page += 1; y = 20; }
    doc.setFont("helvetica", "bold"); doc.setFontSize(7); doc.setTextColor(...muted); doc.text(`Q${String(index + 1).padStart(2, "0")}`, 18, y);
    doc.setTextColor(...ink); const questionLines = doc.splitTextToSize(question.question, 106) as string[]; doc.text(questionLines, 30, y);
    doc.setFont("helvetica", "normal"); doc.setTextColor(...muted); doc.text(doc.splitTextToSize(record.answers[question.id] || "Not recorded", 52) as string[], 140, y);
    y += Math.max(questionLines.length * 4.2, 6.5);
  });
  if (y > 245) { footer(doc, page); doc.addPage(); page += 1; y = 20; }
  rule(doc, y); y += 8;
  doc.setFont("helvetica", "bold"); doc.setFontSize(9); doc.setTextColor(...teal); doc.text("DECISION-SUPPORT BOUNDARY", 18, y); y += 6;
  writeWrapped(doc, "PxK Route Engine v0.1 is a deterministic frontend demonstration. It uses selected answers to make a potential specialty route and show the routing rationale. It does not diagnose a disease, recommend medication or treatment, guarantee an outcome, or replace qualified healthcare professionals.", 18, y, 174, 8.5);
  footer(doc, page);
  return doc;
}

export function exportClinicianPdf(record: ScreeningRecord) {
  const document = buildClinicianPdf(record);
  document.save(`${record.id}-pxk-clinician-review.pdf`);
}
