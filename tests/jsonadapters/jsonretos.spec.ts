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
});
