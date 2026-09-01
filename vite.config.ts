import { reactRouter } from "@react-router/dev/vite";
import path from "path";
import { defineConfig } from "vite";
import devtoolsJson from "vite-plugin-devtools-json";

export default defineConfig(({ command }) => ({
  base:
    command === "build"
      ? "https://cdn.nav.no/teamdagpenger/dp-kalkulator-frontend/client/"
      : "/dagpenger/",

  plugins: [reactRouter(), devtoolsJson()],

  server: {
    open: "/dagpenger/kalkulator"
  },

  build: {
    manifest: true,
    sourcemap: process.env.NODE_ENV !== "production"
  },

  resolve: {
    alias: {
      "~": path.resolve(import.meta.dirname, "./app")
    },
    tsconfigPaths: true
  }
}));
