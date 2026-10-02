# Portfolio — Pierre Gnadjro

Site personnel en français, anglais et russe. Les règles du projet sont dans `CLAUDE.md`.

## Travailler en local

Il faut Node.js 22 ou plus récent.

```bash
npm install     # une seule fois
npm run dev     # site de développement
npm run lint    # vérification du code
npm run build   # construit le site dans dist/
npm run preview # sert dist/ pour un dernier contrôle
```

## Modifier le contenu

| Quoi                             | Où                                        |
| -------------------------------- | ----------------------------------------- |
| Textes du site                   | `src/i18n/fr.ts`, puis `en.ts` et `ru.ts` |
| Projets                          | `src/data/projects.ts`                    |
| Étude de cas d'un projet         | `src/data/caseStudies.ts`                 |
| Email, Telegram, adresse du site | `src/data/site.ts`                        |
| Couleurs, polices, rayons        | `src/styles/index.css`                    |
| Images d'un projet               | `src/assets/projects/<projet>/`           |

## Mettre en ligne

Le site est hébergé sur GitHub Pages : https://webpet-creator.github.io

Chaque envoi sur la branche `main` reconstruit et publie le site automatiquement
(`.github/workflows/deploy.yml`). Pour publier une modification :

```bash
git add .
git commit -m "Description de la modification"
git push
```

Le suivi de la publication se trouve dans l'onglet Actions du dépôt.

### Plus tard : VPS et formulaire de contact

GitHub Pages ne sert que des fichiers, donc le formulaire de contact est masqué. Pour
l'activer, il faut héberger le site sur le VPS : voir `server/README.md`, puis mettre
`contactEndpoint: '/api/contact'` et la nouvelle adresse dans `src/data/site.ts`.
