/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // #region agent log
  webpack: (config, { isServer, dev }) => {
    // Only log in development and if logPath exists
    if (dev && typeof process !== 'undefined' && process.env) {
      try {
        const fs = require('fs');
        const logPath = '/Users/arshiyaasadi/Projects/tamin-exchange/.cursor/debug.log';
        if (fs.existsSync(logPath)) {
          fs.appendFileSync(logPath, JSON.stringify({
            location: 'next.config.js:webpack',
            message: 'Webpack config execution',
            data: { isServer, dev, buildId: process.env.NEXT_BUILD_ID || 'unknown' },
            timestamp: Date.now(),
            sessionId: 'debug-session',
            runId: 'run1',
            hypothesisId: 'E'
          }) + '\n');
        }
      } catch(e) {
        // Silently fail in production
      }
    }
    return config;
  },
  // #endregion
}

module.exports = nextConfig

