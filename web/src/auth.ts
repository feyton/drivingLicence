import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import Nodemailer from "next-auth/providers/nodemailer";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import { randomInt } from "crypto";
import { mailTransport, verificationEmail } from "@/lib/email";
import bcrypt from "bcryptjs";
import { z } from "zod";
import client from "@/lib/mongoClient";
import { dbConnect } from "@/lib/db";
import { User } from "@/lib/models/User";

const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

const ADMIN_ROLES = ["editor", "admin", "super"];

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: MongoDBAdapter(client),
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
  providers: [
    Google({
      // The legacy app upserted Google users by email — keep those 357 accounts linkable.
      allowDangerousEmailAccountLinking: true,
    }),
    // Email sign-in via Mailjet: one provider, two ways in — the emailed magic
    // link, or the same 6-digit token typed as an OTP code on the login page.
    ...(process.env.MAILJET_API_KEY && process.env.MAILJET_SECRET_KEY
      ? [
          Nodemailer({
            id: "email",
            name: "Email",
            server: {},
            from: process.env.AUTH_EMAIL_FROM || "no-reply@feyton.co.rw",
            maxAge: 10 * 60, // codes are short-lived
            generateVerificationToken: () => randomInt(100000, 1000000).toString(),
            async sendVerificationRequest({ identifier, url, token, provider }) {
              const { host } = new URL(url);
              const { text, html } = verificationEmail({ url, code: token, host });
              await mailTransport().sendMail({
                to: identifier,
                from: provider.from,
                subject: `Kode yawe: ${token} — Injira`,
                text,
                html,
              });
            },
          }),
        ]
      : []),
    Credentials({
      credentials: { email: {}, password: {} },
      async authorize(raw) {
        const parsed = credentialsSchema.safeParse(raw);
        if (!parsed.success) return null;
        await dbConnect();
        const user = await User.findOne({ email: parsed.data.email.toLowerCase() }).select("+password");
        if (!user || !user.password || user.active === false) return null;
        const ok = await bcrypt.compare(parsed.data.password, user.password);
        if (!ok) return null;
        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          image: user.picture ?? null,
          role: user.role ?? "user",
        };
      },
    }),
  ],
  callbacks: {
    authorized({ request, auth }) {
      const path = request.nextUrl.pathname;
      const isProtected = ["/practice", "/exam", "/results", "/profile", "/admin", "/coach"].some((p) =>
        path.startsWith(p)
      );
      if (!isProtected) return true;
      if (!auth?.user) return false;
      if (path.startsWith("/admin")) return ADMIN_ROLES.includes(auth.user.role ?? "");
      return true;
    },
    async signIn({ user }) {
      if (!user?.email) return false;
      await dbConnect();
      const existing = await User.findOne({ email: user.email.toLowerCase() });
      if (existing?.active === false) return false;
      return true;
    },
    async jwt({ token, user, trigger }) {
      if (user) {
        // First sign-in this session: sync with our users collection (role, picture, lastLogin).
        await dbConnect();
        const doc = await User.findOneAndUpdate(
          { email: (user.email ?? "").toLowerCase() },
          {
            $set: { lastLogin: new Date() },
            $setOnInsert: { name: user.name ?? user.email, role: "user", active: true },
          },
          { upsert: true, new: true }
        );
        // Users created by the NextAuth adapter (Google) bypass mongoose defaults.
        if (!doc.role) {
          doc.role = "user";
          if (doc.active === undefined || doc.active === null) doc.active = true;
          await doc.save();
        }
        token.userId = doc._id.toString();
        token.role = doc.role ?? "user";
        token.picture = doc.picture ?? user.image ?? undefined;
      } else if (trigger === "update" || !token.role) {
        await dbConnect();
        const doc = await User.findById(token.userId);
        if (doc) token.role = doc.role ?? "user";
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = (token.userId as string) ?? "";
        session.user.role = (token.role as string) ?? "user";
      }
      return session;
    },
  },
});
