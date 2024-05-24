import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";
export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    environmentMatchGlobs: [
      [
        "src/http/controllers/**",
        "./prisma-test-environment/prisma-test-environment.ts",
      ],
    ],
    dir: "src",
  },
});

//     "./prisma-test-envirnoment/prisma-test-environment.ts",
