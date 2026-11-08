/**
 * Les textes sont dans les dictionnaires (`skills.items`), les technologies ici.
 * `usedIn` : slugs des projets où la compétence a réellement servi (lien vers leur page).
 */
export const skillGroups = [
  { id: 'bots', tags: ['Python', 'aiogram'], usedIn: ['kilos-russie-afrique'] },
  { id: 'web', tags: ['HTML', 'CSS', 'JavaScript', 'PHP', 'SQL', 'MySQL'], usedIn: [] },
  { id: 'deploy', tags: ['Linux', 'Debian', 'VPS'], usedIn: ['kilos-russie-afrique'] },
] as const
