import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import mongooseSoftDelete from "mongoose-delete";

const { Schema } = mongoose;

const ItemSchema = new Schema(
  {
    name: { type: String },
    code: { type: String },
    description: { type: String },
    priceCode: { type: String },
    brand: { type: String },
    ageGroup: { type: String },
    entryDate: Date,
  },
  { timestamps: true }
);
ItemSchema.plugin(mongoosePaginate);
ItemSchema.plugin(mongooseSoftDelete, {
  deletedAt: true,
  deletedBy: true,
  overrideMethods: true,
});

ItemSchema.index({ name: 1, code });

// create the model to export
const Item = mongoose.model("Item", ItemSchema);

export default Item;
