// ---------------------------------------------------------------------------
// localized.ts
// Shared type for pieces of data that change with the active language.
//
// A field can be:
//   - a plain string  -> shown as-is (keeps older saved data compatible), or
//   - a Localized     -> { en, km } values picked by the active locale.
//
// Components resolve these with the i18n store's pick() helper, so the same
// reusable cards/views automatically re-render when the language changes.
// ---------------------------------------------------------------------------

export interface Localized {
  en: string
  km: string
}

export type LocalizedText = string | Localized

/** Convenience builder: keeps legacy string data working as LocalizedText. */
export function localized(en: string, km: string): LocalizedText {
  return { en, km }
}