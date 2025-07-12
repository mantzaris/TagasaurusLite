import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
// import routify from '@roxi/routify/vite-plugin' 

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  base: "./", // Use relative paths for electron
  build: {
    outDir: "../dist/renderer/",
  },
});
