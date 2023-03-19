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
});
