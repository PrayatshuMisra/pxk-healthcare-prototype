/** Community Wayfinding: every guided screening route has the 15 questions promised by the intake workflow. */
import { describe, expect, it } from "vitest";
import { SCENARIOS } from "./mockData";
import { MEDICAL_HELP } from "./medicalHelp";
describe("PxK questionnaires", () => { it("provides 15 structured questions for every focused route", () => { Object.values(SCENARIOS).forEach((scenario) => { expect(scenario.questions).toHaveLength(15); }); }); });
describe("PxK term guidance", () => { it("provides a non-diagnostic tooltip definition for every referenced complex term", () => { Object.values(SCENARIOS).flatMap((scenario) => scenario.questions).filter((question) => Boolean(question.helpTerm)).forEach((question) => { expect(MEDICAL_HELP[question.helpTerm!]?.en.meaning).toBeTruthy(); }); }); });
