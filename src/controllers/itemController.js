const itemService = require("../services/itemService");

async function getItems(req, res) {
  try {
    const items = await itemService.getAllItems();
    res.status(200).json(items);
  } catch (error) {
    console.error("Error fetching items:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function getItemById(req, res) {
  try {
    const item = await itemService.getItemById(req.params.id);
    if (!item) {
        return res.status(404).json({ error: "Item not found" });
    }
    res.status(200).json(item);
  } catch (error) {
    console.error("Error fetching item:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function createItem(req, res) {
  return toHttp(res, async () => {
    const id = await itemService.createItem(req.body);
    res.status(201).json({ id });
  });
}

async function updateItem(req, res) {
  try {
    await itemService.updateItem(req.params.id, req.body);
    res.status(204).send();
  } catch (error) {
    console.error("Error updating item:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function deleteItem(req, res) {
  try {
    await itemService.deleteItem(req.params.id);
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting item:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {
  getItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
};