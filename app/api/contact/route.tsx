import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

// --- utils ---
function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

async function verifyTurnstile(token: string, ip?: string | null) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return { success: true }; // skip if not configured
  const body = new URLSearchParams({ secret, response: token });
  if (ip) body.set("remoteip", ip);
  const r = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    body,
  });
  return (await r.json()) as { success: boolean; ["error-codes"]?: string[] };
}

export async function POST(req: Request) {
  let payload: any = {};
  try { payload = await req.json(); } catch {}

  const name = String(payload.name || "").trim();
  const email = String(payload.email || "").trim();
  const message = String(payload.message || "").trim();
  const website = String(payload.website || "");               // honeypot
  const turnstileToken = String(payload.turnstileToken || ""); // Turnstile token
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? null;

  if (website) return NextResponse.json({ ok: true }); // bot trap

  if (!name || !email || !message) {
    return NextResponse.json({ ok: false, error: "Missing fields" }, { status: 400 });
  }

  const t = await verifyTurnstile(turnstileToken, ip);
  if (!t.success) {
    return NextResponse.json(
      { ok: false, error: "CAPTCHA verification failed", details: t["error-codes"] || [] },
      { status: 400 }
    );
  }

  // sanitize for HTML
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeMsgHtml = escapeHtml(message).replace(/\n/g, "<br/>");

  // branding / addresses
  const FROM = "Website Consulting Australia <contact@websiteconsultingaustralia.com.au>";
  const TO_ADMIN = "hello@websiteconsultingaustralia.com.au";
  const YEAR = new Date().getFullYear();

  // --- 1) Admin notification (authoritative) ---
  let adminSent = false;
  try {
    await resend.emails.send({
      from: FROM,
      to: TO_ADMIN,
      subject: `New enquiry — ${safeName}`,
      replyTo: safeEmail, // 👈 replies go to the sender
      text:
        `New enquiry from ${name} <${email}>\n\n${message}\n\nIP: ${ip ?? "n/a"}`,
      html: `
        <table width="100%" cellpadding="0" cellspacing="0" style="font-family:Inter,Arial,sans-serif;color:#0f172a;">
          <tr>
            <td style="padding:24px;max-width:640px;margin:0 auto;">
              <h2 style="font-size:20px;font-weight:600;margin:0 0 12px;">New enquiry</h2>
              <p style="margin:0 0 8px;"><strong>Name:</strong> ${safeName}</p>
              <p style="margin:0 0 8px;"><strong>Email:</strong> ${safeEmail}</p>
              <p style="margin:16px 0 8px;"><strong>Message:</strong></p>
              <blockquote style="margin:0;padding:12px 16px;background:#f8fafc;border-left:4px solid #2563eb;border-radius:6px;">
                ${safeMsgHtml}
              </blockquote>
              <p style="margin:16px 0 0;font-size:12px;color:#64748b;">IP: ${ip ?? "n/a"}</p>
              <p style="margin:24px 0 0;font-size:12px;color:#94a3b8;">© ${YEAR} Website Consulting Australia</p>
            </td>
          </tr>
        </table>
      `,
    });
    adminSent = true;
  } catch (err: any) {
    return NextResponse.json(
      { ok: false, error: err?.message || "Failed to send admin notification" },
      { status: 500 }
    );
  }

  // --- 2) User confirmation (best-effort, non-blocking) ---
  let confirmSent = false;
  try {
    await resend.emails.send({
      from: FROM,
      to: email,
      replyTo: TO_ADMIN, // 👈 user replies go to your main inbox
      subject: "We received your message — Website Consulting Australia",
      text:
        `Hi ${name},\n\n` +
        `Thanks for getting in touch — we’ve received your message and will reply shortly.\n\n` +
        `— Website Consulting Australia\n` +
        `https://www.websiteconsultingaustralia.com.au\n`,
      html: `
        <table width="100%" cellpadding="0" cellspacing="0" style="font-family:Inter,Arial,sans-serif;color:#0f172a;">
          <tr>
            <td style="padding:24px;max-width:640px;margin:0 auto;">
              <img src="https://www.websiteconsultingaustralia.com.au/logo-no-capt-blue.png" alt="Website Consulting Australia" style="max-width:180px;margin-bottom:16px;" />
              <h2 style="font-size:20px;font-weight:600;margin:0 0 12px;">Thanks for reaching out, ${safeName}!</h2>
              <p style="margin:0 0 12px;">We’ve received your message and will be in touch shortly.</p>
              <p style="margin:0 0 8px;">You sent:</p>
              <blockquote style="margin:0;padding:12px 16px;background:#f8fafc;border-left:4px solid #2563eb;border-radius:6px;">
                ${safeMsgHtml}
              </blockquote>
              <p style="margin:16px 0 0;">In the meantime, you can:</p>
              <ul style="margin:8px 0 0 18px;padding:0;">
                <li><a href="https://www.websiteconsultingaustralia.com.au/services" style="color:#2563eb;">Browse our services</a></li>
                <li><a href="https://www.websiteconsultingaustralia.com.au/privacy" style="color:#2563eb;">Read our privacy policy</a></li>
              </ul>
              <p style="margin:24px 0 0;font-size:12px;color:#94a3b8;">© ${YEAR} Website Consulting Australia</p>
            </td>
          </tr>
        </table>
      `,
    });
    confirmSent = true;
  } catch (err) {
    console.warn("Confirmation email failed:", err);
  }

  return NextResponse.json({ ok: true, adminSent, confirmSent });
}