"use client";

import { useState, useEffect } from "react";
import { Globe } from "lucide-react";

export default function TranslateWidget() {
  const [isArabic, setIsArabic] = useState(false);

  useEffect(() => {
    // Inject the Google Translate script dynamically
    const script = document.createElement("script");
    script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    document.body.appendChild(script);

    // Define the global callback
    (window as any).googleTranslateElementInit = () => {
      new (window as any).google.translate.TranslateElement(
        { pageLanguage: "en", includedLanguages: "ar,en", autoDisplay: false },
        "google_translate_element"
      );
    };

    return () => {
      document.body.removeChild(script);
      delete (window as any).googleTranslateElementInit;
    };
  }, []);

  // Hacky way to automate the google translate dropdown since standard styling is restrictive
  const handleToggle = () => {
    // If not Arabic, switch to Arabic
    // We do this by triggering the select event on the hidden GTranslate select box
    const select = document.querySelector(".goog-te-combo") as HTMLSelectElement;
    if (select) {
      if (!isArabic) {
        select.value = "ar";
        setIsArabic(true);
        document.body.dir = "rtl";
      } else {
        select.value = "en";
        setIsArabic(false);
        document.body.dir = "ltr";
      }
      select.dispatchEvent(new Event("change"));
    }
  };

  return (
    <>
      {/* Hidden google translate anchor */}
      <div id="google_translate_element" className="hidden" />

      {/* Styled custom toggle button */}
      <button
        onClick={handleToggle}
        className="flex items-center space-x-2 bg-white/[0.04] backdrop-blur-md border border-white/[0.08] shadow-[0_4px_12px_rgba(0,0,0,0.1)] px-3.5 py-1.5 rounded-full text-xs font-medium text-slate-200 hover:scale-105 hover:bg-white/[0.08] hover:border-white/[0.15] transition-all cursor-pointer"
      >
        <Globe className="size-3.5 text-slate-400" />
        <span className="font-sans font-medium tracking-wide">{isArabic ? "English" : "عربي (Arabic)"}</span>
      </button>

      {/* Hide the google translate top bar that appears automatically */}
      <style dangerouslySetInnerHTML={{ __html: `
        .goog-te-banner-frame { display: none !important; }
        body { top: 0px !important; }
        .goog-text-highlight { background-color: transparent !important; box-shadow: none !important; }
      `}} />
    </>
  );
}
