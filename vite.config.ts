import { reactRouter } from "@react-router/dev/vite";
import path from "path";
import { defineConfig, type ViteDevServer } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

const devtoolsJson = {
  name: "devtools-json",
  configureServer(server: ViteDevServer) {
    server.middlewares.use((req, res, next) => {
      if (req.url === "/.well-known/appspecific/com.chrome.devtools.json") {
        res.setHeader("Content-Type", "application/json; charset=utf-8");
        res.setHeader("Cache-Control", "no-store");
        res.end("{}");
        return;
      }

      next();
    });
  }
};

export default defineConfig({
  plugins: [reactRouter(), tsconfigPaths(), devtoolsJson],
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "./app")
    }
  }
});
