/** Community Wayfinding: a spoken answer is matched to the on-screen choices and visibly confirmed before the route advances. */
import type { Language } from "@/data/mockData";
import { CheckCircle2, Mic } from "lucide-react";
import { useState } from "react";
import { matchSpokenOption, type VoiceOption } from "@/lib/voiceMatching";
import { VoiceRecorder } from "./VoiceRecorder";
export function VoiceAnswerControl({ language, options, onMatch, onAdvance }: { language: Language; options: VoiceOption[]; onMatch: (value: string) => void; onAdvance: () => void }) { const [match, setMatch] = useState<string | null>(null); const process = (text: string) => { const selected = matchSpokenOption(text, options); if (!selected) { setMatch(null); return; } setMatch(selected); onMatch(selected); window.setTimeout(onAdvance, 700); }; const label = match ? options.find((option) => option.value === match)?.label : ""; return <div className="voice-answer"><div><Mic /><span><strong>Answer by voice</strong><small>Say one of the visible options. PxK confirms the matched option, then continues.</small></span></div><VoiceRecorder language={language} label="Speak your answer" onTranscript={process} />{match && <p className="voice-answer-confirm"><CheckCircle2 />Selected “{label}” — continuing.</p>}</div>; }
