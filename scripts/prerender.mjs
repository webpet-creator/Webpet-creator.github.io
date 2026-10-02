// Génère un fichier HTML par route, avec ses balises <head>, pour que les aperçus de liens
// (Telegram, etc.) et les moteurs de recherche lisent tout sans exécuter de JavaScript.
// Produit aussi sitemap.xml et complète robots.txt.
import { appendFile, mkdir, readdir, readFile, rm, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const dist = join(root, 'dist')

const template = await readFile(join(dist, 'index.html'), 'utf8')
const { render, routes, langs } = await import(
  pathToFileURL(join(root, 'dist-ssr', 'entry-server.js')).href
)

const esc = (text) =>
  text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

const OG_LOCALE = { fr: 'fr_FR', en: 'en_US', ru: 'ru_RU' }

// Polices à précharger : le latin partout, le cyrillique en plus pour le russe.
const assets = await readdir(join(dist, 'assets'))
const font = (prefix) => assets.find((name) => name.startsWith(prefix) && name.endsWith('.woff2'))
const FONTS = {
  latin: [font('unbounded-latin-wght'), font('golos-text-latin-wght')],
  cyrillic: [font('unbounded-cyrillic-wght'), font('golos-text-cyrillic-wght')],
}

function headFor(meta) {
  const fonts = [...FONTS.latin, ...(meta.lang === 'ru' ? FONTS.cyrillic : [])].filter(Boolean)
  return [
    `<title>${esc(meta.title)}</title>`,
    `<meta name="description" content="${esc(meta.description)}" />`,
    meta.noindex
      ? '<meta name="robots" content="noindex" />'
      : `<link rel="canonical" href="${meta.canonical}" />`,
    ...meta.alternates.map(
      (alt) => `<link rel="alternate" hreflang="${alt.hrefLang}" href="${alt.href}" />`,
    ),
    '<meta property="og:type" content="website" />',
    '<meta property="og:site_name" content="Pierre Gnadjro" />',
    `<meta property="og:title" content="${esc(meta.title)}" />`,
    `<meta property="og:description" content="${esc(meta.description)}" />`,
    `<meta property="og:url" content="${meta.canonical}" />`,
    `<meta property="og:locale" content="${OG_LOCALE[meta.lang]}" />`,
    `<meta property="og:image" content="${meta.image}" />`,
    '<meta property="og:image:width" content="1200" />',
    '<meta property="og:image:height" content="630" />',
    '<meta name="twitter:card" content="summary_large_image" />',
    `<meta name="twitter:title" content="${esc(meta.title)}" />`,
    `<meta name="twitter:description" content="${esc(meta.description)}" />`,
    `<meta name="twitter:image" content="${meta.image}" />`,
    ...fonts.map(
      (name) =>
        `<link rel="preload" as="font" type="font/woff2" href="/assets/${name}" crossorigin />`,
    ),
    meta.jsonLd
      ? `<script type="application/ld+json">${JSON.stringify(meta.jsonLd).replace(/</g, '\\u003c')}</script>`
      : '',
  ]
    .filter(Boolean)
    .join('\n    ')
}

// Page racine : redirection vers la langue du navigateur avant tout affichage.
// Sans JavaScript (robots, aperçus de liens), le contenu anglais pré-rendu reste lisible.
const rootRedirect = `<script>(function(){var s=${JSON.stringify(langs.all)},n=navigator.languages||[navigator.language];for(var i=0;i<n.length;i++){var c=String(n[i]||'').slice(0,2).toLowerCase();if(s.indexOf(c)>-1){location.replace('/'+c);return}}location.replace('/${langs.fallback}')})()</script>`

const sitemapEntries = []

for (const route of routes) {
  const { html, meta } = render(route)
  const page = template
    .replace('<html lang="en">', `<html lang="${meta.lang}">`)
    .replace(/<title>.*?<\/title>/, headFor(meta) + (route === '/' ? '\n    ' + rootRedirect : ''))
    .replace('<!--app-->', html)

  const file =
    route === '/' ? 'index.html' : route === '/404' ? '404.html' : join(route, 'index.html')
  await mkdir(dirname(join(dist, file)), { recursive: true })
  await writeFile(join(dist, file), page)
  console.log('prerendered', route)

  if (!meta.noindex && route !== '/') {
    const links = meta.alternates
      .map(
        (alt) => `    <xhtml:link rel="alternate" hreflang="${alt.hrefLang}" href="${alt.href}" />`,
      )
      .join('\n')
    sitemapEntries.push(`  <url>\n    <loc>${meta.canonical}</loc>\n${links}\n  </url>`)
  }
}

const origin = new URL(render('/').meta.canonical).origin
await writeFile(
  join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${sitemapEntries.join('\n')}\n</urlset>\n`,
)
await appendFile(join(dist, 'robots.txt'), `Sitemap: ${origin}/sitemap.xml\n`)
console.log('sitemap.xml:', sitemapEntries.length, 'urls')

await rm(join(root, 'dist-ssr'), { recursive: true, force: true })
