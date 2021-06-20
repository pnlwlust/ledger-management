import ItemRepository from "../repositories/items.repository.js";

export function createItem(params) {
  const { name, code, description, priceCode } = params;

  return ItemRepository.create({ name, code, description, priceCode });
}

export function updateItem(id, params) {
  return ItemRepository.update(id, params);
}

export async function getItem(id) {
  return ItemRepository.findById(id);
}

export async function listItems(options) {
  return ItemRepository.findAll(options);
}

export async function deleteItem(id) {
  return ItemRepository.delete(id);
}
