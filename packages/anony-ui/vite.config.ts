import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import { peerDependencies } from "./package.json";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: {
        index: path.resolve(__dirname, "src/index.ts"),
        utils: path.resolve(__dirname, "src/utils/index.ts"),
      },
      name: "polish",
      fileName: (format, entryName) => {
        switch (entryName) {
          case "utils":
            return `${entryName}/index.${format}.js`;
          default:
            return `${entryName}.${format}.js`;
        }
      },
      formats: ["es", "cjs"],
    },
    rollupOptions: {
      external: [...Object.keys(peerDependencies)],
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  plugins: [react(), dts({ tsconfigPath: path.resolve(__dirname, "tsconfig.app.json") })],
});
