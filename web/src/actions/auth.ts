"use server";

import bcrypt from "bcryptjs";
import { z } from "zod";
import { headers } from "next/headers";
import { dbConnect } from "@/lib/db";
import { User } from "@/lib/models/User";
import { verifyTurnstile } from "@/lib/turnstile";
import { rateLimit } from "@/lib/rate-limit";

const registerSchema = z.object({
  name: z.string().min(2).max(80),
  email: z.string().email(),
  password: z.string().min(8).max(128),
  phoneNumber: z
    .string()
    .regex(/^(\+?25)?(07[2389]\d{7})$/)
    .optional()
    .or(z.literal("")),
  turnstileToken: z.string().optional(),
});

export type RegisterResult = { ok: true } | { ok: false; error: string };

export async function registerUser(input: unknown): Promise<RegisterResult> {
  const parsed = registerSchema.safeParse(input);
  if (!parsed.success) return { ok: false, error: "invalid" };

  const h = await headers();
  const ip = h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || "unknown";

  if (!rateLimit(`register:${ip}`, 5, 60 * 60 * 1000).ok) {
    return { ok: false, error: "rate_limited" };
  }

  const turnstile = await verifyTurnstile(parsed.data.turnstileToken, ip);
  if (!turnstile.ok) return { ok: false, error: "bot_check_failed" };

  await dbConnect();
  const email = parsed.data.email.toLowerCase();
  const existing = await User.findOne({ email });
  if (existing) return { ok: false, error: "email_taken" };

  const hash = await bcrypt.hash(parsed.data.password, 10);
  await User.create({
    name: parsed.data.name,
    email,
    password: hash,
    phoneNumber: parsed.data.phoneNumber || undefined,
    role: "user",
    active: true,
  });
  return { ok: true };
}
