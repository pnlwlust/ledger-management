import mongoose from "mongoose";

const { Schema } = mongoose;

const Address = new Schema(
  {
    addressLine1: { type: String, required: true },
    addressLine2: { type: String },
    suburb: { type: String, required: true },
    state: { type: String, required: true },
    postal: { type: String, required: true, maxlength: 4, minlength: 4 },
  },
  { _id: false }
);

export default Address;
