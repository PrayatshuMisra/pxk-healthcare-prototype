/**
 * Community Wayfinding design system: all fictional PxK prototype data is
 * deliberately separated from view components and never represents real care.
 */
export type Language = "en" | "kn" | "tulu";

export type Doctor = {
  id: string;
  name: string;
  initials: string;
  specialty: string;
  experience: number;
  fee: number;
  distance: number;
  availability: string;
  match: string;
  clinic: string;
  languages: string[];
  tone: "teal" | "eucalyptus" | "turmeric" | "clay";
};

export type ScreeningSession = {
  symptom: string;
  duration: string;
  condition: string;
  completedAt: string;
  chiefComplaint: string;
  relevantHistory: string;
  potentialSpecialty: string;
  nextStep: string;
};

export const ASSETS = {
  logo: "/manus-storage/pxk-route-mark_e4cd9c8c.png",
  heroPhone: "/manus-storage/pxk-hero-phone_0446e360.png",
  profileSheet: "/manus-storage/pxk-profile-sheet_2d4eecf8.png",
  doctorMatch: "/manus-storage/pxk-doctor-match_49f8757f.png",
  monitoring: "/manus-storage/pxk-monitoring-route_950aeb70.png",
};

export const PATHWAY_STAGES = [
  { number: "01", title: "Concern", copy: "Tell us what you’re experiencing.", icon: "MessageCircle" },
  { number: "02", title: "Screening", copy: "Answer simple questions in your language.", icon: "ClipboardList" },
  { number: "03", title: "Specialist", copy: "Find the right specialty and nearby doctor.", icon: "MapPin" },
  { number: "04", title: "Monitoring", copy: "Keep track of changes over time.", icon: "ChartNoAxesCombined" },
];

export const DOCTORS: Doctor[] = [
  { id: "ananya-rao", name: "Dr. Ananya Rao", initials: "AR", specialty: "Pulmonologist", experience: 12, fee: 500, distance: 4.2, availability: "Today · 6:30 PM", match: "Relevant experience for respiratory symptom follow-up.", clinic: "Mangaluru Respiratory Centre", languages: ["English", "ಕನ್ನಡ", "Tulu"], tone: "teal" },
  { id: "vivek-shetty", name: "Dr. Vivek Shetty", initials: "VS", specialty: "General Physician", experience: 15, fee: 350, distance: 2.1, availability: "Tomorrow · 9:00 AM", match: "A practical first point of consultation for a broad review.", clinic: "Coastal Family Practice", languages: ["English", "ಕನ್ನಡ", "Tulu"], tone: "eucalyptus" },
  { id: "meera-nair", name: "Dr. Meera Nair", initials: "MN", specialty: "Cardiologist", experience: 10, fee: 650, distance: 6.8, availability: "Thu · 4:15 PM", match: "Suitable if a clinician advises a cardiac assessment.", clinic: "Kankanady Heart Clinic", languages: ["English", "ಕನ್ನಡ"], tone: "turmeric" },
  { id: "arjun-bhat", name: "Dr. Arjun Bhat", initials: "AB", specialty: "Endocrinologist", experience: 9, fee: 550, distance: 5.6, availability: "Fri · 11:30 AM", match: "Relevant for follow-up when existing metabolic conditions are reported.", clinic: "Kadri Health Collective", languages: ["English", "ಕನ್ನಡ"], tone: "clay" },
];

export const DEFAULT_SESSION: ScreeningSession = { symptom: "Persistent cough and breathlessness", duration: "More than a month", condition: "None reported", completedAt: "Aug 2026", chiefComplaint: "Persistent cough and breathlessness", relevantHistory: "Symptoms reported for more than 3 weeks.", potentialSpecialty: "Pulmonology", nextStep: "A respiratory specialist may be an appropriate next point of clinical consultation." };

export const SCREENING_QUESTIONS = [
  { id: "symptom", question: "What are you experiencing?", kannada: "ನೀವು ಏನು ಅನುಭವಿಸುತ್ತಿದ್ದೀರಿ?", options: ["Chest discomfort", "Breathlessness", "Persistent cough", "Fatigue", "Other"] },
  { id: "duration", question: "How long have you experienced this?", kannada: "ನೀವು ಇದನ್ನು ಎಷ್ಟು ಸಮಯದಿಂದ ಅನುಭವಿಸುತ್ತಿದ್ದೀರಿ?", options: ["Less than a week", "1–4 weeks", "More than a month"] },
  { id: "condition", question: "Do you have any existing health conditions?", kannada: "ನಿಮಗೆ ಈಗಾಗಲೇ ಯಾವುದೇ ಆರೋಗ್ಯ ಸ್ಥಿತಿಗಳಿವೆಯೇ?", options: ["Diabetes", "Hypertension", "None", "Other"] },
];

export const DOCTOR_PATIENTS = [
  { id: "PXK-2841", complaint: "Persistent cough and breathlessness", date: "Today · 10:20 AM", profile: "Respiratory symptoms · > 3 weeks", status: "Review today", tone: "attention" },
  { id: "PXK-1982", complaint: "Intermittent chest discomfort", date: "Today · 09:05 AM", profile: "Patient-reported concern · recent onset", status: "New", tone: "new" },
  { id: "PXK-1657", complaint: "Fatigue with existing diabetes", date: "Yesterday", profile: "Metabolic history reported", status: "Follow-up", tone: "followup" },
  { id: "PXK-1404", complaint: "Persistent skin irritation", date: "Yesterday", profile: "Dermatology route suggested", status: "Reviewed", tone: "reviewed" },
];

export const LANGUAGE_COPY: Record<Language, { label: string; short: string; hero: string; support: string; start: string }> = {
  en: { label: "English", short: "English", hero: "Right patient. Right doctor. Right time.", support: "PxK helps patients turn health concerns into a clear next step — from early screening to the right specialist and continued monitoring.", start: "Start screening" },
  kn: { label: "ಕನ್ನಡ", short: "ಕನ್ನಡ", hero: "ಸರಿಯಾದ ರೋಗಿ. ಸರಿಯಾದ ವೈದ್ಯರು. ಸರಿಯಾದ ಸಮಯ.", support: "PxK ಆರೋಗ್ಯದ ಕಾಳಜಿಯನ್ನು ಸ್ಪಷ್ಟವಾದ ಮುಂದಿನ ಹಂತವಾಗಿ ರೂಪಿಸಲು ಸಹಾಯ ಮಾಡುತ್ತದೆ.", start: "ಸ್ಕ್ರೀನಿಂಗ್ ಪ್ರಾರಂಭಿಸಿ" },
  tulu: { label: "Tulu", short: "Tulu", hero: "Right patient. Right doctor. Right time.", support: "Tulu interface copy is being prepared with verified language review.", start: "Start screening" },
};

export function makeSession(symptom: string, duration: string, condition: string): ScreeningSession {
  const pulmonary = symptom === "Persistent cough" || symptom === "Breathlessness";
  const cardiac = symptom === "Chest discomfort";
  const specialty = pulmonary ? "Pulmonology" : cardiac ? "Cardiology" : condition === "Diabetes" ? "Endocrinology" : "General Medicine";
  const complaint = pulmonary && symptom !== "Persistent cough" ? "Persistent cough and breathlessness" : symptom;
  return { symptom, duration, condition: condition === "None" ? "None reported" : condition, completedAt: "Aug 2026", chiefComplaint: complaint, relevantHistory: `${duration} reported. ${condition === "None" ? "No existing health condition selected." : `${condition} selected in patient-reported history.`}`, potentialSpecialty: specialty, nextStep: `Based on the information provided, a ${specialty === "Pulmonology" ? "respiratory specialist" : specialty === "Cardiology" ? "cardiology specialist" : specialty === "Endocrinology" ? "metabolic health specialist" : "general physician"} may be an appropriate next point of clinical consultation.` };
}

export function loadSession(): ScreeningSession {
  if (typeof window === "undefined") return DEFAULT_SESSION;
  try { const saved = window.sessionStorage.getItem("pxk-screening-session"); return saved ? { ...DEFAULT_SESSION, ...JSON.parse(saved) } : DEFAULT_SESSION; } catch { return DEFAULT_SESSION; }
}

export function storeSession(session: ScreeningSession) { if (typeof window !== "undefined") window.sessionStorage.setItem("pxk-screening-session", JSON.stringify(session)); }
