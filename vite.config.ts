import { defineConfig } from "vite";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    tsconfigPaths(),
    tailwindcss(),
    TanStackRouterVite(),
    react(),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"],
          router: ["@tanstack/react-router", "@tanstack/router-plugin"],
          query: ["@tanstack/react-query"],
          ui: ["lucide-react", "sonner", "vaul", "embla-carousel-react"],
        },
      },
    },
  },
});
