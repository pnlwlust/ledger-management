import usersRoutes from "./users.routes.js";
import itemsRoutes from "./items.routes.js";

export default (app) => {
  usersRoutes(app);
  itemsRoutes(app);
};
