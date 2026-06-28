import { createDb, applicationsTable, insertApplicationSchema } from "@workspace/db";
import { desc } from "drizzle-orm";

interface Env {
  DATABASE_URL: string;
  TELEGRAM_BOT_TOKEN?: string;
  TELEGRAM_CHAT_ID?: string;
  ASSETS: { fetch: (request: Request) => Promise<Response> };
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);

    // Handle API requests
    if (url.pathname.startsWith("/api/")) {
      return handleApiRequest(request, env);
    }

    // Fallback to static assets
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

      // We need to initialize DB with the env.DATABASE_URL
      // Since the workspace db might be using node-postgres, we might need a worker-compatible driver
      const db = createDb(env.DATABASE_URL);
      
      const [application] = await db
        .insert(applicationsTable)
        .values({ ...result.data, ipAddress: ip, userAgent: ua })
        .returning();

      // Telegram notification
      if (env.TELEGRAM_BOT_TOKEN && env.TELEGRAM_CHAT_ID) {
        const message = `
<b>New Application Received!</b> ☀️
<b>Name:</b> ${application.fullName}
<b>Email:</b> ${application.email}
<b>Handle:</b> ${application.handle}
<b>Story:</b> ${application.story}
<b>IP:</b> ${application.ipAddress || "N/A"}
        `.trim();

        await fetch(`https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: env.TELEGRAM_CHAT_ID,
            text: message,
            parse_mode: "HTML",
          }),
        });
      }

      return Response.json({ success: true, id: application.id }, { status: 201 });
    } catch (err: any) {
      return Response.json({ error: err.message }, { status: 500 });
    }
  }

  // GET /api/applications
  if (url.pathname === "/api/applications" && request.method === "GET") {
    try {
      const db = createDb(env.DATABASE_URL);
      const applications = await db
        .select()
        .from(applicationsTable)
        .orderBy(desc(applicationsTable.createdAt));
      return Response.json(applications);
    } catch (err: any) {
      return Response.json({ error: err.message }, { status: 500 });
    }
  }

  return Response.json({ error: "Not Found" }, { status: 404 });
}
