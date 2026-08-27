import { index, int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/** User-owned, consented screening work-in-progress and completed route records. Answers are structured JSON, never file bytes. */
export const screeningRecords = mysqlTable("screeningRecords", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  publicId: varchar("publicId", { length: 36 }).notNull().unique(),
  status: mysqlEnum("status", ["draft", "completed", "discarded"]).notNull().default("draft"),
  scenarioId: mysqlEnum("scenarioId", ["respiratory", "digestive", "dental", "general"]).notNull(),
  language: mysqlEnum("language", ["en", "kn", "tulu", "kok"]).notNull().default("en"),
  concernText: text("concernText"),
  answersJson: text("answersJson").notNull(),
  currentStep: int("currentStep").notNull().default(0),
  consentVersion: varchar("consentVersion", { length: 24 }).notNull(),
  consentedAt: timestamp("consentedAt").notNull(),
  nlpSummary: text("nlpSummary"),
  nlpMatchedTermsJson: text("nlpMatchedTermsJson"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
}, (table) => [index("screeningRecords_user_status_idx").on(table.userId, table.status), index("screeningRecords_user_updated_idx").on(table.userId, table.updatedAt)]);

export type ScreeningRecordRow = typeof screeningRecords.$inferSelect;
export type InsertScreeningRecord = typeof screeningRecords.$inferInsert;

/** Minimal patient-entered profile used only for consented appointment coordination in this prototype. */
export const patientProfiles = mysqlTable("patientProfiles", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().unique(),
  displayName: varchar("displayName", { length: 100 }).notNull(),
  ageYears: int("ageYears").notNull(),
  gender: varchar("gender", { length: 32 }).notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
}, (table) => [index("patientProfiles_user_idx").on(table.userId)]);

/** User-owned appointment requests. Complaint context comes from the consented screening record, not a copied medical history. */
export const appointments = mysqlTable("appointments", {
  id: int("id").autoincrement().primaryKey(),
  appointmentRef: varchar("appointmentRef", { length: 32 }).notNull().unique(),
  userId: int("userId").notNull(),
  doctorId: varchar("doctorId", { length: 64 }).notNull(),
  scheduledAt: timestamp("scheduledAt").notNull(),
  status: mysqlEnum("status", ["confirmed", "cancelled", "completed"]).notNull().default("confirmed"),
  screeningRecordId: varchar("screeningRecordId", { length: 36 }),
  patientNote: text("patientNote"),
  complaintLedgerJson: text("complaintLedgerJson").notNull(),
  consentVersion: varchar("consentVersion", { length: 24 }).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
}, (table) => [index("appointments_user_status_idx").on(table.userId, table.status), index("appointments_doctor_slot_idx").on(table.doctorId, table.scheduledAt)]);

export type PatientProfileRow = typeof patientProfiles.$inferSelect;
export type AppointmentRow = typeof appointments.$inferSelect;
