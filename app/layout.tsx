import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { FB_PIXEL_ID } from "lib/fpixel";
import FbPixelListener from "./fb-pixel-listener";

import "styles/globals.css";
import Script from 'next/script'

export const metadata: Metadata = {
  title: "Website Consulting Australia | Web Consulting & Digital Strategy",
  description:
    "We guide Australian businesses through website optimisation, redesign, and digital growth. Get expert advice on performance, SEO, UX, and conversions.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter+Tight:ital,wght@0,100..900;1,100..900&display=swap"
          rel="stylesheet"
        />
        {/* Meta Pixel base */}
        {FB_PIXEL_ID && (
          <>
            <Script
              id="fb-pixel"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${FB_PIXEL_ID}');
            `,
              }}
            />
            {/* optional: keep or remove noscript; safe to keep now */}
            {/*<noscript>*/}
            {/*  <img height="1" width="1" style={{display:"none"}}*/}
            {/*       src={`https://www.facebook.com/tr?id=${FB_PIXEL_ID}&ev=PageView&noscript=1`} />*/}
            {/*</noscript>*/}
          </>
        )}
      </head>
      <body className="bg-white dark:bg-black min-h-screen">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <FbPixelListener />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
