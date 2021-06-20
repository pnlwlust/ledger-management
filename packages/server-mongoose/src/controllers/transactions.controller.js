import * as transactionService from "../services/transactions.service.js";

export async function createTransaction(req, res, next) {
  try {
    const transaction = await transactionService.createTransaction(req.data);
    res.status(200).send({
      status: "created",
      object: "transaction",
      transaction,
    });
  } catch (err) {
    next(err);
  }
}

export async function getTransaction(req, res, next) {
  try {
    const { id } = req.params;
    const transaction = await transactionService.getTransaction(id);
    res.status(200).send({
      status: "success",
      object: "transaction",
      transaction,
    });
  } catch (err) {
    next(err);
  }
}

export async function updateTransaction(req, res, next) {
  try {
    const { id } = req.params;
    const transaction = await transactionService.updateTransaction(
      id,
      req.data
    );
    res.status(200).send({
      status: "updated",
      object: "transaction",
      transaction,
    });
  } catch (err) {
    next(err);
  }
}

export async function listTransactions(req, res, next) {
  try {
    const { offset = 0, limit = 10 } = req.body;
    const transactions = await transactionService.listTransactions({
      offset,
      limit,
    });
    res.status(200).send({
      status: "success",
      object: "transaction",
      transactions,
    });
  } catch (err) {
    next(err);
  }
}

export async function deleteTransaction(req, res, next) {
  try {
    const { id } = req.params;
    const transaction = await transactionService.deleteTransaction(id);
    return res.status(200).json({
      object: "transaction",
      status: "deleted",
      transaction,
    });
  } catch (error) {
    return next(error);
  }
}
