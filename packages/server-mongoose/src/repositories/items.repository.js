import mongoose from "mongoose";
import Item from "../models/items.model.js";
import ResponseError from "../../errors/ResponseError.js";

export class ItemNotFound extends ResponseError {
  constructor() {
    super({
      statusCode: 404,
      code: "item_not_found",
      message: "Item not found.",
    });
  }
}
const ItemRepository = {
  save: (item) => {
    return item.save();
  },
  create: (params) => {
    console.log("Creating user");
    return Item.create(params);
  },
  update: (id, options) => {
    console.log(`Updating item ${id}`);
    const item = Item.findById(id);

    if (!item) throw new ItemNotFound();

    item.name = name;
    return item.save();
  },
  findByCode: (code) => {
    return Item.findOne({ code });
  },
  findById: async (id) => {
    if (!mongoose.Types.ObjectId.isValid(id)) throw new ItemNotFound();

    const item = await Item.findById(id);
    if (!item) throw new ItemNotFound();

    return item;
  },
  findAll(options) {
    return Item.find({ where: { ...options } });
  },

  delete: async (id) => {
    if (!mongoose.Types.ObjectId.isValid(id)) throw new ItemNotFound();

    const item = await ItemRepository.findById(id);

    return item.delete();
  },
};
export default ItemRepository;
