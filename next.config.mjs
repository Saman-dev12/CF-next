import { setupDevPlatform } from "@cloudflare/next-on-pages/next-dev";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

// Set up the development platform integration if we're in development mode
if (process.env.NODE_ENV === "development") {
  setupDevPlatform();
}

export default nextConfig;
