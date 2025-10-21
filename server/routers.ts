import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router, protectedProcedure } from "./_core/trpc";
import { z } from "zod";
import { v4 as uuid } from "uuid";
import * as db from "./db";

// Vehicle router
const vehicleRouter = router({
  list: protectedProcedure.query(async ({ ctx }) => {
    return db.getUserVehicles(ctx.user.id);
  }),

  get: protectedProcedure.input(z.object({ id: z.string() })).query(async ({ input }) => {
    return db.getVehicleById(input.id);
  }),

  create: protectedProcedure
    .input(
      z.object({
        brand: z.string(),
        model: z.string(),
        year: z.number(),
        licensePlate: z.string().optional(),
        currentKm: z.number(),
        color: z.string().optional(),
        fuelType: z.enum(["gasoline", "diesel", "ethanol", "hybrid", "electric"]),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const vehicleId = uuid();
      return db.createVehicle({
        id: vehicleId,
        userId: ctx.user.id,
        ...input,
      });
    }),

  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        currentKm: z.number().optional(),
        color: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      // Update vehicle logic here
      return { success: true };
    }),
});

// Maintenance router
const maintenanceRouter = router({
  history: protectedProcedure
    .input(z.object({ vehicleId: z.string() }))
    .query(async ({ input }) => {
      return db.getVehicleMaintenanceHistory(input.vehicleId);
    }),

  reminders: protectedProcedure
    .input(z.object({ vehicleId: z.string() }))
    .query(async ({ input }) => {
      return db.getVehicleReminders(input.vehicleId);
    }),

  addRecord: protectedProcedure
    .input(
      z.object({
        vehicleId: z.string(),
        maintenanceTypeId: z.string(),
        kmAtMaintenance: z.number(),
        datePerformed: z.date(),
        cost: z.string().optional(),
        notes: z.string().optional(),
        mechanic: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const recordId = uuid();
      return db.createMaintenanceRecord({
        id: recordId,
        ...input,
        datePerformed: input.datePerformed,
      });
    }),
});

// Subscription router
const subscriptionRouter = router({
  current: protectedProcedure.query(async ({ ctx }) => {
    return db.getUserSubscription(ctx.user.id);
  }),

  upgrade: protectedProcedure
    .input(z.object({ plan: z.string() }))
    .mutation(async ({ ctx, input }) => {
      // Stripe integration will be added here
      return { success: true, message: "Upgrade initiated" };
    }),

  cancel: protectedProcedure.mutation(async ({ ctx }) => {
    // Stripe cancellation logic
    return { success: true, message: "Subscription canceled" };
  }),
});

// Admin router
const adminRouter = router({
  users: protectedProcedure.query(async ({ ctx }) => {
    if (ctx.user.role !== "admin") {
      throw new Error("Unauthorized");
    }
    // Return all users
    return [];
  }),

  reports: protectedProcedure.query(async ({ ctx }) => {
    if (ctx.user.role !== "admin") {
      throw new Error("Unauthorized");
    }
    // Return all reports
    return [];
  }),
});

// Mechanic router
const mechanicRouter = router({
  clients: protectedProcedure.query(async ({ ctx }) => {
    if (ctx.user.role !== "mechanic" && ctx.user.role !== "company") {
      throw new Error("Unauthorized");
    }
    // Return mechanic's clients
    return [];
  }),

  addClient: protectedProcedure
    .input(
      z.object({
        clientName: z.string(),
        clientEmail: z.string().email(),
        clientPhone: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      if (ctx.user.role !== "mechanic" && ctx.user.role !== "company") {
        throw new Error("Unauthorized");
      }
      // Add client logic
      return { success: true };
    }),
});

// Notifications router
const notificationsRouter = router({
  sendReminder: protectedProcedure
    .input(
      z.object({
        vehicleId: z.string(),
        maintenanceTypeId: z.string(),
        method: z.enum(["email", "whatsapp", "sms"]),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const logId = uuid();
      await db.logNotification({
        id: logId,
        userId: ctx.user.id,
        vehicleId: input.vehicleId,
        maintenanceTypeId: input.maintenanceTypeId,
        type: input.method,
        status: "pending",
      });
      // SendGrid/Twilio integration will be added here
      return { success: true, logId };
    }),

  logs: protectedProcedure.query(async ({ ctx }) => {
    // Return notification logs for user
    return [];
  }),
});

// Reports router
const reportsRouter = router({
  generate: protectedProcedure
    .input(
      z.object({
        vehicleId: z.string().optional(),
        reportType: z.enum(["monthly", "annual", "custom"]),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // PDF generation logic with S3 storage
      return { success: true, url: "https://example.com/report.pdf" };
    }),

  list: protectedProcedure.query(async ({ ctx }) => {
    // Return user's reports
    return [];
  }),
});

export const appRouter = router({
  system: systemRouter,

  auth: router({
    me: publicProcedure.query((opts) => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  vehicles: vehicleRouter,
  maintenance: maintenanceRouter,
  subscription: subscriptionRouter,
  admin: adminRouter,
  mechanic: mechanicRouter,
  notifications: notificationsRouter,
  reports: reportsRouter,
});

export type AppRouter = typeof appRouter;

