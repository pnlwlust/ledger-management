import TransactionRepository from "../repositories/transactions.repository.js";

export function createTransaction(params) {
  const { name, code, description, priceCode } = params;

  return TransactionRepository.create({ name, code, description, priceCode });
}

export function updateTransaction(id, params) {
  return TransactionRepository.update(id, params);
}

export async function getTransaction(id) {
  return TransactionRepository.findById(id);
}

export async function listTransactions(options) {
  return TransactionRepository.findAll(options);
}

export async function deleteTransaction(id) {
  return TransactionRepository.delete(id);
}
