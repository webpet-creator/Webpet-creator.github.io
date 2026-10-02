/** Coordonnées affichées sur le site. Un seul endroit à modifier. */
export const site = {
  /** Adresse publique du site, sans barre finale. À changer si le site déménage. */
  url: 'https://webpet-creator.github.io',
  name: 'Pierre Gnadjro',
  fullName: 'Komlan Pierre Gnadjro',
  email: 'pierregnadjro26@gmail.com',
  telegram: { handle: '@devPierre', href: 'https://t.me/devPierre' },
  /**
   * Adresse du service qui transmet le formulaire sur Telegram, ou `null` pour masquer le
   * formulaire. GitHub Pages ne sert que des fichiers : il n'y a pas de service, donc `null`.
   * Sur le VPS (voir server/README.md), remettre '/api/contact'.
   */
  contactEndpoint: null as string | null,
}
