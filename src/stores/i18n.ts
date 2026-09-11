// ---------------------------------------------------------------------------
// i18n.ts (Pinia store)
// Thin facade around the Vue I18n instance (see src/i18n/index.ts).
// Components use this store instead of calling vue-i18n directly, so the
// whole app shares one consistent API:
//
//   - t(key, params?)      translate a message key ("{param}" placeholders)
//   - locale / setLocale   switch language (persisted in localStorage)
//   - categoryLabel(...)   translate raw category values from the data files
//   - pick(value)          resolve a { en, km } localized field to the active
//                          language (plain strings pass through unchanged,
//                          which keeps previously-saved data compatible)
//
// Everything here is reactive: components only read refs/computeds, so the
// whole site updates in place the moment the language changes - no reload.
// ---------------------------------------------------------------------------
import { defineStore } from 'pinia'
import { computed } from 'vue'
import { i18n, LOCALE_STORAGE_KEY } from '../i18n'
import type { Locale } from '../i18n'

export type { Locale }

/** A translatable value: plain text for legacy data, or per-language text. */
export interface Localized {
  en?: string
  km?: string
}
export type LocalizedText = string | Localized

// Maps every raw category value (from the data files) to a translation key.
// Handles both destination and activity categories.
const CATEGORY_KEYS: Record<string, string> = {
  All: 'categories.all',
  Beaches: 'categories.beaches',
  Mountains: 'categories.mountains',
  Cities: 'categories.cities',
  Historical: 'categories.historical',
  Nature: 'categories.nature',
  Adventure: 'categories.adventure',
  Hiking: 'categories.hiking',
  Diving: 'categories.diving',
  'City Tours': 'categories.cityTours',
  Camping: 'categories.camping',
  'Food Tours': 'categories.foodTours',
  'Cultural Tours': 'categories.culturalTours',
  Sailing: 'categories.sailing',
}

export const useI18nStore = defineStore('i18n', () => {
  const locale = computed<Locale>(() => i18n.global.locale.value as Locale)

  /** Translate a message key, replacing "{param}" placeholders with values. */
  function t(key: string, params?: Record<string, string | number>): string {
    return i18n.global.t(key as never, params ?? {})
  }

  /** Switch language, remember the choice and keep <html lang> in sync. */
  function setLocale(value: Locale): void {
    i18n.global.locale.value = value
    localStorage.setItem(LOCALE_STORAGE_KEY, value)
    document.documentElement.lang = value
  }

  /** Translate a raw category value (e.g. "Beaches") for display. */
  function categoryLabel(value: string): string {
    const key = CATEGORY_KEYS[value]
    return key ? t(key) : value
  }

  /** Resolve a localized data field to the active language. */
  function pick(value: LocalizedText | null | undefined): string {
    if (typeof value === 'string') return value
    if (!value) return ''
    return value[locale.value] ?? value.en ?? value.km ?? ''
  }

  /** Every display variant of a localized field (used for search matching). */
  function variants(value: LocalizedText | null | undefined): string[] {
    if (typeof value === 'string') return [value]
    if (!value) return []
    const result: string[] = []
    if (value.en) result.push(value.en)
    if (value.km) result.push(value.km)
    return result
  }

  // Keep the <html lang="..."> attribute in sync with the active locale.
  document.documentElement.lang = locale.value

  return {
    locale,
    t,
    setLocale,
    categoryLabel,
    pick,
    variants,
  }
})