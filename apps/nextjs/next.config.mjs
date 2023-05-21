import i18nConfig from "./next-i18next.config.js";
const { i18n } = i18nConfig;

// @ts-check
/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
 * This is especially useful for Docker builds.
 */
!process.env.SKIP_ENV_VALIDATION && (await import("./src/env/server.mjs"));

/** @type {import("next").NextConfig} */
const config = {
  i18n,
  reactStrictMode: true,
  swcMinify: true,
  transpilePackages: ["@sensor/api", "@sensor/db", "@sensor/ui"],
  // We already do linting on GH actions
  eslint: {
    ignoreDuringBuilds: !!process.env.CI,
  },
};

export default config;
