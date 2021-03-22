import {
  createUser,
  getUser, listUsers,
  login,
} from "../src/controllers/users.controller.js";
import * as schema from "../src/validations/users.validationSchema.js";
import validate from "../middleware/validate.js";

export default (app) => {
  app.route("/users").post(validate(schema.createUser),createUser);
  app.route("/users/login").post(login);
  app.route("/users").get(listUsers);
  app.route("/users/:id").get(getUser);
};
