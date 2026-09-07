// ---------------------------------------------------------------------------
// i18n/index.ts
// The Vue I18n instance - the single source of truth for the website's
// bilingual system (English + Khmer).
//
// - Messages live in src/locales/en.json and src/locales/km.json.
// - Khmer is the default language.
// - The active language is persisted in localStorage under the key language.
// - A legacy key (locale) from the previous home-grown system is migrated
//   automatically (its old value "kh" maps to "km").
//
// Components use the `useI18nStore` facade (see src/stores/i18n.ts) which
// wraps this instance with a small consistent API (i18n.t, i18n.pick, ...).
// ---------------------------------------------------------------------------
import { createI18n } from 'vue-i18n'
import en from '../locales/en.json'
import km from '../locales/km.json'

export type Locale = 'en' | 'km'

/** localStorage key where the active language is persisted. */
export const LOCALE_STORAGE_KEY = 'language'
/** The key used by the previous custom i18n system. */
const LEGACY_LOCALE_KEY = 'locale'

/**
 * Resolve the language to use on first load.
 * Defaults to Khmer unless the visitor previously chose English.
 */
export function loadInitialLocale(): Locale {
  const saved = localStorage.getItem(LOCALE_STORAGE_KEY) ?? localStorage.getItem(LEGACY_LOCALE_KEY)
  if (saved === 'en' || saved === 'km') return saved
  // The old system stored Khmer under the value "kh".
  if (saved === 'kh') return 'km'
  return 'km'
}

export const i18n = createI18n<false>({
  legacy: false,
  locale: loadInitialLocale(),
  fallbackLocale: 'km',
  messages: { en, km },
})