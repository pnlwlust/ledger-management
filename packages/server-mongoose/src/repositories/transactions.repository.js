import mongoose from "mongoose";
import Transaction from "../models/transactions.model.js";
import ResponseError from "../../errors/ResponseError.js";

export class TransactionNotFound extends ResponseError {
  constructor() {
    super({
      statusCode: 404,
      code: "transaction_not_found",
      message: "Transaction not found.",
    });
  }
}
const TransactionRepository = {
  save: (transaction) => {
    return transaction.save();
  },
  create: (params) => {
    console.log("Creating Transaction");
    return Transaction.create(params);
  },
  update: (id, options) => {
    console.log(`Updating transaction ${id}`);
    const transaction = Transaction.findById(id);

    if (!transaction) throw new TransactionNotFound();

    transaction.name = name;
    return transaction.save();
  },
  findByCode: (code) => {
    return Transaction.findOne({ code });
  },
  findById: async (id) => {
    if (!mongoose.Types.ObjectId.isValid(id)) throw new TransactionNotFound();

    const transaction = await Transaction.findById(id);
    if (!transaction) throw new TransactionNotFound();

    return transaction;
  },
  findAll(options) {
    return Transaction.find({ where: { ...options } });
  },

  delete: async (id) => {
    if (!mongoose.Types.ObjectId.isValid(id)) throw new TransactionNotFound();

    const transaction = await TransactionRepository.findById(id);

    return transaction.delete();
  },
};
export default TransactionRepository;
