#!/usr/bin/env node
// Copies the GitHub Pages build (dist/public) to the repository root, which is
// the Pages source for borngifted/air (branch main, folder /).
//
//   pnpm build:pages && node scripts/publish-pages.mjs
//
// media/ already lives at the root, so it is not copied again. An existing
// root air-config.js is preserved so a configured apiOrigin survives rebuilds.
import { cpSync, existsSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const dist = path.join(root, "dist", "public");
if (!existsSync(path.join(dist, "index.html"))) {
  console.error("dist/public/index.html not found. Run `pnpm build:pages` first.");
  process.exit(1);
}

const keepConfig = existsSync(path.join(root, "air-config.js"))
  ? readFileSync(path.join(root, "air-config.js"), "utf8")
  : null;

rmSync(path.join(root, "assets"), { recursive: true, force: true });
cpSync(path.join(dist, "assets"), path.join(root, "assets"), { recursive: true });
for (const file of ["index.html", "404.html", ".nojekyll", "air-config.js"]) {
  cpSync(path.join(dist, file), path.join(root, file));
}
if (keepConfig !== null) {
  writeFileSync(path.join(root, "air-config.js"), keepConfig);
  console.log("Preserved existing root air-config.js");
}
console.log("Published dist/public -> repository root");
