import Roles from "../src/models/roles.enum.js";
import User from "../src/models/users.model.js";

export async function createUser({
  username = "user@email.com",
  password = "password",
  role = Roles.USER,
  dateOfBirth = Date("1990-01-01"),
  name = {
    firstName: "John",
    lastName: "Doe",
  },
  ...rest
} = {}) {
  return User.create({
    username,
    password,
    role,
    name,
    dateOfBirth,
    ...rest,
  });
}

export async function createAdmin(params = {}) {
  return createUser({
    username: "admin@wuna.com",
    ...params,
    role: Roles.ADMIN,
  });
}
