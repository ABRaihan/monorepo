import react from "@vitejs/plugin-react";
import fs from "fs";
import path from "path";
import { defineConfig } from "vite";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";
import dts from "vite-plugin-dts";
import { peerDependencies } from "./package.json";

function useClientDirectivePlugin(): import("vite").Plugin {
  return {
    name: "use-client-directive",
    async closeBundle() {
      // Read all generated files
      const outputDir = "dist"; // Adjust if needed
      const files = fs.readdirSync(outputDir);

      // Add "use client" directive to each .js file
      for (const file of files) {
        if (file.endsWith(".js")) {
          const filePath = path.join(outputDir, file);
          let content = fs.readFileSync(filePath, "utf-8");

          // Prepend "use client" to the content
          if (!content.startsWith('"use client";')) {
            content = `"use client";\n${content}`;
            fs.writeFileSync(filePath, content, "utf-8");
          }
        }
      }
    },
  };
}

export default defineConfig({
  build: {
    lib: {
      entry: "./src/index.ts",
      name: "gen-z ui",
      fileName: (format) => `index.${format}.js`,
      formats: ["cjs", "es"],
    },
    rollupOptions: {
      external: [...Object.keys(peerDependencies)],
      output: {
        globals: {
          react: "React",
        },
      },
    },
    sourcemap: true,
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  plugins: [react(), dts(), cssInjectedByJsPlugin(), useClientDirectivePlugin()],
});
