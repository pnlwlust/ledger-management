import * as schema from "../src/validations/transactions.validationSchema.js";
import validate from "../middleware/validate.js";
import authenticate from "../middleware/authenticate.js";
import {
  createTransaction,
  getTransaction,
  listTransactions,
  updateTransaction,
} from "../src/controllers/transactions.controller.js";

export default (app) => {
  app
    .route("/transactions")
    .post(validate(schema.createTransaction), createTransaction);
  app
    .route("/transactions")
    .patch(validate(schema.updateTransaction), updateTransaction);
  app.route("/transactions").get(authenticate, listTransactions);
  app.route("/transactions/:id").get(authenticate, getTransaction);
};
