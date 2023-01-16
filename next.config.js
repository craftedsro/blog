/** @type {import('next').NextConfig} */
const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

const nextConfig = (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      reactStrictMode: true,
      env: {
        mongodb_userName: "milan-blog",
        mongodb_password: "0hyuZm3aBeU9CcWk",
        mongodb_clusterName: "cluster0",
        mongodb_database: "milan-blog-dev",
      },
    };
  }

  return {
    reactStrictMode: true,
    env: {
      mongodb_userName: "milan-blog",
      mongodb_password: "0hyuZm3aBeU9CcWk",
      mongodb_clusterName: "cluster0",
      mongodb_database: "milan-blog",
    },
  };
};

module.exports = nextConfig;
