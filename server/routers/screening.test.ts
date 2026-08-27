/** Community Wayfinding: saved drafts are always delegated with the authenticated user identifier, never a client-provided account id. */
import { beforeEach, describe, expect, it, vi } from "vitest";
import type { TrpcContext } from "../_core/context";
const screeningDb = vi.hoisted(() => ({ saveScreeningRecord: vi.fn(), listScreeningRecords: vi.fn(), discardScreeningRecord: vi.fn() }));
vi.mock("../screeningDb", () => screeningDb);
import { appRouter } from "../routers";

const user = { id: 77, openId: "pxk-test-user", name: "PxK Test", email: "test@example.com", loginMethod: "test", role: "user" as const, createdAt: new Date(), updatedAt: new Date(), lastSignedIn: new Date() };
const context = { user, req: { protocol: "https", headers: {} }, res: { clearCookie: vi.fn() } } as unknown as TrpcContext;
const input = { scenarioId: "respiratory" as const, language: "en" as const, status: "draft" as const, answers: { main: "Cough" }, currentStep: 2, consentVersion: "demo-consent-v1" };
beforeEach(() => { vi.clearAllMocks(); screeningDb.saveScreeningRecord.mockResolvedValue({ id: 1, publicId: "saved-route" }); screeningDb.listScreeningRecords.mockResolvedValue([]); screeningDb.discardScreeningRecord.mockResolvedValue({ success: true }); });
describe("PxK saved screening procedures", () => { it("saves a consented draft under the authenticated account", async () => { const caller = appRouter.createCaller(context); await caller.screening.saveDraft(input); expect(screeningDb.saveScreeningRecord).toHaveBeenCalledWith(expect.objectContaining({ userId: 77, scenarioId: "respiratory", currentStep: 2, consentVersion: "demo-consent-v1" })); }); it("lists and discards only the signed-in user’s own drafts", async () => { const caller = appRouter.createCaller(context); await caller.screening.listDrafts(); await caller.screening.discard({ publicId: "saved-route" }); expect(screeningDb.listScreeningRecords).toHaveBeenCalledWith(77); expect(screeningDb.discardScreeningRecord).toHaveBeenCalledWith(77, "saved-route"); }); });
