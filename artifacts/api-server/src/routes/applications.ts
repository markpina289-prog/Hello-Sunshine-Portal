import { Router, type IRouter } from "express";
import { db, applicationsTable } from "@workspace/db";
import { insertApplicationSchema } from "@workspace/db";
import { desc } from "drizzle-orm";
import { sendTelegramNotification } from "../lib/telegram";

const router: IRouter = Router();

router.post("/applications", async (req, res) => {
  const result = insertApplicationSchema.safeParse(req.body);

  if (!result.success) {
    res.status(400).json({ error: "Invalid submission", details: result.error.flatten() });
    return;
  }

  const ip = (req.headers["x-forwarded-for"] as string)?.split(",")[0]?.trim() ?? req.socket.remoteAddress ?? null;
  const ua = req.headers["user-agent"] ?? null;

  const [application] = await db
    .insert(applicationsTable)
    .values({ ...result.data, ipAddress: ip, userAgent: ua })
    .returning();

  // Send Telegram notification
  const message = `
<b>New Application Received!</b> ☀️
<b>Name:</b> ${application.fullName}
<b>Email:</b> ${application.email}
<b>Handle:</b> ${application.handle}
<b>Story:</b> ${application.story}
<b>IP:</b> ${application.ipAddress || "N/A"}
  `.trim();

  sendTelegramNotification(message).catch((err) => {
    // We don't want to fail the request if notification fails
    console.error("Telegram notification error:", err);
  });

  res.status(201).json({ success: true, id: application.id });
});

router.get("/applications", async (_req, res) => {
  const applications = await db
    .select()
    .from(applicationsTable)
    .orderBy(desc(applicationsTable.createdAt));

  res.json(applications);
});

export default router;
