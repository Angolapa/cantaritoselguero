import { create } from "zustand";
import { persist } from "zustand/middleware";

import en from "@/locales/en.json";
import es from "@/locales/es.json";

export type Locale = "es" | "en";

const messages: Record<Locale, Record<string, unknown>> = { es, en };

interface LocaleState {
  locale: Locale;
  toggleLocale: () => void;
}

export const useLocaleStore = create<LocaleState>()(
  persist(
    (set) => ({
      locale: "es",
      toggleLocale: () =>
        set((state) => ({ locale: state.locale === "es" ? "en" : "es" })),
    }),
    { name: "cantaritos-locale" }
  )
);

function getNestedValue(obj: unknown, path: string): string {
  const keys = path.split(".");
  let current: unknown = obj;
  for (const key of keys) {
    if (current && typeof current === "object" && key in current) {
      current = (current as Record<string, unknown>)[key];
    } else {
      return path;
    }
  }
  return typeof current === "string" ? current : path;
}

export function useTranslation() {
  const locale = useLocaleStore((state) => state.locale);
  const translate = (key: string): string => getNestedValue(messages[locale], key);
  return { translate, locale };
}
