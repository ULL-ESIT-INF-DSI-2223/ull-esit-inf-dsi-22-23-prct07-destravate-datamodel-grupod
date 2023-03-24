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
  it("Se puede añadir un reto a la base de datos", () => {
    const jsonReto = new JsonRetos();
    const reto = new Reto("Reto1 TEST", [1], "correr", 1, [1]);
    expect(jsonReto.addElement(reto)).to.be.deep.eq(reto.id);
  });
  it("Se puede modificar un reto de la base de datos", () => {
    const jsonReto = new JsonRetos();
    const retos = jsonReto.getAllElements();
    const size = retos.length;
    const reto = retos[size - 1];
    reto.nombre = "Reto 2 TEST";
    jsonReto.updateElement(reto);
    expect(reto.nombre).to.be.deep.eq("Reto 2 TEST");
  });
  it("Se puede eliminar un reto de la base de datos", () => {
    const jsonReto = new JsonRetos();
    const retos = jsonReto.getAllElements();
    const size = retos.length;
    const reto_id = retos[size - 1].id;
    expect(jsonReto.removeElement(reto_id)).to.be.deep.eq(true);
  });
});
