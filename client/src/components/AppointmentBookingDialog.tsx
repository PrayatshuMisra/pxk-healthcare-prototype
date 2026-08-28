/** Community Wayfinding: local-demo bookings are non-persistent previews, while real account-backed records remain a separate capability. */
import { useAuth } from "@/_core/hooks/useAuth";
import { startLogin } from "@/const";
import { getDecisionForRecord, getScreeningHistory, SCENARIOS, type Doctor } from "@/data/mockData";
import { useDemoSession } from "@/hooks/useDemoSession";
import { trpc } from "@/lib/trpc";
import { CalendarCheck2, CheckCircle2, Clock3, LockKeyhole, Stethoscope } from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "wouter";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const slots = ["2026-08-30T10:00:00.000Z", "2026-08-30T14:30:00.000Z", "2026-08-31T09:30:00.000Z"];
const displaySlot = (date: string) => new Intl.DateTimeFormat("en-IN", { weekday: "short", day: "numeric", month: "short", hour: "numeric", minute: "2-digit", timeZone: "Asia/Kolkata" }).format(new Date(date));

export function AppointmentBookingDialog({ doctor, open, onOpenChange }: { doctor: Doctor | null; open: boolean; onOpenChange: (value: boolean) => void }) {
  const { isAuthenticated } = useAuth();
  const { isDemoSession } = useDemoSession();
  const [profile, setProfile] = useState({ displayName: "", ageYears: "", gender: "prefer_not_to_say" });
  const [slot, setSlot] = useState(slots[0]);
  const [note, setNote] = useState("");
  const [consented, setConsented] = useState(false);
  const [confirmation, setConfirmation] = useState<{ appointmentRef: string; localOnly: boolean } | null>(null);
  const latest = useMemo(() => getScreeningHistory()[0], []);
  const clinicianLedger = useMemo(() => {
    if (!latest) return [];
    const scenario = SCENARIOS[latest.scenarioId];
    const questions = scenario.questions.filter((item) => latest.answers[item.id]).map((item) => ({ question: item.question, answer: latest.answers[item.id] }));
    const decision = getDecisionForRecord(latest);
    return [{ question: "Patient-reported main concern", answer: latest.chiefComplaint }, ...questions, { question: "PxK Route Engine v0.1 — suggested route", answer: `${decision.potentialSpecialty} · ${decision.status}` }, { question: "PxK Route Engine v0.1 — rationale", answer: decision.summary }, ...decision.factors.map((factor) => ({ question: `Route factor (${factor.role}) · ${factor.label}`, answer: `${factor.answer}. ${factor.note}` }))];
  }, [latest]);
  const utils = trpc.useUtils();
  const booking = trpc.appointments.book.useMutation({ onSuccess: (value) => { setConfirmation({ appointmentRef: value.appointmentRef, localOnly: false }); utils.appointments.listMine.invalidate(); } });
  const reset = () => { setConfirmation(null); setConsented(false); setNote(""); };
  const submit = () => {
    if (!doctor || !consented) return;
    if (isDemoSession) { setConfirmation({ appointmentRef: `DEMO-${Date.now().toString(36).toUpperCase()}`, localOnly: true }); return; }
    if (!isAuthenticated) return;
    booking.mutate({ doctorId: doctor.id as "ananya-rao", scheduledAt: slot, screeningRecordId: latest?.id, patientNote: note || undefined, complaintLedger: clinicianLedger, consentAcknowledged: true, profile: { displayName: profile.displayName.trim(), ageYears: Number(profile.ageYears), gender: profile.gender as "woman" } });
  };
  const canBook = isDemoSession || isAuthenticated;
  const formValid = profile.displayName.trim().length >= 2 && Number(profile.ageYears) >= 0 && Number(profile.ageYears) <= 120 && consented && clinicianLedger.length > 0;

  return <Dialog open={open} onOpenChange={(value) => { if (!value) reset(); onOpenChange(value); }}><DialogContent className="appointment-dialog max-w-2xl border-[var(--line)] bg-[var(--paper)] p-0"><div className="p-6 sm:p-8">{confirmation && doctor ? <div className="booking-confirmation"><span className="confirmation-icon"><CheckCircle2 /></span><p className="eyebrow">{confirmation.localOnly ? "Booking preview ready · local demo" : "Appointment confirmed · prototype booking"}</p><DialogTitle className="mt-3 text-3xl font-bold tracking-[-0.055em] text-[var(--ink)]">{confirmation.localOnly ? "Your booking preview is ready." : "Your appointment route is set."}</DialogTitle><p>{confirmation.localOnly ? <>PxK has prepared a browser-local preview with <strong>{doctor.name}</strong> for <strong>{displaySlot(slot)}</strong>. Nothing was sent to a clinic, provider, or external account.</> : <>PxK has recorded a demonstration appointment with <strong>{doctor.name}</strong> for <strong>{displaySlot(slot)}</strong>.</>}</p><dl><div><dt>Reference</dt><dd>{confirmation.appointmentRef}</dd></div><div><dt>{confirmation.localOnly ? "Storage" : "Shared context"}</dt><dd>{confirmation.localOnly ? "Preview only · cleared when this browser session is reset" : "Basic profile + readable screening ledger + route rationale"}</dd></div></dl><div className="mt-7 flex flex-wrap gap-3"><Link className="btn btn-primary" href="/patient" onClick={() => onOpenChange(false)}>View my health</Link><button className="btn btn-outline" onClick={() => { reset(); onOpenChange(false); }}>Done</button></div></div> : <><DialogHeader><p className="eyebrow">Appointment request · PxK prototype</p><DialogTitle className="mt-2 text-3xl font-bold tracking-[-0.055em] text-[var(--ink)]">{doctor ? `Book with ${doctor.name}` : "Choose a clinician"}</DialogTitle><DialogDescription className="mt-2 text-sm leading-6 text-[var(--muted-ink)]">In local demo mode, this form creates a non-persistent booking preview only. It does not contact a clinician or create an account-backed appointment.</DialogDescription></DialogHeader>{!canBook ? <button className="login-booking" onClick={startLogin}><LockKeyhole /><span><strong>Start local demo mode to preview booking</strong><small>No external identity provider or patient account is used.</small></span></button> : doctor && <div className="booking-form"><div className="booking-doctor"><span className={`doctor-avatar doctor-avatar--${doctor.tone}`}>{doctor.initials}</span><div><strong>{doctor.name}</strong><span>{doctor.specialty} · {doctor.clinic}</span></div><Stethoscope /></div><div className="profile-fields"><label>Full name<input value={profile.displayName} onChange={(event) => setProfile({ ...profile, displayName: event.target.value })} placeholder="Sample name" maxLength={100} /></label><label>Age<input type="number" value={profile.ageYears} onChange={(event) => setProfile({ ...profile, ageYears: event.target.value })} placeholder="Years" min="0" max="120" /></label><label>Gender<select value={profile.gender} onChange={(event) => setProfile({ ...profile, gender: event.target.value })}><option value="prefer_not_to_say">Prefer not to say</option><option value="woman">Woman</option><option value="man">Man</option><option value="nonbinary">Nonbinary</option></select></label></div><fieldset className="slot-field"><legend><CalendarCheck2 />Choose an available prototype slot</legend><div>{slots.map((value) => <label key={value} className={slot === value ? "slot-choice slot-choice--active" : "slot-choice"}><input type="radio" name="slot" checked={slot === value} onChange={() => setSlot(value)} /><span><strong>{displaySlot(value)}</strong><small><Clock3 />30-minute consultation</small></span></label>)}</div></fieldset><label className="booking-note">Optional note for clinician review<textarea value={note} onChange={(event) => setNote(event.target.value)} maxLength={800} placeholder="Add optional sample context for the booking preview…" /></label>{latest && <div className="booking-ledger"><p className="eyebrow">Preview screening context</p><strong>{latest.chiefComplaint}</strong><span>{clinicianLedger.length} readable patient-reported items and the transparent route rationale are shown in this local preview only.</span></div>}<label className="booking-consent"><input type="checkbox" checked={consented} onChange={(event) => setConsented(event.target.checked)} /><span>I agree to use this sample profile and screening context only to create a local PxK booking preview.</span></label><button className="btn btn-primary w-full" disabled={!formValid || booking.isPending} onClick={submit}>{booking.isPending ? "Confirming appointment…" : isDemoSession ? "Confirm demo booking" : "Confirm appointment"}<CalendarCheck2 className="h-4 w-4" /></button>{booking.error && <p className="booking-error">The account-backed booking record could not be saved. Your typed profile information remains in this form.</p>}</div>}</>}</div></DialogContent></Dialog>;
}
