import * as yup from "yup";

export const getItems = yup.object().shape({
  page: yup.number(),
  per_page: yup.number(),
});

export const createItem = yup.object().shape({
  entryDate: yup.date().typeError("Date of entry invalid"),
  name: yup.string,
});

export const updateItem = yup.object().shape({
  entryDate: yup.date().typeError("Date of entry invalid"),
  name: yup.string,
});
