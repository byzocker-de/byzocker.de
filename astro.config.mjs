import { defineConfig } from 'astro/config';
import robotsTxt from "astro-robots-txt";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: 'https://byzocker.de',
  integrations: [robotsTxt({
    host: 'byzocker.de',
    policy: [{
      userAgent: '*',
      allow: '/',
      crawlDelay: 2
    }]
  })]
});