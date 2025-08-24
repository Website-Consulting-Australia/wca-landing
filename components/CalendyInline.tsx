"use client";

import Script from "next/script";

export default function CalendlyInline({
                                         url,
                                         height = 680,
                                       }: {
  url: string;
  height?: number;
}) {
  const calendlyUrl = `${url}?hide_event_type_details=1&hide_gdpr_banner=1`;

  return (
    <>
      <Script src="https://assets.calendly.com/assets/external/widget.js" strategy="lazyOnload" />
      <div
        className="calendly-inline-widget rounded-lg shadow"
        data-url={calendlyUrl}
        style={{ minWidth: "320px", height }}
      />
    </>
  );
}