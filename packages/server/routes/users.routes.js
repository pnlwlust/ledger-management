import {createUser, getUser} from "../src/controllers/users.controller.js";

export default (app) => {
  app.route("/users").post(createUser)
  app.route("/users").get(getUser)
}