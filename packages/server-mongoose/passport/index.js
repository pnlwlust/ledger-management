import passport from "passport";
import passwordHash from "password-hash";
import { Strategy as LocalStrategy } from "passport-local";
import passportJWT from "passport-jwt";
import UserRepository from "../src/repositories/users.repository.js";

const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

// Todo
// 1. We need to store token somewhere
// 2. We need to check if token if it's stored or not while authenticating
// 3. We need to destroy saved tokens on logout
// 4. We need to delete all tokens on password reset
// 5. Rewrite in async/await style
// 6. Standard error response

export default () => {
  passport.use(
    "login",
    new LocalStrategy(
      {
        usernameField: "username",
        passwordField: "password",
      },
      (username, password, cb) =>
        UserRepository.findByUsername(username)
          .then((user) => {
            if (!user) {
              return cb(null, null);
            }

            if (passwordHash.verify(password, user.password)) {
              return cb(null, user);
            }

            return cb(null, null);
          })
          .catch((err) => cb(err))
    )
  );

  passport.use(
    "authenticate",
    new JWTStrategy(
      {
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET,
      },
      (jwtPayload, cb) =>
        UserRepository.findById(jwtPayload.id)
          .then((user) => {
            if (user) return cb(null, user);

            return cb(null, null);
          })
          .catch((err) => cb(err))
    )
  );
};
