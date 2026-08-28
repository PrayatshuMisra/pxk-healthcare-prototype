/** Community Wayfinding: an approval-gated, non-diagnostic route selector accepts typed or browser-recognised sample concerns. */
import { COPY } from "@/data/localization";
import type { Language, ScenarioId } from "@/data/mockData";
import { trpc } from "@/lib/trpc";
import { ArrowRight, BrainCircuit, CheckCircle2, LockKeyhole, Sparkles } from "lucide-react";
import { useState } from "react";
import { VoiceRecorder } from "./VoiceRecorder";

type IntakeResult = { route: "respiratory" | "digestive" | "dental" | "general"; confidence: "low" | "medium" | "high"; matchedTerms: string[]; summary: string; nextStep: string; safetyNotice: string };

export function NlpIntake({ language, unlocked, onRequestConsent, onUseRoute }: { language: Language; unlocked: boolean; onRequestConsent: () => void; onUseRoute: (route: ScenarioId, concern: string, analysis: IntakeResult) => void }) {
  const [concern, setConcern] = useState("");
  const [analysis, setAnalysis] = useState<IntakeResult | null>(null);
  const classify = trpc.intake.classify.useMutation({ onSuccess: (result) => setAnalysis(result) });
  const copy = COPY[language];
  const submit = (value = concern) => {
    if (!unlocked) { onRequestConsent(); return; }
    if (value.trim().length >= 8) { setConcern(value); classify.mutate({ concern: value.trim(), language, consentAcknowledged: true }); }
  };
  const chooseSuggestedRoute = () => { if (analysis && analysis.route !== "general") onUseRoute(analysis.route, concern, analysis); };
  return <section className="nlp-intake" aria-labelledby="nlp-intake-title"><div className="nlp-intake-heading"><span className="nlp-symbol"><BrainCircuit /></span><div><p className="eyebrow">AI-assisted intake · non-diagnostic</p><h3 id="nlp-intake-title">Describe or speak your concern.</h3><p>PxK uses your sample words to suggest a focused questionnaire and show the route logic. It does not determine a medical condition.</p></div></div>{!unlocked ? <button className="intake-consent-lock" onClick={onRequestConsent}><LockKeyhole /><span><strong>Review approvals before starting</strong><small>All required checklist items must be accepted before any complaint field is displayed.</small></span><ArrowRight /></button> : <><label className="sr-only" htmlFor="nlp-concern">Describe your concern</label><textarea id="nlp-concern" value={concern} onChange={(event) => setConcern(event.target.value)} placeholder={language === "kn" ? "ನಿಮ್ಮ ತೊಂದರೆಯನ್ನು ನಿಮ್ಮ ಸ್ವಂತ ಪದಗಳಲ್ಲಿ ವಿವರಿಸಿ…" : "For example: I have had a cough and feel short of breath after walking…"} maxLength={1200} className="nlp-textarea" /><div className="voice-intake-row"><VoiceRecorder language={language} label="Speak your concern" onTranscript={(text) => submit(text)} /><span>Browser speech recognition is optional. Your sample concern is used only to show this prototype’s questionnaire route.</span></div><div className="nlp-actions"><span>{concern.length}/1200 · Prototype preview · no external account required</span><button className="btn btn-primary" disabled={concern.trim().length < 8 || classify.isPending} onClick={() => submit()}>{classify.isPending ? "Finding the questionnaire…" : "Find my questionnaire"}<ArrowRight className="h-4 w-4" /></button></div>{classify.error && <p className="nlp-error">The assisted route is unavailable right now. You can still choose a questionnaire manually.</p>}{analysis && <div className="nlp-result"><div><p className="eyebrow">Suggested route</p><h4>{analysis.route === "general" ? "Choose a route manually" : `${analysis.route.charAt(0).toUpperCase()}${analysis.route.slice(1)} questionnaire`}</h4><p>{analysis.summary}</p></div><span className={`nlp-confidence nlp-confidence--${analysis.confidence}`}>{analysis.confidence} signal</span>{analysis.matchedTerms.length > 0 && <div className="matched-terms">{analysis.matchedTerms.map((term) => <span key={term}><CheckCircle2 />{term}</span>)}</div>}<p className="nlp-safety"><Sparkles />{analysis.safetyNotice}</p>{analysis.route !== "general" && <button className="btn btn-primary" onClick={chooseSuggestedRoute}>Use this questionnaire <ArrowRight className="h-4 w-4" /></button>}</div>}</>}</section>;
}
