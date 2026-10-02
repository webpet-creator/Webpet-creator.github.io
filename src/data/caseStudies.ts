import botMenu from '../assets/projects/kilos/bot-menu.webp'
import logo from '../assets/projects/kilos/logo.webp'
import type { Lang } from '../i18n'

export interface CaseSection {
  heading: string
  paragraphs?: string[]
  items?: string[]
}

export interface CaseStudyText {
  role: string
  launched: string
  screenshotAlt: string
  logoAlt: string
  sections: CaseSection[]
}

export interface CaseStudy {
  screenshot: { src: string; width: number; height: number }
  logo: { src: string; width: number; height: number }
  text: Record<Lang, CaseStudyText>
}

/** Une étude de cas par slug de projet `live`. */
export const caseStudies: Record<string, CaseStudy> = {
  'kilos-russie-afrique': {
    screenshot: { src: botMenu, width: 900, height: 1611 },
    logo: { src: logo, width: 600, height: 600 },
    text: {
      fr: {
        role: 'Idée, conception, développement et mise en ligne',
        launched: 'Octobre 2026',
        screenshotAlt:
          'Le bot dans Telegram : message d’accueil, explication du fonctionnement et menu principal.',
        logoAlt: 'Logo Kilos Russie Afrique',
        sections: [
          {
            heading: 'Le besoin',
            paragraphs: [
              'Des voyageurs font le trajet entre la Russie et l’Afrique avec des kilos de bagage inutilisés. D’autres personnes cherchent à envoyer un colis sur ce même trajet. Il manquait un endroit fiable pour les mettre en relation.',
              'Avant de construire quoi que ce soit, j’ai interrogé des utilisateurs potentiels. Ils ont confirmé le besoin, et certains ont proposé de partager le service dans des groupes de ressortissants africains.',
            ],
          },
          {
            heading: 'Un bot avant une application',
            paragraphs: [
              'L’idée de départ était une application mobile. J’ai commencé par un canal Telegram et un bot : les utilisateurs sont déjà sur Telegram, il n’y a rien à installer, et une première version peut être mise entre leurs mains rapidement.',
            ],
          },
          {
            heading: 'Comment ça marche',
            items: [
              'Le voyageur propose son trajet : villes, date, kilos disponibles, prix au kilo.',
              'L’expéditeur déclare son colis et cherche un trajet qui lui convient.',
              'Chacun accepte le règlement et la liste des objets interdits dès le départ.',
              'Les voyageurs vérifiés fournissent une preuve de voyage. Les autres annonces portent la mention « non vérifié ».',
              'Chaque envoi a un statut, et les utilisateurs peuvent laisser un avis ou faire un signalement.',
              'Le bot fonctionne en français et en anglais.',
            ],
          },
          {
            heading: 'Décisions de conception',
            items: [
              'Le numéro du voyageur n’est montré à aucun utilisateur. Seuls les administrateurs y ont accès en cas de problème avec un colis, et le bot le dit clairement au voyageur.',
              'Les prix n’apparaissent pas dans le canal public.',
              'Le poids d’un colis ne peut pas dépasser les kilos disponibles du voyageur.',
              'Plusieurs administrateurs peuvent valider les paiements et les annonces, pour que le service ne dépende pas d’une seule personne.',
            ],
          },
          {
            heading: 'Modèle économique',
            paragraphs: [
              'Les expéditeurs paient pour voir les trajets disponibles avec leurs prix, par abonnement ou à la recherche. Les voyageurs paient pour être vérifiés, par abonnement ou au trajet. Publier sans abonnement reste possible, avec la mention « non vérifié ».',
            ],
          },
          {
            heading: 'Technique et mise en ligne',
            paragraphs: [
              'Le bot est écrit en Python avec aiogram et tourne sur un VPS sous Debian 12.',
              'Premier obstacle après le déploiement : depuis les datacenters situés en Russie, Telegram était injoignable. J’ai déplacé le serveur vers un datacenter à Zurich, chez le même hébergeur.',
            ],
          },
        ],
      },
      en: {
        role: 'Idea, design, development and deployment',
        launched: 'October 2026',
        screenshotAlt: 'The bot in Telegram: welcome message, how it works, and the main menu.',
        logoAlt: 'Kilos Russie Afrique logo',
        sections: [
          {
            heading: 'The need',
            paragraphs: [
              'Travellers fly between Russia and Africa with unused luggage kilos. Other people are looking to send a parcel on the same route. There was no reliable place to bring them together.',
              'Before building anything, I talked to potential users. They confirmed the need, and some offered to share the service in groups of African nationals.',
            ],
          },
          {
            heading: 'A bot before an app',
            paragraphs: [
              'The original idea was a mobile app. I started with a Telegram channel and a bot instead: users are already on Telegram, there is nothing to install, and a first version can be in their hands quickly.',
            ],
          },
          {
            heading: 'How it works',
            items: [
              'The traveller offers a trip: cities, date, available kilos, price per kilo.',
              'The sender declares a parcel and searches for a suitable trip.',
              'Everyone accepts the rules and the list of banned items from the start.',
              'Verified travellers provide proof of travel. Other listings are marked “unverified”.',
              'Every shipment has a status, and users can leave a review or file a report.',
              'The bot works in French and English.',
            ],
          },
          {
            heading: 'Design decisions',
            items: [
              'The traveller’s phone number is never shown to other users. Only admins can see it if there is a problem with a parcel, and the bot says so clearly to the traveller.',
              'Prices do not appear in the public channel.',
              'A parcel cannot weigh more than the traveller’s available kilos.',
              'Several admins can approve payments and listings, so the service does not depend on one person.',
            ],
          },
          {
            heading: 'Business model',
            paragraphs: [
              'Senders pay to see available trips with their prices, by subscription or per search. Travellers pay to be verified, by subscription or per trip. Posting without a subscription is still possible, with the “unverified” label.',
            ],
          },
          {
            heading: 'Tech and deployment',
            paragraphs: [
              'The bot is written in Python with aiogram and runs on a VPS under Debian 12.',
              'First obstacle after deployment: Telegram was unreachable from datacenters located in Russia. I moved the server to a datacenter in Zurich, with the same provider.',
            ],
          },
        ],
      },
      ru: {
        role: 'Идея, проектирование, разработка и запуск',
        launched: 'Октябрь 2026',
        screenshotAlt: 'Бот в Telegram: приветствие, описание работы и главное меню.',
        logoAlt: 'Логотип Kilos Russie Afrique',
        sections: [
          {
            heading: 'Потребность',
            paragraphs: [
              'Путешественники летают между Россией и Африкой со свободными килограммами багажа. Другие люди ищут, как отправить посылку по тому же маршруту. Не было надёжного места, где они могли бы найти друг друга.',
              'Прежде чем что-либо создавать, я поговорил с потенциальными пользователями. Они подтвердили потребность, а некоторые предложили рассказать о сервисе в группах африканских землячеств.',
            ],
          },
          {
            heading: 'Сначала бот, потом приложение',
            paragraphs: [
              'Изначально я задумывал мобильное приложение. Но начал с Telegram-канала и бота: пользователи уже в Telegram, ничего не нужно устанавливать, и первую версию можно быстро дать им в руки.',
            ],
          },
          {
            heading: 'Как это работает',
            items: [
              'Путешественник предлагает поездку: города, дата, свободные килограммы, цена за килограмм.',
              'Отправитель описывает посылку и ищет подходящую поездку.',
              'Каждый с самого начала принимает правила и список запрещённых предметов.',
              'Проверенные путешественники предоставляют подтверждение поездки. Остальные объявления помечены как «не проверено».',
              'У каждой отправки есть статус, а пользователи могут оставить отзыв или пожаловаться.',
              'Бот работает на французском и английском.',
            ],
          },
          {
            heading: 'Проектные решения',
            items: [
              'Номер путешественника не показывается другим пользователям. Его видят только администраторы, если с посылкой возникла проблема, и бот прямо сообщает об этом путешественнику.',
              'Цены не публикуются в открытом канале.',
              'Вес посылки не может превышать свободные килограммы путешественника.',
              'Несколько администраторов могут подтверждать оплаты и объявления, чтобы сервис не зависел от одного человека.',
            ],
          },
          {
            heading: 'Модель монетизации',
            paragraphs: [
              'Отправители платят за просмотр доступных поездок с ценами: по подписке или за один поиск. Путешественники платят за статус проверенного: по подписке или за поездку. Публиковать без подписки тоже можно, с пометкой «не проверено».',
            ],
          },
          {
            heading: 'Технологии и запуск',
            paragraphs: [
              'Бот написан на Python с использованием aiogram и работает на VPS под Debian 12.',
              'Первая проблема после запуска: из дата-центров в России Telegram был недоступен. Я перенёс сервер в дата-центр в Цюрихе у того же провайдера.',
            ],
          },
        ],
      },
    },
  },
}
