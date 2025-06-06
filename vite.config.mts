import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    dir: "src",
    workspace: [
      {
        extends: true,
        test: {
          name: "e2e",
          dir: "src/http/controllers/tests",
          environment: `./prisma/vitest-environment-prisma/prisma-test-environment.ts`,
        },
      },
      {
        extends: true,
        test: {
          name: "unit",
          dir: "src/http/services/tests",
        },
      },
    ],
  },
});
