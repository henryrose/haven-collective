import { getCollection, type CollectionEntry } from 'astro:content';

export type EventEntry = CollectionEntry<'events'>;

/** Today at UTC midnight. Content dates are date-only, so they parse as UTC midnight too. */
export function todayUTC(): Date {
  const now = new Date();
  return new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()));
}

export function isUpcoming(event: EventEntry, today = todayUTC()): boolean {
  return event.data.endDate.getTime() >= today.getTime();
}

/** Events split by status: upcoming soonest-first, past most-recent-first. */
export async function getEventsByStatus(today = todayUTC()) {
  const all = await getCollection('events');
  const upcoming = all
    .filter((e) => isUpcoming(e, today))
    .sort((a, b) => a.data.startDate.getTime() - b.data.startDate.getTime());
  const past = all
    .filter((e) => !isUpcoming(e, today))
    .sort((a, b) => b.data.startDate.getTime() - a.data.startDate.getTime());
  return { upcoming, past };
}

const UTC = { timeZone: 'UTC' } as const;
const fmt = (d: Date, opts: Intl.DateTimeFormatOptions) =>
  new Intl.DateTimeFormat('en-US', { ...UTC, ...opts }).format(d);

/**
 * "November 7, 2026", "August 22–23, 2026", "Aug 22–23, 2026", or
 * "August 30 – September 2, 2026" when a range crosses months.
 */
export function formatDateRange(start: Date, end: Date, month: 'long' | 'short' = 'long'): string {
  const sameDay = start.getTime() === end.getTime();
  const sameMonth =
    start.getUTCFullYear() === end.getUTCFullYear() && start.getUTCMonth() === end.getUTCMonth();
  const year = fmt(end, { year: 'numeric' });
  if (sameDay) return `${fmt(start, { month, day: 'numeric' })}, ${year}`;
  if (sameMonth) return `${fmt(start, { month, day: 'numeric' })}–${fmt(end, { day: 'numeric' })}, ${year}`;
  return `${fmt(start, { month, day: 'numeric' })} – ${fmt(end, { month, day: 'numeric' })}, ${year}`;
}

/** "Saturday, November 7, 2026" */
export function formatLongDate(d: Date): string {
  return fmt(d, { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
}

/** Three images for the Home and Events-index mosaics: explicit `featured`, else hero + photos. */
export function mosaicImages(event: EventEntry) {
  const { featured, hero, photos } = event.data;
  if (featured && featured.length) return featured.slice(0, 3);
  const pool = [
    ...(hero ? [{ image: hero.image, position: hero.position }] : []),
    ...photos.map((p) => ({ image: p.image, position: p.position })),
  ];
  const seen = new Set<string>();
  return pool.filter((p) => !seen.has(p.image.src) && seen.add(p.image.src)).slice(0, 3);
}

/** City only, for compact venue lines: "1030 Lawrence St, Port Townsend, WA" → "Port Townsend". */
export function shortAddress(address: string): string {
  const parts = address.split(',').map((s) => s.trim());
  if (parts.length >= 3) return parts[parts.length - 2]!;
  return address.replace(/,\s*[A-Z]{2}$/, '');
}

/** Events sorted oldest-first, for previous/next links. */
export async function getEventsChronological() {
  const all = await getCollection('events');
  return all.sort((a, b) => a.data.startDate.getTime() - b.data.startDate.getTime());
}
