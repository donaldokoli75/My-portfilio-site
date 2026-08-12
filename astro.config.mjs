import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Site URL is read from an environment variable so the Netlify subdomain
// (or a future custom domain like donaldokoli.com) is never hard-coded
// into the project. Set PUBLIC_SITE_URL in Netlify's environment variables.
export default defineConfig({
  site: process.env.PUBLIC_SITE_URL || 'https://donaldokoli.netlify.app',
  trailingSlash: 'never',
  integrations: [sitemap()],
});
