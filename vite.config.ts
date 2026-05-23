import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { cloudflare } from "@cloudflare/vite-plugin";

// Standard Vite config for TanStack Start + Cloudflare Workers.
// Previously delegated to @lovable.dev/vite-tanstack-config (now removed).
//
// @cloudflare/vite-plugin is active for production builds only.
// In dev mode, TanStack Start's built-in middleware handles all routing
// (including SSR transitions like /products/1).
const isProd = process.env.NODE_ENV === "production";

export default defineConfig({
  plugins: [
    tsconfigPaths(),
    tailwindcss(),
    tanstackStart({ server: { entry: "server" } }),
    react(),
    ...(isProd ? [cloudflare({ persistState: false })] : []),
  ],
});
