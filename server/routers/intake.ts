/** Community Wayfinding: protected natural-language intake returns an explainable questionnaire route rather than a diagnosis. */
import { z } from "zod";
import { classifyConcern } from "../nlp";
import { protectedProcedure, router } from "../_core/trpc";
const language = z.enum(["en", "kn", "tulu", "kok"]);
export const intakeRouter = router({ classify: protectedProcedure.input(z.object({ concern: z.string().trim().min(8).max(1200), language, consentAcknowledged: z.literal(true) })).mutation(({ input }) => classifyConcern(input.concern, input.language)) });
