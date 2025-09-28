import { defineConfig } from "vite";
import path from "path";
import directoryIndex from "vite-plugin-directory-index";

const CHOSEN_INPUT = process.env.VITE_INPUT || "";
const IN_DIR = "animations";
const OUT_DIR = path.join("dist", CHOSEN_INPUT);
const isDev = process.env.NODE_ENV === "development";
const ROOT_DIR = isDev ? IN_DIR : path.join(IN_DIR, CHOSEN_INPUT);

export default defineConfig({
  root: ROOT_DIR,
  base: "./",
  publicDir: path.resolve(__dirname, "public"),
  build: {
    modulePreload: { polyfill: false },
    outDir: path.join(__dirname, OUT_DIR),
    emptyOutDir: true,
    minify: false,

    rollupOptions: {
      input: isDev ? path.resolve(__dirname, ROOT_DIR) : path.resolve(__dirname, ROOT_DIR, "index.html"),
    },
  },
  esbuild: isDev ? true : false, // disable to prevent esbuild full minification
  experimental: {
    renderBuiltUrl(filename, { hostId, hostType, type }) {
      const folder = path.dirname(hostId);
      const fileFolder = path.dirname(filename);

      if (folder === fileFolder) {
        return `./${path.basename(filename)}`;
      }
    },
  },
  plugins: [directoryIndex()],
  server: {
    fs: {
      deny: [".DS_Store"],
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: "modern-compiler", // or "modern", "legacy"
      },
    },
  },
});
