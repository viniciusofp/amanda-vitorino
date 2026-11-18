import Footer from "@/components/Footer";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import Nav from "@/components/Nav";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { WebVitals } from "@/components/WebVitals";
import { DM_Mono, DM_Sans, DM_Serif_Display } from "next/font/google";
import React from "react";
import "./styles.css";
import LenisProvider from "@/components/LenisProvider";

const sans = DM_Sans({
  subsets: ["latin"],
  weight: "variable",
  variable: "--font-sans",
});

const serif = DM_Serif_Display({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-serif",
  fallback: [],
});
const mono = DM_Mono({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-mono",
});

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props;

  return (
    <html
      lang="en"
      className={`${sans.variable} ${serif.variable} ${mono.variable}`}
    >
      <body
        className="bg-size-[120vw_100vh] bg-fixed font-sans antialiased"
        // style={{ backgroundImage: `url('/bg.jpg')` }}
      >
        <div className="pointer-events-none fixed top-0 left-0 z-100 h-full w-full bg-[url('/groovepaper.webp')] bg-repeat opacity-50 mix-blend-multiply"></div>
        <TooltipProvider>
          <LenisProvider>
            {/* <Nav /> */}
            <div className="">
              {children}
              {/* Google Analytics - @next/third-parties optimized - loads after hydration */}
              <GoogleAnalytics />
              {/* Core Web Vitals Tracking */}
              <WebVitals />
            </div>
            {/* <Footer /> */}
          </LenisProvider>
        </TooltipProvider>

        <Toaster />
      </body>
    </html>
  );
}
