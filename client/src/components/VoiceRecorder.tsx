/** Community Wayfinding: the demo uses only the browser's optional speech recogniser and never records or uploads audio. */
import type { Language } from "@/data/mockData";
import { Mic, PauseCircle } from "lucide-react";
import { useRef, useState } from "react";

type SpeechRecognitionInstance = { lang: string; continuous: boolean; interimResults: boolean; start: () => void; stop: () => void; onresult: ((event: { results: ArrayLike<ArrayLike<{ transcript: string }>> }) => void) | null; onerror: ((event: { error: string }) => void) | null; onend: (() => void) | null };
type SpeechWindow = Window & { SpeechRecognition?: new () => SpeechRecognitionInstance; webkitSpeechRecognition?: new () => SpeechRecognitionInstance };
const speechLanguage: Record<Language, string> = { en: "en-IN", kn: "kn-IN", tulu: "kn-IN", kok: "kok-IN" };

export function VoiceRecorder({ language, label = "Speak", onTranscript }: { language: Language; label?: string; onTranscript: (text: string) => void }) {
  const [recording, setRecording] = useState(false);
  const [message, setMessage] = useState("");
  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null);
  const begin = () => {
    const BrowserSpeech = (window as SpeechWindow).SpeechRecognition || (window as SpeechWindow).webkitSpeechRecognition;
    if (!BrowserSpeech) {
      setMessage("Browser speech recognition is unavailable here. You can type or select a visible option instead.");
      return;
    }
    const recognition = new BrowserSpeech();
    recognitionRef.current = recognition;
    recognition.lang = speechLanguage[language];
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.onresult = (event) => {
      const text = event.results[0]?.[0]?.transcript?.trim();
      if (text) {
        setMessage(`Heard: “${text}”`);
        onTranscript(text);
      }
    };
    recognition.onerror = () => setMessage("Browser speech could not understand that. You can type or choose an option instead.");
    recognition.onend = () => { recognitionRef.current = null; setRecording(false); };
    setRecording(true);
    setMessage("Listening in your browser… tap stop when you finish.");
    recognition.start();
  };
  const stop = () => recognitionRef.current?.stop();
  return <div className="voice-control"><button type="button" className={`voice-button ${recording ? "voice-button--recording" : ""}`} onClick={recording ? stop : begin} aria-pressed={recording}>{recording ? <PauseCircle /> : <Mic />}<span>{recording ? "Stop listening" : label}</span></button>{message && <p className="voice-message" role="status">{message}</p>}</div>;
}
