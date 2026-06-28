import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { desc } from "drizzle-orm";

// Inline schema to avoid resolution issues and Node.js dependencies in @workspace/db
const applicationsTable = pgTable("applications", {
  id: serial("id").primaryKey(),
  fullName: text("full_name").notNull(),
  email: text("email").notNull(),
  handle: text("handle").notNull(),
  story: text("story").notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

const insertApplicationSchema = createInsertSchema(applicationsTable).omit({
  id: true,
  createdAt: true,
  ipAddress: true,
  userAgent: true,
});

interface Env {
  DATABASE_URL: string;
  TELEGRAM_BOT_TOKEN?: string;
  TELEGRAM_CHAT_ID?: string;
  ASSETS: Fetcher;
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);

    // Handle API requests
    if (url.pathname.startsWith("/api/")) {
      return handleApiRequest(request, env);
    }

    // Serve static assets via the ASSETS binding
    return env.ASSETS.fetch(request);
  },
};

async function handleApiRequest(request: Request, env: Env): Promise<Response> {
  const url = new URL(request.url);

  // GET /api/healthz
  if (url.pathname === "/api/healthz" && request.method === "GET") {
    return Response.json({ status: "ok" });
  }

  // POST /api/applications
  if (url.pathname === "/api/applications" && request.method === "POST") {
    try {
      const body = await request.json();
      const result = insertApplicationSchema.safeParse(body);

      if (!result.success) {
        return Response.json(
          { error: "Invalid submission", details: result.error.flatten() },
          { status: 400 }
        );
      }

      const ip = request.headers.get("cf-connecting-ip") || request.headers.get("x-forwarded-for") || null;
      const ua = request.headers.get("user-agent") || null;

      // Initialize DB with environment DATABASE_URL using postgres-js (Worker compatible)
      const client = postgres(env.DATABASE_URL);
      const db = drizzle(client);
      
      const [application] = await db
        .insert(applicationsTable)
        .values({ ...result.data, ipAddress: ip, userAgent: ua })
        .returning();

      // Telegram notification with environment variables
      if (env.TELEGRAM_BOT_TOKEN && env.TELEGRAM_CHAT_ID) {
        const message = `
<b>New Application Received!</b> ☀️
<b>Name:</b> ${application.fullName}
<b>Email:</b> ${application.email}
<b>Handle:</b> ${application.handle}
<b>Story:</b> ${application.story}
<b>IP:</b> ${application.ipAddress || "N/A"}
        `.trim();

        try {
          await fetch(`https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              chat_id: env.TELEGRAM_CHAT_ID,
              text: message,
              parse_mode: "HTML",
            }),
          });
        } catch (telegramErr) {
          console.error("Failed to send Telegram notification:", telegramErr);
          // Continue even if Telegram fails
        }
      }

      return Response.json({ success: true, id: application.id }, { status: 201 });
    } catch (err: any) {
      console.error("API error:", err);
      return Response.json({ error: err.message }, { status: 500 });
    }
  }

  // GET /api/applications
  if (url.pathname === "/api/applications" && request.method === "GET") {
    try {
      const client = postgres(env.DATABASE_URL);
      const db = drizzle(client);
      const applications = await db
        .select()
        .from(applicationsTable)
        .orderBy(desc(applicationsTable.createdAt));
      return Response.json(applications);
    } catch (err: any) {
      console.error("API error:", err);
      return Response.json({ error: err.message }, { status: 500 });
    }
  }

  return Response.json({ error: "Not Found" }, { status: 404 });
}
}
