import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import { peerDependencies } from "./package.json";

function useCssPlugin(): import("vite").Plugin {
  return {
    name: "use-css",
    generateBundle(_, bundle) {
      Object.keys(bundle).forEach((file) => {
        if (file.endsWith(".js")) {
          const chunk = bundle[file];
          if (chunk && "code" in chunk) {
            // Prepend "use client" to the code
            chunk.code = `import "./style.css";\n${chunk.code}`;
          }
        }
      });
    },
  };
}

// function useClientDirectivePlugin(): import("vite").Plugin {
//   return {
//     name: "use-client-directive",
//     async closeBundle() {
//       // Read all generated files
//       const outputDir = "dist"; // Adjust if needed
//       const files = fs.readdirSync(outputDir);

//       // Add "use client" directive to each .js file
//       for (const file of files) {
//         if (file.endsWith(".js")) {
//           const filePath = path.join(outputDir, file);
//           let content = fs.readFileSync(filePath, "utf-8");

//           // Prepend "use client" to the content
//           if (!content.startsWith('"use client";')) {
//             content = `"use client";\n${content}`;
//             fs.writeFileSync(filePath, content, "utf-8");
//           }
//         }
//       }
//     },
//   };
// }
function useClientDirectivePlugin(): import("vite").Plugin {
  return {
    name: "use-client-directive",
    generateBundle(_, bundle) {
      Object.keys(bundle).forEach((file) => {
        if (file.endsWith(".js")) {
          const chunk = bundle[file];
          if (chunk && "code" in chunk) {
            // Prepend "use client" to the code
            chunk.code = `"use client";\n${chunk.code}`;
          }
        }
      });
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
  css: { modules: { scopeBehaviour: "local" } },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  plugins: [react(), dts(), useCssPlugin(), useClientDirectivePlugin()],
});
