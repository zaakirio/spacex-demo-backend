import * as _ from "lodash";
const ensureEnvVars = () => {
  const missingKeys = [
    // === APP ===
    "API_URL",
    "ADMIN_PASSWORD",
    // === MYSQL ===
    "MYSQL_DATABASE",
    "MYSQL_HOST",
    "MYSQL_USERNAME",
    "MYSQL_PASSWORD",
    // === AWS ===
    "S3_BUCKET",
  ].filter(
    requiredKey =>
      !_.has(process.env, requiredKey) || _.isEmpty(process.env[requiredKey]),
  );
  if (missingKeys.length) {
    console.error("Missing environment variables ", missingKeys.join(", "));
    process.exit(1);
  }
};

export { ensureEnvVars };
