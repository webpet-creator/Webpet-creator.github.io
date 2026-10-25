import botMenu from '../assets/projects/kilos/bot-menu.webp'
import kilosLogo from '../assets/projects/kilos/logo.webp'
import pronoLogo from '../assets/projects/pronomax/logo.webp'
import pronoSite from '../assets/projects/pronomax/site-mobile.webp'
import type { Lang } from '../i18n'

export interface CaseSection {
  heading: string
  paragraphs?: string[]
  items?: string[]
  /** Chiffres réels, toujours accompagnés de leur source et de leur date dans `note`. */
  figures?: { value: string; label: string }[]
  note?: string
}

export interface CaseStudyText {
  role: string
  launched: string
  screenshotAlt: string
  logoAlt: string
  sections: CaseSection[]
  /** Bloc final « essayer » : titre, texte et liens. Le premier lien est l'action principale. */
  tryTitle: string
  tryText: string
  actions: { label: string; href: string }[]
}

export interface CaseStudy {
  screenshot: { src: string; width: number; height: number }
  logo: { src: string; width: number; height: number }
  text: Record<Lang, CaseStudyText>
}

const KILOS_BOT = 'https://t.me/KilosAfriqueBot'
const KILOS_SITE = 'https://kilosafrique.duckdns.org/'
const PRONO_SITE = 'https://pronomax-6c96b.web.app/'
const PRONO_TELEGRAM = 'https://t.me/PronoMax_Agent'

/** Une étude de cas par slug de projet `live`. */
export const caseStudies: Record<string, CaseStudy> = {
  'kilos-russie-afrique': {
    screenshot: { src: botMenu, width: 900, height: 1611 },
    logo: { src: kilosLogo, width: 600, height: 600 },
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
              'Le voyageur remplit un formulaire avec son téléphone, sa pièce d’identité et son billet. Un administrateur vérifie avant de publier le trajet.',
              'L’expéditeur trouve un trajet, envoie sa demande (contenu, poids, destinataire) et reçoit le contact du voyageur quand celui-ci accepte.',
              'La famille suit le colis par un lien, à chaque étape.',
              'Chacun accepte le règlement et la liste des objets interdits dès le départ. Les colis fermés sont refusés : le voyageur vérifie ce qu’il transporte.',
              'Chaque voyageur affiche ses avis et son nombre de livraisons, et un signalement se fait en un geste.',
              'Le bot et le site fonctionnent en six langues : français, anglais, russe, portugais, espagnol et arabe.',
            ],
          },
          {
            heading: 'Décisions de conception',
            items: [
              'Les numéros, pièces d’identité et billets ne sont jamais publiés. Seuls les administrateurs y ont accès en cas de problème avec un colis, et le bot le dit clairement au voyageur.',
              'Un voyageur peut publier sans vérification, mais son annonce porte alors la mention « non vérifié ».',
              'Le poids d’un colis ne peut pas dépasser les kilos disponibles du voyageur.',
              'Plusieurs administrateurs peuvent valider les annonces, pour que le service ne dépende pas d’une seule personne.',
            ],
          },
          {
            heading: 'Gratuit, porté par les dons',
            paragraphs: [
              'Le service est gratuit, pour attirer les premiers utilisateurs. Le coût du serveur est couvert par les dons : une section dédiée, sur le site et dans le bot, affiche l’objectif du mois et sa progression. Le prix du transport se règle directement entre l’expéditeur et le voyageur.',
            ],
          },
          {
            heading: 'Un site en plus du bot',
            paragraphs: [
              'Un site présente le service, liste les prochains départs et les demandes en attente, et renvoie vers le bot. Il est hébergé sur le même serveur que le bot, avec une adresse DuckDNS gratuite, pour ne rien ajouter aux coûts.',
            ],
          },
          {
            heading: 'Technique et mise en ligne',
            paragraphs: [
              'Le bot est écrit en Python avec aiogram et tourne sur un VPS sous Debian 12.',
              'Premier obstacle après le déploiement : depuis les datacenters situés en Russie, Telegram était injoignable. J’ai déplacé le serveur vers un datacenter à Zurich, chez le même hébergeur.',
            ],
          },
          {
            heading: 'Premiers résultats',
            figures: [
              { value: '43', label: 'membres' },
              { value: '5', label: 'trajets publiés' },
              { value: '2', label: 'colis livrés' },
            ],
            note: 'Chiffres affichés sur le site de Kilos le 26 octobre 2026.',
          },
        ],
        tryTitle: 'Essayer Kilos',
        tryText: 'Le service est gratuit et ouvert à tous, sur Telegram et sur le web.',
        actions: [
          { label: 'Ouvrir le bot', href: KILOS_BOT },
          { label: 'Voir le site', href: KILOS_SITE },
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
              'The traveller fills in a form with their phone, ID and ticket. An admin checks it before the trip is published.',
              'The sender finds a trip, sends a request (contents, weight, recipient) and gets the traveller’s contact once they accept.',
              'The family tracks the parcel with a link, at every step.',
              'Everyone accepts the rules and the list of banned items from the start. Sealed parcels are refused: the traveller checks what they carry.',
              'Each traveller shows their reviews and number of deliveries, and reporting takes one tap.',
              'The bot and the website work in six languages: French, English, Russian, Portuguese, Spanish and Arabic.',
            ],
          },
          {
            heading: 'Design decisions',
            items: [
              'Phone numbers, IDs and tickets are never published. Only admins can see them if there is a problem with a parcel, and the bot says so clearly to the traveller.',
              'A traveller can post without verification, but the listing is then marked “unverified”.',
              'A parcel cannot weigh more than the traveller’s available kilos.',
              'Several admins can approve listings, so the service does not depend on one person.',
            ],
          },
          {
            heading: 'Free, supported by donations',
            paragraphs: [
              'The service is free, to attract the first users. Server costs are covered by donations: a dedicated section, on the website and in the bot, shows the monthly goal and its progress. The transport price is settled directly between sender and traveller.',
            ],
          },
          {
            heading: 'A website alongside the bot',
            paragraphs: [
              'A website presents the service, lists upcoming departures and open requests, and links to the bot. It runs on the same server as the bot, with a free DuckDNS address, so it adds nothing to the costs.',
            ],
          },
          {
            heading: 'Tech and deployment',
            paragraphs: [
              'The bot is written in Python with aiogram and runs on a VPS under Debian 12.',
              'First obstacle after deployment: Telegram was unreachable from datacenters located in Russia. I moved the server to a datacenter in Zurich, with the same provider.',
            ],
          },
          {
            heading: 'First results',
            figures: [
              { value: '43', label: 'members' },
              { value: '5', label: 'trips published' },
              { value: '2', label: 'parcels delivered' },
            ],
            note: 'Figures shown on the Kilos website on 26 October 2026.',
          },
        ],
        tryTitle: 'Try Kilos',
        tryText: 'The service is free and open to everyone, on Telegram and on the web.',
        actions: [
          { label: 'Open the bot', href: KILOS_BOT },
          { label: 'See the website', href: KILOS_SITE },
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
              'Путешественник заполняет форму: телефон, документ и билет. Администратор проверяет данные перед публикацией поездки.',
              'Отправитель находит поездку, отправляет заявку (содержимое, вес, получатель) и получает контакт путешественника, когда тот соглашается.',
              'Семья отслеживает посылку по ссылке на каждом этапе.',
              'Каждый с самого начала принимает правила и список запрещённых предметов. Закрытые посылки не принимаются: путешественник проверяет, что везёт.',
              'У каждого путешественника видны отзывы и число доставок, а пожаловаться можно в одно касание.',
              'Бот и сайт работают на шести языках: французском, английском, русском, португальском, испанском и арабском.',
            ],
          },
          {
            heading: 'Проектные решения',
            items: [
              'Номера телефонов, документы и билеты никогда не публикуются. Их видят только администраторы, если с посылкой возникла проблема, и бот прямо сообщает об этом путешественнику.',
              'Путешественник может публиковать без проверки, но тогда объявление помечено как «не проверено».',
              'Вес посылки не может превышать свободные килограммы путешественника.',
              'Несколько администраторов могут подтверждать объявления, чтобы сервис не зависел от одного человека.',
            ],
          },
          {
            heading: 'Бесплатно, на пожертвования',
            paragraphs: [
              'Сервис бесплатный, чтобы привлечь первых пользователей. Расходы на сервер покрываются пожертвованиями: отдельный раздел на сайте и в боте показывает цель месяца и прогресс. Цену перевозки отправитель и путешественник согласуют напрямую.',
            ],
          },
          {
            heading: 'Сайт в дополнение к боту',
            paragraphs: [
              'Сайт рассказывает о сервисе, показывает ближайшие поездки и открытые заявки и ведёт в бот. Он работает на том же сервере, что и бот, с бесплатным адресом DuckDNS, чтобы не добавлять расходов.',
            ],
          },
          {
            heading: 'Технологии и запуск',
            paragraphs: [
              'Бот написан на Python с использованием aiogram и работает на VPS под Debian 12.',
              'Первая проблема после запуска: из дата-центров в России Telegram был недоступен. Я перенёс сервер в дата-центр в Цюрихе у того же провайдера.',
            ],
          },
          {
            heading: 'Первые результаты',
            figures: [
              { value: '43', label: 'участника' },
              { value: '5', label: 'опубликованных поездок' },
              { value: '2', label: 'доставленные посылки' },
            ],
            note: 'Данные с сайта Kilos на 26 октября 2026 года.',
          },
        ],
        tryTitle: 'Попробовать Kilos',
        tryText: 'Сервис бесплатный и открыт для всех — в Telegram и на сайте.',
        actions: [
          { label: 'Открыть бота', href: KILOS_BOT },
          { label: 'Открыть сайт', href: KILOS_SITE },
        ],
      },
    },
  },

  pronomax: {
    screenshot: { src: pronoSite, width: 900, height: 1947 },
    logo: { src: pronoLogo, width: 600, height: 600 },
    text: {
      fr: {
        role: 'Idée, conception et mise en ligne',
        launched: 'Octobre 2026',
        screenshotAlt:
          'Le site de PronoMax sur mobile : présentation, téléchargement Android et canal Telegram.',
        logoAlt: 'Logo PronoMax',
        sections: [
          {
            heading: 'L’idée',
            paragraphs: [
              'Des pronostics qui partent des chiffres de la saison — classements, forme des équipes, cotes des bookmakers — et un bilan public où chaque prono terminé est compté, gagné ou perdu.',
            ],
          },
          {
            heading: 'Comment ça marche',
            items: [
              'Chaque matin, un prono du jour gratuit, avec son analyse.',
              'Un bilan public : chaque prono terminé est compté, avec le pourcentage annoncé avant le match.',
              'Pour les membres VIP, un Ticket du jour de 2 ou 3 matchs à 70 % et plus, suivi en direct jusqu’au résultat.',
              'Les matchs se mettent à jour automatiquement chaque jour, et les résultats réels servent à améliorer les pronos.',
              'Football, basket et hockey, en quatre langues : français, anglais, russe et portugais.',
            ],
          },
          {
            heading: 'Décisions de conception',
            items: [
              'Le bilan VIP est visible par tous, mais seulement sur les matchs déjà joués. Les pronos VIP à venir restent réservés aux membres.',
              'Sans VIP, le Ticket du jour n’affiche que le nombre de matchs et sa probabilité de passer.',
              'Sept jours de VIP sont offerts à l’inscription et s’arrêtent automatiquement.',
              'Un panneau d’administration permet d’activer ou de bloquer un compte.',
              'Le site affiche la mention 18+ et rappelle qu’aucun gain n’est garanti.',
            ],
          },
          {
            heading: 'Modèle économique',
            paragraphs: [
              'Le prono du jour et le bilan sont gratuits. L’accès VIP est payant ; pour l’instant, il s’active en contactant l’administrateur. Un canal Telegram gratuit fait connaître l’application.',
            ],
          },
          {
            heading: 'Technique et mise en ligne',
            paragraphs: [
              'L’application Android est construite avec React Native et Expo. Elle se télécharge directement depuis le site, hébergé sur Firebase. Une version iPhone est prévue.',
            ],
          },
        ],
        tryTitle: 'Essayer PronoMax',
        tryText:
          'L’application Android se télécharge depuis le site, avec sept jours de VIP offerts.',
        actions: [
          { label: 'Voir le site', href: PRONO_SITE },
          { label: 'Canal Telegram', href: PRONO_TELEGRAM },
        ],
      },
      en: {
        role: 'Idea, design and launch',
        launched: 'October 2026',
        screenshotAlt:
          'The PronoMax website on mobile: introduction, Android download and Telegram channel.',
        logoAlt: 'PronoMax logo',
        sections: [
          {
            heading: 'The idea',
            paragraphs: [
              'Predictions built on the season’s numbers — standings, team form, bookmaker odds — and a public record where every finished prediction counts, won or lost.',
            ],
          },
          {
            heading: 'How it works',
            items: [
              'Every morning, a free prediction of the day, with its analysis.',
              'A public record: every finished prediction is counted, with the percentage given before the match.',
              'For VIP members, a Ticket of the day of 2 or 3 matches at 70% or more, followed live until the result.',
              'Matches update automatically every day, and real results are used to improve the predictions.',
              'Football, basketball and hockey, in four languages: French, English, Russian and Portuguese.',
            ],
          },
          {
            heading: 'Design decisions',
            items: [
              'The VIP record is visible to everyone, but only for matches already played. Upcoming VIP predictions stay members-only.',
              'Without VIP, the Ticket of the day only shows the number of matches and its chance of winning.',
              'Seven days of VIP are offered on sign-up and end automatically.',
              'An admin panel can activate or block any account.',
              'The website shows an 18+ notice and states that no winnings are guaranteed.',
            ],
          },
          {
            heading: 'Business model',
            paragraphs: [
              'The prediction of the day and the record are free. VIP access is paid; for now, it is activated by contacting the admin. A free Telegram channel spreads the word about the app.',
            ],
          },
          {
            heading: 'Tech and launch',
            paragraphs: [
              'The Android app is built with React Native and Expo. It is downloaded directly from the website, hosted on Firebase. An iPhone version is planned.',
            ],
          },
        ],
        tryTitle: 'Try PronoMax',
        tryText: 'The Android app is downloaded from the website, with seven days of VIP included.',
        actions: [
          { label: 'See the website', href: PRONO_SITE },
          { label: 'Telegram channel', href: PRONO_TELEGRAM },
        ],
      },
      ru: {
        role: 'Идея, проектирование и запуск',
        launched: 'Октябрь 2026',
        screenshotAlt:
          'Сайт PronoMax на телефоне: описание, загрузка для Android и Telegram-канал.',
        logoAlt: 'Логотип PronoMax',
        sections: [
          {
            heading: 'Идея',
            paragraphs: [
              'Прогнозы на основе цифр сезона — турнирных таблиц, формы команд, коэффициентов букмекеров — и открытая статистика, где учитывается каждый завершённый прогноз, выигрышный или нет.',
            ],
          },
          {
            heading: 'Как это работает',
            items: [
              'Каждое утро — бесплатный прогноз дня с разбором.',
              'Открытая статистика: каждый завершённый прогноз учитывается вместе с процентом, объявленным до матча.',
              'Для VIP-участников — Билет дня из 2–3 матчей с вероятностью от 70 %, с отслеживанием до результата.',
              'Матчи обновляются автоматически каждый день, а реальные результаты помогают улучшать прогнозы.',
              'Футбол, баскетбол и хоккей на четырёх языках: французском, английском, русском и португальском.',
            ],
          },
          {
            heading: 'Проектные решения',
            items: [
              'Статистика VIP видна всем, но только по уже сыгранным матчам. Будущие VIP-прогнозы доступны только участникам.',
              'Без VIP Билет дня показывает только число матчей и вероятность прохода.',
              'Семь дней VIP даются при регистрации и отключаются автоматически.',
              'Панель администратора позволяет включить или заблокировать любой аккаунт.',
              'На сайте указано ограничение 18+ и то, что выигрыш не гарантирован.',
            ],
          },
          {
            heading: 'Модель монетизации',
            paragraphs: [
              'Прогноз дня и статистика бесплатны. VIP-доступ платный; пока он включается через администратора. Бесплатный Telegram-канал помогает рассказывать о приложении.',
            ],
          },
          {
            heading: 'Технологии и запуск',
            paragraphs: [
              'Android-приложение создано на React Native и Expo. Оно скачивается прямо с сайта, размещённого на Firebase. Версия для iPhone запланирована.',
            ],
          },
        ],
        tryTitle: 'Попробовать PronoMax',
        tryText: 'Android-приложение скачивается с сайта, семь дней VIP — в подарок.',
        actions: [
          { label: 'Открыть сайт', href: PRONO_SITE },
          { label: 'Telegram-канал', href: PRONO_TELEGRAM },
        ],
      },
    },
  },
}
