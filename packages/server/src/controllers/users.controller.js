import * as userService from "../services/users.service.js";
import * as authService from "../services/auth.service.js";
import passport from "passport";
import ResponseError from "../../errors/ResponseError.js";

export function login(req, res, next) {
  passport.authenticate("login", { session: false }, (err, user) => {
    if (err) return next(err);
    if (!user && !err) {
      return next(
        new ResponseError({
          statusCode: 401,
          code: "authentication_error",
          message: "Your email or password is incorrect",
        })
      );
    }

    const token = authService.createJwt(user);

    return res.status(201).json({
      object: "token",
      status: "created",
      token: {
        type: "Bearer",
        token,
      },
    });
  })(req, res, next);
}

export async function createUser(req, res, next) {
  try {
    const user = await userService.createUser(req.data);
    res.status(200).send({
      status: "success",
      object: "user",
      user,
    });
  } catch (err) {
    next(err);
  }
}
export async function getUser(req, res, next) {
  try {
    const {id} = req.params;
    const user = await userService.getUser(id);
    res.status(200).send({
      status: "success",
      object: "user",
        user
    });
  } catch (err) {
    next(err);
  }
}

export async function listUsers(req, res, next) {
  try {
      const {offset = 0, limit = 10} = req.body;
    const users = await userService.listUsers({offset, limit});
    res.status(200).send({
      status: "success",
      object: "user",
      users
    });
  } catch (err) {
    next(err);
  }
}
