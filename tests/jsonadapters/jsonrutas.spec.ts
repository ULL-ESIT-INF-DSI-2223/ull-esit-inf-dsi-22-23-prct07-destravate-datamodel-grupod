import "mocha";
import { expect } from "chai";
import { JsonRutas } from "../../src/jsonadapters/jsonrutas";
import { Ruta } from "../../src/datatypes/rutas";
import fs from "fs";

describe("JsonRutas", () => {
  it("Debe existir la clase JsonRutas", () => {
    expect(JsonRutas).to.exist;
  });
  it("Se debe poder crear un objeto de la clase JsonRutas", () => {
    const jsonRutas = new JsonRutas();
    expect(jsonRutas).to.be.an.instanceOf(JsonRutas);
  });
  it("Se debe poder añadir un ruta a la base de datos", () => {
    const jsonRutas = new JsonRutas();
    const ruta = new Ruta("ruta1", [1, 1], [2, 2], 1, 1, [1], "ruta1", 1);
    jsonRutas.addElement(ruta);
    const rutasdb = JSON.parse(fs.readFileSync("./data/rutas.json", "utf8"));
    expect(rutasdb.rutas[0].id).to.be.equal(ruta.id);
  });
  it("Se debe poder eliminar un ruta de la base de datos", () => {
    const jsonRutas = new JsonRutas();
    const ruta = new Ruta("ruta1", [1, 1], [2, 2], 1, 1, [1], "ruta1", 1);
    jsonRutas.removeElement(ruta.id);
    const rutasdb = JSON.parse(fs.readFileSync("./data/rutas.json", "utf8"));
    expect(rutasdb.rutas.length).to.be.equal(1);
  });
});
