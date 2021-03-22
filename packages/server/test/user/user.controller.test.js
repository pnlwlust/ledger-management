import chai from "chai";
import chaiHttp from "chai-http";
import jwt from "jsonwebtoken";
import { server } from "../../../src/server.js";
import User from "../../../src/services/user/user.model.js";
import AccountStatus from "../../../src/services/user/user/accountstatus.enum.js";
import Roles from "../../../src/services/user/user/roles.enum.js";

import { createUser, createAdmin } from "../../factory.js";
import createJwt from "../../testHelpers/createJwt.js";

const { expect } = chai;
chai.use(chaiHttp);

describe("POST /users/login", function () {
  describe("when email and password matches", () => {
    it("responds with bearer token", async () => {
      const email = "john@gmail.com";
      const password = "password";
      await createUser({ email });

      const response = await chai
        .request(server)
        .post("/users/login")
        .send({ email, password });

      expect(response).to.have.status(201);
      expect(response.body.object).to.equal("token");
      expect(response.body.status).to.equal("created");
      expect(response.body.token.type).to.equal("Bearer");
      expect(response.body.token.token).to.exist;
    });
  });

  describe("when user does not exists", () => {
    it("responds with authentication error", async () => {
      const response = await chai
        .request(server)
        .post("/users/login")
        .send({ email: "test@test.com", password: "random" });

      expect(response).to.have.status(401);
      expect(response.body.object).to.equal("error");
      expect(response.body.code).to.equal("authentication_error");
      expect(response.body.message).to.equal(
        "Your email or password is incorrect"
      );
    });
  });

  describe("when password is incorrect", () => {
    it("responds with authentication error", async () => {
      const email = "john@gmail.com";
      const password = "password";
      await createUser({ email, password });

      const response = await chai
        .request(server)
        .post("/users/login")
        .send({ email, password: "random" });

      expect(response).to.have.status(401);
      expect(response.body.object).to.equal("error");
      expect(response.body.code).to.equal("authentication_error");
      expect(response.body.message).to.equal(
        "Your email or password is incorrect"
      );
    });
  });
});

describe("POST /users", () => {
  describe("when authenticated", () => {
    describe("when information is not present", () => {
      it("responds with validation error", async () => {
        const response = await chai.request(server).post("/users").send({});

        expect(response).to.have.status(400);
        expect(response.body.object).to.equal("error");
        expect(response.body.code).to.equal("validation");
        expect(response.body.errors).to.eql({
          email: "Email is required",
          "name.firstName": "First name is required",
          "name.lastName": "Last name is required",
          dateOfBirth: "Date of birth is required",
          role: "Role is required",
        });
      });
    });
  });
});

describe("GET /users", function () {
  describe("when authenticated", () => {
    describe("when filtered not given", () => {
      it("responds with list of users", async () => {
        const admin = await createAdmin();
        const token = createJwt(admin);

        await Promise.all(
          Array(4)
            .fill(0)
            .map((_, index) => {
              return createUser({
                email: `john${index}@wuna.com`,
              });
            })
        );

        const response = await chai
          .request(server)
          .get("/users")
          .set("Authorization", `Bearer ${token}`);

        expect(response).to.have.status(200);
        expect(response.body.status).to.be.equal("success");
        expect(response.body.data.length).to.be.equal(4);
      });
    });

    describe("when filter is given", () => {
      it("responds with list of users", async () => {
        const admin = await createAdmin();
        const token = createJwt(admin);

        await Promise.all(
          Array(4)
            .fill(0)
            .map((_, index) => {
              return createUser({
                email: `johnapproved${index}@wuna.com`,
              });
            })
        );

        await Promise.all(
          Array(4)
            .fill(0)
            .map((_, index) => {
              return createUser({
                email: `johnnew${index}@wuna.com`,
              });
            })
        );

        const response = await chai
          .request(server)
          .get("/users")
          .set("Authorization", `Bearer ${token}`);

        expect(response).to.have.status(200);
        expect(response.body.status).to.be.equal("success");
        expect(response.body.data.length).to.be.equal(4);
      });
    });
  });

  describe("when unauthenticated", () => {
    it("responds with authentication error", async () => {
      const response = await chai.request(server).get("/users");

      expect(response).to.have.status(401);
      expect(response.body.object).to.equal("error");
      expect(response.body.code).to.equal("unauthorized");
      expect(response.body.message).to.equal("You are not authorized.");
    });
  });
});

describe("GET /users/search", () => {
  describe("when authenticated", () => {
    describe("when email is not present in query params", () => {
      it("responds with validation error", async () => {
        const user = await createAdmin();
        const token = createJwt(user);

        const response = await chai
          .request(server)
          .get("/users/search?email=")
          .set("Authorization", `Bearer ${token}`);

        expect(response).to.have.status(400);
        expect(response.body.object).to.equal("error");
        expect(response.body.code).to.equal("validation");
        expect(response.body.errors).to.exist;
      });
    });

    describe("when invalid email is present in query params", () => {
      it("responds with validation error", async () => {
        const email = "test@wuna.com";
        const user = await createAdmin({ email });
        const token = createJwt(user);

        const response = await chai
          .request(server)
          .get("/users/search")
          .query({ email: "random" })
          .set("Authorization", `Bearer ${token}`);

        expect(response).to.have.status(400);
        expect(response.body.object).to.equal("error");
        expect(response.body.code).to.equal("validation");
        expect(response.body.errors).to.exist;
      });
    });

    describe("when user present", () => {
      it("responds with user", async () => {
        const email = "admin@wuna.com";
        const user = await createAdmin({ email });
        const token = createJwt(user);

        const response = await chai
          .request(server)
          .get("/users/search")
          .query({ email: "admin@wuna.com" })
          .set("Authorization", `Bearer ${token}`);

        expect(response).to.have.status("200");
        expect(response.body.object).to.equal("user");
        expect(response.body.status).to.equal("successful");
        expect(response.body.user.email).to.be.a("string");
        expect(response.body.user.role).to.be.a("string");
      });
    });

    describe("when user is not present", () => {
      it("responds with user not found", async () => {
        const email = "admin@wuna.com";
        const user = await createAdmin({ email });
        const token = createJwt(user);

        const response = await chai
          .request(server)
          .get("/users/search")
          .query({ email: "test@test.com" })
          .set("Authorization", `Bearer ${token}`);

        expect(response).to.have.status(404);
        expect(response.body.code).to.equal("not_found");
        expect(response.body.message).to.equal("User does not exist");
      });
    });
  });

  describe("when unauthenticated", () => {
    it("responds with authentication error", async () => {
      const response = await chai
        .request(server)
        .get("/users/search?email=john@gmail.com");

      expect(response).to.have.status(401);
      expect(response.body.object).to.equal("error");
      expect(response.body.code).to.equal("unauthorized");
      expect(response.body.message).to.equal("You are not authorized.");
    });
  });
});

describe("PUT /users/:id", () => {
  describe("when authenticated", () => {
    describe("when id is invalid", () => {
      it("responds with user not found error", async () => {
        const user = await createUser();
        const token = createJwt(user);

        const response = await chai
          .request(server)
          .put("/users/random")
          .send({
            email: "user@email.com",
            name: {
              firstName: "John",
              lastName: "Doe",
            },
            dateOfBirth: Date("1990-01-01"),
          })
          .set("Authorization", `Bearer ${token}`);

        expect(response).to.have.status(404);
        expect(response.body.object).to.be.equal("error");
        expect(response.body.code).to.be.equal("user_not_found");
        expect(response.body.message).to.be.equal("User not found.");
      });
    });

    describe("when required fields are missing or invalid", () => {
      it("responds with user_validation_error", async () => {
        const user = await createUser();
        const token = createJwt(user);

        const response = await chai
          .request(server)
          .put(`/users/${user.id}`)
          .send({})
          .set("Authorization", `Bearer ${token}`);

        expect(response).to.have.status(400);
        expect(response.body.object).to.be.equal("error");
        expect(response.body.code).to.be.equal("validation");
        expect(response.body.errors).to.eql({
          email: "Email is required",
          dateOfBirth: "Date of birth is required",
          "name.firstName": "First name is required",
          "name.lastName": "Last name is required",
        });
      });
    });

    describe("when valid id and valid required fields", () => {
      it("responds with updated user", async () => {
        const user = await createUser();
        const token = createJwt(user);

        const response = await chai
          .request(server)
          .put(`/users/${user.id}`)
          .send({
            email: "newuser@email.com",
            role: Roles.USER,
            dateOfBirth: Date("1990-01-01"),
            name: {
              firstName: "John",
              lastName: "Doe",
            },
          })
          .set("Authorization", `Bearer ${token}`);

        expect(response.body.object).to.be.equal("user");
        expect(response.body.status).to.be.equal("updated");
        expect(response.body.user.email).to.exist;
        expect(response.body.user.role).to.exist;
        expect(response.body.user.dateOfBirth).to.exist;
        expect(response.body.user.name).to.exist;
      });
    });
  });

  describe("when not authenticated", () => {
    it("responds with authentication error", async () => {
      const response = await chai.request(server).put("/users/id");

      expect(response).to.have.status(401);
      expect(response.body.object).to.equal("error");
      expect(response.body.code).to.equal("unauthorized");
      expect(response.body.message).to.equal("You are not authorized.");
    });
  });
});

describe("DELETE /users/:id", () => {
  describe("when deleted by Admin", () => {
    it("soft deletes user for wuna admin", async () => {
      const admin = await createAdmin();
      const token = createJwt(admin);
      const user = await createUser();

      const response = await chai
        .request(server)
        .delete(`/users/${user.id}`)
        .set("Authorization", `Bearer ${token}`);

      expect(response.body.object).to.be.equal("user");
      expect(response.body.status).to.be.equal("deleted");
      expect(response.body.user.deleted).to.be.true;
      expect(response.body.user.deletedAt).to.exist;
      const byId = await User.findById(user.id);
      expect(byId).to.not.exist;
      const deleted = await User.findOneDeleted({
        _id: user.id,
      });
      expect(deleted).to.exist;
      expect(deleted.id).to.be.equal(user.id);
    });
  });
});
