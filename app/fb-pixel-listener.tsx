"use client";
import { useEffect, useMemo, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { pageview } from "lib/fpixel";

export default function FbPixelListener() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const url = useMemo(() => {
    const qs = searchParams?.toString();
    return (pathname || "/") + (qs ? `?${qs}` : "");
  }, [pathname, searchParams]);

  const lastRef = useRef<string>("");

  useEffect(() => {
    if (lastRef.current === url) return; // dedupe in Strict Mode/hydration
    lastRef.current = url;
    pageview();
  }, [url]);

  return null;
}