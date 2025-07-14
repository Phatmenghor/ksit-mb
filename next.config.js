/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: false,
    remotePatterns: [
      {
        protocol: "http",
        hostname: "**",
      },
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.stats = "errors-only";
    config.ignoreWarnings = [
      /Module not found/,
      /Can't resolve/,
      /Critical dependency/,
      /the request of a dependency is an expression/,
    ];
    config.bail = false;
    return config;
  },
  // No headers = No CSP restrictions for full-stack flexibility
};

module.exports = nextConfig;
