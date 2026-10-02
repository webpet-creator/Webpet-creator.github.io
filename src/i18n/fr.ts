/** Dictionnaire source. Les autres langues doivent avoir exactement les mêmes clés. */
export const fr = {
  meta: {
    title: 'Pierre Gnadjro — Développeur web et bots Telegram',
    description:
      'Pierre Gnadjro, développeur web et bots Telegram à Kalouga. Je construis des bots et des sites pour des besoins concrets, en français, anglais et russe.',
  },
  nav: {
    main: 'Navigation principale',
    skip: 'Aller au contenu',
    menu: 'Menu',
    close: 'Fermer',
    projects: 'Projets',
    process: 'Méthode',
    about: 'À propos',
    contact: 'Contact',
    language: 'Langue',
  },
  hero: {
    role: 'Développeur web et bots Telegram',
    statement:
      'Je construis des bots Telegram et des sites web pour des besoins concrets. Le dernier met en relation des voyageurs et des expéditeurs de colis entre la Russie et l’Afrique.',
    cardLabel: 'Projet n° 01',
    imageNeeded: '[IMAGE NEEDED] capture du bot',
    typeLabel: 'Type',
    stackLabel: 'Technique',
    yearLabel: 'Année',
    basedLabel: 'Basé à',
    based: 'Kalouga, Russie',
    languagesLabel: 'Langues de travail',
    languages: 'Français, anglais, russe',
    availabilityLabel: 'Disponibilité',
    availability: 'Ouvert aux missions freelance',
  },
  actions: {
    viewProject: 'Voir le projet',
    telegram: 'Écrire sur Telegram',
    email: 'Envoyer un email',
  },
  status: {
    live: 'En ligne',
    inProgress: 'En cours',
  },
  projects: {
    label: 'Projets',
    title: 'Un projet en ligne, deux en construction',
  },
  skills: {
    label: 'Compétences',
    title: 'Ce que je peux construire pour vous',
    items: {
      bots: {
        title: 'Bots Telegram',
        text: 'Des parcours complets dans Telegram : inscription, publication d’annonces, recherche, validation par des administrateurs, abonnements, plusieurs langues.',
      },
      web: {
        title: 'Sites web',
        text: 'Des sites clairs et rapides, du site vitrine au site avec comptes et base de données.',
      },
      deploy: {
        title: 'Mise en ligne',
        text: 'J’installe et je maintiens moi-même le serveur : votre outil ne reste pas sur mon ordinateur, il tourne.',
      },
    },
  },
  process: {
    label: 'Méthode',
    title: 'Comment je travaille',
    steps: [
      {
        title: 'Vérifier le besoin',
        text: 'Avant d’écrire du code, je parle aux personnes concernées. Pour Kilos Russie ↔ Afrique, plusieurs m’ont confirmé le besoin avant le début du développement.',
      },
      {
        title: 'Commencer petit',
        text: 'Un bot Telegram plutôt qu’une application : les utilisateurs y sont déjà, et on apprend plus vite ce qui compte.',
      },
      {
        title: 'Tester, puis corriger',
        text: 'Chaque version est essayée en conditions réelles. Ce qui gêne est corrigé avant d’ajouter autre chose.',
      },
      {
        title: 'Mettre en ligne et suivre',
        text: 'Je déploie sur serveur et je règle ce qui apparaît ensuite, comme un hébergement d’où Telegram était injoignable.',
      },
    ],
  },
  about: {
    label: 'À propos',
    title: 'Qui je suis',
    portraitAlt: 'Portrait de Pierre Gnadjro',
    paragraphs: [
      'Je m’appelle Komlan Pierre Gnadjro. Je suis en troisième année à l’Université d’État de Kalouga, en Russie, dans la spécialité « Systèmes et technologies de l’information ».',
      'Mes projets partent de besoins concrets des étudiants internationaux en Russie : envoyer un colis au pays, apprendre les phrases utiles en russe, trouver une bourse.',
    ],
    studyLabel: 'Formation',
    study: 'Systèmes et technologies de l’information, 3ᵉ année',
    universityLabel: 'Université',
    university: 'Université d’État de Kalouga',
    languagesLabel: 'Langues',
    languages: 'Français, anglais, russe',
  },
  contact: {
    label: 'Contact',
    title: 'Écrivez-moi',
    text: 'Le plus rapide est Telegram. Je réponds en français, en anglais ou en russe.',
    form: {
      nameLabel: 'Votre nom',
      contactLabel: 'Où vous répondre',
      contactHint: 'Email ou identifiant Telegram',
      messageLabel: 'Votre message',
      submit: 'Envoyer le message',
      sending: 'Envoi en cours…',
      success: 'Message envoyé. Je vous réponds dès que possible.',
      error: 'Le message n’est pas parti. Réessayez, ou écrivez-moi directement sur Telegram.',
      required: 'Ce champ est obligatoire.',
      tooShort: 'C’est un peu court.',
      tooLong: 'C’est trop long.',
    },
  },
  project: {
    back: 'Tous les projets',
    roleLabel: 'Rôle',
    stackLabel: 'Technique',
    launchedLabel: 'Lancement',
    linksLabel: 'Liens',
    tryTitle: 'Essayer le bot',
    tryText: 'Le bot est ouvert à tous sur Telegram, en français et en anglais.',
    openBot: 'Ouvrir le bot',
    openChannel: 'Voir le canal',
  },
  footer: {
    basedLabel: 'Basé à',
    based: 'Kalouga, Russie',
    emailLabel: 'Email',
    telegramLabel: 'Telegram',
  },
  notFound: {
    title: 'Page introuvable',
    back: 'Retour à l’accueil',
  },
}

export type Dict = typeof fr
