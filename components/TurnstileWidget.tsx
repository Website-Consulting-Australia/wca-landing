"use client";

import { useEffect, useRef } from "react";

type Props = {
  siteKey: string;
  theme?: "light" | "dark" | "auto";
  size?: "normal" | "compact";
  invisible?: boolean;
  onVerify?: (token: string) => void;
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

  // keep latest callbacks without retriggering the render effect
  const onVerifyRef = useRef(onVerify);
  const onExpiredRef = useRef(onExpired);
  onVerifyRef.current = onVerify;
  onExpiredRef.current = onExpired;

  useEffect(() => {
    let destroyed = false;

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
      if (destroyed || !containerRef.current) return;
      const w = window as any;

      // render once
      widgetIdRef.current = w.turnstile.render(containerRef.current, {
        sitekey: siteKey,
        theme,
        size: invisible ? "invisible" : size,
        callback: (token: string) => onVerifyRef.current?.(token),
        "expired-callback": () => onExpiredRef.current?.(),
      });
    });

    return () => {
      destroyed = true;
      try {
        const w = window as any;
        if (widgetIdRef.current && w.turnstile?.remove) {
          w.turnstile.remove(widgetIdRef.current);
          widgetIdRef.current = null;
        }
      } catch {}
    };
    // IMPORTANT: do not include onVerify/onExpired in deps
  }, [siteKey, theme, size, invisible]);

  return <div ref={containerRef} />;
}