import { defineConfig } from 'astro/config';
import robotsTxt from "astro-robots-txt";
import sitemap from "@astrojs/sitemap";
import react from "@astrojs/react";

import node from "@astrojs/node";

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
  })],
  output: "server",
  adapter: node({
    mode: "standalone"
  }),
  redirects:{
    '/l/yt': 'https://youtube.com',
    '/l/spotify': 'https://open.spotify.com'
  }
});