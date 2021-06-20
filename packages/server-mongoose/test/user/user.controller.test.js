import chai from "chai";
import chaiHttp from "chai-http";
import { server } from "../../bin/www.js";
import User from "../../src/models/users.model.js";
import Roles from "../../src/models/roles.enum.js";

import { createUser, createAdmin } from "../factory.js";
import { createJwt } from "../../src/services/auth.service.js";
import mongoose from "mongoose";

const { expect } = chai;
chai.use(chaiHttp);
before(function (done) {
  mongoose.connect(
    process.env.MONGOOSE_TEST_URI || "mongodb://localhost/test",
    {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
    }
  );
  done();
});

after(function (done) {
  mongoose.disconnect();
  done();
});

describe("POST /users/login", function () {
  const username = "john@gmail.com";
  const password = "password";
  beforeEach(async function () {
    await createUser({ username, password });
  });
  afterEach(async function () {
    await mongoose.connection.db.dropDatabase();
  });
  describe("when passing correct username and password", async () => {
    const response = await chai
      .request(server)
      .post("/users/login")
      .send({ username, password });
    it("responds with bearer token", async () => {
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
        .send({ username: "test@test.com", password: "random" });

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
      const response = await chai
        .request(server)
        .post("/users/login")
        .send({ username, password: "random" });

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

        console.log(response.body);
        expect(response).to.have.status(400);
        expect(response.body.object).to.equal("error");
        expect(response.body.code).to.equal("validation");
        expect(response.body.errors).to.eql({
          username: "Email is required",
          confirmPassword: "Confirm password is required",
          "name.firstName": "First name is required",
          "name.lastName": "Last name is required",
          password: "Password is required",
        });
      });
    });
  });
});

describe("GET /users", function () {
  describe("when authenticated", async () => {
    const admin = await createAdmin();
    const token = createJwt(admin);

    describe("when filtered not given", () => {
      it("responds with list of users", async () => {
        await Promise.all(
          Array(4)
            .fill(0)
            .map((_, index) => {
              return createUser({
                username: `john${index}@wuna.com`,
              });
            })
        );

        const response = await chai
          .request(server)
          .get("/users")
          .set("Authorization", `Bearer ${token}`);

        expect(response).to.have.status(200);
        expect(response.body.status).to.be.equal("success");
        expect(response.body.users.length).to.be.equal(4);
      });
    });

    describe("when filter is given", () => {
      it("responds with list of users", async () => {
        await Promise.all(
          Array(4)
            .fill(0)
            .map((_, index) => {
              return createUser({
                username: `johnapproved${index}@wuna.com`,
              });
            })
        );

        await Promise.all(
          Array(4)
            .fill(0)
            .map((_, index) => {
              return createUser({
                username: `johnnew${index}@wuna.com`,
              });
            })
        );

        const response = await chai
          .request(server)
          .get("/users")
          .set("Authorization", `Bearer ${token}`);

        expect(response).to.have.status(200);
        expect(response.body.status).to.be.equal("success");
        expect(response.body.users.length).to.be.equal(4);
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

xdescribe("GET /users/search", async () => {
  const username = "test@wuna.com";
  const user = await createAdmin({ username });
  const token = createJwt(user);
  xdescribe("when authenticated", () => {
    xdescribe("when username is not present in query params", () => {
      it("responds with validation error", async () => {
        const response = await chai
          .request(server)
          .get("/users/search?username=")
          .set("Authorization", `Bearer ${token}`);

        expect(response).to.have.status(400);
        expect(response.body.object).to.equal("error");
        expect(response.body.code).to.equal("validation");
        expect(response.body.errors).to.exist;
      });
    });

    xdescribe("when invalid username is present in query params", () => {
      it("responds with validation error", async () => {
        const response = await chai
          .request(server)
          .get("/users/search")
          .query({ username: "random" })
          .set("Authorization", `Bearer ${token}`);

        expect(response).to.have.status(400);
        expect(response.body.object).to.equal("error");
        expect(response.body.code).to.equal("validation");
        expect(response.body.errors).to.exist;
      });
    });

    xdescribe("when user present", () => {
      it("responds with user", async () => {
        const response = await chai
          .request(server)
          .get("/users/search")
          .query({ username: "admin@wuna.com" })
          .set("Authorization", `Bearer ${token}`);

        expect(response).to.have.status("200");
        expect(response.body.object).to.equal("user");
        expect(response.body.status).to.equal("successful");
        expect(response.body.user.username).to.be.a("string");
        expect(response.body.user.role).to.be.a("string");
      });
    });

    xdescribe("when user is not present", () => {
      it("responds with user not found", async () => {
        const response = await chai
          .request(server)
          .get("/users/search")
          .query({ username: "test@test.com" })
          .set("Authorization", `Bearer ${token}`);

        expect(response).to.have.status(404);
        expect(response.body.code).to.equal("not_found");
        expect(response.body.message).to.equal("User does not exist");
      });
    });
  });

  xdescribe("when unauthenticated", () => {
    it("responds with authentication error", async () => {
      const response = await chai
        .request(server)
        .get("/users/search?username=john@gmail.com");

      expect(response).to.have.status(401);
      expect(response.body.object).to.equal("error");
      expect(response.body.code).to.equal("unauthorized");
      expect(response.body.message).to.equal("You are not authorized.");
    });
  });
});

describe("PUT /users/:id", async () => {
  const user = await createUser();
  const token = createJwt(user);
  describe("when authenticated", () => {
    describe("when id is invalid", () => {
      it("responds with user not found error", async () => {
        const response = await chai
          .request(server)
          .put("/users/random")
          .send({
            username: "user@email.com",
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
        const response = await chai
          .request(server)
          .put(`/users/${user.id}`)
          .send({})
          .set("Authorization", `Bearer ${token}`);

        expect(response).to.have.status(400);
        expect(response.body.object).to.be.equal("error");
        expect(response.body.code).to.be.equal("validation");
        expect(response.body.errors).to.eql({
          username: "Email is required",
          dateOfBirth: "Date of birth is required",
          "name.firstName": "First name is required",
          "name.lastName": "Last name is required",
        });
      });
    });

    describe("when valid id and valid required fields", () => {
      it("responds with updated user", async () => {
        const response = await chai
          .request(server)
          .put(`/users/${user.id}`)
          .send({
            username: "newuser@email.com",
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
        expect(response.body.user.username).to.exist;
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
