import { createDb, applicationsTable, insertApplicationSchema } from "@workspace/db";
import { desc } from "drizzle-orm";

interface Env {
  DATABASE_URL: string;
  TELEGRAM_BOT_TOKEN?: string;
  TELEGRAM_CHAT_ID?: string;
  __STATIC_CONTENT_MANIFEST?: string;
  __STATIC_CONTENT?: Record<string, string>;
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);

    // Handle API requests
    if (url.pathname.startsWith("/api/")) {
      return handleApiRequest(request, env);
    }

    // Fallback to static assets
    return handleAssets(request, env);
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

      // Initialize DB with environment DATABASE_URL
      const db = createDb(env.DATABASE_URL);
      
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
      const db = createDb(env.DATABASE_URL);
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

async function handleAssets(request: Request, env: Env): Promise<Response> {
  const url = new URL(request.url);
  const pathname = url.pathname;

  // Try to serve the requested asset
  const asset = env.__STATIC_CONTENT?.[pathname] || env.__STATIC_CONTENT?.[pathname + ".html"];
  
  if (asset) {
    const contentType = getContentType(pathname);
    return new Response(asset, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=3600",
      },
    });
  }

  // For SPA, serve index.html for non-existent routes
  const indexHtml = env.__STATIC_CONTENT?.["/index.html"];
  if (indexHtml && !pathname.includes(".")) {
    return new Response(indexHtml, {
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "public, max-age=3600",
      },
    });
  }

  // 404 fallback
  return Response.json({ error: "Not Found" }, { status: 404 });
}

function getContentType(pathname: string): string {
  if (pathname.endsWith(".html")) return "text/html; charset=utf-8";
  if (pathname.endsWith(".css")) return "text/css";
  if (pathname.endsWith(".js")) return "application/javascript";
  if (pathname.endsWith(".json")) return "application/json";
  if (pathname.endsWith(".svg")) return "image/svg+xml";
  if (pathname.endsWith(".png")) return "image/png";
  if (pathname.endsWith(".jpg") || pathname.endsWith(".jpeg")) return "image/jpeg";
  if (pathname.endsWith(".gif")) return "image/gif";
  if (pathname.endsWith(".webp")) return "image/webp";
  if (pathname.endsWith(".woff")) return "font/woff";
  if (pathname.endsWith(".woff2")) return "font/woff2";
  if (pathname.endsWith(".ttf")) return "font/ttf";
  return "application/octet-stream";
}
