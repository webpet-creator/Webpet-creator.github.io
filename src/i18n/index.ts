import { en } from './en'
import { fr, type Dict } from './fr'
import { ru } from './ru'

export const LANGS = ['fr', 'en', 'ru'] as const
export type Lang = (typeof LANGS)[number]
export const DEFAULT_LANG: Lang = 'en'

const dictionaries: Record<Lang, Dict> = { fr, en, ru }

export function isLang(value: string | undefined): value is Lang {
  return LANGS.includes(value as Lang)
}

export function getDict(lang: Lang): Dict {
  return dictionaries[lang]
}

/** Langue préférée du navigateur parmi celles du site, sinon l'anglais. */
export function detectLang(): Lang {
  if (typeof navigator === 'undefined') return DEFAULT_LANG
  for (const tag of navigator.languages ?? [navigator.language]) {
    const code = tag.slice(0, 2).toLowerCase()
    if (isLang(code)) return code
  }
  return DEFAULT_LANG
}

export type { Dict }
