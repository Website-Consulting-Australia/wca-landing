// components/ContactForm.tsx
"use client";

import { useState } from "react";

export default function ContactForm() {
  const [sending, setSending] = useState(false);
  const [ok, setOk] = useState<null | boolean>(null);
  const [error, setError] = useState<string | null>(null);

  return (
    <form
      className="space-y-4"
      onSubmit={async (e) => {
        e.preventDefault();
        setSending(true);
        setOk(null);
        setError(null);
        const fd = new FormData(e.currentTarget as HTMLFormElement);
        const payload = Object.fromEntries(fd.entries());

        // basic honeypot
        if ((payload as any).website) {
          setSending(false);
          setOk(true);
          (e.currentTarget as HTMLFormElement).reset();
          return;
        }

        try {
          const res = await fetch("/api/contact", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          });
          const j = await res.json().catch(() => ({}));
          if (!res.ok) throw new Error(j?.error || "Failed to send");
          setOk(true);
          (e.currentTarget as HTMLFormElement).reset();
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
          <input
            name="name"
            required
            className="mt-1 w-full rounded border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-600 dark:text-gray-300">Email</label>
          <input
            type="email"
            name="email"
            required
            className="mt-1 w-full rounded border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-2"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm text-gray-600 dark:text-gray-300">Message</label>
        <textarea
          name="message"
          rows={6}
          required
          className="mt-1 w-full rounded border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-2"
        />
      </div>

      <button
        disabled={sending}
        className="rounded bg-blue-600 text-white px-5 py-2.5 hover:bg-blue-700 disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {sending ? "Sending…" : "Send Message"}
      </button>

      <p className="text-xs text-gray-500 dark:text-gray-400">
        By submitting, you agree to our <a href="/privacy" className="underline">Privacy Policy</a>.
      </p>

      {ok === true && (
        <p className="text-sm text-green-600 mt-2">Thanks! We’ll be in touch shortly.</p>
      )}
      {ok === false && (
        <p className="text-sm text-red-600 mt-2">
          {error || "Sorry, something went wrong. Please try again."}
        </p>
      )}
    </form>
  );
}