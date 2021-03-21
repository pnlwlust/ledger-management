import db from './db.js';
import auth from './auth.js';
import cors from './cors.js';

const config = {};
config.db = db[process.env.NODE_ENV];
config.auth = auth[process.env.NODE_ENV];
config.cors = cors[process.env.NODE_ENV];

export default config;
