import { defineConfig } from "vitest/config";

export default defineConfig({
  server: {
    host: "0.0.0.0",
  },
  test: {
    globals: true,
  },
});
