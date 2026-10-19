import { defineCollection, reference } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

/** A CSS object-position value such as "center 42%" or "47% 36%". */
const cssPosition = z.string().default('center');

const artists = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/artists' }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      medium: z.string(),
      /** Display order on the Home grid, Artists index, and prev/next links. */
      order: z.number().int().default(99),
      /** Used for index tiles and the artist page hero band. */
      keyWork: image().optional(),
      keyWorkPosition: cssPosition,
      /** Optional headshot. May be a crop of a group photo until headshots exist. */
      portrait: image().optional(),
      portraitPosition: cssPosition,
      /** CSS background-size for the portrait, e.g. "900% auto" to zoom into a group photo. */
      portraitSize: z.string().default('cover'),
      work: z
        .array(
          z.object({
            title: z.string(),
            /** Medium and year, e.g. "stitched satin quilt, 2026". */
            meta: z.string().optional(),
            type: z.enum(['photo', 'video']).default('photo'),
            image: image().optional(),
            position: cssPosition,
            /** Optional CSS background-size override for crops pulled from a wider shot. */
            size: z.string().optional(),
            video: z.url().optional(),
          }),
        )
        .default([]),
    }),
});

const events = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/events' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      startDate: z.coerce.date(),
      endDate: z.coerce.date(),
      venue: z.string(),
      address: z.string(),
      mapUrl: z.url().optional(),
      /** e.g. "Opening reception · Saturday, November 7 · 5–8pm" */
      reception: z.string().optional(),
      poster: image().optional(),
      /** Path under public/, e.g. "/posters/haven-collective-2026.pdf". */
      posterPdf: z.string().optional(),
      /** Path under public/, e.g. "/press/haven-collective-2026.pdf". */
      pressRelease: z.string().optional(),
      /** Hero band for past shows. */
      hero: z.object({ image: image(), position: cssPosition }).optional(),
      /** Up to three photos for the Home and Events index mosaics. Falls back to hero + photos. */
      featured: z.array(z.object({ image: image(), position: cssPosition })).max(3).optional(),
      photos: z
        .array(
          z.object({
            image: image(),
            caption: z.string().optional(),
            position: cssPosition,
            emphasis: z.enum(['none', 'tall', 'wide']).default('none'),
          }),
        )
        .default([]),
      artists: z.array(reference('artists')).default([]),
    }),
});

const site = defineCollection({
  loader: glob({ pattern: 'settings.json', base: './src/content/site' }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      location: z.string(),
      tagline: z.string(),
      contactEmail: z.email(),
      contactNote: z.string(),
      statement: z.array(z.string()).min(1),
      home: z.object({
        lead: z.string(),
        sub: z.string(),
        hero: z.object({ image: image(), position: cssPosition, caption: z.string() }),
      }),
      about: z.object({
        hero: z.object({ image: image(), position: cssPosition, caption: z.string() }),
      }),
      artistsIntro: z.string(),
    }),
});

export const collections = { artists, events, site };
