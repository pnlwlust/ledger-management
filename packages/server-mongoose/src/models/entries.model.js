import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import mongooseSoftDelete from "mongoose-delete";

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const EntrySchema = new Schema(
  {
    item: { type: ObjectId, ref: "Item" },
    noOfItems: { type: Number },
    description: { type: String },
    entryDate: Date,
  },
  { timestamps: true }
);
EntrySchema.plugin(mongoosePaginate);
EntrySchema.plugin(mongooseSoftDelete, {
  deletedAt: true,
  deletedBy: true,
  overrideMethods: true,
});

EntrySchema.index({ name: 1, code });

// create the model to export
const Entry = mongoose.model("Entry", EntrySchema);

export default Entry;
