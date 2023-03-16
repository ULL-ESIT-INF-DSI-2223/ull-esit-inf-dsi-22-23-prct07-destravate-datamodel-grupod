import "mocha";
import { expect } from "chai";
import { JsonRetos } from "../../src/jsonadapters/jsonretos";
import { Reto } from "../../src/datatypes/retos";
import fs from "fs";

describe("JsonRetos", () => {
  it("Debe existir la clase JsonRetos", () => {
    expect(JsonRetos).to.exist;
  });
  it("Se debe poder crear un objeto de la clase JsonRetos", () => {
    const jsonRetos = new JsonRetos();
    expect(jsonRetos).to.be.an.instanceOf(JsonRetos);
  });
  it("Se debe poder añadir un reto a la base de datos", () => {
    const jsonRetos = new JsonRetos();
    const reto = new Reto("Reto1", [1], "ruta1", 1, [1]);
    jsonRetos.addElement(reto);
    const retosdb = JSON.parse(fs.readFileSync("./data/retos.json", "utf8"));
    expect(retosdb.retos[0].id).to.be.equal(reto.id);
  });
  it("Se debe poder eliminar un reto de la base de datos", () => {
    const jsonRetos = new JsonRetos();
    const reto = new Reto("Reto1", [1], "ruta1", 1, [1]);
    jsonRetos.removeElement(reto.id);
    const retosdb = JSON.parse(fs.readFileSync("./data/retos.json", "utf8"));
    expect(retosdb.retos.length).to.be.equal(1);
  });
});
