// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ isSsrBuild }) => ({
  plugins: [react()],
  base: "/",
  // the server build carries its libraries inside it, so api/render.js needs no node_modules
  ssr: { noExternal: true },
  build: {
    // the server build (ssr/) needs no copy of public/
    copyPublicDir: !isSsrBuild,
    rollupOptions: {
      output: {
        // vendor chunks are for the browser's cache; the server build keeps Rollup's own split
        manualChunks: isSsrBuild ? undefined : (id) => {
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
