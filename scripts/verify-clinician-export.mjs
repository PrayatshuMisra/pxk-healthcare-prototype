import { writeFileSync } from "node:fs";
import { makeScreeningRecord } from "../client/src/data/mockData.ts";
import { buildClinicianPdf } from "../client/src/lib/clinicianPdf.ts";

const record = makeScreeningRecord("respiratory", { main: "Cough", fever: "No", coughType: "Dry", mucus: "Clear", breathing: "On exertion", trigger: "Dust/smoke", wheezing: "No", duration: "1–4 weeks", other: "None", episodes: "Never", lungHistory: "No", tobacco: "No" });
const buffer = buildClinicianPdf(record).output("arraybuffer");
writeFileSync("/tmp/pxk-clinician-export-test.pdf", Buffer.from(buffer));
