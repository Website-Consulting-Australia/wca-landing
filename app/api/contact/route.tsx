// app/api/contact/route.ts
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

async function verifyTurnstile(token: string, ip?: string | null) {
  const secret = process.env.TURNSTILE_SECRET_KEY!;
  const body = new URLSearchParams({ secret, response: token });
  if (ip) body.set("remoteip", ip);
  const r = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    body,
  });
  return (await r.json()) as { success: boolean; "error-codes"?: string[] };
}

export async function POST(req: Request) {
  let payload: any = {};
  try { payload = await req.json(); } catch {}
  const name = String(payload.name || "").trim();
  const email = String(payload.email || "").trim();
  const message = String(payload.message || "").trim();
  const website = String(payload.website || ""); // honeypot
  const turnstileToken = String(payload.turnstileToken || "");

  if (website) return NextResponse.json({ ok: true }); // bot trap
  if (!name || !email || !message) {
    return NextResponse.json({ ok: false, error: "Missing fields" }, { status: 400 });
  }
  if (!turnstileToken) {
    return NextResponse.json({ ok: false, error: "CAPTCHA required" }, { status: 400 });
  }

  // try to get client IP (works on Vercel/Node 18+)
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? null;

  const check = await verifyTurnstile(turnstileToken, ip);
  if (!check.success) {
    return NextResponse.json(
      { ok: false, error: "CAPTCHA verification failed", details: check["error-codes"] || [] },
      { status: 400 }
    );
  }

  try {
    await resend.emails.send({
      from: "Website Consulting Australia <no-reply@websiteconsultingaustralia.com.au>",
      to: "hello@websiteconsultingaustralia.com.au",
      subject: `New enquiry from ${name}`,
      text: `From: ${name} <${email}>\n\n${message}`,
    });
    return NextResponse.json({ ok: true });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err?.message || "Email send failed" }, { status: 500 });
  }
}