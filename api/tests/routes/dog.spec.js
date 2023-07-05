/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require("chai");
const session = require("supertest-session");
const app = require("../../src/app.js");
const { Dog, conn } = require("../../src/db.js");

const agent = session(app);
const dog = {
  name: "Pug",
};

describe("Test de RUTAS", () => {
  describe("GET /dogs/:id", () => {
    it("Responde con status: 200", async () => {
      await agent.get("/dogs/1").expect(200);
    });
    it('Responde un objeto con las propiedades: "id", "name", "image", "life_span", "temperaments", "minHeight", "maxHeight", "minWeight", "maxWeight"', async () => {
      const response = (await agent.get("/dogs/1")).body;
      expect(response).toHaveProperty("id");
      expect(response).toHaveProperty("name");
      expect(response).toHaveProperty("image");
      expect(response).toHaveProperty("life_span");
      expect(response).toHaveProperty("temperaments");
      expect(response).toHaveProperty("minHeight");
      expect(response).toHaveProperty("maxHeight");
      expect(response).toHaveProperty("minWeight");
      expect(response).toHaveProperty("maxWeight");
    });
    it("Si hay un error responde con status: 500", async () => {
      await agent.get("/dogs/123456").expect(500);
    });
  });
});
