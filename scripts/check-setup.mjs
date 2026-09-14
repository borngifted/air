import "dotenv/config";
import mysql from "mysql2/promise";
import { databaseOptions } from "./database-config.mjs";
if (!process.env.PUBLIC_API_ORIGIN && process.env.RENDER_EXTERNAL_URL) {
  process.env.PUBLIC_API_ORIGIN = process.env.RENDER_EXTERNAL_URL;
}
const issues = [];
for (const key of ["DATABASE_URL", "JWT_SECRET", "GOOGLE_CLIENT_ID", "GOOGLE_CLIENT_SECRET", "FRONTEND_ORIGIN", "PUBLIC_API_ORIGIN"]) {
  const value = process.env[key] || "";
  if (!value || /replace-with|YOUR-|USER:PASSWORD/.test(value)) issues.push(`${key} needs a real value.`);
}
if (process.env.JWT_SECRET && process.env.JWT_SECRET.length < 32) issues.push("JWT_SECRET needs at least 32 random characters.");
for (const key of ["PUBLIC_API_ORIGIN", "FRONTEND_ORIGIN"]) {
  if (!process.env[key]) continue;
  try {
    const url = new URL(process.env[key]);
    if (url.protocol !== "https:" && !(url.protocol === "http:" && ["localhost", "127.0.0.1"].includes(url.hostname))) throw new Error();
    if (url.username || url.password || url.search || url.hash) throw new Error();
  } catch { issues.push(`${key} must be an HTTPS URL (HTTP is allowed on localhost).`); }
}
if (issues.length) {
  console.error("AiR setup is incomplete:\n" + issues.map(issue => `- ${issue}`).join("\n"));
  process.exitCode = 1;
} else {
  let connection;
  try {
    connection = await mysql.createConnection(databaseOptions());
    await connection.query("SELECT id FROM users LIMIT 0");
    await connection.query("SELECT id, version, reflections FROM projects LIMIT 0");
    console.log("Database connected. Account and project tables are ready.");
    console.log("Google credentials are present; a real Google sign-in is still required to verify them.");
    console.log(`Register this Google callback: ${process.env.PUBLIC_API_ORIGIN.replace(/\/$/, "")}/api/oauth/callback`);
  } catch {
    console.error("Database check failed. Check DATABASE_URL and run pnpm db:migrate. No credentials were printed.");
    process.exitCode = 1;
  } finally { await connection?.end(); }
}
