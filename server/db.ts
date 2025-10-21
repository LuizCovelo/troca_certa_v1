import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, vehicles, maintenanceHistory, maintenanceReminders, notificationsLog } from "../drizzle/schema";
import type { InsertVehicle, InsertMaintenanceRecord, InsertNotificationLog } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.id) {
    throw new Error("User ID is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      id: user.id,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role === undefined) {
      if (user.id === ENV.ownerId) {
        user.role = 'admin';
        values.role = 'admin';
        updateSet.role = 'admin';
      }
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUser(id: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.id, id)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

export async function getUserByEmail(email: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(users).where(eq(users.email, email)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function updateUser(id: string, data: Partial<InsertUser>) {
  const db = await getDb();
  if (!db) return undefined;
  await db.update(users).set(data).where(eq(users.id, id));
  return getUser(id);
}

// Vehicle queries
export async function getUserVehicles(userId: string) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(vehicles).where(eq(vehicles.userId, userId));
}

export async function getVehicleById(vehicleId: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(vehicles).where(eq(vehicles.id, vehicleId)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function createVehicle(data: InsertVehicle) {
  const db = await getDb();
  if (!db) return undefined;
  await db.insert(vehicles).values(data);
  return data;
}

// Maintenance history queries
export async function getVehicleMaintenanceHistory(vehicleId: string) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(maintenanceHistory).where(eq(maintenanceHistory.vehicleId, vehicleId));
}

export async function createMaintenanceRecord(data: InsertMaintenanceRecord) {
  const db = await getDb();
  if (!db) return undefined;
  await db.insert(maintenanceHistory).values(data);
  return data;
}

// Maintenance reminders queries
export async function getVehicleReminders(vehicleId: string) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(maintenanceReminders).where(eq(maintenanceReminders.vehicleId, vehicleId));
}

export async function getPendingReminders() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(maintenanceReminders).where(eq(maintenanceReminders.status, "pending"));
}

// Subscription queries
export async function getUserSubscription(userId: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(users).where(eq(users.id, userId)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

// Notifications log
export async function logNotification(data: InsertNotificationLog) {
  const db = await getDb();
  if (!db) return undefined;
  await db.insert(notificationsLog).values(data);
  return data;
}
