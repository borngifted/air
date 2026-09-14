import "dotenv/config";
import { fileURLToPath } from "node:url";
import mysql from "mysql2/promise";
import { drizzle } from "drizzle-orm/mysql2";
import { migrate } from "drizzle-orm/mysql2/migrator";
import { databaseOptions } from "./database-config.mjs";

if (!process.env.DATABASE_URL) {
  console.error("DATABASE_URL is required to apply AiR database migrations.");
  process.exitCode = 1;
} else {
  let connection;
  try {
    connection = await mysql.createConnection(databaseOptions());
    await migrate(drizzle(connection), {
      migrationsFolder: fileURLToPath(new URL("../drizzle", import.meta.url)),
    });
    console.log("AiR database migrations applied successfully.");
  } catch (error) {
    console.error("Migration failed. Check database access and the migration history before retrying.");
    // Connection errors can contain credentials; print only the error code.
    if (error && typeof error.code === "string") console.error(`Database error code: ${error.code}`);
    process.exitCode = 1;
  } finally {
    await connection?.end();
  }
}
