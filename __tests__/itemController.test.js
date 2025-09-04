const request = require("supertest");
const sinon = require("sinon");

const itemController = require("../src/controllers/itemController");
const itemService = require("../src/services/itemService");

describe("itemController", () => {
  let statusStub, jsonStub, sendStub;

  beforeEach(() => {
    statusStub = sinon.stub();
    jsonStub = sinon.stub();
    sendStub = sinon.stub();

    this.res = {
      status: statusStub,
      json: jsonStub,
      send: sendStub,
    }; // Mock response object
    statusStub.returns(this.res); // To allow chaining
  });

  afterEach(() => {
    sinon.restore();
  });

  describe("getItems", () => {
    it("retorna todos os itens - status 200", async () => {
      const fakeItems = [
        { id: 1, name: "Item1" },
        { id: 2, name: "Item2" },
      ];
      sinon.stub(itemService, "getAllItems").resolves(fakeItems);

      await itemController.getItems({}, this.res);

      expect(statusStub.calledWith(200)).toBe(true);
      expect(jsonStub.calledWith(fakeItems)).toBe(true);
    });

    it("retorna error - status 500", async () => {
      sinon.stub(itemService, "getAllItems").rejects(new Error("DB error"));

      await itemController.getItems({}, this.res);

      expect(statusStub.calledWith(500)).toBe(true);
      expect(jsonStub.calledWith({ error: "Internal server error" })).toBe(
        true
      );
    });
  });

  describe("getItemById", () => {
    it("retorna o item pelo ID - status 200", async () => {
      const fakeItem = { id: 1, name: "Item1" };
      sinon.stub(itemService, "getItemById").resolves(fakeItem);

      const req = { params: { id: "1" } };
      await itemController.getItemById(req, this.res);

      expect(statusStub.calledWith(200)).toBe(true);
      expect(jsonStub.calledWith(fakeItem)).toBe(true);
    });

    it("item não encontrado - status 404", async () => {
      sinon.stub(itemService, "getItemById").resolves(null);

      const req = { params: { id: "999" } };
      await itemController.getItemById(req, this.res);

      expect(statusStub.calledWith(404)).toBe(true);
      expect(jsonStub.calledWith({ error: "Item not found" })).toBe(true);
    });

    it("retorna error - status 500", async () => {
      sinon.stub(itemService, "getItemById").rejects(new Error("DB error"));

      const req = { params: { id: "1" } };
      await itemController.getItemById(req, this.res);

      expect(statusStub.calledWith(500)).toBe(true);
      expect(jsonStub.calledWith({ error: "Internal server error" })).toBe(
        true
      );
    });
  });

  // Criacao de item
  describe("createItem", () => {
    it("cria um novo item - status 201", async () => {
      const newItem = { name: "NewItem" };
      const newItemId = "newItem_id";
      sinon.stub(itemService, "createItem").resolves(newItemId);

      const req = { body: newItem };
      await itemController.createItem({ body: newItem }, this.res);

      expect(statusStub.calledWith(201)).toBe(true);
      expect(jsonStub.calledWith({ id: newItemId })).toBe(true);
    });

    it("retorna error - status 500", async () => {
      const error = new Error("DB error");
      error.status = 500;
      sinon.stub(itemService, "createItem").rejects(error);

      await itemController.createItem({ body: {} }, this.res);
      expect(statusStub.calledWith(500)).toBe(true);
      expect(jsonStub.calledWith({ error: "Internal server error" })).toBe(
        true
      );
    });
  });

  describe("updateItem", () => {
    it("atualiza um item existente - status 200", async () => {
      const updatedItem = { id: 1, name: "UpdatedItem" };
      sinon.stub(itemService, "updateItem").resolves(updatedItem);

      const req = { params: { id: "1" }, body: { name: "UpdatedItem" } };
      await itemController.updateItem(req, this.res);

      expect(statusStub.calledWith(200)).toBe(true);
      expect(jsonStub.calledWith(updatedItem)).toBe(true);
    });
    it("item não encontrado para atualização - status 404", async () => {
      sinon.stub(itemService, "updateItem").resolves(null);

      const req = { params: { id: "999" }, body: { name: "UpdatedItem" } };
      await itemController.updateItem(req, this.res);

      expect(statusStub.calledWith(404)).toBe(true);
      expect(jsonStub.calledWith({ error: "Item not found" })).toBe(true);
    });
  });
});
