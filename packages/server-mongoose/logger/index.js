import path, { dirname } from "path";
import fs from "fs";
import rfs from "rotating-file-stream";
import logger from "morgan";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const logPath = path.join(__dirname, "../logs");

if (!fs.existsSync(logPath)) fs.mkdirSync(logPath);

const pad = (num) => (num > 9 ? "" : "0") + num;
const generator = (time, index) => {
  if (!time) return "file.log";

  var month = time.getFullYear() + "" + pad(time.getMonth() + 1);
  var day = pad(time.getDate());
  var hour = pad(time.getHours());
  var minute = pad(time.getMinutes());

  return `${month}/${month}${day}-${hour}${minute}-${index}-file.log`;
};

const stream = rfs.createStream(generator, {
  size: "10M",
  interval: "1d",
  path: logPath,
});

export default (app) => {
  app.use(logger("dev", { stream: stream }));
};
