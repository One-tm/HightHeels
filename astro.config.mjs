import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://heelsplease.ru",
  output: "static",
  build: {
    inlineStylesheets: "always",
  },
  integrations: [
    sitemap({
      filter: (page) => ["https://heelsplease.ru/", "https://heelsplease.ru/catalog/"].includes(page),
    }),
  ],
});
