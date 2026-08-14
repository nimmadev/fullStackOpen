import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    include: ["src/**/*.{test,spec}.{js,jsx,ts,tsx}"],
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3030/anecdotes",
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
