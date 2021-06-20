import * as schema from "../src/validations/items.validationSchema.js";
import validate from "../middleware/validate.js";
import authenticate from "../middleware/authenticate.js";
import {
  createItem,
  getItem,
  listItems,
  updateItem,
} from "../src/controllers/items.controller.js";

export default (app) => {
  app.route("/items").post(validate(schema.createItem), createItem);
  app.route("/items").patch(validate(schema.updateItem), updateItem);
  app.route("/items").get(authenticate, listItems);
  app.route("/items/:id").get(authenticate, getItem);
};
