/** Community Wayfinding: no text or voice complaint control is shown until all prototype approvals are explicitly checked. */
import { COPY } from "@/data/localization";
import type { Language } from "@/data/mockData";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ClipboardCheck, LockKeyhole, ShieldCheck } from "lucide-react";
import { useState } from "react";

export function ConsentDialog({ open, language, onAccept, onOpenChange }: { open: boolean; language: Language; onAccept: () => void; onOpenChange: (open: boolean) => void }) {
  const copy = COPY[language];
  const [prototypeOnly, setPrototypeOnly] = useState(false);
  const [localProcessing, setLocalProcessing] = useState(false);
  const [clinicalBoundary, setClinicalBoundary] = useState(false);
  const allowed = prototypeOnly && localProcessing && clinicalBoundary;
  const accept = () => {
    if (!allowed) return;
    onAccept();
    setPrototypeOnly(false);
    setLocalProcessing(false);
    setClinicalBoundary(false);
  };

  return <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent className="consent-dialog border-[var(--line)] bg-[var(--paper)] p-0 sm:rounded-[1.35rem]">
      <div className="p-6 sm:p-8">
        <DialogHeader>
          <div className="consent-mark"><ShieldCheck /><span>{copy.consent}</span></div>
          <DialogTitle className="mt-4 text-3xl font-extrabold tracking-[-.055em] text-[var(--ink)]">Approve before sharing a concern.</DialogTitle>
          <DialogDescription className="mt-3 max-w-xl text-base leading-7 text-[var(--muted-ink)]">Review and confirm all three points before any typed or spoken complaint field is opened.</DialogDescription>
        </DialogHeader>
        <div className="consent-boundary"><LockKeyhole /><div><strong>{copy.privacy}</strong><p>This approval is saved only in this browser for the PxK demonstration. Ending the demo does not create or close an external account.</p></div></div>
        <div className="mt-5 rounded-2xl border border-[var(--line)] bg-[var(--warm-wash)] p-4">
          <div className="flex items-center gap-2 text-sm font-extrabold text-[var(--ink)]"><ClipboardCheck className="h-4 w-4" />Required approval checklist</div>
          <div className="mt-3 grid gap-3">
            <label className="consent-check"><input type="checkbox" checked={prototypeOnly} onChange={(event) => setPrototypeOnly(event.target.checked)} /><span>I understand this is a demonstration, not a real patient account or a request for medical care.</span></label>
            <label className="consent-check"><input type="checkbox" checked={localProcessing} onChange={(event) => setLocalProcessing(event.target.checked)} /><span>I consent to enter a sample concern in this browser so PxK can show a questionnaire route.</span></label>
            <label className="consent-check"><input type="checkbox" checked={clinicalBoundary} onChange={(event) => setClinicalBoundary(event.target.checked)} /><span>I understand PxK does not diagnose, treat, or replace a licensed clinician.</span></label>
          </div>
        </div>
        {language === "tulu" && <p className="tulu-notice">{copy.tuluNote}</p>}
        <div className="mt-7 flex flex-wrap justify-end gap-3"><button className="btn btn-outline" onClick={() => onOpenChange(false)}>{copy.cancel}</button><button className="btn btn-primary" disabled={!allowed} onClick={accept}>Open complaint input</button></div>
      </div>
    </DialogContent>
  </Dialog>;
}
