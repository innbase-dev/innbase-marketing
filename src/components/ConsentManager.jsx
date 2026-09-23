"use client";

import Script from "next/script";
import { initializeConsentManager } from "@/lib/consent";

export default function ConsentManager() {
  return (
    <Script
      id="silktide-consent-manager"
      src="https://cdn.jsdelivr.net/gh/silktide/consent-manager@v2.0.1/silktide-consent-manager.js"
      integrity="sha384-5Pt34uiIbCsvfiiZXoLi4HRf/YBXjr9c8e+gYeVo9smUaInNHYVtc8NZ8wUnXJIq"
      crossOrigin="anonymous"
      strategy="afterInteractive"
      onReady={() => initializeConsentManager(window)}
      // Defaults remain denied if the remote script cannot load.
      onError={() => {}}
    />
  );
}
