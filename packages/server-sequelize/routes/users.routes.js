import {
  createUser, deleteUser,
  getUser, listUsers,
  login, resetPassword, updateUser,
} from "../src/controllers/users.controller.js";
import * as schema from "../src/validations/users.validationSchema.js";
import validate from "../middleware/validate.js";
import authenticate from "../middleware/authenticate.js";
import authorize from "../middleware/authorize.js";
import Roles from "../src/models/roles.enum.js";

export default (app) => {
  app.route("/users").post(validate(schema.createUser),createUser);
  app.route("/users").patch(validate(schema.updateUser),updateUser);
  app.route("/users/login").post(login);
  app.route("/users").get(authenticate, listUsers);
  app.route("/users/:id").get(authenticate, getUser);
  app.route("/users/:id").delete(authenticate, authorize([Roles.ADMIN]), deleteUser);
  app.route("/users/:id/reset-password").patch(authenticate, authorize([Roles.USER]), validate(schema.resetPassword), resetPassword);
};
