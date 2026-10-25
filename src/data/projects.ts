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
    category: {
      fr: 'Bot Telegram et site web',
      en: 'Telegram bot and website',
      ru: 'Telegram-бот и сайт',
    },
    summary: {
      fr: 'Un bot Telegram et un site qui mettent en relation des voyageurs ayant des kilos de bagage libres et des personnes qui veulent envoyer un colis entre la Russie et l’Afrique. Gratuit, en six langues.',
      en: 'A Telegram bot and website that connect travellers with spare luggage kilos to people who want to send a parcel between Russia and Africa. Free, in six languages.',
      ru: 'Telegram-бот и сайт, которые связывают путешественников со свободными килограммами багажа и тех, кто хочет отправить посылку между Россией и Африкой. Бесплатно, на шести языках.',
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
      { label: 'kilosafrique.duckdns.org', href: 'https://kilosafrique.duckdns.org/' },
    ],
  },
  {
    slug: 'pronomax',
    name: 'PronoMax',
    status: 'live',
    year: 2026,
    category: {
      fr: 'Application Android et site web',
      en: 'Android app and website',
      ru: 'Android-приложение и сайт',
    },
    summary: {
      fr: 'Une application de pronostics foot, basket et hockey construite à partir des chiffres réels de la saison, avec un bilan public, gagné ou perdu.',
      en: 'A football, basketball and hockey predictions app built on the season’s real numbers, with a public record, won or lost.',
      ru: 'Приложение с прогнозами на футбол, баскетбол и хоккей на основе реальных цифр сезона, с открытой статистикой выигрышей и проигрышей.',
    },
    stack: ['React Native', 'Expo', 'Firebase'],
    links: [
      { label: 'pronomax-6c96b.web.app', href: 'https://pronomax-6c96b.web.app/' },
      { label: '@PronoMax_Agent', href: 'https://t.me/PronoMax_Agent' },
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
