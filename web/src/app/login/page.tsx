"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { GoogleIcon } from "@/components/google-icon";

function LoginForm() {
  const t = useTranslations("auth");
  const router = useRouter();
  const params = useSearchParams();
  const callbackUrl = params.get("callbackUrl") ?? "/practice";

  const [busy, setBusy] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otpEmail, setOtpEmail] = useState("");
  const [otpStage, setOtpStage] = useState<"request" | "verify">("request");
  const [code, setCode] = useState("");

  async function handleCredentials(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    const res = await signIn("credentials", { email, password, redirect: false });
    setBusy(false);
    if (res?.error) toast.error(t("errors.bad_credentials"));
    else {
      router.push(callbackUrl);
      router.refresh();
    }
  }

  async function handleOtpRequest(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    const res = await signIn("email", { email: otpEmail, redirect: false, callbackUrl });
    setBusy(false);
    if (res?.error) toast.error(t("errors.invalid"));
    else {
      setOtpStage("verify");
      toast.success(t("codeSent"));
    }
  }

  function handleOtpVerify(e: React.FormEvent) {
    e.preventDefault();
    // The emailed 6-digit code IS the verification token — the same endpoint
    // the magic link points at accepts it typed in.
    const url = new URL("/api/auth/callback/email", window.location.origin);
    url.searchParams.set("email", otpEmail);
    url.searchParams.set("token", code.trim());
    url.searchParams.set("callbackUrl", callbackUrl);
    window.location.href = url.toString();
  }

  return (
    <div className="mx-auto flex max-w-md flex-col gap-4 px-4 py-12">
      <Card>
        <CardHeader>
          <CardTitle className="font-heading text-2xl">{t("signInTitle")}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button variant="outline" className="w-full" disabled={busy} onClick={() => signIn("google", { callbackUrl })}>
            <GoogleIcon />
            {t("google")}
          </Button>

          <Separator />

          <form onSubmit={handleCredentials} className="space-y-3">
            <div className="space-y-1.5">
              <Label htmlFor="email">{t("email")}</Label>
              <Input id="email" type="email" required autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="password">{t("password")}</Label>
              <Input id="password" type="password" required autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <Button type="submit" className="w-full" disabled={busy}>
              {t("signInTitle")}
            </Button>
          </form>

          <Separator />

          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">{t("orEmailCode")}</p>
            {otpStage === "request" ? (
              <form onSubmit={handleOtpRequest} className="flex gap-2">
                <Input type="email" required placeholder={t("email")} value={otpEmail} onChange={(e) => setOtpEmail(e.target.value)} />
                <Button type="submit" variant="secondary" disabled={busy}>
                  {t("sendCode")}
                </Button>
              </form>
            ) : (
              <form onSubmit={handleOtpVerify} className="space-y-2">
                <p className="text-sm text-muted-foreground">{t("codeSent")}</p>
                <div className="flex gap-2">
                  <Input
                    inputMode="numeric"
                    pattern="[0-9]{6}"
                    maxLength={6}
                    required
                    placeholder={t("enterCode")}
                    className="text-center text-lg tracking-[0.4em]"
                    value={code}
                    onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
                  />
                  <Button type="submit" disabled={busy || code.length !== 6}>
                    {t("verify")}
                  </Button>
                </div>
              </form>
            )}
          </div>
        </CardContent>
      </Card>
      <p className="text-center text-sm text-muted-foreground">
        {t("noAccount")}{" "}
        <Link className="font-medium text-primary underline-offset-4 hover:underline" href="/register">
          {t("registerTitle")}
        </Link>
      </p>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
