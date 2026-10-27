import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  integrations: [tailwind()],
  i18n: {
    locales: ['ru', 'ua', 'en'],
    defaultLocale: 'ru',
    routing: { prefixDefaultLocale: true, redirectToDefaultLocale: false },
  },
});
