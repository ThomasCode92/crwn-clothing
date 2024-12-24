import { CoverageV8Options } from "vitest/node";

export const coverageV8Options: CoverageV8Options = {
  include: ["src"],
  skipFull: true,
  clean: true,
  reporter: ["html", "text"],
  reportsDirectory: "./tests/coverage",
  thresholds: { statements: 90, branches: 90, functions: 90, lines: 90 },
};
