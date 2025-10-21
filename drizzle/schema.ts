import { mysqlEnum, mysqlTable, text, timestamp, varchar, int, decimal, boolean, json } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  id: varchar("id", { length: 64 }).primaryKey(),
  name: text("name"),
  email: varchar("email", { length: 320 }).unique(),
  phone: varchar("phone", { length: 20 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin", "mechanic", "company"]).default("user").notNull(),
  plan: mysqlEnum("plan", ["free", "basic", "premium", "company", "mechanic_basic", "mechanic_pro"]).default("free").notNull(),
  stripeCustomerId: varchar("stripeCustomerId", { length: 255 }),
  stripeSubscriptionId: varchar("stripeSubscriptionId", { length: 255 }),
  subscriptionStatus: mysqlEnum("subscriptionStatus", ["active", "canceled", "past_due", "unpaid", "none"]).default("none"),
  notificationPreference: mysqlEnum("notificationPreference", ["email", "whatsapp", "both"]).default("both"),
  createdAt: timestamp("createdAt").defaultNow(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// Vehicles table
export const vehicles = mysqlTable("vehicles", {
  id: varchar("id", { length: 64 }).primaryKey(),
  userId: varchar("userId", { length: 64 }).notNull(),
  brand: varchar("brand", { length: 100 }).notNull(),
  model: varchar("model", { length: 100 }).notNull(),
  year: int("year").notNull(),
  licensePlate: varchar("licensePlate", { length: 20 }).unique(),
  currentKm: int("currentKm").notNull(),
  color: varchar("color", { length: 50 }),
  fuelType: mysqlEnum("fuelType", ["gasoline", "diesel", "ethanol", "hybrid", "electric"]).notNull(),
  imageUrl: text("imageUrl"),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow(),
});

export type Vehicle = typeof vehicles.$inferSelect;
export type InsertVehicle = typeof vehicles.$inferInsert;

// Maintenance types table
export const maintenanceTypes = mysqlTable("maintenanceTypes", {
  id: varchar("id", { length: 64 }).primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  description: text("description"),
  recommendedIntervalKm: int("recommendedIntervalKm"),
  recommendedIntervalDays: int("recommendedIntervalDays"),
  category: mysqlEnum("category", ["oil", "filter", "tire", "brake", "fluid", "inspection", "other"]).notNull(),
  createdAt: timestamp("createdAt").defaultNow(),
});

export type MaintenanceType = typeof maintenanceTypes.$inferSelect;
export type InsertMaintenanceType = typeof maintenanceTypes.$inferInsert;

// Maintenance history table
export const maintenanceHistory = mysqlTable("maintenanceHistory", {
  id: varchar("id", { length: 64 }).primaryKey(),
  vehicleId: varchar("vehicleId", { length: 64 }).notNull(),
  maintenanceTypeId: varchar("maintenanceTypeId", { length: 64 }).notNull(),
  kmAtMaintenance: int("kmAtMaintenance").notNull(),
  datePerformed: timestamp("datePerformed").notNull(),
  cost: decimal("cost", { precision: 10, scale: 2 }),
  notes: text("notes"),
  mechanic: varchar("mechanic", { length: 100 }),
  reminderSent: boolean("reminderSent").default(false),
  createdAt: timestamp("createdAt").defaultNow(),
});

export type MaintenanceRecord = typeof maintenanceHistory.$inferSelect;
export type InsertMaintenanceRecord = typeof maintenanceHistory.$inferInsert;

// Maintenance reminders table
export const maintenanceReminders = mysqlTable("maintenanceReminders", {
  id: varchar("id", { length: 64 }).primaryKey(),
  vehicleId: varchar("vehicleId", { length: 64 }).notNull(),
  maintenanceTypeId: varchar("maintenanceTypeId", { length: 64 }).notNull(),
  nextDueKm: int("nextDueKm"),
  nextDueDate: timestamp("nextDueDate"),
  status: mysqlEnum("status", ["pending", "sent", "completed", "snoozed"]).default("pending"),
  reminderSentAt: timestamp("reminderSentAt"),
  lastUpdated: timestamp("lastUpdated").defaultNow().onUpdateNow(),
});

export type MaintenanceReminder = typeof maintenanceReminders.$inferSelect;
export type InsertMaintenanceReminder = typeof maintenanceReminders.$inferInsert;

// Mechanic clients table (for mechanic users)
export const mechanicClients = mysqlTable("mechanicClients", {
  id: varchar("id", { length: 64 }).primaryKey(),
  mechanicId: varchar("mechanicId", { length: 64 }).notNull(),
  clientName: varchar("clientName", { length: 100 }).notNull(),
  clientEmail: varchar("clientEmail", { length: 320 }),
  clientPhone: varchar("clientPhone", { length: 20 }),
  vehicles: json("vehicles"),
  createdAt: timestamp("createdAt").defaultNow(),
});

export type MechanicClient = typeof mechanicClients.$inferSelect;
export type InsertMechanicClient = typeof mechanicClients.$inferInsert;

// Subscription plans table
export const subscriptionPlans = mysqlTable("subscriptionPlans", {
  id: varchar("id", { length: 64 }).primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  description: text("description"),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  currency: varchar("currency", { length: 3 }).default("BRL"),
  maxVehicles: int("maxVehicles").notNull(),
  stripePriceId: varchar("stripePriceId", { length: 255 }),
  features: json("features"),
  createdAt: timestamp("createdAt").defaultNow(),
});

export type SubscriptionPlan = typeof subscriptionPlans.$inferSelect;
export type InsertSubscriptionPlan = typeof subscriptionPlans.$inferInsert;

// Notifications log table
export const notificationsLog = mysqlTable("notificationsLog", {
  id: varchar("id", { length: 64 }).primaryKey(),
  userId: varchar("userId", { length: 64 }).notNull(),
  vehicleId: varchar("vehicleId", { length: 64 }),
  maintenanceTypeId: varchar("maintenanceTypeId", { length: 64 }),
  type: mysqlEnum("type", ["email", "whatsapp", "sms"]).notNull(),
  status: mysqlEnum("status", ["sent", "failed", "pending"]).default("pending"),
  message: text("message"),
  sentAt: timestamp("sentAt"),
  createdAt: timestamp("createdAt").defaultNow(),
});

export type NotificationLog = typeof notificationsLog.$inferSelect;
export type InsertNotificationLog = typeof notificationsLog.$inferInsert;

// Reports table
export const reports = mysqlTable("reports", {
  id: varchar("id", { length: 64 }).primaryKey(),
  userId: varchar("userId", { length: 64 }).notNull(),
  vehicleId: varchar("vehicleId", { length: 64 }),
  reportType: mysqlEnum("reportType", ["monthly", "annual", "custom"]).notNull(),
  fileUrl: text("fileUrl"),
  generatedAt: timestamp("generatedAt").defaultNow(),
  createdAt: timestamp("createdAt").defaultNow(),
});

export type Report = typeof reports.$inferSelect;
export type InsertReport = typeof reports.$inferInsert;
