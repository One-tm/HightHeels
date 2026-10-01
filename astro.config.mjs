import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://heelsplease.ru",
  output: "static",
  integrations: [sitemap()],
});
