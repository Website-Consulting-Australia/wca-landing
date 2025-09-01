"use client";
import { useState, useRef, useEffect } from "react";

export default function ContactModal() {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);

  // esc to close
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-40 rounded-full px-4 py-3 shadow-lg bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-haspopup="dialog"
        aria-expanded={open}
      >
        Contact us
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="contact-title"
          onClick={(e) => {
            if (e.target === e.currentTarget) setOpen(false);
          }}
        >
          <div
            ref={dialogRef}
            className="w-full max-w-lg rounded-xl bg-white dark:bg-neutral-900 shadow-xl"
          >
            <div className="flex items-center justify-between border-b border-gray-100 dark:border-neutral-800 px-5 py-4">
              <h2 id="contact-title" className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Send us a message
              </h2>
              <button
                onClick={() => setOpen(false)}
                className="p-2 -mr-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            <form
              className="px-5 py-4 space-y-4"
              onSubmit={async (e) => {
                e.preventDefault();
                const form = e.currentTarget as HTMLFormElement;
                const data = Object.fromEntries(new FormData(form) as any);
                // basic honeypot
                if ((data as any).website) return;
                const res = await fetch("/api/contact", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(data),
                });
                alert(res.ok ? "Thanks! We’ll be in touch." : "Sorry, something went wrong.");
                if (res.ok) {
                  form.reset();
                  setOpen(false);
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
                <textarea name="message" rows={5} required className="mt-1 w-full rounded border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-2" />
              </div>
              <button
                type="submit"
                className="w-full rounded bg-blue-600 text-white py-2.5 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Send
              </button>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                By submitting, you agree to our <a href="/privacy" className="underline">Privacy Policy</a>.
              </p>
            </form>
          </div>
        </div>
      )}
    </>
  );
}