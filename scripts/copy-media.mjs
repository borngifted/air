#!/usr/bin/env node
// Copies the repository's media/ folder into a build output directory and, for
// GitHub Pages builds, adds the SPA 404 fallback and .nojekyll marker.
//
//   node scripts/copy-media.mjs dist/public [--pages]
import { cpSync, copyFileSync, existsSync, mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const outDir = path.resolve(root, process.argv[2] ?? "dist/public");
const pages = process.argv.includes("--pages");

const mediaSource = path.join(root, "media");
if (!existsSync(mediaSource)) {
  console.error(`media/ not found at ${mediaSource}`);
  process.exit(1);
}
mkdirSync(outDir, { recursive: true });
cpSync(mediaSource, path.join(outDir, "media"), { recursive: true });
console.log(`Copied media/ -> ${path.relative(root, path.join(outDir, "media"))}`);

if (pages) {
  copyFileSync(path.join(outDir, "index.html"), path.join(outDir, "404.html"));
  writeFileSync(path.join(outDir, ".nojekyll"), "");
  console.log("Added 404.html and .nojekyll for GitHub Pages");
}
