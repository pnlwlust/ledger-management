import express from 'express';
import path, {dirname} from 'path';
import cookieParser  from 'cookie-parser';
import {fileURLToPath} from "url";

import initLogger  from './logger/index.js';
import initRoutes from './routes/index.js';
import config from "./config/index.js";
import connectDatabase from "./db/db.js";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//init db
connectDatabase(config.db);
//init logger
initLogger(app);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));// parse req.body
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Initialize routes
initRoutes(app);
// app.use('/users', usersRouter);

export default app;
