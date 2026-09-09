function readBoolean(value: string | undefined, fallback = false) {
  if (value === undefined || value === "") return fallback;
  return ["1", "true", "yes", "on"].includes(value.trim().toLowerCase());
}

/**
 * All runtime configuration for the AiR server lives here. Every value comes
 * from ordinary environment variables so the server can run on any Node host.
 * See docs/independent-hosting.md for what each value means and how to get it.
 */
export const ENV = {
  isProduction: process.env.NODE_ENV === "production",

  // Sessions and database
  cookieSecret: process.env.JWT_SECRET ?? "",
  databaseUrl: process.env.DATABASE_URL ?? "",

  // Direct Google sign-in (OAuth 2.0 / OpenID Connect)
  googleClientId: process.env.GOOGLE_CLIENT_ID ?? "",
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",

  // Owner bootstrap: the first administrator. Either the Google account id
  // (openId, e.g. "google:1234567890") or the verified Google email.
  ownerOpenId: process.env.OWNER_OPEN_ID ?? "",
  ownerEmail: (process.env.OWNER_EMAIL ?? "").trim().toLowerCase(),

  // Public origins
  frontendOrigin: process.env.FRONTEND_ORIGIN ?? "",
  publicApiOrigin: (process.env.PUBLIC_API_ORIGIN ?? "").replace(/\/$/, ""),

  // S3-compatible object storage for uploaded course media
  s3Bucket: process.env.S3_BUCKET ?? "",
  s3Region: process.env.S3_REGION ?? "auto",
  s3Endpoint: process.env.S3_ENDPOINT ?? "",
  s3AccessKeyId: process.env.S3_ACCESS_KEY_ID ?? "",
  s3SecretAccessKey: process.env.S3_SECRET_ACCESS_KEY ?? "",
  s3ForcePathStyle: readBoolean(process.env.S3_FORCE_PATH_STYLE),
};
