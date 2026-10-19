import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { paragraphs } from '../../lib/text';

export async function getStaticPaths() {
  const events = await getCollection('events');
  return events.map((event) => ({ params: { slug: event.id }, props: { event } }));
}

const icsDate = (d: Date) => d.toISOString().slice(0, 10).replace(/-/g, '');
const escape = (s: string) => s.replace(/\\/g, '\\\\').replace(/;/g, '\;').replace(/,/g, '\\,').replace(/\n/g, '\\n');
/** Fold lines longer than 75 octets per RFC 5545. */
const fold = (line: string) => line.match(/.{1,73}/g)?.join('\r\n ') ?? line;

export const GET: APIRoute = ({ props, site }) => {
  const { event } = props;
  const { title, startDate, endDate, venue, address, reception } = event.data;
  // DTEND is exclusive for all-day events, so add one day.
  const end = new Date(endDate.getTime() + 24 * 60 * 60 * 1000);
  const url = site ? new URL(`/events/${event.id}`, site).toString() : '';
  const description = [reception, paragraphs(event.body)[0], url].filter(Boolean).join('\n\n');

  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Haven Collective//Events//EN',
    'CALSCALE:GREGORIAN',
    'BEGIN:VEVENT',
    `UID:${event.id}@havencollective`,
    `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')}`,
    `DTSTART;VALUE=DATE:${icsDate(startDate)}`,
    `DTEND;VALUE=DATE:${icsDate(end)}`,
    `SUMMARY:${escape(title.includes('Haven Collective') ? title : `${title} · Haven Collective`)}`,
    `LOCATION:${escape(`${venue}, ${address}`)}`,
    `DESCRIPTION:${escape(description)}`,
    url && `URL:${url}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].filter(Boolean) as string[];

  return new Response(lines.map(fold).join('\r\n') + '\r\n', {
    headers: {
      'Content-Type': 'text/calendar; charset=utf-8',
      'Content-Disposition': `attachment; filename="${event.id}.ics"`,
    },
  });
};
