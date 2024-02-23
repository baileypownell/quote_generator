import { Env } from "./.env.js";

module.exports = {
  name: "DailyQuotes",
  slug: "DailyQuotes",
  version: "1.0.0",
  orientation: "portrait",
  userInterfaceStyle: "light",
  splash: {
    resizeMode: "contain",
    backgroundColor: "#ffffff",
  },
  assetBundlePatterns: ["**/*"],
  ios: {
    supportsTablet: true,
  },
  android: {
    package: "com.dailyquotes",
  },
  extra: {
    ...Env,
    eas: {
      projectId: "cd01b8ec-fa98-47a8-a7d1-8da3c7225957",
    },
  },
};
