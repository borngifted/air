import { describe, expect, it } from "vitest";
import { databaseOptions } from "../scripts/database-config.mjs";

describe("hosted database configuration", () => {
  it("verifies TiDB certificates even when a copied URL tries to disable TLS checks", () => {
    const uri = 'mysql://test:fake@gateway.us-east-1.prod.aws.tidbcloud.com:4000/air?ssl={"rejectUnauthorized":false}';
    expect(databaseOptions({ DATABASE_URL: uri, DATABASE_SSL: "false" }).ssl)
      .toEqual({ rejectUnauthorized: true, verifyIdentity: true });
  });
  it("supports verified TLS on other hosted MySQL services", () => {
    expect(databaseOptions({ DATABASE_URL: "mysql://test:fake@db.example.com/air", DATABASE_SSL: "true" }).ssl)
      .toEqual({ rejectUnauthorized: true, verifyIdentity: true });
  });
  it("keeps localhost usable without a TLS certificate", () => {
    expect(databaseOptions({ DATABASE_URL: "mysql://test:fake@localhost/air" }).ssl).toBeUndefined();
  });
  it("does not echo invalid credentials in configuration errors", () => {
    expect(() => databaseOptions({ DATABASE_URL: "postgres://private:secret@localhost/air" }))
      .toThrow("DATABASE_URL must be a MySQL URL.");
  });
});
