"use client";

import { useEffect, useRef } from "react";

type Props = {
  siteKey: string;
  theme?: "light" | "dark" | "auto";
  size?: "normal" | "compact";
  invisible?: boolean;                // set true if you want invisible mode
  onVerify?: (token: string) => void; // called when token issued
  onExpired?: () => void;
};

export default function TurnstileWidget({
                                          siteKey,
                                          theme = "auto",
                                          size = "normal",
                                          invisible = false,
                                          onVerify,
                                          onExpired,
                                        }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const widgetIdRef = useRef<any>(null);

  useEffect(() => {
    let cancelled = false;

    const ensureScript = () =>
      new Promise<void>((resolve) => {
        const w = window as any;
        if (w.turnstile) return resolve();

        const existing = document.querySelector<HTMLScriptElement>('script[data-turnstile]');
        if (existing) {
          existing.addEventListener("load", () => resolve(), { once: true });
          return;
        }

        const s = document.createElement("script");
        s.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
        s.async = true;
        s.defer = true;
        s.dataset.turnstile = "true";
        s.addEventListener("load", () => resolve(), { once: true });
        document.body.appendChild(s);
      });

    ensureScript().then(() => {
      if (cancelled || !containerRef.current) return;
      const w = window as any;
      widgetIdRef.current = w.turnstile.render(containerRef.current, {
        sitekey: siteKey,
        theme,
        size: invisible ? "invisible" : size,
        callback: (token: string) => onVerify?.(token),
        "expired-callback": () => onExpired?.(),
      });
    });

    return () => {
      cancelled = true;
      try {
        const w = window as any;
        if (widgetIdRef.current && w.turnstile?.remove) {
          w.turnstile.remove(widgetIdRef.current);
        }
      } catch {}
    };
  }, [siteKey, theme, size, invisible, onVerify, onExpired]);

  return <div ref={containerRef} />;
}