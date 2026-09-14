import { build } from "esbuild";

// Production must not load Vite or its plugins from the runtime-only image.
await build({
  entryPoints: ["server/_core/index.ts"],
  platform: "node",
  packages: "external",
  bundle: true,
  format: "esm",
  outdir: "dist",
  define: { "process.env.NODE_ENV": JSON.stringify("production") },
  logLevel: "info",
});
