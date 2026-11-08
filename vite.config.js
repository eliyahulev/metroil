// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ isSsrBuild }) => ({
  plugins: [react()],
  base: "/",
  build: {
    // the server build (ssr/) needs no copy of public/
    copyPublicDir: !isSsrBuild,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (
              id.includes("react") ||
              id.includes("react-dom") ||
              id.includes("react-router")
            ) {
              return "react-vendor";
            }
            if (id.includes("firebase")) {
              return "firebase-vendor";
            }
          }
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
}));
