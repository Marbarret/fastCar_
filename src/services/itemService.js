const { getConnectionToDB } = require("../db");
const { COLLECTIONS } = require("../utils/constants");
const { ObjectId } = require("mongodb");

async function getAllItems() {
  const db = getConnectionToDB();
  const items = await db.collection(COLLECTIONS.ITEMS).find().toArray();
  return items;
}

async function createItem(itemData) {
  if (!itemData || typeof itemData !== "object" || Array.isArray(itemData)) {
    const err = new Error("Invalid payload");
    err.status = 400;
    throw err;
  }
  const db = getConnectionToDB();
  const { insertedId } = await db
    .collection(COLLECTIONS.ITEMS)
    .insertOne(itemData);
  return insertedId;
}

async function getItemById(itemId) {
  const db = getConnectionToDB();
  const item = await db
    .collection(COLLECTIONS.ITEMS)
    .findOne({ _id: new ObjectId(itemId) });
  return item;
}

async function updateItem(itemId, updateData) {
  const db = getConnectionToDB();
  await db
    .collection(COLLECTIONS.ITEMS)
    .updateOne({ _id: new ObjectId(itemId) }, { $set: updateData });
}

async function deleteItem(itemId) {
  const db = getConnectionToDB();
  await db
    .collection(COLLECTIONS.ITEMS)
    .deleteOne({ _id: new ObjectId(itemId) });
}

module.exports = {
  getAllItems,
  createItem,
  getItemById,
  updateItem,
  deleteItem,
};
