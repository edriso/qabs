import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

const base = process.env.VITE_BASE_PATH || "/";
const siteUrl = process.env.VITE_SITE_URL?.trim();
const shareCard = siteUrl
  ? new URL("og.png", siteUrl.endsWith("/") ? siteUrl : `${siteUrl}/`).href
  : `${base}og.png`;

export default defineConfig({
  base,
  plugins: [
    react(),
    {
      name: "share-card-address",
      transformIndexHtml(html) {
        if (!html.includes("%SHARE_CARD%")) {
          throw new Error("index.html is missing the share-card token.");
        }
        return html.replaceAll("%SHARE_CARD%", shareCard);
      },
    },
  ],
  test: {
    environment: "jsdom",
    setupFiles: "./src/test-setup.ts",
  },
});
