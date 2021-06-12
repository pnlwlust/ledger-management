import mongoose from "mongoose";
import chai from "chai";
import User from "../../src/models/users.model.js";

const { expect } = chai;

xdescribe("User model", () => {
  after((done) => {
    mongoose.connection.collections.users.drop(() => {
      done();
    });
  });

  it("should be invalid if username is empty", (done) => {
    const user = new User({ password: "xyz" });

    user.validate(function (err) {
      expect(err.errors.email).to.exist;
      done();
    });
  });

  it("should save user if username and password are valid", (done) => {
    const user = new User({
      username: "testing@testing.com",
      password: "testing@123",
    });

    user.validate(function (err) {
      expect(err).to.not.exist;
      done();
    });
  });

  it("should have created_at and updated_at dates", () => {
    const user = new User({
      username: "testing@testing.com",
      password: "testing@123",
    });

    return user.save().then((user) => {
      expect(user.createdAt).to.exist;
      expect(user.createdAt).to.be.an.instanceOf(Date);
      expect(user.updatedAt).to.exist;
      expect(user.updatedAt).to.be.an.instanceOf(Date);
      user.remove();
    });
  });
});
