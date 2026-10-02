import kilosWelcome from '../assets/projects/kilos/bot-welcome.webp'
import type { Lang } from '../i18n'

type Localized = Record<Lang, string>

export type ProjectStatus = 'live' | 'in-progress'

export interface Project {
  slug: string
  name: string
  status: ProjectStatus
  year: number
  category: Localized
  summary: Localized
  stack: string[]
  links: { label: string; href: string }[]
  /** Image de l'étiquette du hero. */
  cover?: { src: string; width: number; height: number; alt: Localized }
}

/**
 * Ajouter un projet = ajouter un objet ici. Aucun composant à modifier.
 * Le premier projet de la liste est celui mis en avant dans le hero.
 * Seuls les projets `live` ont une page détaillée.
 */
export const projects: Project[] = [
  {
    slug: 'kilos-russie-afrique',
    name: 'Kilos Russie ↔ Afrique',
    status: 'live',
    year: 2026,
    category: { fr: 'Bot Telegram', en: 'Telegram bot', ru: 'Telegram-бот' },
    summary: {
      fr: 'Un bot et un canal Telegram qui mettent en relation des voyageurs ayant des kilos de bagage libres et des personnes qui veulent envoyer un colis entre la Russie et l’Afrique.',
      en: 'A Telegram bot and channel that connect travellers with spare luggage kilos to people who want to send a parcel between Russia and Africa.',
      ru: 'Telegram-бот и канал, которые связывают путешественников со свободными килограммами багажа и тех, кто хочет отправить посылку между Россией и Африкой.',
    },
    stack: ['Python', 'aiogram'],
    cover: {
      src: kilosWelcome,
      width: 900,
      height: 447,
      alt: {
        fr: 'Message d’accueil du bot Kilos Russie Afrique dans Telegram',
        en: 'Welcome message of the Kilos Russie Afrique bot in Telegram',
        ru: 'Приветственное сообщение бота Kilos Russie Afrique в Telegram',
      },
    },
    links: [
      { label: '@KilosAfriqueBot', href: 'https://t.me/KilosAfriqueBot' },
      { label: 't.me/kilos_russie_afrique', href: 'https://t.me/kilos_russie_afrique' },
    ],
  },
  {
    slug: 'russtart',
    name: 'RusStart',
    status: 'in-progress',
    year: 2026,
    category: { fr: 'Application Android', en: 'Android app', ru: 'Android-приложение' },
    summary: {
      fr: 'Une application hors ligne pour apprendre les phrases de survie en russe, pensée pour les étudiants internationaux.',
      en: 'An offline app for learning Russian survival phrases, designed for international students.',
      ru: 'Офлайн-приложение для изучения самых нужных русских фраз, созданное для иностранных студентов.',
    },
    stack: [],
    links: [],
  },
  {
    slug: 'scholarship-finder',
    name: 'Scholarship Finder',
    status: 'in-progress',
    year: 2026,
    category: { fr: 'Outil web', en: 'Web tool', ru: 'Веб-инструмент' },
    summary: {
      fr: 'Un outil qui part du profil d’un étudiant et lui propose des bourses d’étude réelles, avec la marche à suivre pour postuler.',
      en: 'A tool that starts from a student’s profile and suggests real scholarships, with the steps to apply.',
      ru: 'Инструмент, который по профилю студента подбирает реальные стипендии и объясняет, как подать заявку.',
    },
    stack: [],
    links: [],
  },
]

export function getProject(slug: string | undefined): Project | undefined {
  return projects.find((project) => project.slug === slug)
}
