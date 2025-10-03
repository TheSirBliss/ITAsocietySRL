import React from "react";
import { useTranslation } from "react-i18next";

const langs = [
  { code: "en", label: "EN" },
  { code: "it", label: "IT" },
];

export default function LanguageSwitcher(): JSX.Element {
  const { i18n } = useTranslation();

  const handleChange = (lng: string) => {
    i18n.changeLanguage(lng);
    try {
      localStorage.setItem("lang", lng);
    } catch {
      /* noop */
    }
  };

  return (
    <div className="flex items-center space-x-2" role="group" aria-label="Language switcher">
      {langs.map((l) => (
        <button
          key={l.code}
          type="button"
          className={`px-2 py-1 rounded text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary ${
            i18n.language === l.code ? "bg-primary text-white" : "bg-transparent"
          }`}
          aria-pressed={i18n.language === l.code}
          aria-label={`Switch language to ${l.label}`}
          onClick={() => handleChange(l.code)}
        >
          {l.label}
        </button>
      ))}
    </div>
  );
}