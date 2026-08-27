/** Community Wayfinding: privacy-gated screening uses a 15-question, save-and-resume route that remains non-diagnostic. */
import { ConsentDialog } from "@/components/ConsentDialog";
import { DecisionSupportPanel } from "@/components/DecisionSupportPanel";
import { MedicalTermTooltip } from "@/components/MedicalTermTooltip";
import { VoiceAnswerControl } from "@/components/VoiceAnswerControl";
import { NlpIntake } from "@/components/NlpIntake";
import { PdfExportButton } from "@/components/PdfExportButton";
import { HealthProfileCard, ProgressIndicator, ScreeningQuestion } from "@/components/UiPrimitives";
import { useAuth } from "@/_core/hooks/useAuth";
import { startLogin } from "@/const";
import { getDemoConsent, setDemoConsent } from "@/data/consent";
import { COPY, localizedOption, localizedQuestion, localizedScenario } from "@/data/localization";
import { makeScreeningRecord, saveScreeningRecord, SCENARIOS, type Language, type ScenarioId, type ScreeningRecord } from "@/data/mockData";
import { trpc } from "@/lib/trpc";
import { ArrowLeft, ArrowRight, Bookmark, ClipboardCheck, HeartPulse, LogIn, RotateCcw, Save, ShieldCheck, Stethoscope, Wind, X } from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "wouter";

const scenarioIcons = { respiratory: Wind, digestive: HeartPulse, dental: Stethoscope };
type IntakeResult = { route: "respiratory" | "digestive" | "dental" | "general"; confidence: "low" | "medium" | "high"; matchedTerms: string[]; summary: string; nextStep: string; safetyNotice: string };
type SavedDraft = { publicId: string; scenarioId: ScenarioId | "general"; answersJson: string; currentStep: number; concernText: string | null; nlpSummary: string | null; nlpMatchedTermsJson: string | null };
const newDraftId = () => typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID().slice(0, 36) : `pxk-${Date.now().toString(36)}`;

export function ScreeningDemo({ language }: { language: Language }) {
  const copy = COPY[language];
  const { isAuthenticated, loading } = useAuth();
  const utils = trpc.useUtils();
  const drafts = trpc.screening.listDrafts.useQuery(undefined, { enabled: isAuthenticated });
  const saveDraft = trpc.screening.saveDraft.useMutation({ onSuccess: () => utils.screening.listDrafts.invalidate() });
  const discardDraft = trpc.screening.discard.useMutation({ onSuccess: () => utils.screening.listDrafts.invalidate() });
  const [scenarioId, setScenarioId] = useState<ScenarioId | null>(null);
  const [pendingScenario, setPendingScenario] = useState<ScenarioId | null>(null);
  const [consentOpen, setConsentOpen] = useState(false);
  const [intakeUnlocked, setIntakeUnlocked] = useState(() => Boolean(getDemoConsent()));
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [concernText, setConcernText] = useState("");
  const [intake, setIntake] = useState<IntakeResult | null>(null);
  const [draftId, setDraftId] = useState(newDraftId);
  const [reviewing, setReviewing] = useState(false);
  const [result, setResult] = useState<ScreeningRecord | null>(null);
  const scenario = scenarioId ? SCENARIOS[scenarioId] : null;
  const question = scenario?.questions[step];
  const complete = scenario ? scenario.questions.every((item) => Boolean(answers[item.id])) : false;
  const questionSummary = useMemo(() => scenario?.questions.map((item, index) => ({ ...item, index, answer: answers[item.id] || "Not recorded" })) ?? [], [answers, scenario]);

  const requestConsent = (id?: ScenarioId) => {
    if (getDemoConsent()) { if (id) setScenarioId(id); else setIntakeUnlocked(true); return; }
    setPendingScenario(id || null); setConsentOpen(true);
  };
  const acceptConsent = () => { setDemoConsent(); setIntakeUnlocked(true); if (pendingScenario) setScenarioId(pendingScenario); setPendingScenario(null); setConsentOpen(false); };
  const useNlpRoute = (route: ScenarioId, text: string, analysis: IntakeResult) => { setConcernText(text); setIntake(analysis); requestConsent(route); };
  const clearCurrent = () => { setScenarioId(null); setStep(0); setAnswers({}); setConcernText(""); setIntake(null); setDraftId(newDraftId()); setReviewing(false); setResult(null); };
  const payload = (status: "draft" | "completed") => scenarioId ? { publicId: draftId, status, scenarioId, language, concernText: concernText || undefined, answers, currentStep: step, consentVersion: "demo-consent-v1", nlpSummary: intake?.summary, nlpMatchedTerms: intake?.matchedTerms } : null;
  const saveProgress = () => { const input = payload("draft"); if (!input) return; if (!isAuthenticated) { startLogin(); return; } saveDraft.mutate(input); };
  const resume = (draft: SavedDraft) => { if (draft.scenarioId === "general") return; try { setScenarioId(draft.scenarioId); setAnswers(JSON.parse(draft.answersJson)); setStep(Math.min(draft.currentStep, SCENARIOS[draft.scenarioId].questions.length - 1)); setConcernText(draft.concernText || ""); setIntake(draft.nlpSummary ? { route: draft.scenarioId, confidence: "medium", matchedTerms: draft.nlpMatchedTermsJson ? JSON.parse(draft.nlpMatchedTermsJson) : [], summary: draft.nlpSummary, nextStep: "Continue the saved questionnaire.", safetyNotice: "This tool does not diagnose conditions." } : null); setDraftId(draft.publicId); setIntakeUnlocked(true); } catch { clearCurrent(); } };
  const submit = () => { if (!scenarioId || !complete) return; const record = makeScreeningRecord(scenarioId, answers); saveScreeningRecord(record); const input = payload("completed"); if (input && isAuthenticated) saveDraft.mutate(input); setResult(record); setReviewing(false); };

  return <section id="demo" className="screening-shell screening-shell--expanded scroll-mt-28" aria-labelledby="screening-demo-title">
    <div className="screening-aside">
      <p className="eyebrow">{copy.interactiveDemo}</p><h2 id="screening-demo-title" className={`display-title mt-4 text-4xl lg:text-5xl ${language === "kn" ? "font-kannada" : ""}`}>{language === "kn" ? "ಕಾಳಜಿಯಿಂದ ಸ್ಪಷ್ಟವಾದ ಮುಂದಿನ ಹಂತದವರೆಗೆ." : "A guided route to the next clear step."}</h2>
      <p className="screening-intro">{language === "kn" ? "ನಿಮ್ಮ ಸ್ವಂತ ಪದಗಳಲ್ಲಿ ಪ್ರಾರಂಭಿಸಿ ಅಥವಾ ಕಾಳಜಿಯನ್ನು ಆಯ್ಕೆಮಾಡಿ. PxK ನಿಮಗೆ ಸೂಕ್ತ ಪ್ರಶ್ನಾವಳಿಯತ್ತ ಮಾರ್ಗದರ್ಶನ ನೀಡುತ್ತದೆ." : "Start in your own words or choose a concern. PxK guides you to a focused questionnaire, records your choices, and keeps the next clinical conversation visible."}</p>
      <div className="workflow-steps"><span className={!scenarioId ? "active" : ""}>01 · Describe</span><span className={scenarioId && !result ? "active" : ""}>02 · Screen</span><span className={reviewing ? "active" : ""}>03 · Review</span><span className={result ? "active" : ""}>04 · Route</span></div>
      <div className="screening-note"><ShieldCheck className="h-5 w-5" /><p>{language === "kn" ? "PxK ರೋಗಿ-ವರದಿಯಾದ ಮಾಹಿತಿಯನ್ನು ಕ್ಲಿನಿಕಲ್ ಅನುಸರಣೆಗೆ ರಚಿಸುತ್ತದೆ. ಇದು ರೋಗನಿರ್ಣಯ ನೀಡುವುದಿಲ್ಲ." : "PxK structures patient-reported information for clinical follow-up. It does not diagnose conditions or replace professional care."}</p></div>
    </div>
    <div className="screening-panel">
      {!scenario && <div className="screening-select">
        <NlpIntake language={language} unlocked={intakeUnlocked} onRequestConsent={() => requestConsent()} onUseRoute={useNlpRoute} />
        <div className="manual-route"><div><p className="eyebrow">Or choose a route</p><h3>Start with the closest concern.</h3></div>{isAuthenticated && drafts.data?.length ? <div className="resume-tray"><span><Bookmark />{drafts.data.length} saved check-in{drafts.data.length === 1 ? "" : "s"}</span>{drafts.data.slice(0, 2).map((draft) => <div className="resume-item" key={draft.publicId}><button onClick={() => resume(draft)}>{draft.scenarioId} · resume <ArrowRight /></button><button className="discard-draft" onClick={() => discardDraft.mutate({ publicId: draft.publicId })} aria-label={`Discard saved ${draft.scenarioId} check-in`} disabled={discardDraft.isPending}><X /></button></div>)}</div> : !loading && <button className="save-nudge" onClick={startLogin}><LogIn /><span><strong>Sign in to save and resume</strong><small>Your consented draft will be tied to your account.</small></span></button>}</div>
        <div className="scenario-grid">{Object.values(SCENARIOS).map((item) => { const Icon = scenarioIcons[item.id]; return <button className="scenario-card" key={item.id} onClick={() => requestConsent(item.id)}><span className="scenario-icon"><Icon /></span><span className="scenario-card-copy"><small>{item.route}</small><strong className={language === "kn" ? "font-kannada" : ""}>{localizedScenario(language, item.id, item.label)}</strong><em>{item.description}</em></span><ArrowRight className="h-4 w-4" /></button>; })}</div>
      </div>}
      {result && <div className="animate-settle"><div className="flex flex-wrap items-center justify-between gap-3"><p className="eyebrow">Step 04 · screening record saved</p><button className="text-button" onClick={clearCurrent}><RotateCcw className="h-4 w-4" />Start another check-in</button></div><HealthProfileCard session={result} /><DecisionSupportPanel record={result} language={language} /><div className="mt-6 flex flex-wrap gap-3"><PdfExportButton record={result} language={language} /><Link className="btn btn-primary" href="/patient">Open patient view <ArrowRight className="h-4 w-4" /></Link><Link className="btn btn-outline" href="/history">View screening history</Link></div></div>}
      {scenario && !result && reviewing && <div className="animate-settle"><div className="flex flex-wrap items-start justify-between gap-4"><div><p className="eyebrow">Step 03 · {copy.review}</p><h3 className="mt-3 text-3xl font-bold tracking-[-0.055em] text-[var(--ink)]">Check the details before you continue.</h3></div><button className="btn btn-outline" onClick={() => { setReviewing(false); setStep(scenario.questions.length - 1); }}><ArrowLeft className="h-4 w-4" />Edit answers</button></div><div className="review-grid">{questionSummary.map((item) => <button key={item.id} onClick={() => { setStep(item.index); setReviewing(false); }}><span>{copy.question} {String(item.index + 1).padStart(2, "0")}</span><strong>{localizedQuestion(language, scenario.id, item)}</strong><em>{localizedOption(language, item.answer)}</em></button>)}</div><div className="review-note"><ClipboardCheck className="h-5 w-5" /><p>Your answers are used only to create a screening-oriented next-step summary. They are not a medical assessment.</p></div><button className="btn btn-primary mt-7" onClick={submit}>Create preliminary profile <ArrowRight className="h-4 w-4" /></button></div>}
      {scenario && !result && !reviewing && question && <div className="animate-settle"><div className="flex flex-wrap items-start justify-between gap-3"><div><p className="eyebrow">Step 02 · {scenario.route}</p><p className="mt-2 text-sm font-bold text-[var(--ink)]">{question.group} <span className="ml-2 font-mono text-[0.62rem] font-medium tracking-[0.12em] text-[var(--muted-ink)]">{language === "kn" ? "ಕನ್ನಡ" : language === "tulu" ? "Tulu source" : language === "kok" ? "Konkani source" : "English"}</span></p></div><span className="screening-count">{String(step + 1).padStart(2, "0")} / {scenario.questions.length}</span></div>{intake && <div className="intake-route-strip"><span>AI-assisted route</span><p>{intake.summary}</p></div>}<div className="mt-6"><ProgressIndicator current={step + 1} total={scenario.questions.length} /></div><div className="mt-9"><p className="route-label">{copy.question} {String(step + 1).padStart(2, "0")}</p><div className="mt-3 question-with-help"><ScreeningQuestion question={localizedQuestion(language, scenario.id, question)} options={question.options.map((option) => ({ value: option, label: localizedOption(language, option) }))} selected={answers[question.id]} onSelect={(answer) => setAnswers((previous) => ({ ...previous, [question.id]: answer }))} /><MedicalTermTooltip term={question.helpTerm} language={language} /></div></div><div className="screening-progress-actions"><button className="btn btn-text" onClick={() => setStep((current) => Math.max(0, current - 1))} disabled={step === 0}><ArrowLeft className="h-4 w-4" />Back</button><div className="flex flex-wrap gap-2"><button className="btn btn-outline" onClick={saveProgress} disabled={saveDraft.isPending}>{isAuthenticated ? <><Save className="h-4 w-4" />{saveDraft.isPending ? "Saving…" : "Save & resume later"}</> : <><LogIn className="h-4 w-4" />Sign in to save</>}</button><button className="btn btn-primary" disabled={!answers[question.id]} onClick={() => step === scenario.questions.length - 1 ? setReviewing(true) : setStep((current) => current + 1)}>{step === scenario.questions.length - 1 ? copy.review : language === "kn" ? "ಮುಂದುವರಿಸಿ" : "Continue"}<ArrowRight className="h-4 w-4" /></button></div></div>{saveDraft.isSuccess && <p className="save-status"><ShieldCheck />Progress saved to your signed-in account. You can resume it from the route chooser.</p>}</div>}
    </div>
    {scenario && !result && !reviewing && question && <VoiceAnswerControl language={language} options={question.options.map((value) => ({ value, label: localizedOption(language, value) }))} onMatch={(value) => setAnswers((previous) => ({ ...previous, [question.id]: value }))} onAdvance={() => { if (step === scenario.questions.length - 1) setReviewing(true); else setStep((current) => current + 1); }} />}
    <ConsentDialog open={consentOpen} language={language} onAccept={acceptConsent} onOpenChange={setConsentOpen} />
  </section>;
}
