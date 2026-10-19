/** Prefix a site-root path with the configured base (needed for GitHub Pages project sites). */
const base = import.meta.env.BASE_URL.replace(/\/$/, '');
export const url = (path: string) => `${base}${path}`;
