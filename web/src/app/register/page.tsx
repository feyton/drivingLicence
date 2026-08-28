"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { registerUser } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { GoogleIcon } from "@/components/google-icon";
import { TurnstileWidget } from "@/components/turnstile-widget";

export default function RegisterPage() {
  const t = useTranslations("auth");
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState("");
  const [form, setForm] = useState({ name: "", email: "", password: "", phoneNumber: "" });

  function set(field: keyof typeof form) {
    return (e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, [field]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    const res = await registerUser({ ...form, turnstileToken });
    if (!res.ok) {
      setBusy(false);
      toast.error(t(`errors.${res.error}` as Parameters<typeof t>[0]));
      return;
    }
    // Registration done — sign them straight in.
    const login = await signIn("credentials", { email: form.email, password: form.password, redirect: false });
    setBusy(false);
    if (login?.error) {
      toast.success(t("errors.registered"));
      router.push("/login");
    } else {
      router.push("/practice");
      router.refresh();
    }
  }

  return (
    <div className="mx-auto flex max-w-md flex-col gap-4 px-4 py-12">
      <Card>
        <CardHeader>
          <CardTitle className="font-heading text-2xl">{t("registerTitle")}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button variant="outline" className="w-full" disabled={busy} onClick={() => signIn("google", { callbackUrl: "/practice" })}>
            <GoogleIcon />
            {t("google")}
          </Button>

          <Separator />

          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="space-y-1.5">
              <Label htmlFor="name">{t("name")}</Label>
              <Input id="name" required minLength={2} autoComplete="name" value={form.name} onChange={set("name")} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="email">{t("email")}</Label>
              <Input id="email" type="email" required autoComplete="email" value={form.email} onChange={set("email")} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="password">{t("password")}</Label>
              <Input id="password" type="password" required minLength={8} autoComplete="new-password" value={form.password} onChange={set("password")} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="phone">{t("phone")}</Label>
              <Input id="phone" type="tel" placeholder="078xxxxxxx" autoComplete="tel" value={form.phoneNumber} onChange={set("phoneNumber")} />
            </div>
            <TurnstileWidget onToken={setTurnstileToken} />
            <Button type="submit" className="w-full" disabled={busy}>
              {t("registerTitle")}
            </Button>
          </form>
        </CardContent>
      </Card>
      <p className="text-center text-sm text-muted-foreground">
        {t("haveAccount")}{" "}
        <Link className="font-medium text-primary underline-offset-4 hover:underline" href="/login">
          {t("signInTitle")}
        </Link>
      </p>
    </div>
  );
}
