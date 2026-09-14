// Production entrypoint: apply pending migrations, then start the server.
// A plain Node script avoids shell quoting differences between hosts.
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const migrate = fileURLToPath(new URL("./migrate.mjs", import.meta.url));
const result = spawnSync(process.execPath, [migrate], { stdio: "inherit" });
if (result.status !== 0) {
  console.error("Startup stopped: migrations did not complete.");
  process.exit(result.status ?? 1);
}
await import("../dist/index.js");
