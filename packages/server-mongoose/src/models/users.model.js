import mongoose from "mongoose";
import passwordHash from "password-hash";
import mongoosePaginate from "mongoose-paginate-v2";
import Roles from "./roles.enum.js";
import Address from "./address.model.js";
import mongooseSoftDelete from "mongoose-delete";

const { Schema } = mongoose;

const Name = new Schema(
  {
    firstName: { type: String, required: true },
    middleName: { type: String },
    lastName: { type: String, required: true },
  },
  { _id: false }
);

const UserSchema = new Schema(
  {
    username: { type: String, required: true, unique: true, email: true },
    password: { type: String, required: true },
    token: [{ type: String }],
    resetToken: [{ type: String }],
    name: Name,
    dateOfBirth: { type: Date },
    address: Address,
    role: {
      type: String,
      enum: Roles.all(),
      default: Roles.USER,
    },
  },
  { timestamps: true }
);

UserSchema.virtual("fullName").get(function () {
  return `${this.name.firstName} ${this.name.lastName}`;
});

UserSchema.pre("save", async function save(next) {
  if (!this.isModified("password")) return next();

  try {
    this.password = passwordHash.generate(this.password);
    return next();
  } catch (err) {
    return next(err);
  }
});

UserSchema.methods.isAdminUser = function () {
  return this.role === Roles.ADMIN;
};

UserSchema.methods.isUser = function () {
  return this.role === Roles.USER;
};

UserSchema.plugin(mongoosePaginate);
UserSchema.plugin(mongooseSoftDelete, {
  deletedAt: true,
  deletedBy: true,
  overrideMethods: true,
});

UserSchema.index({ email: 1 }, { unique: true });

// create the model to export
const User = mongoose.model("User", UserSchema);

export default User;
