"use client";
import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { pageview } from "lib/fpixel";

export default function FbPixelListener() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => { pageview(); }, [pathname, searchParams]); // fire on every nav
  return null;
}