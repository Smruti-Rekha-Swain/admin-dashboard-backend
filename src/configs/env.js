import fs from "fs";
import path from "path";
import dotenv from "dotenv";

function loadEnvFiles() {
  const mode = process.env.NODE_ENV || "dev";
  const envFile = `.env.${mode}`;
  const envPath = path.resolve(process.cwd(), envFile);

  dotenv.config({ path: [".env", envPath], override: true, quiet: true });
}

function required(name) {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env var: ${name}`);
  return v;
}

function initEnv() {
  loadEnvFiles();

  const nodeEnv = required("NODE_ENV");
  const port = Number(required("PORT"));

  const dbUri = required("DB_URI");
  const logLevel = required("LOG_LEVEL");
  const jwtsecret = required("JWT_SECRET");
  const JwtExpiry = required("JWT_EXPIRES_IN");

  return {
    nodeEnv,
    port,
    dbUri,
    logLevel,
    jwtsecret,
    JwtExpiry,
  };
}

export const envConfig = initEnv();