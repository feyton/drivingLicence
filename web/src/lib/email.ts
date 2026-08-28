import { createTransport } from "nodemailer";

// Mailjet SMTP relay — same credentials already used by annotate.feyton.co.rw.
export function mailTransport() {
  return createTransport({
    host: "in-v3.mailjet.com",
    port: 587,
    auth: {
      user: process.env.MAILJET_API_KEY,
      pass: process.env.MAILJET_SECRET_KEY,
    },
  });
}

export function verificationEmail(params: { url: string; code: string; host: string }) {
  const { url, code, host } = params;
  const text = [
    `Injira kuri ${host}`,
    ``,
    `Kanda iyi link winjire ako kanya:`,
    url,
    ``,
    `Cyangwa wandike iyi kode kuri paji y'ukwinjira: ${code}`,
    ``,
    `Iyi kode izarangira mu minota 10. Niba utasabye kwinjira, wirengagize ubu butumwa.`,
  ].join("\n");

  const html = `
  <div style="font-family: Arial, Helvetica, sans-serif; max-width: 480px; margin: 0 auto; padding: 24px;">
    <h2 style="color: #14274A; margin-bottom: 4px;">Injira / Sign in</h2>
    <p style="color: #444;">Kanda buto ukurikira winjire kuri <strong>${host}</strong>:</p>
    <p style="text-align: center; margin: 28px 0;">
      <a href="${url}" style="background: #0077AF; color: #fff; text-decoration: none; padding: 12px 32px; border-radius: 8px; display: inline-block; font-weight: bold;">
        Injira / Sign in
      </a>
    </p>
    <p style="color: #444;">Cyangwa wandike iyi kode kuri paji y'ukwinjira / or type this code on the sign-in page:</p>
    <p style="text-align: center; font-size: 30px; letter-spacing: 8px; font-weight: bold; color: #14274A; margin: 16px 0;">${code}</p>
    <p style="color: #888; font-size: 13px;">Iyi kode izarangira mu minota 10 — expires in 10 minutes.<br/>
    Niba utasabye kwinjira, wirengagize ubu butumwa. / If you didn't request this, ignore this email.</p>
  </div>`;

  return { text, html };
}
