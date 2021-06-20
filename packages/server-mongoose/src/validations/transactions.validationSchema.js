import * as yup from "yup";

export const getTransactions = yup.object().shape({
  page: yup.number(),
  per_page: yup.number(),
});

export const createTransaction = yup.object().shape({
  saleDate: yup.date().typeError("Date of sale invalid"),
  item: yup.string,
});

export const updateTransaction = yup.object().shape({
  saleDate: yup.date().typeError("Date of sale invalid"),
  item: yup.string,
});
