# Portfolio — Pierre Gnadjro

Lire ce fichier avant tout travail important sur le projet.

## Objectif

Portfolio personnel de Komlan Pierre Gnadjro, étudiant en 3ᵉ année « Systèmes et technologies de
l'information » à l'Université d'État de Kalouga. Cibles, par ordre de priorité : clients
freelance, recruteurs de stage, comités d'admission et de bourses. Le site doit ressembler à
son portfolio, pas à un portfolio généré.

## Stack

React 19, TypeScript, Vite, Tailwind CSS 4, React Router, Lucide React, ESLint, Prettier.
Framer Motion a été retiré : les animations sont en CSS, pour ne pas masquer le contenu
pré-rendu avant le chargement du JavaScript. Polices auto-hébergées via Fontsource (Unbounded, Golos Text). Aucune autre
dépendance sans justifier : pourquoi, ce qu'elle apporte, pourquoi pas une solution native.

## Commandes

- `npm install` : à lancer une fois sur la machine (les modules ne sont pas versionnés)
- `npm run dev` : serveur de développement
- `npm run lint` : ESLint, zéro erreur attendu
- `npm run build` : vérification TypeScript, build, puis pré-rendu HTML de chaque route
- `npm run preview` : sert le dossier `dist`
- `npm run format` : Prettier

## Architecture

- Routes : `/` (anglais pré-rendu, puis redirection vers la langue du navigateur), `/:lang`,
  `/:lang/projects/:slug`, 404. Langues : `fr`, `en`, `ru`.
- `src/i18n/` : `fr.ts` est le dictionnaire source ; `en.ts` et `ru.ts` sont typés `Dict`, donc
  une clé manquante casse la compilation. Pas de bibliothèque i18n.
- `src/data/projects.ts` : un objet par projet. Ajouter un projet ne demande aucun changement
  de composant. Seuls les projets `live` ont une page détaillée pré-rendue.
- `src/components/` : `ui/` (briques), `layout/` (en-tête, pied, SEO), `sections/` (blocs de
  page). `src/pages/` assemble les sections.
- `src/styles/index.css` : tous les tokens dans `@theme`. Pas de valeur arbitraire dans les
  composants.
- `src/entry-server.tsx` + `scripts/prerender.mjs` : génèrent un HTML statique par route. Toute
  nouvelle route doit être ajoutée à `routes` dans `entry-server.tsx`. Aucun accès à `window`
  ou `document` pendant le rendu, seulement dans `useEffect`.
- Hébergement : GitHub Pages, publié par `.github/workflows/deploy.yml` à chaque envoi sur
  `main`. Fichiers statiques uniquement.
- Contact : boutons Telegram et email. `ContactForm` n'est affiché que si
  `site.contactEndpoint` est renseigné ; il vaut `null` sur GitHub Pages. Le service Python de
  `server/contact/` (transmission sur Telegram) ne sert que pour un hébergement sur VPS. Les
  limites de longueur des champs doivent rester identiques côté formulaire et côté serveur.

## Règles UI — direction « Bordereau »

- Fond encre `#101311`, texte papier `#ECE8DD`, un seul accent jaune `#F5B70A` réservé aux
  actions et au nom.
- Titres en Unbounded très gras, texte en Golos Text. Deux familles, pas plus.
- Les métadonnées se présentent comme des champs d'étiquette : petit libellé en capitales
  espacées, valeur dessous.
- Angles presque droits (4 à 6 px), traits fins, pas d'ombres, pas de dégradés, pas de
  glassmorphism.
- Projets en liste numérotée, pas en grille de cartes.
- Animations rares et utiles ; tout respecte `prefers-reduced-motion`.
- Mobile d'abord, avec sa propre hiérarchie. Largeurs à tester : 320, 375, 390, 430, 768,
  1024, 1280, 1440, 1920.
- Avant chaque choix visuel : « pourrait-il apparaître dans mille portfolios générés ? ». Si
  oui, le repenser.

## Règles de contenu

- Ne jamais inventer client, chiffre, entreprise, résultat, expérience, diplôme, compétence ou
  témoignage. Information manquante : `[CONTENT NEEDED]`. Image manquante : `[IMAGE NEEDED]`.
- Ton humain, précis, simple. Pas de phrases marketing génériques.
- Compétences affichées : Python et aiogram, HTML, CSS, JavaScript, PHP, SQL et MySQL,
  déploiement sur VPS Linux. C#, Cisco Packet Tracer et Android restent en retrait.
- Projets en ligne et achevés : Kilos Russie ↔ Afrique (bot, canal et site) et PronoMax
  (application Android et site). RusStart et Scholarship Finder restent « en cours ».
- Kilos : décrire le modèle (gratuit, porté par les dons), jamais de montants. Les chiffres
  d'usage ne viennent que d'une source réelle (le site de Kilos) et portent leur date.
- Pas de section « Expérience ».
- Chaque texte existe en français, anglais et russe. Le français est rédigé en premier.

## Accessibilité et SEO

`src/lib/seo.ts` définit titre, description, canonical et hreflang de chaque URL ; le
pré-rendu en tire les balises `<head>`, `sitemap.xml` et la ligne Sitemap de `robots.txt`.
L'adresse du site est dans `src/data/site.ts` (`url`) : à mettre à jour avec le vrai domaine.

HTML sémantique, navigation au clavier, focus visible, contrastes suffisants, `alt` sur les
images, une seule balise `h1` par page, `lang` correct sur `<html>`.

## Procédure de test

Avant de considérer un travail terminé : `npm run lint` puis `npm run build`, sans erreur.
Vérifier ensuite la console du navigateur, les liens, les trois langues, le responsive, la
page 404 et le formulaire.
