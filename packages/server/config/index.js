import _ from 'lodash';
import db from "./db.js";
import auth from "./auth.js";
import cors from "./cors.js";

const environment =process.env.NODE_ENV || 'development'
const config = {};
config.db = _.merge(db[environment], db['development']);
config.auth = _.merge(auth[environment], auth['development']);
config.cors = _.merge(cors[environment], cors['development']);

export default config;
