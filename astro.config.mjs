// @ts-check
import { defineConfig, fontProviders } from 'astro/config';

export default defineConfig({
  site: 'https://havencollective.art',
  trailingSlash: 'never',
  fonts: [
    {
      provider: fontProviders.google(),
      name: 'Karla',
      cssVariable: '--font-karla',
      weights: [400, 500, 700, 800],
      styles: ['normal', 'italic'],
      subsets: ['latin'],
      fallbacks: ['system-ui', 'sans-serif'],
    },
    {
      provider: fontProviders.google(),
      name: 'Courier Prime',
      cssVariable: '--font-courier',
      weights: [400],
      styles: ['normal'],
      subsets: ['latin'],
      fallbacks: ['Courier New', 'monospace'],
    },
  ],
});
