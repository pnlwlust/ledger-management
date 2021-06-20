import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import mongooseSoftDelete from "mongoose-delete";

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const TransactionSchema = new Schema(
  {
    item: { type: ObjectId, ref: "Item" },
    salePrice: { type: String },
    saleDate: Date,
  },
  { timestamps: true }
);
TransactionSchema.plugin(mongoosePaginate);
TransactionSchema.plugin(mongooseSoftDelete, {
  deletedAt: true,
  deletedBy: true,
  overrideMethods: true,
});

TransactionSchema.index({ name: 1, code });

// create the model to export
const Transaction = mongoose.model("Transaction", TransactionSchema);

export default Transaction;
