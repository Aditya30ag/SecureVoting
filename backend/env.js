/**
 * env.js - Central environment variable loader.
 * Import/require this file FIRST in any script that needs env vars (seed, scripts, etc.).
 * In the main app (server.ts), it is already loaded at the top before anything else.
 */
const path = require('path');
const dotenv = require('dotenv');

const envFile = process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development';
const envPath = path.resolve(__dirname, envFile);

const result = dotenv.config({ path: envPath });

if (result.error) {
  console.warn(`⚠️  Could not load ${envPath}. Falling back to process environment.`);
}

module.exports = {};
