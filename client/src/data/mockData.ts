/**
 * Community Wayfinding: fictional local data, bounded screening language, and
 * browser-only history. PxK demonstrates routing; it never provides diagnosis.
 */
import { evaluateRoute, type RouteDecision } from "@/data/routeEngine";
export type Language = "en" | "kn" | "tulu" | "kok";
export type ScenarioId = "respiratory" | "digestive" | "dental";
export type QuestionGroup = "Concern & symptoms" | "Pattern & context" | "History & preference" | "Daily impact & care";

export type ScreeningQuestionData = { id: string; question: string; options: string[]; group: QuestionGroup; helpTerm?: string };
export type Scenario = { id: ScenarioId; label: string; shortLabel: string; description: string; route: string; specialty: string; icon: "lungs" | "digestive" | "dental"; questions: ScreeningQuestionData[] };
export type ScreeningSession = { symptom: string; duration: string; condition: string; completedAt: string; chiefComplaint: string; relevantHistory: string; potentialSpecialty: string; nextStep: string; status?: string; scenario?: string };
export type ScreeningRecord = ScreeningSession & { id: string; scenarioId: ScenarioId; scenario: string; answers: Record<string, string>; startedAt: string; status: "Routine clinical follow-up" | "Priority clinical review"; cue: string; carePreference: string; decisionSupport?: RouteDecision };
export type Doctor = { id: string; name: string; initials: string; specialty: string; experience: number; fee: number; distance: number; availability: string; match: string; clinic: string; languages: string[]; tone: "teal" | "eucalyptus" | "turmeric" | "clay" };

export const ASSETS = { logo: "/manus-storage/pxk-route-mark_e4cd9c8c.png", heroPhone: "/manus-storage/pxk-hero-phone_0446e360.png", profileSheet: "/manus-storage/pxk-profile-sheet_2d4eecf8.png", doctorMatch: "/manus-storage/pxk-doctor-match_49f8757f.png", monitoring: "/manus-storage/pxk-monitoring-route_950aeb70.png" };
export const PATHWAY_STAGES = [{ number: "01", title: "Concern", copy: "Tell us what you’re experiencing.", icon: "MessageCircle" }, { number: "02", title: "Screening", copy: "Answer simple questions in your language.", icon: "ClipboardList" }, { number: "03", title: "Specialist", copy: "Find the right specialty and nearby doctor.", icon: "MapPin" }, { number: "04", title: "Monitoring", copy: "Keep track of changes over time.", icon: "ChartNoAxesCombined" }];

export const SCENARIOS: Record<ScenarioId, Scenario> = {
  respiratory: { id: "respiratory", label: "Respiratory symptoms", shortLabel: "Breathing & cough", description: "Cough, breathlessness, wheezing, chest tightness, and related history.", route: "Respiratory care route", specialty: "Pulmonology", icon: "lungs", questions: [
    { id: "main", group: "Concern & symptoms", question: "What is your main problem?", options: ["Cough", "Breathlessness", "Wheezing", "Chest tightness"] },
    { id: "fever", group: "Concern & symptoms", question: "Do you have fever?", options: ["Yes", "No"] },
    { id: "coughType", group: "Concern & symptoms", question: "Is your cough dry or with mucus?", options: ["Dry", "Mucus", "Blood", "No cough"], helpTerm: "mucus" },
    { id: "mucus", group: "Concern & symptoms", question: "What is the mucus colour?", options: ["Clear", "White", "Yellow/green", "Blood-stained"], helpTerm: "mucus" },
    { id: "breathing", group: "Pattern & context", question: "When is breathing difficulty worse?", options: ["Exercise", "Night", "At rest", "All the time"] },
    { id: "trigger", group: "Pattern & context", question: "What triggers your symptoms?", options: ["Dust/smoke", "Cold air", "Exercise", "Allergens", "Nothing"] },
    { id: "wheezing", group: "Pattern & context", question: "Do you hear a whistling sound while breathing?", options: ["Yes", "No"] },
    { id: "duration", group: "Pattern & context", question: "How long have you had the symptoms?", options: ["Less than 1 day", "1–7 days", "1–4 weeks", "More than 1 month"] },
    { id: "other", group: "History & preference", question: "Do you have any of these?", options: ["Chest pain", "Night sweats", "Weight loss", "None"] },
    { id: "episodes", group: "History & preference", question: "Have you had similar episodes before?", options: ["Yes, frequently", "Sometimes", "Never"] },
    { id: "lungHistory", group: "History & preference", question: "Do you have asthma or another lung disease?", options: ["Asthma", "COPD", "Tuberculosis", "None", "Not sure"], helpTerm: "copd" },
    { id: "tobacco", group: "History & preference", question: "Do you smoke or use tobacco?", options: ["Yes", "No", "Previously"] },
    { id: "impact", group: "Daily impact & care", question: "How is this concern affecting your usual activities?", options: ["Not affecting them", "A little", "Quite a lot", "Unable to do usual activities"] },
    { id: "care", group: "Daily impact & care", question: "What type of medical follow-up would you prefer?", options: ["In-person consultation", "Teleconsultation", "Either is acceptable", "Not sure"] },
    { id: "notes", group: "Daily impact & care", question: "Would you like to add this concern to your saved route record?", options: ["Yes, save this check-in", "No, continue without saving"] },
  ] },
  digestive: { id: "digestive", label: "Abdominal & digestive symptoms", shortLabel: "Stomach & digestion", description: "Abdominal discomfort, eating patterns, bowel changes, and relevant history.", route: "Digestive care route", specialty: "Gastroenterology", icon: "digestive", questions: [
    { id: "main", group: "Concern & symptoms", question: "What is your main problem?", options: ["Stomach/abdominal pain", "Acidity or heartburn", "Vomiting", "Loose motions/diarrhoea", "Constipation", "Loss of appetite", "Other"] },
    { id: "location", group: "Concern & symptoms", question: "Where exactly do you feel pain or discomfort?", options: ["Upper abdomen", "Lower abdomen", "Right side", "Left side", "Around the navel", "All over the abdomen", "I do not have pain"] },
    { id: "feeling", group: "Concern & symptoms", question: "What does the pain or discomfort feel like?", options: ["Burning", "Cramping", "Sharp", "Dull/aching"] },
    { id: "severity", group: "Concern & symptoms", question: "How severe is your pain or discomfort?", options: ["Mild — does not affect daily activities", "Moderate — affects some activities", "Severe — difficult to perform normal activities", "Very severe — unbearable"] },
    { id: "food", group: "Pattern & context", question: "Does eating or movement affect your symptoms?", options: ["Before food / when I have not eaten", "After eating", "During movement", "No relation to food", "I am not sure"] },
    { id: "associated", group: "Pattern & context", question: "Which symptoms do you have along with your main problem?", options: ["Nausea", "Vomiting", "Bloating/gas", "Acidity/heartburn", "Diarrhoea", "Constipation", "Loss of appetite", "None of these"], helpTerm: "bloating" },
    { id: "blood", group: "Pattern & context", question: "Have you noticed any blood or unusual stool change?", options: ["Blood in vomit", "Blood in stool", "Black/tarry stool", "No blood noticed", "Not sure"], helpTerm: "tarry stool" },
    { id: "fever", group: "Pattern & context", question: "Do you have fever?", options: ["No", "Mild fever", "High fever", "I am not sure"] },
    { id: "fluid", group: "History & preference", question: "Have you had repeated vomiting or difficulty keeping food or water down?", options: ["No", "Once or twice", "Several times", "I cannot keep food or water down"] },
    { id: "duration", group: "History & preference", question: "How long have you had this problem?", options: ["Less than 24 hours", "1–3 days", "4–7 days", "1–4 weeks", "More than 1 month", "More than 6 months"] },
    { id: "history", group: "History & preference", question: "Have you had similar symptoms or relevant medical history?", options: ["Never", "Occasionally", "Frequently", "Diabetes", "Liver/gallbladder disease", "Stomach/intestine disease", "Previous abdominal surgery", "Other"] },
    { id: "care", group: "History & preference", question: "What type of medical care would you prefer?", options: ["In-person consultation", "Teleconsultation", "Either is acceptable", "I need urgent medical attention"] },
    { id: "impact", group: "Daily impact & care", question: "How is this concern affecting your usual activities?", options: ["Not affecting them", "A little", "Quite a lot", "Unable to do usual activities"] },
    { id: "diet", group: "Daily impact & care", question: "Have you noticed a food or drink pattern?", options: ["No clear pattern", "Spicy food", "Oily food", "Dairy", "I am not sure"] },
    { id: "notes", group: "Daily impact & care", question: "Would you like to add this concern to your saved route record?", options: ["Yes, save this check-in", "No, continue without saving"] },
  ] },
  dental: { id: "dental", label: "Dental symptoms", shortLabel: "Teeth & gums", description: "Tooth pain, sensitivity, swelling, gums, and previous dental treatment.", route: "Dental care route", specialty: "General Dentistry", icon: "dental", questions: [
    { id: "main", group: "Concern & symptoms", question: "What is your main concern?", options: ["Pain", "Sensitivity", "Swelling", "Bleeding", "Ulcer", "Broken/loose tooth"] },
    { id: "jaw", group: "Concern & symptoms", question: "Which jaw?", options: ["Upper", "Lower", "Both"] },
    { id: "region", group: "Concern & symptoms", question: "Which region?", options: ["Front", "Back", "Both"] },
    { id: "side", group: "Concern & symptoms", question: "Which side?", options: ["Right", "Left", "Both"] },
    { id: "teeth", group: "Pattern & context", question: "One tooth or multiple teeth?", options: ["One tooth", "Multiple teeth", "Not sure"] },
    { id: "trigger", group: "Pattern & context", question: "What triggers the problem?", options: ["Hot", "Cold", "Sweet", "Biting/chewing", "Nothing"] },
    { id: "duration", group: "Pattern & context", question: "How long have you had the problem?", options: ["Today", "1–7 days", "1–4 weeks", "More than 1 month"] },
    { id: "swelling", group: "Pattern & context", question: "Is there swelling?", options: ["Yes", "No"] },
    { id: "pus", group: "History & preference", question: "Any pus or bad taste?", options: ["Yes", "No"] },
    { id: "bleeding", group: "History & preference", question: "Are your gums bleeding?", options: ["Yes", "No"] },
    { id: "loose", group: "History & preference", question: "Is the tooth loose?", options: ["Yes", "No"] },
    { id: "treatment", group: "History & preference", question: "Have you had treatment before?", options: ["Filling", "Root canal", "Crown", "Extraction", "No treatment", "Not sure"], helpTerm: "root canal" },
    { id: "impact", group: "Daily impact & care", question: "How is this concern affecting eating, drinking, or sleep?", options: ["Not affecting them", "A little", "Quite a lot", "Unable to do usual activities"] },
    { id: "care", group: "Daily impact & care", question: "What type of dental follow-up would you prefer?", options: ["In-person consultation", "Teleconsultation", "Either is acceptable", "Not sure"] },
    { id: "notes", group: "Daily impact & care", question: "Would you like to add this concern to your saved route record?", options: ["Yes, save this check-in", "No, continue without saving"] },
  ] },
};

export const DOCTORS: Doctor[] = [
  { id: "ananya-rao", name: "Dr. Ananya Rao", initials: "AR", specialty: "Pulmonologist", experience: 12, fee: 500, distance: 4.2, availability: "Today · 6:30 PM", match: "Relevant experience for respiratory symptom follow-up.", clinic: "Mangaluru Respiratory Centre", languages: ["English", "ಕನ್ನಡ", "Tulu"], tone: "teal" },
  { id: "vivek-shetty", name: "Dr. Vivek Shetty", initials: "VS", specialty: "General Physician", experience: 15, fee: 350, distance: 2.1, availability: "Tomorrow · 9:00 AM", match: "A practical first point of consultation for a broad review.", clinic: "Coastal Family Practice", languages: ["English", "ಕನ್ನಡ", "Tulu"], tone: "eucalyptus" },
  { id: "meera-nair", name: "Dr. Meera Nair", initials: "MN", specialty: "Gastroenterologist", experience: 10, fee: 650, distance: 6.8, availability: "Thu · 4:15 PM", match: "Relevant experience for digestive symptom follow-up.", clinic: "Kankanady Digestive Care", languages: ["English", "ಕನ್ನಡ"], tone: "turmeric" },
  { id: "arjun-bhat", name: "Dr. Arjun Bhat", initials: "AB", specialty: "General Dentist", experience: 9, fee: 400, distance: 3.1, availability: "Today · 5:00 PM", match: "A practical first dental consultation for a reported concern.", clinic: "Kadri Dental Collective", languages: ["English", "ಕನ್ನಡ"], tone: "clay" },
  { id: "nisha-kulal", name: "Dr. Nisha Kulal", initials: "NK", specialty: "Endodontist", experience: 8, fee: 550, distance: 5.6, availability: "Fri · 11:30 AM", match: "Relevant experience for tooth pain and prior treatment follow-up.", clinic: "Hampankatta Dental Care", languages: ["English", "ಕನ್ನಡ", "Tulu"], tone: "teal" },
  { id: "sanjay-pai", name: "Dr. Sanjay Pai", initials: "SP", specialty: "Periodontist", experience: 11, fee: 500, distance: 7.0, availability: "Sat · 10:15 AM", match: "Relevant experience for gum-related concerns and review.", clinic: "Coastal Gum & Dental Clinic", languages: ["English", "ಕನ್ನಡ"], tone: "eucalyptus" },
];

const seededAnswers: Record<string, string> = { main: "Cough", fever: "No", coughType: "Mucus", mucus: "White", breathing: "Exercise", trigger: "Dust/smoke", wheezing: "No", duration: "1–4 weeks", other: "None", episodes: "Sometimes", lungHistory: "None", tobacco: "No" };
export const SEED_HISTORY: ScreeningRecord[] = [
  { id: "PXK-DEMO-0826", scenarioId: "respiratory", scenario: "Respiratory symptoms", answers: seededAnswers, startedAt: "18 Aug 2026", completedAt: "18 Aug 2026", symptom: "Cough", duration: "1–4 weeks", condition: "No prior lung condition reported", chiefComplaint: "Cough", relevantHistory: "Symptoms reported for 1–4 weeks. No prior lung condition selected.", potentialSpecialty: "Pulmonology", nextStep: "A respiratory specialist may be an appropriate next point of clinical consultation.", status: "Routine clinical follow-up", cue: "Patient-reported respiratory symptoms over several weeks.", carePreference: "Either is acceptable" },
  { id: "PXK-DEMO-0719", scenarioId: "digestive", scenario: "Abdominal & digestive symptoms", answers: { main: "Acidity or heartburn", location: "Upper abdomen", feeling: "Burning", severity: "Mild — does not affect daily activities", food: "After eating", associated: "Bloating/gas", blood: "No blood noticed", fever: "No", fluid: "No", duration: "1–4 weeks", history: "Occasionally", care: "In-person consultation" }, startedAt: "19 Jul 2026", completedAt: "19 Jul 2026", symptom: "Acidity or heartburn", duration: "1–4 weeks", condition: "Occasional similar symptoms", chiefComplaint: "Acidity or heartburn", relevantHistory: "Upper abdomen discomfort reported for 1–4 weeks.", potentialSpecialty: "Gastroenterology", nextStep: "A digestive-health specialist may be an appropriate next point of clinical consultation.", status: "Routine clinical follow-up", cue: "Ongoing digestive concern reported through a screening check-in.", carePreference: "In-person consultation" },
  { id: "PXK-DEMO-0611", scenarioId: "dental", scenario: "Dental symptoms", answers: { main: "Sensitivity", jaw: "Upper", region: "Back", side: "Left", teeth: "One tooth", trigger: "Cold", duration: "1–7 days", swelling: "No", pus: "No", bleeding: "No", loose: "No", treatment: "No treatment" }, startedAt: "11 Jun 2026", completedAt: "11 Jun 2026", symptom: "Sensitivity", duration: "1–7 days", condition: "No prior treatment reported", chiefComplaint: "Dental sensitivity", relevantHistory: "A single upper back tooth concern was reported.", potentialSpecialty: "General Dentistry", nextStep: "A dentist may be an appropriate next point of clinical consultation.", status: "Routine clinical follow-up", cue: "Patient-reported dental sensitivity.", carePreference: "In-person consultation" },
];

export const DOCTOR_PATIENTS = [
  { id: "PXK-2841", complaint: "Persistent cough and breathlessness", date: "Today · 10:20 AM", profile: "Respiratory symptoms · > 3 weeks", status: "Review today", tone: "attention" },
  { id: "PXK-1982", complaint: "Intermittent chest discomfort", date: "Today · 09:05 AM", profile: "Patient-reported concern · recent onset", status: "New", tone: "new" },
  { id: "PXK-1657", complaint: "Fatigue with existing diabetes", date: "Yesterday", profile: "Metabolic history reported", status: "Follow-up", tone: "followup" },
  { id: "PXK-1404", complaint: "Persistent skin irritation", date: "Yesterday", profile: "Dermatology route suggested", status: "Reviewed", tone: "reviewed" },
];

export const DEFAULT_SESSION: ScreeningSession = SEED_HISTORY[0];
export const LANGUAGE_COPY: Record<Language, { label: string; short: string; hero: string; support: string; start: string }> = { en: { label: "English", short: "English", hero: "Start with your concern. Find the next clear step.", support: "PxK helps patients turn health concerns into a clear next step — from structured screening to an appropriate clinical conversation and continued monitoring.", start: "Start a check-in" }, kn: { label: "ಕನ್ನಡ", short: "ಕನ್ನಡ", hero: "ನಿಮ್ಮ ಕಾಳಜಿಯಿಂದ ಸ್ಪಷ್ಟವಾದ ಮುಂದಿನ ಹಂತಕ್ಕೆ.", support: "PxK ಆರೋಗ್ಯದ ಕಾಳಜಿಯನ್ನು ರಚನಾತ್ಮಕ ಸ್ಕ್ರೀನಿಂಗ್ ಮತ್ತು ಸೂಕ್ತ ಕ್ಲಿನಿಕಲ್ ಸಂಭಾಷಣೆಯ ಮುಂದಿನ ಹಂತವಾಗಿ ರೂಪಿಸಲು ಸಹಾಯ ಮಾಡುತ್ತದೆ.", start: "ಚೆಕ್-ಇನ್ ಪ್ರಾರಂಭಿಸಿ" }, tulu: { label: "Tulu", short: "Tulu", hero: "Start with your concern. Find the next clear step.", support: "Tulu interface copy is awaiting verified clinical language review. English source copy is shown to avoid inventing medical wording.", start: "Start with English source" }, kok: { label: "कोंकणी", short: "कोंकणी", hero: "Start with your concern. Find the next clear step.", support: "Konkani interface copy is awaiting verified clinical language review. English source copy is shown to avoid inventing medical wording.", start: "Start with English source" } };

function humanDate() { return new Intl.DateTimeFormat("en-IN", { day: "2-digit", month: "short", year: "numeric" }).format(new Date()); }
function priorityFor(scenario: ScenarioId, answers: Record<string, string>) { const red = scenario === "respiratory" ? answers.coughType === "Blood" || answers.mucus === "Blood-stained" || answers.breathing === "At rest" || answers.breathing === "All the time" || answers.other === "Chest pain" : scenario === "digestive" ? answers.severity === "Very severe — unbearable" || answers.blood !== "No blood noticed" && answers.blood !== "Not sure" || answers.fluid === "I cannot keep food or water down" || answers.care === "I need urgent medical attention" : answers.swelling === "Yes" && answers.pus === "Yes" || answers.loose === "Yes" && answers.bleeding === "Yes" || answers.main === "Ulcer" && answers.duration === "More than 1 month"; return red; }
export function makeScreeningRecord(scenarioId: ScenarioId, answers: Record<string, string>): ScreeningRecord { const scenario = SCENARIOS[scenarioId]; const decision = evaluateRoute(scenarioId, answers); const date = humanDate(); const main = answers.main || "Patient-reported concern"; const history = scenarioId === "respiratory" ? `${answers.duration || "Time frame not recorded"}. ${answers.lungHistory || "No lung history recorded"} selected.` : scenarioId === "digestive" ? `${answers.location || "Location not recorded"}. ${answers.duration || "Time frame not recorded"}.` : `${answers.jaw || "Jaw not recorded"} jaw, ${answers.region || "region not recorded"} region. ${answers.duration || "Time frame not recorded"}.`; return { id: `PXK-${Date.now().toString().slice(-6)}`, scenarioId, scenario: scenario.label, answers, startedAt: date, completedAt: date, symptom: main, duration: answers.duration || "Not recorded", condition: answers.history || answers.lungHistory || answers.treatment || "Not recorded", chiefComplaint: main, relevantHistory: history, potentialSpecialty: decision.potentialSpecialty, nextStep: decision.nextStep, status: decision.status, cue: decision.summary, carePreference: answers.care || "In-person consultation", decisionSupport: decision }; }

const HISTORY_KEY = "pxk-screening-history";
export function getScreeningHistory(): ScreeningRecord[] { if (typeof window === "undefined") return SEED_HISTORY; try { const saved = window.localStorage.getItem(HISTORY_KEY); const records = saved ? JSON.parse(saved) : null; return Array.isArray(records) && records.length ? records : SEED_HISTORY; } catch { return SEED_HISTORY; } }
export function saveScreeningRecord(record: ScreeningRecord) { const next = [record, ...getScreeningHistory()].slice(0, 20); if (typeof window !== "undefined") window.localStorage.setItem(HISTORY_KEY, JSON.stringify(next)); return next; }
export function getDecisionForRecord(record: ScreeningRecord): RouteDecision { return record.decisionSupport || evaluateRoute(record.scenarioId, record.answers); }
export function resetDemoHistory() { if (typeof window !== "undefined") window.localStorage.removeItem(HISTORY_KEY); }
export function loadSession(): ScreeningSession { return getScreeningHistory()[0] || DEFAULT_SESSION; }
