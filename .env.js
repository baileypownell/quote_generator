const path = require("path");
const APP_ENV = process.env.APP_ENV ?? "development";
const envPath = path.resolve(__dirname, `.env.${APP_ENV}`);

require("dotenv").config({
  path: envPath,
});

const Env = {
  APP_ENV,
  APININJAS_API_KEY: process.env.APININJAS_API_KEY,
  GOOGLE_SEARCH_API_KEY: process.env.GOOGLE_SEARCH_API_KEY,
  GOOGLE_SEARCH_ENGINE_ID: process.env.GOOGLE_SEARCH_ENGINE_ID,
  SERVER_URL: process.env.SERVER_URL,
};

module.exports = {
  Env,
};
