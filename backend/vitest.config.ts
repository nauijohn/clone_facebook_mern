import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true, // Optional: allows using `describe` / `it` without imports
    environment: "node", // Use Node.js environment instead of jsdom
    include: ["tests/**/*.test.ts", "src/**/*.test.ts"], // Test file pattern
    coverage: {
      reporter: ["text", "lcov"], // Optional coverage reports
      exclude: ["node_modules", "dist"],
    },
    watch: false, // Optional: disable watch mode by default
    silent: false, // Optional: log test output
    deps: {
      // inline: ["ts-node"], // Ensure TS files are run correctly
    },
  },
  resolve: {
    alias: {
      "@": "/src", // Optional: path alias
    },
  },
});
