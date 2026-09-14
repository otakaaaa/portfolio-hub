import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    setupFiles: ["./src/test/setup.ts"],
    exclude: ["e2e/**", "node_modules/**", ".next/**"],
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      thresholds: {
        branches: 80,
        functions: 80,
        lines: 80,
        statements: 80,
      },
      include: [
        "src/domain/**/*.ts",
        "src/features/**/*.ts",
        "src/components/intro/interactive-intro.tsx",
        "src/components/layout/theme-toggle.tsx",
        "src/components/projects/project-explorer.tsx",
        "src/components/projects/project-links.tsx",
      ],
    },
  },
  resolve: {
    alias: {
      "@": `${import.meta.dirname}/src`,
    },
  },
});
