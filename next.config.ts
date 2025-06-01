// next.config.js
const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { dev, isServer }) => {
    // Tu configuración existente para el alias @
    config.resolve.alias['@'] = path.resolve(__dirname, 'src');
    
    // Nueva configuración para reducir problemas de cache en desarrollo
    if (dev && !isServer) {
      config.cache = {
        type: 'memory',
      };
    }
    
    return config;
  },
};

module.exports = nextConfig;