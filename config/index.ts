import { ensureEnvVars } from "./ensureEnvVars";]
import { nodeEnv, NodeEnv } from "./nodeEnv";

interface AuthScope {
  userId?: string;
  ip?: string;
  userAgent?: string;
  deviceUniqueIdentifier?: string;
  apollographqlClientVersion?: number;
  apollographqlClientName?: string;
}

interface Config {
  apiUrl: string;
  accessKeyId: string;
  secretAccessKey: string;
  bucketName: string;
  nodeEnv: NodeEnv;
  mysql: {
    database: string;
    host: string;
    username: string;
    password: string;
  };
  userProfileFolder: string;
  staticAssetsUrl: string;
  adminPassword: string;
  onesignalKey: string;
  onesignalApp: string;
  onesignalKeyProvider: string;
  onesignalAppProvider: string;
  apolloEngineTag: string;
  apolloEngineKey: string;
  jest: boolean;
  sentryDSN: string;
  applicationTokens: {
    cms: string;
    mobile: string;
    website: string;
  };
}

interface GraphqlContext {
  userId?: string;
  ip?: string;
  userAgent?: string;
  deviceUniqueIdentifier?: string;
  apollographqlClientVersion?: number;
  apollographqlClientName?: string;
}

const config: Config = {
  apiUrl: process.env.API_URL || "",
  adminPassword: process.env.ADMIN_PASSWORD || "",
  accessKeyId: process.env.CUSTOM_AWS_ACCESS_KEY_ID || "",
  secretAccessKey: process.env.CUSTOM_AWS_SECRET_ACCESS_KEY || "",
  bucketName: process.env.S3_BUCKET || "",
  mysql: {
    database: process.env.MYSQL_DATABASE || "",
    host: process.env.MYSQL_HOST || "",
    username: process.env.MYSQL_USERNAME || "",
    password: process.env.MYSQL_PASSWORD || "",
  },
  onesignalKey: process.env.ONESIGNAL_KEY || "",
  onesignalApp: process.env.ONESIGNAL_APP || "",
  onesignalKeyProvider: process.env.ONESIGNAL_KEY_PROVIDER || "",
  onesignalAppProvider: process.env.ONESIGNAL_APP_PROVIDER || "",
  nodeEnv,
  userProfileFolder: "customers/profile",
  staticAssetsUrl: `https://s3.eu-west-1.amazonaws.com/${process.env.S3_BUCKET}`,
  apolloEngineTag: process.env.ENGINE_SCHEMA_TAG || "",
  apolloEngineKey: process.env.ENGINE_API_KEY || "",
  sentryDSN: process.env.SENTRY_DSN || "",
  applicationTokens: {
    cms: process.env.CMS_APP_TOKEN || "",
    mobile: process.env.MOBILE_APP_TOKEN || "",
    website: process.env.WEBSITE_APP_TOKEN || "",
  },
  jest: typeof jest !== "undefined",
};

if (Boolean(parseInt(process.env.DEBUG_CONFIG || "0", 10))) {
  console.info(JSON.stringify({ config }, null, 2));
}

const isValidEnvKey = (key: string) => {
  return key.length > 0 && key !== ".";
};

const isProviderAndroid = (authScope: AuthScope): boolean | undefined => {
  return authScope.apollographqlClientName === "react-native-provider-android";
};

const isProviderIOS = (authScope: AuthScope): boolean | undefined => {
  return authScope.apollographqlClientName === "react-native-provider-ios";
};

const isVersionGreater = (
  version: number,
  authScope: AuthScope,
): boolean | undefined => {
  return (authScope.apollographqlClientVersion || 0) > version;
};

export {
  config,
  ensureEnvVars,
  isValidEnvKey,
  isProviderAndroid,
  isProviderIOS,
  isVersionGreater,
  GraphqlContext,
  AuthScope,
};
