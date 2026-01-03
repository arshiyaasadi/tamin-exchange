/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // #region agent log
  webpack: (config, { isServer, dev }) => {
    const fs = require('fs');
    const logPath = '/Users/arshiyaasadi/Projects/tamin-exchange/.cursor/debug.log';
    try {
      fs.appendFileSync(logPath, JSON.stringify({
        location: 'next.config.js:webpack',
        message: 'Webpack config execution',
        data: { isServer, dev, buildId: process.env.NEXT_BUILD_ID || 'unknown' },
        timestamp: Date.now(),
        sessionId: 'debug-session',
        runId: 'run1',
        hypothesisId: 'E'
      }) + '\n');
    } catch(e) {}
    return config;
  },
  // #endregion
}

module.exports = nextConfig

