import * as itemService from "../services/items.service.js";

export async function createItem(req, res, next) {
  try {
    const item = await itemService.createItem(req.data);
    res.status(200).send({
      status: "created",
      object: "item",
      item,
    });
  } catch (err) {
    next(err);
  }
}

export async function getItem(req, res, next) {
  try {
    const { id } = req.params;
    const item = await itemService.getItem(id);
    res.status(200).send({
      status: "success",
      object: "item",
      item,
    });
  } catch (err) {
    next(err);
  }
}

export async function updateItem(req, res, next) {
  try {
    const { id } = req.params;
    const item = await itemService.updateItem(id, req.data);
    res.status(200).send({
      status: "updated",
      object: "item",
      item,
    });
  } catch (err) {
    next(err);
  }
}

export async function listItems(req, res, next) {
  try {
    const { offset = 0, limit = 10 } = req.body;
    const items = await itemService.listItems({ offset, limit });
    res.status(200).send({
      status: "success",
      object: "item",
      items,
    });
  } catch (err) {
    next(err);
  }
}

export async function deleteItem(req, res, next) {
  try {
    const { id } = req.params;
    const item = await itemService.deleteItem(id);
    return res.status(200).json({
      object: "item",
      status: "deleted",
      item,
    });
  } catch (error) {
    return next(error);
  }
}
