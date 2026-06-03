import path from "path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "./app")
    }
  },
  test: {
    include: ["**/*.test.{ts,tsx}"],
    exclude: ["**/node_modules/**", "**/.react-router/**"]
  }
});
