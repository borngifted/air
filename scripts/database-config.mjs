// Shared by the server, migrations, and setup check. TiDB Starter uses a
// publicly trusted certificate; keep certificate and hostname checks enabled.
export function databaseOptions(env = process.env) {
  const uri = env.DATABASE_URL;
  if (!uri) throw new Error("DATABASE_URL is required.");
  let url;
  try { url = new URL(uri); } catch { throw new Error("DATABASE_URL must be a MySQL URL."); }
  if (url.protocol !== "mysql:") throw new Error("DATABASE_URL must be a MySQL URL.");
  const tls = env.DATABASE_SSL === "true" || url.hostname.endsWith(".tidbcloud.com");
  return {
    uri,
    connectTimeout: 10000,
    ...(tls ? { ssl: { rejectUnauthorized: true, verifyIdentity: true } } : {}),
  };
}
