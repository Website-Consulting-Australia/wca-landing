// components/ContactForm.tsx
"use client";

import { useEffect, useState } from "react";

export default function ContactForm() {
  const [sending, setSending] = useState(false);
  const [ok, setOk] = useState<null | boolean>(null);
  const [error, setError] = useState<string | null>(null);
  const [token, setToken] = useState<string>("");

  // expose the callback for data-callback below
  useEffect(() => {
    (window as any).onTurnstileSuccess = (t: string) => setToken(t);
    (window as any).onTurnstileExpire = () => setToken("");
  }, []);

  // load the Turnstile script once
  useEffect(() => {
    if (document.querySelector('script[data-turnstile]')) return;
    const s = document.createElement("script");
    s.src = "https://challenges.cloudflare.com/turnstile/v0/api.js";
    s.async = true;
    s.defer = true;
    s.setAttribute("data-turnstile", "true");
    document.body.appendChild(s);
  }, []);

  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || process.env.TURNSTILE_SITE_KEY;

  return (
    <form
      className="space-y-4"
      noValidate
      onSubmit={async (e) => {
        e.preventDefault();
        const form = e.currentTarget as HTMLFormElement;

        const fd = new FormData(form);
        const name = String(fd.get("name") || "").trim();
        const email = String(fd.get("email") || "").trim();
        const message = String(fd.get("message") || "").trim();
        const website = String(fd.get("website") || ""); // honeypot

        if (!name || !email || !message) {
          setOk(false); setError("Please fill in all fields."); return;
        }
        if (!token) {
          setOk(false); setError("Please complete the CAPTCHA."); return;
        }

        setSending(true); setOk(null); setError(null);

        try {
          const res = await fetch("/api/contact", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, message, website, turnstileToken: token }),
          });
          const j = await res.json().catch(() => ({}));
          if (!res.ok) throw new Error(j?.error || "Failed to send");
          setOk(true);
          form.reset();
          setToken(""); // token is single-use; force re-challenge
          // reset the widget
          (window as any).turnstile?.reset?.();
        } catch (err: any) {
          setOk(false);
          setError(err?.message || "Something went wrong");
        } finally {
          setSending(false);
        }
      }}
    >
      <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-gray-600 dark:text-gray-300">Name</label>
          <input name="name" required className="mt-1 w-full rounded border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm text-gray-600 dark:text-gray-300">Email</label>
          <input type="email" name="email" required className="mt-1 w-full rounded border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-2" />
        </div>
      </div>

      <div>
        <label className="block text-sm text-gray-600 dark:text-gray-300">Message</label>
        <textarea name="message" rows={6} required className="mt-1 w-full rounded border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-2" />
      </div>

      {/* Turnstile widget */}
      <div
        className="cf-turnstile"
        data-sitekey={siteKey}
        data-callback="onTurnstileSuccess"
        data-expired-callback="onTurnstileExpire"
        data-theme="auto"
      />

      <button
        disabled={sending}
        className="rounded bg-blue-600 text-white px-5 py-2.5 hover:bg-blue-700 disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {sending ? "Sending…" : "Send Message"}
      </button>

      <p className="text-xs text-gray-500 dark:text-gray-400">
        By submitting, you agree to our <a href="/privacy" className="underline">Privacy Policy</a>.
      </p>

      {ok === true && <p className="text-sm text-green-600 mt-2">Thanks! We’ll be in touch shortly.</p>}
      {ok === false && <p className="text-sm text-red-600 mt-2">{error || "Sorry, something went wrong. Please try again."}</p>}
    </form>
  );
}